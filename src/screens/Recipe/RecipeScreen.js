import React, { useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Accordion from '../../components/Accordion';
import RecipeDetails from '../../components/RecipeDetails';

const {width, height} = Dimensions.get('window');

const RecipeScreen = ({ route }) => {
  recipe = route.params.recipe
  const { name, image, ingredients, instructions, cuisine, prepTime, servings } = recipe;

  return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <RecipeDetails name={name} cuisine={cuisine} prepTime={prepTime} servings={servings} style={styles.details}/>
          <Accordion title="Ingredients" data={ingredients} alwaysDown={true}/>
          <Accordion title="Instructions" data={instructions} alwaysDown={true}/>
        </ScrollView>
      </SafeAreaView>
      
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E9D9',
  },
  scrollContainer: {
    backgroundColor: '#F5E9D9',
    flexDirection: 'flex-start',
    marginHorizontal: '1%',
    overflow: 'hidden',
  },
  image: {
    borderBottomWidth: 2,  
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    width: '100%',
    height: height * 0.35,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  details: {
    padding: 5,
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
