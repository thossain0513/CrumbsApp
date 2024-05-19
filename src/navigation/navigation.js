import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home/HomeScreen";
import RecipeScreen from "../screens/Recipe/RecipeScreen";

const Stack = createNativeStackNavigator();

// Define the stack navigator in a separate function
function MyStack() {
    return (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            presentation: 'modal',
            gestureEnabled: true,
            cardOverlayEnabled: true,
            cardStyleInterpolator: ({ current, layouts }) => ({
              cardStyle: {
                transform: [
                  {
                    translateY: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.height, 0],
                    }),
                  },
                ],
              },
              overlayStyle: {
                opacity: current.progress.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, 0.5, 0.5],  // Fades in to 50% opacity, stays until fully opened
                }),
              },
            }),
          }}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="RecipeScreen" component={RecipeScreen} />
        </Stack.Navigator>
    );
}

// Main navigation component
export default function Navigation() {
  return (
    <NavigationContainer>
        <MyStack />
    </NavigationContainer>
  );
}

// Since StyleSheet is not used for navigation options, you can use it for other styling purposes in this file.
