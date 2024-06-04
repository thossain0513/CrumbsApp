import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { sendPhotoToAPI } from '../../helpers';
import supabase from '../../auth_utils/supabaseClient';


export default function CameraScreen(navigation) {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  const uploadPhoto = async (photo) => {
    const { base64, uri } = photo;
    console.log(`uri: ${uri}`);
    const fileName = `${Date.now()}.jpg`;
    console.log(`fileName: ${fileName}`);
    // Convert base64 to Blob
  const blob = await fetch(`data:image/jpeg;base64,${base64}`).then(res => res.blob());
  const { data, error } = await supabase.storage
    .from('ingredient_images')
    .upload(fileName, blob, {
      contentType: 'image/jpeg',
      upsert: true
    });
    console.log(`Here is the data: `);
  
    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  
    // Get the public URL for the uploaded image
    const { publicURL } = supabase.storage.from('ingredient_images').getPublicUrl(fileName);
    return publicURL;
  };
  
  const takeAndUploadPhoto = async () => {
    const photo = await cameraRef.current.takePictureAsync({
      quality: 1,
      base64: true
    });
    console.log('took photo');
    const { base64, uri } = photo;
    sendPhotoToAPI(navigation, base64);
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

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const takePicture = async () => {
    if (cameraRef.current) {
    takeAndUploadPhoto();

    console.log(`photo ingredients: ${ing}`);
      
    
      if (error) {
        console.error('Error uploading image:', error);
        return null;
      }
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        device={facing === 'back' ? 'back' : 'front'}
        isActive={true}
        photo={true}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
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
