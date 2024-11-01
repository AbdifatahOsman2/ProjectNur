// App.js
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SurahScreen from './screens/SurahScreen';
import SettingsScreen from './screens/SettingsScreen';
import BackgroundChangeScreen from './screens/BackgroundChangeScreen';

const Stack = createStackNavigator();

export default function App() {
  const [bgImage, setBgImage] = React.useState(require('./assets/bg.png'));

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
