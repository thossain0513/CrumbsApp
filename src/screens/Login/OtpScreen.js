import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const inputMargin = width * 0.0075; // 2% of the width

const OtpScreen = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < inputs.current.length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    const key = e.nativeEvent.key;

    if (key === 'Backspace') {
      if (index > 0) {
        inputs.current[index - 1].focus();
      }
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  const handleFocus = (index) => {
    // No additional actions on focus
  };

  const handleBlur = () => {
    // No additional actions on blur
  };

  const handleResend = () => {
    // Add logic to resend OTP
  };

  const handleSubmit = () => {
    const finalOtp = otp.join('');
    console.log('Final OTP:', finalOtp);
    // Add logic to submit OTP
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Text style={styles.goBack} onPress={() => navigation.goBack()}>Go back</Text>
        <Text style={styles.title}>Sign in</Text>
        <Text style={styles.subtitle}>We have sent SMS with code to +48 123 456 789</Text>
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={(value) => handleChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              onFocus={() => handleFocus(index)}
              onBlur={handleBlur}
              value={digit}
              ref={(ref) => (inputs.current[index] = ref)}
              style={styles.otpInput}
              caretHidden={true} // Hide the blinking cursor
            />
          ))}
        </View>
        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>You haven't received the code?</Text>
          <Text style={styles.resendButton} onPress={handleResend}>Resend!</Text>
        </View>
        <TouchableOpacity style={styles.signUpButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5e1d3',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Ensure relative positioning
  },
  goBack: {
    position: 'absolute', // Absolute positioning
    top: '7%', // Adjust as needed
    left: '7%', // Adjust as needed
    fontSize: 16,
    color: '#6c757d',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: '#ced4da',
    width: 50,
    height: 50,
    textAlign: 'center',
    fontSize: 24,
    borderRadius: 5,
    backgroundColor: 'white',
    color: 'black',
    marginHorizontal: inputMargin, // Adjust horizontal spacing here
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  resendText: {
    color: '#6c757d',
  },
  resendButton: {
    color: '#007bff',
    marginLeft: 5,
  },
  signUpButton: {
    backgroundColor: '#ff7f50',
    padding: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OtpScreen;
