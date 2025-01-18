// screens/OnboardingScreen1.js
import React from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OnboardingScreen2 = ({ navigation }) => {
  const goToNextScreen = () => {
    navigation.navigate('Onboarding3'); // Navigate to the next onboarding screen
  };


  return (
    <View style={styles.container}>
      <Image source={require('../assets/Onboarding2.png')} style={styles.image} />
      <View style={styles.overlay}>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={goToNextScreen} style={styles.button}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>

        </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#000000', // Black button
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF', // White border
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'GloriaHallelujah_400Regular',
  },
});


export default OnboardingScreen2;
