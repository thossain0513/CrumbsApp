// Accordion.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Accordion = ({ title, data = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <View>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={toggleOpen}
      >
        <Text style={styles.headerText}>{title}</Text>
      </TouchableOpacity>
      {isOpen && data.map((item, index) => (
        <Text key={index} style={styles.content}>{item}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    marginTop: 20,
    marginBottom: 10,
    marginLeft: '5%'
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginLeft: '5%'
  },
});

export default Accordion;
