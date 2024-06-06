import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera'; // Correct import for the camera
import { sendPhotoToAPI } from '../../helpers';

export default function CameraScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [isProcessing, setIsProcessing] = useState(false);
  const cameraRef = useRef(null);

  const takeAndUploadPhoto = async () => {
    try {
      setIsProcessing(true);
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
        base64: true
      });
      console.log('Took photo');
      const { base64 } = photo;

      // Navigate to RecipeScreen with loading state
      navigation.navigate('RecipeScreen', { isLoading: true, isFromCamera: true });

      const ing = await sendPhotoToAPI(base64);
      if (ing && ing.trim() !== ' ') {
        // Navigate to RecipeScreen with the fetched ingredients
        navigation.navigate('RecipeScreen', { ingredients: ing, isLoading: false, isFromCamera: true });
      } else {
        // Navigate to RecipeScreen with an error flag
        navigation.navigate('RecipeScreen', { isLoading: false, error: 'Failed to generate recipe', isFromCamera: true });
      }
    } catch (error) {
      console.error('Error taking or uploading photo:', error);
      navigation.navigate('RecipeScreen', { isLoading: false, error: 'Failed to generate recipe', isFromCamera: true });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current && !isProcessing) {
      takeAndUploadPhoto();
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        isActive={true}
        photo={true}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Take Photo</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
