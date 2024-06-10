import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, View, Image, ActivityIndicator, StyleSheet, Dimensions, Text, Button } from 'react-native';
import { fetchRecipes, fetchImage } from '../../helpers'; // Adjust the import path to '../../helpers'
import Accordion from '../../components/Accordion';
import RecipeDetails from '../../components/RecipeDetails';
import Carousel from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const RecipeScreen = ({ route }) => {
  const [recipes, setRecipes] = useState(route.params?.recipe ? [route.params.recipe] : []);
  const [images, setImages] = useState(route.params?.recipe && route.params.recipe.image ? [route.params.recipe.image] : []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(route.params?.error || null);
  const [isFromCamera, setIsFromCamera] = useState(route.params?.isFromCamera || false);
  const progress = useSharedValue(0);
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const ingredients = route.params?.ingredients;
  const recipe = route.params?.recipe;
  console.log(`isFromCamera: ${isFromCamera}`);

  useEffect(() => {
    const loadData = async () => {
      if (recipe) {
        setRecipes([recipe]);
        setImages([recipe.image]);
        setLoading(false);
        setImageLoading(false);
      } else if (ingredients) {
        if (ingredients.trim() === '') {
          setError('Failed to generate recipe');
          setLoading(false);
          setImageLoading(false);
        } else {
          try {
            const fetchedRecipes = await fetchRecipes(ingredients);
            const fetchedImages = await Promise.all(
              fetchedRecipes.map(recipe => fetchImage(recipe.name, recipe.description))
            );
            setRecipes(fetchedRecipes);
            setImages(fetchedImages);
            setLoading(false);
            setImageLoading(false);
          } catch (error) {
            console.error('Error loading data:', error);
            setError('Failed to generate recipe');
            setLoading(false);
            setImageLoading(false);
          }
        }
      } else if (isFromCamera) {
        setLoading(true);
        setImageLoading(true);
      } else {
        setLoading(false);
        setError('No recipe or ingredients provided');
        setImageLoading(false);
      }
    };
    
    loadData();
  }, [ingredients, recipe, isFromCamera]);

  const handleNextRecipe = () => {
    if (carouselRef.current && currentIndex < recipes.length - 1) {
      carouselRef.current.next();
    }
  };

  const handlePreviousRecipe = () => {
    if (carouselRef.current && currentIndex > 0) {
      carouselRef.current.prev();
    }
  };

  const onSnapToItem = (index) => {
    setCurrentIndex(index);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
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

  const renderRecipe = ({ item, index }) => {
    const { name, ingredients: recipeIngredients, instructions, cuisine, prepTime, servings, description } = item;
    return (
      <View style={styles.card}>
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContentContainer}>
          <View style={styles.imageContainer}>
            {imageLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <Image 
                source={{ uri: images[index] }} 
                style={styles.image} 
                onLoad={() => setImageLoading(false)}
              />
            )}
          </View>
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
          <View style={styles.navigationButtons}>
            <Button title="Previous" onPress={handlePreviousRecipe} disabled={index === 0} />
            <Button title="Next" onPress={handleNextRecipe} disabled={index === recipes.length - 1} />
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={recipes}
        renderItem={renderRecipe}
        width={width}
        height={height}
        onSnapToItem={onSnapToItem}
        loop={false} // Disable looping to prevent circular navigation
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E9D9',
  },
  card: {
    flex: 1,
    marginBottom: '20%',
  },
  scrollContainer: {
    backgroundColor: '#F5E9D9',
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingBottom: 50, // Ensure space for navigation buttons
  },
  imageContainer: {
    width: '100%',
    height: height * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderWidth: 2,
    borderColor: 'black',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  details: {
    padding: 5,
    flexDirection: 'column',
    position: 'relative',
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
    backgroundColor: '#F5E9D9',
    borderTopWidth: 1,
    borderColor: 'gray',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default RecipeScreen;

