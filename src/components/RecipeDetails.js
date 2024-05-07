// RecipeDetails.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RecipeDetails = ({ name, cuisine, prepTime, servings }) => {
  return (
    <View style={styles.details}>
      <Text style={styles.title}>{name}</Text>
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
