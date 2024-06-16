// api.js
import axios from 'axios';

export const localIP = "10.0.0.5" //change this to your local IP address, find it on your terminal, ask ChatGPT how to find it in your terminal

const getRandomIndices = (num_recipes) => {
    const seed = Math.floor(Math.random() * (1000000 - num_recipes + 1));
    const indices = [];
  
    for (let i = 0; i < num_recipes; i++) {
      indices.push(seed + i);
    }
  
    return indices;
  };
  

const normalizeRecipeName = (name) => {
    return name.toLowerCase().replace(/[^a-z]/g, '');
  };
  
const filterUniqueRecipes = (recipes) => {
    const uniqueRecipes = [];
    const recipeNames = new Set();
  
    for (const recipe of recipes) {
      const normalizedName = normalizeRecipeName(recipe.name);
      if (!recipeNames.has(normalizedName)) {
        uniqueRecipes.push(recipe);
        recipeNames.add(normalizedName);
      }
    }
  
    return uniqueRecipes;
  };

// const generateRecipe = async (ingredients, isVegetarian = false, isVegan = false, index) => {
//     const response = await axios.post(`http://${localIP}:8000/recipe/generate_single_recipe`, {
//       ingredients: ingredients,
//       is_vegetarian: isVegetarian,
//       is_vegan: isVegan,
//       seed: index
//     });
//     return response.data;
//   };

// export const fetchRecipes = async (ingredients, isVegetarian = false, isVegan = false, num_recipes = 3) => {
//     const randomIndices = getRandomIndices(num_recipes);
//     try {
//       const recipes = await Promise.all(
//         randomIndices.map((index) =>
//         generateRecipe(ingredients, isVegetarian, isVegan, index)
//     ));

//       // Filter out duplicate recipes by name
//     return filterUniqueRecipes(recipes);

//     } catch (error) {
//       console.error('Error fetching recipes:', error);
//       throw error;
//     }
//   };

  export const fetchMultipleRecipes = async (ingredients, isVegetarian = false, isVegan = false, num_recipes = 3) => {
    const randomIndices = getRandomIndices(num_recipes);
  
    const requests = randomIndices.map((index) => ({
      ingredients: ingredients,
      is_vegetarian: isVegetarian,
      is_vegan: isVegan,
      seed: index
    }));
  
    const requestBody = {
      req: requests,
    };
  
    try {
      const response = await axios.post(`http://${localIP}:8000/recipe/generate_recipes`, requestBody);
      const recipes = response.data;
  
      // Filter out duplicate recipes by name
      return filterUniqueRecipes(recipes);

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