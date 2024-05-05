import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from 'react';
import {StyleSheet, View, Button, Text, Image, TouchableHighlight, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tw } from 'nativewind';
import generateImage from '../../helpers';
import { chickenParmesan, grilledCheese, chickenFajitas, roastedVegetables, chocolateCake, chickenTikkaMasala } from '../../recipe/examples'

const placeholderImage = 'https://furntech.org.za/wp-content/uploads/2017/05/placeholder-image-300x225.png';
const RecipeCard = ({ item }) => {
  
  imageUrl = item.image || placeholderImage;

  return (
    <TouchableHighlight onPress={() => navigate('RecipeScreen')} underlayColor={styles.underlay}>
      <View tw="flex flex-col h-48 justify-end rounded-lg overflow-hidden shadow-md mx-5 px-0 mb-5 mt-5">
        <Image
          source={{ uri: imageUrl }}
          tw="absolute w-full h-full object-cover"
        />
        <View tw="flex h-[25%] justify-center overflow-hidden bg-gray-200 opacity-75">
          <Text tw="text-center font-bold text-l text-opacity-100">{item.name}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};


export default function HomeScreen() {

  const [loading, setLoading] = useState(true);
  const [imageSources, setImageSources] = useState({});
  const [updatedRecipes, setUpdatedRecipes] = useState([]);
  const [hasRun, setHasRun] = useState(false);


  const recipes = [chickenParmesan, 
    grilledCheese, 
    chickenFajitas, 
    roastedVegetables, 
    chocolateCake,
    chickenTikkaMasala].slice(0, 4);


     useEffect(() => {
      if (!hasRun) {
      console.log('Use effect running again');
      const fetchImages = async () => {
      const updatedRecipesTemp = [];
      for (const recipe of recipes) {
      try {
        const imgSrc = await generateImage(recipe.name);
        console.log('image arrived'); //checking if images arrived
        const updatedRecipe = { ...recipe, image: imgSrc };
        updatedRecipesTemp.push(updatedRecipe);
      } catch (error) {
        console.error('Error fetching images:', error.message);
        const updatedRecipe = { ...recipe, image: placeholderImage }; 
        updatedRecipesTemp.push(updatedRecipe)
      }
      }
      
      console.log('got to the end of the loop');
      setUpdatedRecipes(updatedRecipesTemp); 
      setLoading(false);
      setHasRun(true);

      };
      fetchImages();
      }
      }, [hasRun]);

      return (
        loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <FlatList
            data={updatedRecipes}
            renderItem={({ item }) => (
              <RecipeCard
                item={item}
              />
            )}
            keyExtractor={(item) => item.name.toString()}
          />
        )
      );
  }


const styles = StyleSheet.create({
  underlay: {
    underlayColor: 'rgba(0, 0, 0, 0.1)'
  },
  homeScreen: {
    marginTop: '30%',
    marginBottom: 20
  }
});