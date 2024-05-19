
import React from 'react';
import { StyleSheet, Dimensions, View, Text, ImageBackground, TouchableHighlight } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import AutoAnimatedImage from './AutoAnimatedImage';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

const { width } = Dimensions.get('window');

const RecipeImage = ({ imageUrl }) => (
  <ImageBackground source={{ uri: imageUrl }} style={styles.image}>
    <LinearGradient
      colors={['transparent', 'rgba(0, 0, 0, 0.95)']}
      style={styles.gradient}
    >
      {/* Gradient covers bottom part of the image */}
    </LinearGradient>
  </ImageBackground>
);

const RecipeText = ({ name }) => (
  <View style={styles.textContainer}>
    <Text style={styles.text}>{name}</Text>
  </View>
);

const RecipeCard = ({ item, navigation, style, animated = false }) => {
  const imageUrl = item.image || placeholderImage;
console.log(item);
  return (
    <TouchableHighlight onPress={() => navigation.navigate('RecipeScreen', { recipe: item })} style={[styles.cardContainer, style]}>
      <View style={styles.imageTextContainer}>
        {animated ? <AutoAnimatedImage imageUri={imageUrl} /> : <RecipeImage imageUrl={imageUrl} />}
        <RecipeText name={item.name} />
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
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
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    justifyContent: 'flex-end',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%', // Cover the bottom 25% of the image
    justifyContent: 'flex-end',
    padding: 10,
  },
  textContainer: {
    position: 'absolute',
    bottom: '5%', // Position text 25% up from the bottom
    left: 0,
    right: 0,
    padding: 10,
    alignItems: 'center', // Align text to the left
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'regular',
    fontFamily: 'Roboto'
  },
});

export default RecipeCard;
