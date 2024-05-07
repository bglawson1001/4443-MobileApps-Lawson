import React, { useState } from 'react';
import { StyleSheet, View, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [userPhoto, setUserPhoto] = useState('https://user-images.githubusercontent.com/123038198/214163502-8c05d530-2eb0-46cb-997a-1854e276a698.JPG');

  const handleUserPhotoSelect = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Gallery permission is required!');
      return;
    }

    const photoSelected = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      aspect: [4, 4],
      allowsEditing: true,
    });

    if (!photoSelected.canceled && photoSelected.assets && photoSelected.assets.length > 0) {
      setUserPhoto(photoSelected.assets[0].uri);
    }
  };

  const handleTakePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Camera permission is required!');
      return;
    }

    const photoTaken = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!photoTaken.canceled && photoTaken.assets && photoTaken.assets.length > 0) {
      setUserPhoto(photoTaken.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: userPhoto }} style={styles.image} />
      <View style={styles.buttonContainer}>
        <Button title="Select from Gallery" onPress={handleUserPhotoSelect} />
        <Button title="Take Photo" onPress={handleTakePhoto} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    resizeMode: 'cover',
  },
});
