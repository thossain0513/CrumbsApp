
import styles from "./styles";
import { View, Button} from 'react-native';
import VoiceToTextButton from './VoiceToTextButton'
import LogoutButton
 from "./LogoutButton";
const FooterNav = ({ navigation, style }) => {

  const onTranscription = async (transcription) => {
    console.log('Transcription received:', transcription);
    navigation.navigate('RecipeScreen', { ingredients: transcription });
  }

    return (
      <View style={[styles.footer, style]}>
          <Button title="Home" onPress={() => navigation.navigate('HomeScreen')} />
          <VoiceToTextButton onTranscription={onTranscription} />
          <LogoutButton />
          {/* Add more buttons as needed, pointing to different parts of the app */}
      </View>
    );
  };

export default FooterNav;