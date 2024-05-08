// DraggableDivider.js
import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';


const DraggableDivider = ({ onDrag }) => {
  const translateY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
        console.log("Pan gesture onUpdate:", event.translationY);
      translateY.value = event.translationY;
      onDrag(translateY.value);
    })
    .onEnd(() => {
      translateY.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.divider, animatedStyle]} />
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  divider: {
    height: 30,
    backgroundColor: '#ccc',
    width: '100%',
  },
});

export default DraggableDivider;
