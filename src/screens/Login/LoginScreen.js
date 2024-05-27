// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { signIn, signUp } from '../../auth_utils/auth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between sign-in and sign-up
  const [message, setMessage] = useState('');

  const handleAuth = async () => {
    if (isSignUp) {
      const { user, error } = await signUp(email, password);
      if (error) setMessage(error.message);
      else setMessage('Sign-up successful! Please sign in.');
    } else {
      const { user, error } = await signIn(email, password);
      if (error) setMessage(error.message);
      else setMessage('Sign-in successful!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignUp ? 'Sign Up' : 'Sign In'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title={isSignUp ? 'Sign Up' : 'Sign In'} onPress={handleAuth} />
      <Button
        title={isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
        onPress={() => setIsSignUp(!isSignUp)}
      />
      <Button
        title="Signup with a Phone Number"
        onPress={() => navigation.navigate('PhoneNumberScreen')}
      />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
  },
  message: {
    marginTop: 16,
    textAlign: 'center',
    color: 'red',
  },
});

export default LoginScreen;
