// RecipeDetails.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DividerLine from './DividerLine';
import { Dimensions } from 'react-native';

const {width, hight} = Dimensions.get("window")
var windowWidth = width * 0.85;

const RecipeDetails = ({ name, cuisine, prepTime, servings }) => {
  return (
    <View style={styles.details}>
      <Text style={styles.title}>{name}</Text>
      <DividerLine style={{ width: windowWidth, alignSelf: 'flex-start', marginTop: '2%'}} color={'#505050'}/>
      <Text style={styles.subtitle}>{cuisine}</Text>
      <View style={styles.info}>
        <Text style={styles.infoText}>Prep Time: {prepTime} mins</Text>
        <Text style={styles.infoText}>Servings: {servings}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  details: {
    padding: 20,
    flexDirection: 'column'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: 'gray',
    marginVertical: 5,
  },
  info: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  infoText: {
    fontSize: 16,
    color: 'black',
  }
});

export default RecipeDetails;
