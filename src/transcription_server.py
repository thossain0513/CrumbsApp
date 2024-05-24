from flask import Flask, request, jsonify
import whisper
import os
from llama_index.core.program import LLMTextCompletionProgram
from pydantic import BaseModel
import replicate
from typing import List
from langchain.output_parsers import PydanticOutputParser
from pydantic import BaseModel, Field, validator
from typing import List
import json
from langchain.llms import Replicate

model_name = "meta/meta-llama-3-70b-instruct"
os.environ["REPLICATE_API_TOKEN"] = "r8_dzkkqN96nqOQC7YhTNJ2gUam62Cu38z4aMu9S"

app = Flask(__name__)
system_prompt = """
        You are a creative chef that can generate recipes in a JSON format. 
        Make it with the following structure exactly so that we can parse the string properly. 
        Make sure to only include ingredients that we use. 
        You don't need to include all the ingredients to generate the recipe if you don't need to.
        Make sure to pay attention to correctly label the dietary identification of the recipe based on the ingredients used.
        You can only use raw food ingredients that are provided to you in the prompt. Assume freedom with the spices.
        You will only recommend recipes strictly in this following format with no inconsistencies so that a python function can properly parse it as a dictionary:
        
        { "name": "Name of the Recipe" (Python String),
         "ingredients": ["ingredient", "ingredient"] (a list of strings),  
        "description": "A brief description, incorporating the listed ingredients with their quantities" (a string), 
        "instructions": ["Step 1: Description with Quantity of Used Ingredient 1", "Step 2: Description with Quantity of Used Ingredient 2"] (a list of strings), 
        "cuisine": "Appropriate Cuisine Type" (a string), 
        "prepTime": "prep time (in minutes)" (a string),
        "servings": servings (integer),
        "is_vegetarian": "Yes" if there are no animal-based ingredients/ "No" if there are animal-based ingredients (a string),
        "is_vegan": "Yes" if there are only vegan-compliant ingredients/"No" if there are one or more non-vegan ingredients (a string)
        }
"""

# Load the Whisper model; we can choose 'tiny', 'base', 'small', 'medium', or 'large'
model = whisper.load_model("base")

#The following two functions are helper functions to help us parse our text data and turn into JSON format
def format_string_to_dict(string):
    # Remove unnecessary characters and replace with proper quotes
    string = string.replace("_", "").replace("):", ":").replace(')', '').replace('(', '')
    string = string.replace('"', '').replace("'", '"')

    # Try to load the string as JSON
    try:
        return json.loads(string)
    except ValueError:
        # If JSON decoding fails, try to fix the string and try again
        string = string.replace("Yes", '"Yes"').replace("No", '"No"')
        string = string.replace("True", '"True"').replace("False", '"False"')
        return json.loads(string)

def extract_jsons(string):
    jsons = []
    while '{' in string and '}' in string:
        start_index = string.index('{')
        end_index = string.index('}') + 1
        json_string = string[start_index:end_index].replace('\n', "").replace("\t", "")
        try:
            jsons.append(json.loads(json_string))
        except ValueError:
            # Handle invalid JSON
            print(f"Invalid JSON: {json_string}") #will build fixer LLM agent to deal with invalid inputs, THIS IS KEY
            jsons.append(fixer_agent(json_string))
        string = string[end_index:]
    return jsons

@app.route('/transcribe', methods=['POST'])
def transcribe_audio():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Save the audio file temporarily
    audio_path = "/tmp/audio_to_transcribe.wav"
    file.save(audio_path)

    try:
        # Use Whisper to transcribe the audio
        result = model.transcribe(audio_path)
        transcript = result['text']
    finally:
        # Ensure the file is deleted after processing
        if os.path.exists(audio_path):
            os.remove(audio_path)

        # Return the transcription
        return jsonify({'transcript': transcript})
    
