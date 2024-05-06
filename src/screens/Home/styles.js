import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";


const { width, height } = Dimensions.get('window');



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dc143c',
        justifyContent: 'flex-start',
        paddingTop: 0.1 * height,
        alignItems: 'center',
        backgroundColor: 'blue'
    },

    cardContainer: {
        flexDirection: 'column',
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 3,
        shadowOpacity: 0.3,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 2 },
        backgroundColor: 'yellow',
        minWidth: 100, // Minimum width to ensure the card is visible
        minHeight: height* 0.25, // Minimum height to ensure the card is visible
        alignSelf: 'center', // Center the card in the flat list
        width: width * 0.85,
         // 85% of the screen width for responsiveness
      },
      imageTextContainer: {
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
      },
      imageContainer: {
        height: '100%', // Ensures the image container takes the full height of its parent
        width: '100%', // Ensures the image container takes the full width of its parent
      },
      image: {
        flex: 1,
        resizeMode: 'cover' // Ensures the image covers the area without being distorted
      },
      textContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        alignItems: "center"
      },
      text: {
        color: 'white',
        fontSize: 16,
      },
      separator: {
        height: 20, // You can adjust the height for spacing between items
        width: '100%'
      },
      flatListContent: {
        flexGrow: 1,
        paddingBottom: 20, // Add padding at the top and bottom for better spacing
        alignItems: 'center', // Ensures all items are centrally aligned
        width: '100%',
        
      }
  });

  export default styles;