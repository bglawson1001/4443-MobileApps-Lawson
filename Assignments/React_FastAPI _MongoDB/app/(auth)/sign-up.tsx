import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import axios from 'axios'; // Import Axios for making HTTP requests
import Button from '../../components/Button';
import Colors from '../../constants/Colors';
import { Link } from 'expo-router';

const SignUpScreen = () => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUpSuccessful, setIsSignUpSuccessful] = useState(false);

  const handleSignUp = async () => {
    try {
      // Make a POST request to register the user
      const response = await axios.post('http://143.198.158.17:8084/register', {
        first_name,
        last_name,
        username,
        email,
        password,
      });

      // Handle successful registration
      Alert.alert('Success', 'Account created successfully');
      setIsSignUpSuccessful(true);
    } catch (error) {
      // Handle registration error
      Alert.alert('Error', 'Failed to create account. Please try again.');
      console.error('Registration error:', error);
    }
  };

  if (isSignUpSuccessful) {
    // Account created successfully, display success message and button
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Account created successfully!</Text>
        {/* Render any additional content or UI elements */}
        <Link href="/(tabs)" asChild style={styles.textButton}>
          <Button text="Candies" />
        </Link>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Registration</Text>
      <TextInput
        placeholder="First Name"
        value={first_name}
        onChangeText={setFirstName}
        style={styles.input}
      />
      <TextInput
        placeholder="Last Name"
        value={last_name}
        onChangeText={setLastName}
        style={styles.input}
      />
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        style={styles.input}
        secureTextEntry
      />
      <Button text="Create Account" onPress={handleSignUp} />
      {/* You can add a "Sign In" button without using navigation */}
      <Text style={styles.textButton} onPress={() => setIsSignUpSuccessful(true)}>
        Sign in
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
  },
  label: {
    color: 'gray',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10,
  },
});

export default SignUpScreen;