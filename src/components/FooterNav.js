
import styles from "./styles";
import { View, Button} from 'react-native';
import VoiceToTextButton from './VoiceToTextButton'
import axios from 'axios';
import createRecipe from "../recipe/Recipe";

const FooterNav = ({ navigation, style }) => {

  const generateRecipe = async (ingredients, isVegetarian = false, isVegan = false) => {
    try {
        console.log('Sending request to generate recipe'); // Debugging
        console.log('isVegetarian:', isVegetarian);
        console.log('isVegan:', isVegan);
        const response = await axios.post('http://10.0.0.5:8000/generate_recipe', {
            ingredients,
            is_vegetarian: isVegetarian,
            is_vegan: isVegan
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Received response:', response.data); // Debugging
        // Handle the generated recipes here, e.g., updating the UI
        first_recipe = createRecipe(response.data[0]);
        navigation.navigate('RecipeScreen', { recipe: first_recipe });
    } catch (error) {
        console.error('Error generating recipe:', error);
    }
}

  const onTranscription = async (transcription) => {
    console.log('Transcription received:', transcription);
    await generateRecipe(transcription);
  }

    return (
      <View style={[styles.footer, style]}>
          <Button title="Home" onPress={() => navigation.navigate('Home')} />
          <VoiceToTextButton onTranscription={onTranscription} />
          <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
          {/* Add more buttons as needed, pointing to different parts of the app */}
      </View>
    );
  };

export default FooterNav;