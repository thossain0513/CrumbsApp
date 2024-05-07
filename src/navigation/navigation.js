import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, StyleSheet } from "react-native";
import React from 'react';
import HomeScreen from "../screens/Home/HomeScreen";
import RecipeScreen from "../screens/Recipe/RecipeScreen";

const Stack = createNativeStackNavigator();


export default function Navigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions = {styles.screenOptions}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="RecipeScreen" component={RecipeScreen} />
        </Stack.Navigator>
        </NavigationContainer>
  )
}

const styles = StyleSheet.create({
    screenOptions: {
        headerShown: false,
    }
})