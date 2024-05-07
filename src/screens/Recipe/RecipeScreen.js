import React, { useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';

const RecipeScreen = ({ route }) => {
  recipe = route.params.recipe
  const { name, image, ingredients, instructions, cuisine, prepTime, servings } = recipe;
  const [ingredientsOpen, setIngredientsOpen] = useState(false);
  const [instructionsOpen, setInstructionsOpen] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.title}>{name}</Text>
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
    </SafeAreaView>
  );
};

export default RecipeScreen;
