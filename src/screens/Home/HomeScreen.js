import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from 'react';
import {StyleSheet, View, Button, Text, Image, TouchableHighlight, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tw } from 'nativewind';
import generateImage from '../../helpers';
import { chickenParmesan, grilledCheese, chickenFajitas, roastedVegetables, chocolateCake, chickenTikkaMasala } from '../../recipe/examples'


const RecipeCard = ({ item, image }) => {
  if (!image) {
    return <Text>Error: Image not found</Text>; // Handle error if image is not available
  }

  return (
    <TouchableHighlight onPress={() => navigate('RecipeScreen')} underlayColor={styles.underlay}>
      <View tw="flex flex-col h-48 justify-end rounded-lg overflow-hidden shadow-md mx-5 px-0 mb-5 mt-5">
        <Image
          source={{ uri: image }}
          tw="absolute w-full h-full object-cover"
        />
        <View tw="flex h-[25%] justify-center overflow-hidden bg-gray-200 opacity-75">
          <Text tw="text-center font-bold text-l text-opacity-100">{item.name}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};
;

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [imageSources, setImageSources] = useState({});
  const recipes = [chickenParmesan, 
    grilledCheese, 
    chickenFajitas, 
    roastedVegetables, 
    chocolateCake,
     chickenTikkaMasala].slice(0, 5);

     useEffect(() => {
      const fetchImages = async () => {
        const updatedRecipes = [];
        for (const recipe of recipes) {
          try {
            const imgSrc = await generateImage(recipe.name);
            const updatedRecipe = { ...recipe, image: imgSrc };
            updatedRecipes.push(updatedRecipe);
          } catch (error) {
            console.error('Error fetching image:', error.message);
            // Handle error if needed
          }
        }
        setImageSources(updatedRecipes);
        setLoading(false);
      };
      fetchImages();
    }, [recipes]);

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={recipes}
          renderItem={({ item }) => (
            <RecipeCard
              item={item}
            />
          )}
          keyExtractor={(item) => item.name.toString()}
        />
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  underlay: {
    underlayColor: 'rgba(0, 0, 0, 0.1)'
  },
    homeScreen: {
        marginTop: '30%',
        marginBottom: 20,
    },

})