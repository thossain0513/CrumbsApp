import React, { useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import Accordion from '../../components/Accordion';
import RecipeDetails from '../../components/RecipeDetails';

const RecipeScreen = ({ route }) => {
  recipe = route.params.recipe
  const { name, image, ingredients, instructions, cuisine, prepTime, servings } = recipe;
  const [ingredientsOpen, setIngredientsOpen] = useState(false);
  const [instructionsOpen, setInstructionsOpen] = useState(false);

  return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <RecipeDetails name={name} cuisine={cuisine} prepTime={prepTime} servings={servings} />
          <Accordion title="Ingredients" data={ingredients} />
          <Accordion title="Instructions" data={instructions} />
        </ScrollView>
      </SafeAreaView>
      
  );
};

export default RecipeScreen;
