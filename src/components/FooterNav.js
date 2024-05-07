
import styles from "./styles";
import { View, Button} from 'react-native';

const FooterNav = ({ navigation, style }) => {
    return (
      <View style={[styles.footer, style]}>
          <Button title="Home" onPress={() => navigation.navigate('Home')} />
          <Button title="Generate" onPress={() => navigation.navigate('Generate')} />
          <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
          {/* Add more buttons as needed, pointing to different parts of the app */}
      </View>
    );
  };

export default FooterNav;