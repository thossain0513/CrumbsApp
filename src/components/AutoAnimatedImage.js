// AutoAnimatedImage.js
import React, { useEffect, useLayoutEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';



const AutoAnimatedImage = ({ imageUri }) => {
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return { opacity: opacity.value,
              height: '100%', // Ensure it fills the container
              width: '100%' };
  });

  useEffect(() => {
    console.log("Current opacity:", opacity.value);
    opacity.value = withTiming(1, { duration: 2000, easing: Easing.ease });
  }, []);
  return (
    <View style={[styles.imageContainer]}>
      <Animated.View style={[styles.fullSize, animatedStyle]}>
        <Image source={{ uri: imageUri }} style={styles.fullSize} 
        onError={(e) => console.error('Failed to load image:', e.nativeEvent.error)}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%', // Or '100%' depending on container requirements
    height: '100%', // Or '100%'
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Or any other suitable color
  },
  fullSize: {
    width: '100%',
    height: '100%',
  }
});

export default AutoAnimatedImage;


