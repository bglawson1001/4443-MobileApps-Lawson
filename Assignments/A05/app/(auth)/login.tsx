import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';
import { Link, Stack } from 'expo-router';

const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  const handleSignIn = async () => {
    try {
      // Simulating a successful login for demonstration purposes
      setIsLoginSuccess(true);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while signing in. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Login' }} />

      <Text style={styles.label}>Username</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="jon"
        style={styles.input}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder=""
        style={styles.input}
        secureTextEntry
      />

      <Button text="Sign in" onPress={handleSignIn} />

      {isLoginSuccess && (
        <View>
          <Text style={styles.successMessage}>Login successful!</Text>
          <Link href="/(tabs)" asChild style={styles.textButton}>
            <Button text="Candies" />
          </Link>
        </View>
      )}

      <Link href="/sign-up" style={styles.textButton}>
        Create an account
      </Link>
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
  successMessage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 10,
  },
  linkButton: {
    marginTop: 10,
    alignSelf: 'center',
  },
});

export default SignInScreen;