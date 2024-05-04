import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, View, Button, Text, Image, TouchableHighlight, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tw } from 'nativewind';


const RecipeCard = ({ item }) => {
  return (
    <TouchableHighlight onPress={() => navigate('RecipeScreen')} underlayColor={styles.underlay}>
      <View tw="flex flex-col h-48 justify-end rounded-lg overflow-hidden shadow-md mx-5 px-0 mb-5 mt-5">
        <Image
        source={ex_image}
        tw="absolute w-full h-full object-cover" />
        <View tw="flex h-[25%] justify-center overflow-hidden bg-gray-200 opacity-75">
        <Text tw="text-center font-bold text-l text-opacity-100">{name}</Text>
        </View>
      



      </View>
      </TouchableHighlight>
  );
};

export default function HomeScreen() {
  const recipes = [
    { id: 1, name: 'Recipe 1', image: ex_image },
    { id: 2, name: 'Recipe 2', image: ex_image },
    { id: 3, name: 'Recipe 3', image: ex_image },
  ];
    return (
        <ScrollView tw="flex flex-col bg-white" style={styles.homeScreen}>
            <FlatList
            data={recipes}
            renderItem={({ item }) => (
              <RecipeCard
              item={item}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            />

            {/*  */}
        </ScrollView>
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