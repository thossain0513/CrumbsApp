import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import DividerLine from './DividerLine';

const windowWidth = Dimensions.get('window').width;

const Accordion = ({ title, data = [] }) => {
  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.headerText}>{title}</Text>
        <DividerLine style={{ width: windowWidth * 0.9, alignSelf: 'flex-start', marginTop: '2%', marginBottom: 10 }} color={'#505050'}/>
      </View>
      {data.map((item, index) => (
        <Text key={index} style={styles.content}>{item}</Text>
      ))}
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
    paddingBottom: 1,
  },
  container: {
    paddingBottom: 10,
  }
});

export default Accordion;
