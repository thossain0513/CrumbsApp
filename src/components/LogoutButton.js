// LogoutButton.js
import React from 'react';
import { Button, Alert } from 'react-native';
import supabase from '../auth_utils/supabaseClient';
import { useNavigation } from '@react-navigation/native';

const LogoutButton = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      navigation.navigate('Auth'); // Adjust the route name as per your navigation setup
    }
  };

  return (
    <Button title="Logout" onPress={handleLogout} />
  );
};

export default LogoutButton;
