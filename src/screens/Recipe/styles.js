import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E9D9'

  },
  scrollContainer: {
    backgroundColor: 'white',
    flexDirection: 'flex-start',
    marginHorizontal: '1%',
    borderWidth: 2,
    borderColor: 'black',
    overflow: 'hidden',
    borderRadius: 10
  },
  image: {
    borderBottomWidth: 2,  
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomLeftRadius: 10,  // Ensure bottom corners are also rounded
    borderBottomRightRadius: 10,
    borderColor: 'black',
    borderRadius: 10,
    width: '100%',
    height: height * 0.35,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  details: {
    padding: 20,
    flex: 6,
    flexDirection: 'column',
    position: 'relative'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: 'gray',
    marginVertical: 5,
  },
  info: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  infoText: {
    fontSize: 16,
    color: 'black',
  },
  sectionHeader: {
    marginTop: 20,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
});


  export default styles;
  