import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from 'react';
import { View, Button, Text, Image, TouchableHighlight, FlatList, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tw } from 'nativewind';
import generateImage from '../../helpers';
import { chickenParmesan, grilledCheese, chickenFajitas, roastedVegetables, chocolateCake, chickenTikkaMasala } from '../../recipe/examples'
import styles from './styles';
import AutoAnimatedImage from './AutoAnimatedImage';

const placeholderImage = 'https://furntech.org.za/wp-content/uploads/2017/05/placeholder-image-300x225.png';
const { width, height } = Dimensions.get('window');



const RecipeImage = ({ imageUrl }) => (
  <View style={styles.imageContainer}>
    <Image
      source={{ uri: imageUrl }}
      style={styles.image}
    />
  </View>
);

const RecipeText = ({ name }) => (
  <View style={styles.textContainer}>
    <Text style={styles.text}>{name}</Text>
  </View>
);

const FooterNav = ({ navigation, style }) => {
  return (
    <View style={styles.footer}>
        <Button title="Home" onPress={() => navigation.navigate('Home')} />
        <Button title="Generate" onPress={() => navigation.navigate('Generate')} />
        <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
        {/* Add more buttons as needed, pointing to different parts of the app */}
    </View>
  );
};

const RecipeCard = ({ item, style }) => {
  imageUrl = item.image || placeholderImage;
  console.log(imageUrl)

  return (
    <TouchableHighlight onPress={() => navigate('RecipeScreen')} style={[styles.cardContainer, style]}>
      <View style={styles.imageTextContainer}>
        <AutoAnimatedImage imageUrl={imageUrl} />
        <RecipeText name={item.name} />
      </View>
    </TouchableHighlight>
  );
};


export default function HomeScreen({ navigation }) {

  const [loading, setLoading] = useState(true);
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
      console.log('Use effect running again'); //logging
      const fetchImages = async () => {
      const updatedRecipesTemp = [];
      for (const recipe of recipes) {
      try {
        //const imgSrc = await generateImage(recipe.name);
        console.log('image arrived'); //checking if images arrived
        const updatedRecipe = { ...recipe, image: placeholderImage };
        updatedRecipesTemp.push(updatedRecipe);
      } catch (error) {
        console.error('Error fetching images:', error.message); //logging
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
          <SafeAreaView style={styles.container}>
            <RecipeCard item={updatedRecipes[0]} style={{width: '85%', height: '55%', marginBottom: '5%'}} />
              <FlatList
                data={updatedRecipes}
                renderItem={({ item }) => (
                  console.log("rendering"),
                  <RecipeCard item={item}/>
                )}
                keyExtractor={(item) => item.name.toString()}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                contentContainerStyle={styles.flatListContent}
              />
              <FooterNav navigation={navigation}  />
          </SafeAreaView>
        )
      );
  }


