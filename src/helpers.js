// api.js
import axios from 'axios';

export const localIP = "10.0.0.5" //change this to your local IP address, find it on your terminal, ask ChatGPT how to find it in your terminal


const seedrandom = require('seedrandom');

const getRandomIndices = (num_recipes) => {
  const seed = Math.floor(Math.random() * 1000000);
  const random = seedrandom(seed.toString());

  const indices = Array.from({ length: 1000 }, (_, i) => i);

  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  return indices.slice(0, num_recipes);
};

const generateRecipe = async (ingredients, isVegetarian = false, isVegan = false, index) => {
    const response = await axios.post(`http://${localIP}:8000/recipe/generate_single_recipe?index=${index}`, {
      ingredients: ingredients,
      is_vegetarian: isVegetarian,
      is_vegan: isVegan
    });
    return response.data;
  };

export const fetchRecipes = async (ingredients, isVegetarian = false, isVegan = false, num_recipes = 3) => {
    const randomIndices = getRandomIndices(num_recipes);
    try {
      const recipes = await Promise.all(
        randomIndices.map((index) =>
        generateRecipe(ingredients, isVegetarian, isVegan, index)
    ));
      return recipes;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw error;
    }
  };

export const sendAudio = async (uri, onTranscription) => {
    const formData = new FormData();
    formData.append('file', {
      uri,
      type: 'audio/wav',
      name: 'speech.wav'
    });
  
    try {
      const response = await axios.post(`http://${localIP}:8000/audio/transcribe`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onTranscription(response.data.transcript);
    } catch (error) {
      console.error('Error sending audio file:', error);
    }
  };
  
  export const sendPhotoToAPI = async (base64) => {
    console.log('sending photo');

    try {

        // Construct the payload
        const payload = {
            file: `data:image/jpeg;base64,${base64}`, // Adjust MIME type if necessary
        };

        // Send the payload to the API
        const response = await axios.post(`http://${localIP}:8000/analyze`, payload, {
            headers: { 'Content-Type': 'application/json' }
        });

        console.log(`response.data: ${response.data.ingredients}`); // Handle the API response
        console.log(`response.data before dicing: ${response.data.ingredients}`); // Handle the API response
          
        x = response.data.ingredients;
        return x;

    } catch (error) {
        console.error(error);
    }
};