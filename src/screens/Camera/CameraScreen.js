import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera'; // Correct import for the camera
import { sendPhotoToAPI } from '../../helpers';
import FooterNav from '../../components/FooterNav';

export default function CameraScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [isProcessing, setIsProcessing] = useState(false);
  const cameraRef = useRef(null);

  const takeAndUploadPhoto = async () => {
    try {
      setIsProcessing(true);
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
        base64: true,
      });
      console.log('Took photo');
      const { base64 } = photo;

      // Navigate to RecipeScreen with loading state
      navigation.navigate('RecipeScreen', { isLoading: true, isFromCamera: true });

      const recipes = await sendPhotoToAPI(base64);
      if (recipes && recipes.length > 0) {
        // Update RecipeScreen with the fetched recipes
        navigation.navigate('RecipeScreen', { recipes, isLoading: false });
      } else {
        // Update RecipeScreen with an error flag
        navigation.navigate('RecipeScreen', { error: 'Failed to generate recipes', isLoading: false });
      }
    } catch (error) {
      console.error('Error taking or uploading photo:', error);
      navigation.navigate('RecipeScreen', { error: 'Failed to generate recipes', isLoading: false });
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
      <CameraView ref={cameraRef} style={styles.camera} isActive={true} photo={true}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Take Photo</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
      <FooterNav navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
    flexDirection: 'column',
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
    marginBottom: '20%',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
