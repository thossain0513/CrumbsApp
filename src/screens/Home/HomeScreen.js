import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from 'react';
import { View, Button, Text, Image, TouchableHighlight, FlatList, ActivityIndicator, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tw } from 'nativewind';
import generateImage from '../../helpers';
import { chickenParmesan, grilledCheese, chickenFajitas, roastedVegetables, chocolateCake, chickenTikkaMasala } from '../../recipe/examples'
import AutoAnimatedImage from '../../components/AutoAnimatedImage';
import FooterNav from '../../components/FooterNav';
import DividerLine from '../../components/DividerLine';
import RecipeCard from '../../components/RecipeCard';
import DraggableDivider from '../../components/DraggableDivider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const placeholderImage = 'https://furntech.org.za/wp-content/uploads/2017/05/placeholder-image-300x225.png';
const { width, height } = Dimensions.get('window');
const windowWidth = width*0.85;
const windowHeight = height;
const initialHeight = height * 0.6; // Initial height for the RecipeCard




export default function HomeScreen({ navigation }) {

  const [loading, setLoading] = useState(true);
  const [updatedRecipes, setUpdatedRecipes] = useState([]);
  const [hasRun, setHasRun] = useState(false);
  const [topHeight, setTopHeight] = useState('60%'); // Initial percentage height for the RecipeCard
  const screenHeight = Dimensions.get('window').height; // Get the total screen height

  const handleDrag = (deltaY) => {
    setTopHeight((prevHeightPercentage) => {
        const prevHeight = parseFloat(prevHeightPercentage.replace('%', ''));
        const deltaHeight = (deltaY / Dimensions.get('window').height) * 100;
        let newHeight = prevHeight + deltaHeight;

        // Clamping the new height within bounds
        newHeight = Math.max(10, Math.min(newHeight, 90));
        return `${newHeight}%`;
    });
  };
  


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
            <View style={{ width: '100%', height: topHeight, marginBottom: 10 }}>
                <RecipeCard item={updatedRecipes[0]} style={{ width: windowWidth, height: '100%' }} animated={true} navigation={navigation} />
            </View>
            <DividerLine style={{ width: windowWidth, alignSelf: 'center'}} color={'#505050'}/>
              <FlatList
                data={updatedRecipes}
                renderItem={({ item }) => (
                  console.log("rendering non-animated"),
                  <RecipeCard item={item} 
                  style={{width: width * 0.4 , height: height * 0.2, marginBottom: '5%', marginHorizontal: '3%'}} navigation={navigation}/>
                )}
                keyExtractor={(item) => item.name.toString()}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                contentContainerStyle={styles.flatListContent}
                numColumns={2}
              />
         
              <FooterNav navigation={navigation} />
          </SafeAreaView>
        )
      );
    }

const styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingTop: 0.1 * height,
      alignItems: 'center',
      backgroundColor: '#F5E9D9',
      justifyContent: 'flex-start',
      position: 'relative'
  },
  separator: {
      height: 20, // You can adjust the height for spacing between items
      width: '100%'
  },
  flatListContent: {
      flexGrow: 1,
      paddingBottom: 20, // Add padding at the top and bottom for better spacing
      alignItems: 'center', // Ensures all items are centrally aligned
      width: '100%',
  },
  scrollFooterContainer: {
      alignItems: 'center', // Center items vertically within the scroll view
      flexDirection: "row",
  },
});

