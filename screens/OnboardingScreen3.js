// screens/OnboardingScreen3.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OnboardingScreen3 = ({ navigation, completeOnboarding  }) => {
  const finishOnboarding = async () => {
    // Save the flag to AsyncStorage
    await completeOnboarding();
    // Navigate to the Surah screen
    navigation.navigate('Surah');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/Onboarding3.png')} style={styles.image} />
      <View style={styles.overlay}>
        <TouchableOpacity onPress={finishOnboarding} style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover', // Ensure the image covers the whole screen
  },
  overlay: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    backgroundColor: '#000000', // Black button
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF', // White border
    alignSelf: 'center', // Centered button
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'GloriaHallelujah_400Regular',
  },
});


export default OnboardingScreen3;
