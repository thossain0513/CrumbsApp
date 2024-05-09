
import styles from "./styles";
import { View, Button} from 'react-native';
import VoiceToTextButton from './VoiceToTextButton'
const FooterNav = ({ navigation, style }) => {

  const onTranscription = (text) => {
    console.log(text);
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