import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";


const { width, height } = Dimensions.get('window');



const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0.1 * height,
        alignItems: 'center',
        backgroundColor: 'blue',
        justifyContent: 'flex-start',
        position: 'relative'
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

    },
    scrollFooterContainer: {
        alignItems: 'center', // Center items vertically within the scroll view
        flexDirection: "row",
    },
  });

  export default styles;