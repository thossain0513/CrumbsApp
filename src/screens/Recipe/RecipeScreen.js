import React, { useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Accordion from '../../components/Accordion';
import RecipeDetails from '../../components/RecipeDetails';

const {width, height} = Dimensions.get('window');

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E9D9'

  },
  scrollContainer: {
    backgroundColor: 'white',
    flexDirection: 'flex-start',
    marginHorizontal: '1%',
    borderWidth: 2,
    borderColor: 'black',
    overflow: 'hidden',
    borderRadius: 10
  },
  image: {
    borderBottomWidth: 2,  
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomLeftRadius: 10,  // Ensure bottom corners are also rounded
    borderBottomRightRadius: 10,
    borderColor: 'black',
    borderRadius: 10,
    width: '100%',
    height: height * 0.35,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  details: {
    padding: 20,
    flex: 6,
    flexDirection: 'column',
    position: 'relative'
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
