// api.js
import axios from 'axios';

export const fetchRecipes = async (ingredients, isVegetarian = false, isVegan = false) => {
    try {
        console.log('Sending request to generate recipes');
        const response = await axios.post('http://10.0.0.5:8000/generate_recipe', {
            ingredients,
            is_vegetarian: isVegetarian,
            is_vegan: isVegan
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Received response:', response.data);
        return response.data; // Return the list of recipes
    } catch (error) {
        console.error('Error generating recipes:', error);
        throw error;
    }
};

export const fetchImage = async (recipeName, recipeDescription) => {
    try {
        const response = await axios.post('http://10.0.0.5:8000/generate_image', {
            recipeName,
            recipeDescription,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Image response:', response.data);
        if (response.data && response.data.length > 0) {
            return response.data[0]; // Return the first image URL
        } else {
            console.error('Invalid image response structure:', response.data);
            throw new Error('Invalid image response structure');
        }
    } catch (error) {
        console.error('Error fetching image:', error);
        throw error;
    }
};
