// NavigateButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const NavigateButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});

export default NavigateButton;
