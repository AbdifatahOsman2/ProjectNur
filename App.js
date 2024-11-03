// App.js
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts, UnicaOne_400Regular } from '@expo-google-fonts/unica-one';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const [fontsLoaded] = useFonts({
    UnicaOne_400Regular,
  });

  // Load background image and fonts
  useEffect(() => {
    const loadResources = async () => {
      try {
        // Load the saved background image from AsyncStorage
        const savedBgImage = await AsyncStorage.getItem(BACKGROUND_IMAGE_KEY);
        if (savedBgImage) {
          setBgImage({ uri: savedBgImage }); // Set saved image if available
        }
      } catch (error) {
        console.log("Error loading background image:", error);
      }
    };

    SplashScreen.preventAutoHideAsync();
    loadResources();
  }, []);

  // Hide the splash screen once fonts and background image are loaded
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Save the selected background image to AsyncStorage
  const handleSetBgImage = async (newBgImage) => {
    setBgImage(newBgImage);
    try {
      // Save the image URI (local path) as a string in AsyncStorage
      await AsyncStorage.setItem(BACKGROUND_IMAGE_KEY, newBgImage.uri || "");
    } catch (error) {
      console.log("Error saving background image:", error);
    }
  };

  if (!fontsLoaded) {
    return null; // Return null while waiting for fonts to load
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
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
