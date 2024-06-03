// api.js
import axios from 'axios';
import * as FileSystem from 'expo-file-system';

export const localIP = "10.0.0.5" //change this to your local IP address, find it on your terminal, ask ChatGPT how to find it in your terminal

export const fetchRecipes = async (ingredients, isVegetarian = false, isVegan = false) => {
    try {
        console.log('Sending request to generate recipes');
        const response = await axios.post(`http://${localIP}:8000/generate_recipe`, {
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
        const response = await axios.post(`http://${localIP}:8000/generate_image`, {
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

export const sendAudio = async (uri, onTranscription) => {
    const formData = new FormData();
    formData.append('file', {
      uri,
      type: 'audio/wav',
      name: 'speech.wav'
    });
  
    try {
      const response = await axios.post(`http://${localIP}:8000/transcribe`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onTranscription(response.data.transcript);
    } catch (error) {
      console.error('Error sending audio file:', error);
    }
  };
  
  export const sendPhotoToAPI = async (photoUri) => {
    console.log('sending photo');

    try {
        // Convert the photo URI to a base64 string
        const base64 = await FileSystem.readAsStringAsync(photoUri, {
            encoding: FileSystem.EncodingType.Base64,
        });

        // Construct the payload
        const payload = {
            file: `data:image/jpeg;base64,${base64}`, // Adjust MIME type if necessary
        };
        console.log(payload.file);

        // Send the payload to the API
        const response = await axios.post(`http://${localIP}:8000/analyze`, payload, {
            headers: { 'Content-Type': 'application/json' }
        });

        console.log(response.data); // Handle the API response

        // Delete the photo from device after successfully sending it to the API
        await FileSystem.deleteAsync(photoUri);
    } catch (error) {
        console.error(error);
    }
};