// screens/RegisterScreen.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const RegisterScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle}>First create your account</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Full name"
        placeholderTextColor="#C4C4C4"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#C4C4C4"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#C4C4C4"
          secureTextEntry
        />
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm your password"
          placeholderTextColor="#C4C4C4"
          secureTextEntry
        />

      </View>
      
      <TouchableOpacity style={styles.signUpButton}>
        <Text style={styles.signUpButtonText}>SIGN UP</Text>
      </TouchableOpacity>
      
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18293D', // Dark blue background
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#FFFFFF', // White text for contrast
  },
  subtitle: {
    fontSize: 14,
    color: '#C4C4C4',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#C4C4C4', // Light gray underline for inputs
    fontSize: 16,
    color: '#FFFFFF', // White text for inputs
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#C4C4C4',
    marginBottom: 20,
  },
  signUpButton: {
    backgroundColor: '#FFFFFF', // White button
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  signUpButtonText: {
    color: '#18293D', // Dark blue text on the white button
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#C4C4C4',
  },
  loginLink: {
    color: '#FF6600', // Orange text for "Login" link
    fontSize: 14,
  },
});

export default RegisterScreen;
