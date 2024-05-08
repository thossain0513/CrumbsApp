import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './src/navigation/navigation';

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Navigation />
    </GestureHandlerRootView>
  );
}

