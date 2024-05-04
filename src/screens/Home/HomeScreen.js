import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from 'react';
import {StyleSheet, View, Button, Text, Image, TouchableHighlight, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tw } from 'nativewind';
import generateImage from '../../helpers';
import { chickenParmesan, grilledCheese, chickenFajitas, roastedVegetables, chocolateCake, chickenTikkaMasala } from '../../recipe/examples'


const RecipeCard = ({ item }) => {

const [image, setImage] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {

  const fetchData = async () => {
    setLoading(true);
    try {
      const imgSrc = await generateImage(item.name);
      setImage(imgSrc);

    } catch (error) {
      console.error('Error fetching image:', error.message);
      setError(error.message || 'An error occurred');

    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, [item.name]);

if (loading) {
  return <ActivityIndicator size="large" color="#0000ff" />;
}

if (error) {
  return <Text>Error: {error}</Text>;
}
  return (
    <TouchableHighlight onPress={() => navigate('RecipeScreen')} underlayColor={styles.underlay}>
      <View tw="flex flex-col h-48 justify-end rounded-lg overflow-hidden shadow-md mx-5 px-0 mb-5 mt-5">
        <Image
        source={ {uri: image} }
        tw="absolute w-full h-full object-cover" />
        <View tw="flex h-[25%] justify-center overflow-hidden bg-gray-200 opacity-75">
        <Text tw="text-center font-bold text-l text-opacity-100">{item.name}</Text>
        </View>
      



      </View>
      </TouchableHighlight>
  );
};

export default function HomeScreen() {

  const recipes = [
    chickenParmesan, 
    grilledCheese, 
    chickenFajitas, 
    roastedVegetables, 
    chocolateCake, 
    chickenTikkaMasala
  ];

    return (
            <FlatList
            data={recipes.slice(0, 5)}
            renderItem={({ item }) => (
              <RecipeCard
              item={item}
              />
            )}
            keyExtractor={(item) => item.name.toString()}
            />
    )
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