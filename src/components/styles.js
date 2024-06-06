import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles= StyleSheet.create({
    footer: {
        position: 'absolute',   // Position the footer absolutely within its container
        left: 0,                // Align to the left edge of the container
        right: 0,               // Align to the right edge of the container
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignContent: 'center',
        backgroundColor: '#333333',
        width: '100%',
        height: '10%'
    },

    lineHorizontal: {
      height: 1,
      backgroundColor: '#E2D0C1',
      marginBottom: 20,
    },
    lineVertical: {
      width: 1,
      backgroundColor: '#E2D0C1',
      marginHorizontal: 20,
      flex: 1,
    },

      dividerContainerHorizontal: {
        width: '100%', // Ensures the container takes full width, adjust as necessary
        height: 1,
        marginVertical: 10, // Optional: add padding if needed to adjust spacing
        alignItems: 'center', // Centers the DividerLine if it does not fill width
        backgroundColor: 'black'
  },
  dividerContainerVertical: {
        height: '100%', // Ensures the container takes full width, adjust as necessary
        width: 1,
        marginHorizontal: 10, // Optional: add padding if needed to adjust spacing
        alignItems: 'center', // Centers the DividerLine if it does not fill width
        backgroundColor: 'black'
  }
    
})

export default styles;