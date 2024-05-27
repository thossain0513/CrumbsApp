import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const inputMargin = width * 0.0075; // Adjust margin as needed

const PhoneNumberScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePhoneNumberChange = (text) => {
    setPhoneNumber(text);
  };

  const handleContinue = () => {
    // Add logic to send OTP here
    console.log('Phone number entered:', phoneNumber);
    navigation.navigate('OtpScreen', { phoneNumber });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Text style={styles.goBack} onPress={() => navigation.goBack()}>Go back</Text>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Sign in</Text>
          <Text style={styles.subtitle}>Enter your phone number to receive an OTP</Text>
          <TextInput
            keyboardType="phone-pad"
            maxLength={15}
            onChangeText={handlePhoneNumberChange}
            value={phoneNumber}
            style={styles.phoneNumberInput}
            placeholder="Phone Number"
            placeholderTextColor="#6c757d"
          />
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5E9D9',
    alignItems: 'center',
    position: 'relative', // Ensure relative positioning
  },
  goBack: {
    position: 'absolute', // Absolute positioning
    top: '5%', // Adjust as needed
    left: '9%', // Adjust as needed
    fontSize: 16,
    color: '#6c757d',
    zIndex: 1, // Ensure it is above other elements
  },
  contentContainer: {
    marginTop: 60, // Adjust as needed to position below the goBack button
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: '5%',
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginVertical: '5%',
  },
  phoneNumberInput: {
    borderWidth: 1,
    borderColor: '#ced4da',
    width: '80%',
    height: 50,
    textAlign: 'center',
    fontSize: 18,
    borderRadius: 5,
    backgroundColor: 'white',
    color: 'black',
    marginVertical: inputMargin, // Adjust vertical spacing here
    paddingHorizontal: 10,
  },
  continueButton: {
    backgroundColor: '#ff7f50',
    padding: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PhoneNumberScreen;
