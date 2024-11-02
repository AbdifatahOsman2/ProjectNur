// screens/LoginScreen.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { Link } from '@react-navigation/native';

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.subtitle}>Enter your email and password</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#C4C4C4"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#C4C4C4"
        secureTextEntry
      />
      <View style={styles.passwordContainer}>
      </View>
      
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>
      
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <TouchableOpacity>
          <Link to="/Register" style={styles.signupLink}>Sign up</Link>
        </TouchableOpacity>
      </View>

      <View style={styles.socialContainer}>
        <View style={styles.separatorLine} />
        <Text style={styles.socialText}>Sign In with</Text>
        <View style={styles.separatorLine} />
      </View>
      
      <View style={styles.socialIconsContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <AntDesign name="facebook-square" size={40} color="#3b5998" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <AntDesign name="linkedin-square" size={40} color="#0e76a8" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <AntDesign name="google" size={40} color="#db4a39" />
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
    marginBottom: 20,
    fontSize: 16,
    color: '#FFFFFF', // White text for inputs
  },
  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgotPasswordButton: {
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#FF6600', // Orange text for "Forgot password"
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#FFFFFF', // White button
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#18293D', // Dark blue text on the white button
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  signupText: {
    fontSize: 14,
    color: '#C4C4C4',
  },
  signupLink: {
    color: '#FF6600', // Orange text for "Sign up" link
    fontSize: 14,
  },
  socialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  separatorLine: {
    width: '30%',
    height: 1,
    backgroundColor: '#C4C4C4', // Light gray separator line
  },
  socialText: {
    marginHorizontal: 10,
    color: '#C4C4C4', // Light gray text
    fontSize: 14,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialButton: {
    marginHorizontal: 10,
  },
});

export default LoginScreen;
