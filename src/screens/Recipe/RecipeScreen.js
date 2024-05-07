import React, { useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const RecipeScreen = ({ route }) => {
  const { recipeName, recipeImageUrl, ingredients, instructions, cuisine, prepTime, servings } = route.params;
  console.log(route.params)
  const [ingredientsOpen, setIngredientsOpen] = useState(false);
  const [instructionsOpen, setInstructionsOpen] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: recipeImageUrl }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{recipeName}</Text>
        <Text style={styles.subtitle}>{cuisine}</Text>
        <View style={styles.info}>
          <Text style={styles.infoText}>Prep Time: {prepTime} mins</Text>
          <Text style={styles.infoText}>Servings: {servings}</Text>
        </View>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => setIngredientsOpen(!ingredientsOpen)}
        >
          <Text style={styles.headerText}>Ingredients</Text>
        </TouchableOpacity>
        {ingredientsOpen && ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.content}>{ingredient}</Text>
        ))}
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => setInstructionsOpen(!instructionsOpen)}
        >
          <Text style={styles.headerText}>Instructions</Text>
        </TouchableOpacity>
        {instructionsOpen && instructions.map((step, index) => (
          <Text key={index} style={styles.content}>{step}</Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 300,
  },
  details: {
    padding: 20,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  infoText: {
    fontSize: 16,
    color: 'black',
  },
  sectionHeader: {
    marginTop: 20,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default RecipeScreen;
