import { View, Text, StyleSheet, Image, } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import { Link } from 'expo-router';

const index = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
    <Image source={require('../assets/images/candy_store_logo.jpeg')} style={styles.image} />
      <Link href={'/(tabs)'} asChild>
        <Button text="Store" />
      </Link>
      <Link href={'/login'} asChild>
         <Button text="Sign in" />
     </Link>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white' ,
      padding: 10,
      justifyContent: 'center', // Center vertically
      alignItems: 'center', // Center horizontally
      borderWidth: 1/2,
      borderColor: 'lightgrey',
    },
    image: {
      width: '100%', // Set the width to a specific value (e.g., 100)
      height: '50%', // Set the height to a specific value (e.g., 100)
      borderRadius: 10, // Add border radius for rounded corners
      justifyContent: 'center', // Center vertically
      alignItems: 'center', // Center horizontally

      resizeMode: 'cover', // Make sure the image covers the entire space
    },
    title: {
      fontSize: 10,
      fontWeight: 'bold',
      marginVertical: 10,
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
   
  });
  