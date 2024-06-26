import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const inputMargin = width * 0.0075; // Adjust margin as needed

const OtpScreen = ({ navigation, route }) => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const inputs = useRef([]);
  const { phoneNumber } = route.params;

  const handleChange = (value, index) => {
    // Check if all preceding boxes are filled
    for (let i = 0; i < index; i++) {
      if (otp[i] === '') {
        inputs.current[i].focus();
        return;
      }
    }

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
      const newOtp = [...otp];
      if (otp[index] !== '') {
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputs.current[index - 1].focus();
      }
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
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Text style={styles.goBack} onPress={() => navigation.goBack()}>Go back</Text>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Sign in</Text>
          <Text style={styles.subtitle}>We have sent SMS with code to {phoneNumber}</Text>
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
    top: '10%', // Adjust as needed
    left: '7%', // Adjust as needed
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '5%',
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
