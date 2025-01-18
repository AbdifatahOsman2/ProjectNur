// App.js
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts, UnicaOne_400Regular } from '@expo-google-fonts/unica-one';
import { GloriaHallelujah_400Regular } from '@expo-google-fonts/gloria-hallelujah';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import OnboardingScreen1 from './screens/OnboardingScreen1'; // Add your onboarding screens
import OnboardingScreen2 from './screens/OnboardingScreen2';
import OnboardingScreen3 from './screens/OnboardingScreen3';
import SurahScreen from './screens/SurahScreen';
import SettingsScreen from './screens/SettingsScreen';
import BackgroundChangeScreen from './screens/BackgroundChangeScreen';
import AboutScreen from './screens/AboutScreen';
import HowtoScreen from './screens/HowtoScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import UnderConstructionScreen from './screens/UnderConstructionScreen ';

const Stack = createStackNavigator();
const BACKGROUND_IMAGE_KEY = "backgroundImage"; // Key for storing background image

export default function App() {
  const [bgImage, setBgImage] = useState(require('./assets/bg.png')); // Default background
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  // Reset onboarding status for testing
useEffect(() => {
  const resetOnboarding = async () => {
    try {
      await AsyncStorage.removeItem('hasSeenOnboarding'); // Clears the flag
      console.log('Onboarding reset for testing.');
    } catch (error) {
      console.log('Error resetting onboarding:', error);
    }
  };

  resetOnboarding();
}, []);



  // Load fonts
  const [fontsLoaded] = useFonts({
    UnicaOne_400Regular,
    GloriaHallelujah_400Regular
  });

  // Check onboarding status
  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('hasSeenOnboarding');
      setHasSeenOnboarding(value === 'true');
      setIsLoading(false);
    } catch (error) {
      console.log('Error checking onboarding status:', error);
      setHasSeenOnboarding(false);
      setIsLoading(false);
    }
  };

  // Function to complete onboarding
  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      setHasSeenOnboarding(true);
    } catch (error) {
      console.log('Error setting onboarding status:', error);
    }
  };

  // Load background image and prevent splash screen auto-hide
  useEffect(() => {
    const loadResources = async () => {
      try {
        const savedBgImage = await AsyncStorage.getItem(BACKGROUND_IMAGE_KEY);
        if (savedBgImage) {
          setBgImage({ uri: savedBgImage });
        }
      } catch (error) {
        console.log("Error loading background image:", error);
      }
    };

    SplashScreen.preventAutoHideAsync();
    loadResources();
  }, []);

  // Hide splash screen once everything is loaded
  useEffect(() => {
    if (fontsLoaded && !isLoading) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isLoading]);

  const handleSetBgImage = async (newBgImage) => {
    setBgImage(newBgImage);
    try {
      await AsyncStorage.setItem(BACKGROUND_IMAGE_KEY, newBgImage.uri || "");
    } catch (error) {
      console.log("Error saving background image:", error);
    }
  };

  if (!fontsLoaded || isLoading) {
    return null;
  }


  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName={hasSeenOnboarding ? 'Surah' : 'Onboarding1'}>
      {/* Onboarding Screens */}
      <Stack.Screen 
      name="Onboarding1" 
      options={{ headerShown: false, animationTypeForReplace: 'push', animation: 'fade', presentation: 'transparentModal' }}
    >
      {(props) => <OnboardingScreen1 {...props} completeOnboarding={completeOnboarding} />}
    </Stack.Screen>
    <Stack.Screen 
      name="Onboarding2" 
      options={{ headerShown: false, animationTypeForReplace: 'push', animation: 'fade', presentation: 'transparentModal' }}
    >
      {(props) => <OnboardingScreen2 {...props} completeOnboarding={completeOnboarding} />}
    </Stack.Screen>
    <Stack.Screen 
      name="Onboarding3" 
      options={{ headerShown: false, animationTypeForReplace: 'push', animation: 'fade', presentation: 'transparentModal' }}
    >
      {(props) => <OnboardingScreen3 {...props} completeOnboarding={completeOnboarding} />}
    </Stack.Screen>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Surah"
        >
          {(props) => <SurahScreen {...props} bgImage={bgImage} />}
        </Stack.Screen>
        <Stack.Screen
          options={{ headerShown: false, title: 'Settings' }}
          name="Settings"
          component={SettingsScreen}
        />
        <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Register"
        component={RegisterScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="UnderConstruction"
        component={UnderConstructionScreen}
      />
        <Stack.Screen
          options={{ headerShown: false, title: 'Change Background' }}
          name="BackgroundChange"
        >
          {(props) => <BackgroundChangeScreen {...props} setBgImage={handleSetBgImage} />}
        </Stack.Screen>
        <Stack.Screen
          options={{ headerShown: false, title: 'About' }}
          name="About"
          component={AboutScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Image"
          component={HowtoScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
