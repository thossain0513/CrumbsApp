from flask import Flask, request, jsonify
import whisper
import os

app = Flask(__name__)

# Load the Whisper model; we can choose 'tiny', 'base', 'small', 'medium', or 'large'
model = whisper.load_model("base")

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
def generate_recipe(ingredients):
    """
    This function will generate a dictionary with the recipe information taking in the input ingredients.
    Each recipe dictionary will have the following:
        { "name": "Name of the Recipe" (Python String), 
        "description": "A brief description, incorporating the listed ingredients with their quantities" (a string), 
        "cuisine_type": "Appropriate Cuisine Type" (a string), 
        "ingredients": ["ingredient", "ingredient"] (a list of strings), 
        "instructions": ["Step 1: Description with Quantity of Used Ingredient 1", "Step 2: Description with Quantity of Used Ingredient 2"] (a list of strings), 
        "is_vegetarian": "Yes" if there are no animal-based ingredients/ "No" if there are animal-based ingredients (a string),
        "prep_time": "prep time (in minutes)" (a string),
        "servings": servings (integer),
        "is_vegan": "Yes" if there are only vegan-compliant ingredients/"No" if there are one or more non-vegan ingredients (a string)
        }
        Look at the LLM system prompt for more info 
    """
    ...


#This function will generate an image url link based on the input prompt
@app.route('/generate_image', methods=['POST'])
def generate_image_url(prompt):
    ...

if __name__ == '__main__':
    print('app running')
    app.run(host='0.0.0.0', port=8080, debug=True)
