import supabase from './auth_utils/supabaseClient'
import { decode } from 'base64-arraybuffer';


const uploadPhoto = async (photo) => {
  const { base64, uri } = photo;
  const fileName = `${Date.now()}.jpg`;
  const { data, error } = await supabase.storage
    .from('photos')
    .upload(fileName, decode(base64), {
      contentType: 'image/jpeg',
      upsert: true,
    });

  if (error) {
    console.error('Error uploading image:', error);
    return null;
  }

  // Get the public URL for the uploaded image
  const { publicURL } = supabase.storage.from('photos').getPublicUrl(fileName);
  return publicURL;
};

export const takeAndUploadPhoto = async (cameraRef) => {
  const photo = await cameraRef.current.takePictureAsync({
    quality: 1,
    base64: true
  });

  const publicURL = await uploadPhoto(photo);
  if (publicURL) {
    console.log('Photo uploaded successfully. Public URL:', publicURL);
  }
};
