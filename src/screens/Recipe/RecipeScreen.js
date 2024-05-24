import React, { useState, useEffect } from 'react';
import { ScrollView, View, Image, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import Accordion from '../../components/Accordion';
import RecipeDetails from '../../components/RecipeDetails';

const {width, height} = Dimensions.get('window');


const RecipeScreen = ({ route }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const { recipe } = route.params;
  const { name, ingredients, instructions, cuisine, prepTime, servings, description } = recipe;

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.post('http://10.0.0.5:8000/generate_image', {
          recipeName: name,
          recipeDescription: description,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Response:', response.data);
        if (response.data && response.data.length > 0) {
          setImage(response.data[0]);
        } else {
          console.error('Invalid response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchImage();
  }, [name, description]);
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
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
        <Accordion title="Ingredients" data={ingredients} alwaysDown={true} />
        <Accordion title="Instructions" data={instructions} alwaysDown={true} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E9D9',
    marginTop: 0,
    paddingTop: '0%'
  },
  scrollContainer: {
    backgroundColor: '#F5E9D9',
    flexDirection: 'flex-start',
    marginHorizontal: '0%',
    overflow: 'hidden',
    marginBottom: '5%'
  },
  image: {
    borderBottomWidth: 2,  
    borderWidth: 2,
    borderColor: 'black',
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default RecipeScreen;
