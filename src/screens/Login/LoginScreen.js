// LoginScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { AuthContext } from '../../auth_utils/AuthContext'; // Import AuthContext

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { signIn } = useContext(AuthContext); // Use AuthContext

  const handleSignIn = async () => {
    const { user, error } = await signIn(email, password);
    if (error) {
      setMessage(error.message);
      console.log(error.message);
    } else {
      setMessage('Sign-in successful!');
      console.log('Sign-in successful!');
      // Navigate to the home screen after a successful login
      navigation.navigate('HomeScreen');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign In</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="rgba(0,0,0,0.5)"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="rgba(0,0,0,0.5)"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Sign In" onPress={handleSignIn} />
        <Button
          title="Switch to Sign Up"
          onPress={() => navigation.navigate('SignupScreen')}
        />
        <Button
          title="Signup with a Phone Number"
          onPress={() => navigation.navigate('PhoneNumberScreen')}
        />
        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>
    </TouchableWithoutFeedback>
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
