import React, { useState, useEffect} from 'react';
import { View, Button, Text, Image, TouchableHighlight, FlatList, ActivityIndicator, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { chickenParmesan, grilledCheese, chickenFajitas, roastedVegetables, chocolateCake, chickenTikkaMasala } from '../../recipe/examples'
import FooterNav from '../../components/FooterNav';
import DividerLine from '../../components/DividerLine';
import RecipeCard from '../../components/RecipeCard';
import CardRecipe from '../../components/CardRecipe';


const placeholderImage = 'https://furntech.org.za/wp-content/uploads/2017/05/placeholder-image-300x225.png';
const { width, height } = Dimensions.get('window');
const windowWidth = width*0.85;
const windowHeight = height;
const initialHeight = height * 0.6; // Initial height for the RecipeCard




export default function HomeScreen({ navigation }) {

  const [loading, setLoading] = useState(true);
  const [updatedRecipes, setUpdatedRecipes] = useState([]);
  const [hasRun, setHasRun] = useState(false);
  console.log(grilledCheese);
  const recipes = [chickenParmesan, 
    grilledCheese, 
    chickenFajitas, 
    roastedVegetables, 
    chocolateCake,
    chickenTikkaMasala].slice(0, 4);


     useEffect(() => {
      if (!hasRun) {
      const fetchImages = async () => {
      const updatedRecipesTemp = [];
      for (const recipe of recipes) {
      try {
        //const imgSrc = await generateImage(recipe.name);
        const updatedRecipe = { ...recipe, image: placeholderImage };
        updatedRecipesTemp.push(updatedRecipe);
      } catch (error) {
        const updatedRecipe = { ...recipe, image: placeholderImage }; 
        updatedRecipesTemp.push(updatedRecipe)
      }
      }
      
      setUpdatedRecipes(updatedRecipesTemp); 
      setLoading(false);
      setHasRun(true);

      };
      fetchImages();
      }
      }, [hasRun]);
      console.log(updatedRecipes);
      return (
        loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <SafeAreaView style={styles.container}>
            {/* <View style={{ width: '100%', height: '80%', marginBottom: 10 }}>
                <RecipeCard recipe={updatedRecipes[1]} style={{ width: windowWidth, height: '100%' }} animated={false} navigation={navigation} />
            </View> */}
            <CardRecipe recipe={updatedRecipes[0]} navigation={navigation}/>
            <DividerLine style={{ width: windowWidth, alignSelf: 'center'}} color={'#505050'}/>
              {/* <FlatList
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
              /> */}
         
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

