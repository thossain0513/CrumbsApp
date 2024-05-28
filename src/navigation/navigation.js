import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home/HomeScreen";
import RecipeScreen from "../screens/Recipe/RecipeScreen";
import LoginScreen from '../screens/Login/LoginScreen';

const Stack = createNativeStackNavigator();

// Bottom to top animation
const bottomToTopAnimation = ({ current, layouts }) => ({
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
            outputRange: [0, 0.5, 0.5],
        }),
    },
});

// Horizontal animation
const horizontalAnimation = ({ current, layouts }) => ({
    cardStyle: {
        transform: [
            {
                translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                }),
            },
        ],
    },
    overlayStyle: {
        opacity: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.5],
        }),
    },
});

// Login Stack Navigator for LoginScreen, PhoneNumberScreen, and OtpScreen
function LoginStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="LoginScreen" 
                component={LoginScreen} 
                options={{
                    headerShown: false,
                    gestureEnabled: true,
                    cardOverlayEnabled: true,
                    cardStyleInterpolator: horizontalAnimation,
                }} 
            />
        </Stack.Navigator>
    );
}

// Main Stack Navigator
function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="HomeScreen" 
                component={HomeScreen} 
                options={{
                    headerShown: false,
                    gestureEnabled: true,
                    cardOverlayEnabled: true,
                    cardStyleInterpolator: bottomToTopAnimation,
                }} 
            />
            <Stack.Screen 
                name="RecipeScreen" 
                component={RecipeScreen} 
                options={{
                    headerShown: false,
                    presentation: 'modal',
                    gestureEnabled: true,
                    cardOverlayEnabled: true,
                    cardStyleInterpolator: bottomToTopAnimation,
                }} 
            />
            <Stack.Screen 
                name="LoginStack" 
                component={LoginStackNavigator} 
                options={{
                    headerShown: false,
                    gestureEnabled: true,
                    cardOverlayEnabled: true,
                    presentation: 'modal', // Ensures the LoginStack is presented as a modal
                }} 
            />
        </Stack.Navigator>
    );
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}
