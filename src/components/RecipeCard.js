
import { StyleSheet, Dimensions } from 'react-native';
import React from 'react'; // Essential for all React components
import { View, Text, Image, TouchableHighlight, Animated } from 'react-native'; // Standard React Native components
import AutoAnimatedImage from './AutoAnimatedImage'; // Example path to a custom component


const { width } = Dimensions.get('window');


const RecipeImage = ({ imageUrl }) => (
<View style={styles.imageContainer}>
    <Image
    source={{ uri: imageUrl }}
    style={styles.image}
    resizeMode='cover'
    />
</View>
);

const RecipeText = ({ name }) => (
<View style={styles.textContainer}>
    <Text style={styles.text}>{name}</Text>
</View>
);

const RecipeCard = ({ item, navigation, style, animated=false }) => {
imageUrl = item.image || placeholderImage;
console.log(imageUrl)

return (
    <TouchableHighlight onPress={() => navigation.navigate('RecipeScreen', { recipe: item })} style={[styles.cardContainer, style]}>
    <View style={styles.imageTextContainer}>
        {animated ? <AutoAnimatedImage imageUri={imageUrl} />: <RecipeImage imageUrl={imageUrl}/>}
        <RecipeText name={item.name} />
    </View>
    </TouchableHighlight>
);
};

  
styles =  StyleSheet.create({
    cardContainer: {
        flexDirection: 'column',
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: 'yellow',
        minWidth: 100,
        alignSelf: 'center',
        width: width * 0.85, // 85% of the screen width for responsiveness
    },
    imageTextContainer: {
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: '100%', // Or '100%' depending on container requirements
        height: '100%', // Or '100%'
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    }, // Or any other suitable color,
    image: {
        height: '100%',
        width: '100%',
        borderRadius: 10,
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
});

export default RecipeCard;