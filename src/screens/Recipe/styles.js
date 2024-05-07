import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageContainer: {
      width: '100%',
      height: '90%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    detailContainer: {
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    subtitle: {
      fontSize: 18,
      color: 'gray',
    },
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 10,
    },
    text: {
      fontSize: 16,
      color: 'black',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignContent:'center',
      width: '100%',
      padding: 10,
    },
    button: {
      backgroundColor: 'lightgray',
      padding: 10,
      borderRadius: 10,
    },
    buttonText: {
      fontSize: 18,
      color: 'black',
    },
    footer: {
        position: 'absolute',   // Position the footer absolutely within its container
        left: 0,                // Align to the left edge of the container
        right: 0,               // Align to the right edge of the container
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#eee',
        width: '100%',
        height: '10%'

    }
  });

  export default styles;
  