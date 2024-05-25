import React, { useState, useEffect } from 'react';
import { ScrollView, View, Image, ActivityIndicator, StyleSheet, Dimensions, Text, Button } from 'react-native';
import { fetchRecipes, fetchImage } from '../../helpers'; // Adjust the import path as necessary
import Accordion from '../../components/Accordion';
import RecipeDetails from '../../components/RecipeDetails';

const { width, height } = Dimensions.get('window');

const RecipeScreen = ({ route }) => {
  const [recipes, setRecipes] = useState([]);
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const ingredients = route.params?.ingredients;

  useEffect(() => {
    const loadData = async () => {
      try {
        if (ingredients) {
          const fetchedRecipes = await fetchRecipes(ingredients);
          setRecipes(fetchedRecipes);
          setCurrentRecipeIndex(0);
          const fetchedImage = await fetchImage(fetchedRecipes[0].name, fetchedRecipes[0].description);
          setImage(fetchedImage);
        } else if (route.params?.recipe) {
          setRecipes([route.params.recipe]);
          setCurrentRecipeIndex(0);
          const fetchedImage = await fetchImage(route.params.recipe.name, route.params.recipe.description);
          setImage(fetchedImage);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [ingredients]);

  const handleNextRecipe = async () => {
    const newIndex = (currentRecipeIndex + 1) % recipes.length;
    setCurrentRecipeIndex(newIndex);
    const fetchedImage = await fetchImage(recipes[newIndex].name, recipes[newIndex].description);
    setImage(fetchedImage);
  };

  const handlePreviousRecipe = async () => {
    const newIndex = (currentRecipeIndex - 1 + recipes.length) % recipes.length;
    setCurrentRecipeIndex(newIndex);
    const fetchedImage = await fetchImage(recipes[newIndex].name, recipes[newIndex].description);
    setImage(fetchedImage);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (recipes.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load recipes</Text>
      </View>
    );
  }

  const currentRecipe = recipes[currentRecipeIndex];
  const { name, ingredients: recipeIngredients, instructions, cuisine, prepTime, servings, description } = currentRecipe;
  console.log(`${name}, ${description}`);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <RecipeDetails
          name={name}
          cuisine={cuisine}
          prepTime={prepTime}
          servings={servings}
          description={description}
          style={styles.details}
        />
        <Accordion title="Ingredients" data={recipeIngredients} alwaysDown={true} />
        <Accordion title="Instructions" data={instructions} alwaysDown={true} />
      </ScrollView>
      <View style={styles.navigationButtons}>
        <Button title="Previous" onPress={handlePreviousRecipe} disabled={recipes.length <= 1} />
        <Button title="Next" onPress={handleNextRecipe} disabled={recipes.length <= 1} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E9D9',
    marginTop: 0,
    paddingTop: '0%',
  },
  scrollContainer: {
    backgroundColor: '#F5E9D9',
    flexDirection: 'flex-start',
    marginHorizontal: '0%',
    overflow: 'hidden',
    marginBottom: '5%',
  },
  image: {
    borderBottomWidth: 2,
    borderWidth: 2,
    borderColor: 'black',
    width: '100%',
    height: height * 0.35,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  details: {
    padding: 5,
    flexDirection: 'column',
    position: 'relative',
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
});

export default RecipeScreen;
