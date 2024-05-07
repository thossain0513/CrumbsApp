// Accordion.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DividerLine from './DividerLine';

const Accordion = ({ title, data = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={toggleOpen}
      >
        <Text style={styles.headerText}>{title}</Text>
        <DividerLine style={{ width: windowWidth, alignSelf: 'flex-start', marginTop: '2%'}} color={'#505050'}/>
      </TouchableOpacity>
      {isOpen && data.map((item, index) => (
        <Text key={index} style={styles.content}>{item}</Text>
      ))
      }
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    marginTop: 20,
    marginBottom: 5,
    marginLeft: '5%',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginLeft: '5%',
    paddingBottom: 1
  },

  container: {
    paddingBottom: 10
  }
});

export default Accordion;
