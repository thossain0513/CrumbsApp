
import styles from "./styles";
import { View, Button} from 'react-native';
import LogoutButton from "./LogoutButton";
import NavigateButton from "./NavigateButton";
const FooterNav = ({ navigation, style }) => {

  // const onTranscription = async (transcription) => {
  //   console.log('Transcription received:', transcription);
  //   navigation.navigate('RecipeScreen', { ingredients: transcription });
  // }

    return (
      <View style={[styles.footer, style]}>
          <Button title="Home" onPress={() => navigation.navigate('HomeScreen')} />
          <NavigateButton title="Camera" onPress={() => navigation.navigate('CameraScreen')} />
          <LogoutButton />
          {/* Add more buttons as needed, pointing to different parts of the app */}
      </View>
    );
  };

export default FooterNav;