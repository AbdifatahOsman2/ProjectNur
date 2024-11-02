// App.js
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts, UnicaOne_400Regular } from '@expo-google-fonts/unica-one';
import * as SplashScreen from 'expo-splash-screen';

import SurahScreen from './screens/SurahScreen';
import SettingsScreen from './screens/SettingsScreen';
import BackgroundChangeScreen from './screens/BackgroundChangeScreen';
import AboutScreen from './screens/AboutScreen'; // Import the new About screen

const Stack = createStackNavigator();

export default function App() {
  const [bgImage, setBgImage] = useState(require('./assets/bg.png'));

  const [fontsLoaded] = useFonts({
    UnicaOne_400Regular,
  });

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
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
          options={{ headerShown: false, title: 'Change Background' }}
          name="BackgroundChange"
        >
          {(props) => <BackgroundChangeScreen {...props} setBgImage={setBgImage} />}
        </Stack.Screen>
        <Stack.Screen
          options={{ headerShown: false, title: 'About' }}
          name="About"
          component={AboutScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