@app.route('/generate_recipe', methods=['POST'])
def generate_recipe(ingredients,
                    another = False, #If we want more responses, we show the previous recipes so it generates different ones
                    temperature = 0.5,
                    previous_response = [],
                    num_recipes = 3,
                    is_vegetarian = False,
                    is_vegan = False,
                    top_p = 1,
                    max_tokens = 1500):
    """
    This function will generate a dictionary with the recipe information taking in the input ingredients.
    Each recipe dictionary will have the following:
        { "name": "Name of the Recipe" (Python String),
         "ingredients": ["ingredient", "ingredient"] (a list of strings),  
        "description": "A brief description, incorporating the listed ingredients with their quantities" (a string), 
        "instructions": ["Step 1: Description with Quantity of Used Ingredient 1", "Step 2: Description with Quantity of Used Ingredient 2"] (a list of strings), 
        "cuisine": "Appropriate Cuisine Type" (a string), 
        "prepTime": "prep time (in minutes)" (a string),
        "servings": servings (integer),
        "is_vegetarian": "Yes" if there are no animal-based ingredients/ "No" if there are animal-based ingredients (a string),
        "is_vegan": "Yes" if there are only vegan-compliant ingredients/"No" if there are one or more non-vegan ingredients (a string)
        }
        Look at the LLM system prompt for more info 
    """
    if another:
        prompt = f"""Here are my ingredients. {ingredients}.
            Here are the previous {num_recipes} recipes you generated: {[recipe['name'] for recipe in previous_response]}.
            Generate another {num_recipes} recipes for me based on the previous conversation."""
    else:
        prompt = f"""Make {num_recipes} recipes for me with these ingredients: {ingredients}"""

    if is_vegan and is_vegetarian:
        prompt = "I am vegetarian and vegan. " + prompt 
    
    elif is_vegetarian:
        prompt = "I am vegetarian. " + prompt
        
    elif is_vegan:
        prompt = "I am vegan. " + prompt

    input = {
            "top_p": top_p,
            "prompt": system_prompt + prompt,
            "temperature": temperature,
            "system_prompt": system_prompt,
            "frequency_penalty": 0.5,
            "repetition_penalty": 1,
            "max_tokens": max_tokens,
            
        }
        
    fin_string = ""
    for event in replicate.stream(
        model_name,
        input=input
    ):
        fin_string += str(event)

    return extract_jsons(fin_string)

def fixer_agent(fix, #string that needs to be fixed
                temperature = 0.1,
                top_p = 1,
                max_tokens = 1500):

    fixer_prompt = """
    You are a fixer LLM Agent. I will give you strings that can't be parsed into JSON purely from their string format,
    I want only the JSON format with no commented out parts. I want them in a JSON format strictly in the following
    structure so that I can use Python to parse it into a JSON format the following way:

    { "name": "Name of the Recipe" (Python String),
             "ingredients": ["ingredient", "ingredient"] (a list of strings),  
            "description": "A brief description, incorporating the listed ingredients with their quantities" (a string), 
            "instructions": ["Step 1: Description with Quantity of Used Ingredient 1", "Step 2: Description with Quantity of Used Ingredient 2"] (a list of strings), 
            "cuisine": "Appropriate Cuisine Type" (a string), 
            "prepTime": "prep time (in minutes)" (a string),
            "servings": servings (integer),
            "is_vegetarian": "Yes" if there are no animal-based ingredients/ "No" if there are animal-based ingredients (a string),
            "is_vegan": "Yes" if there are only vegan-compliant ingredients/"No" if there are one or more non-vegan ingredients (a string)
    }
    
    Here is the string that I want fixed:
    """ + f"{fix}"
    input = {
                "top_p": top_p,
                "prompt": fixer_prompt,
                "temperature": temperature,
                "system_prompt": fixer_prompt,
                "frequency_penalty": 0.5,
                "repetition_penalty": 1,
                "max_tokens": max_tokens,

            }

    fin_string = ""
    for event in replicate.stream(
        model_name,
        input=input
    ):
        fin_string += str(event)

    return extract_jsons(fin_string)


#This function will generate an image url link based on the input prompt
@app.route('/generate_image', methods=['POST'])
def generate_image_url(prompt):
    ...

if __name__ == '__main__':
    print('app running')
    app.run(host='0.0.0.0', port=8080, debug=True)
