import { useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import SystemNavigationBar from 'react-native-system-navigation-bar';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AudioProvider } from './AudioStore';
import { GameProgressProvider } from './GameProgress';

import StartupScreen from './Main/Others/Startup';
import MainMenuScreen from './Main/Others/Menu';
import NewGameConfirmScreen from './Main/Others/NewGame';
import ChapterSelectScreen from './Main/Others/ChapterSelect';
import PartSelectScreen from './Main/Others/PartSelect';
import Setting_screen from './Main/Others/Settings';
import AudioScreen from './Main/Others/AudioScreen';
import Journalbook from './Main/Others/Journal';

// Chapter 1 story screens
import {
  Chap1Part1Screen,
  Chap1Part2Screen,
  Chap1Part3Screen,
  Chap1Part4Screen,
  Chap1Part5Screen,
  Chap1Part6Screen,
  Chap1Part7Screen,
  Chap1Part8Screen,
} from './Main/GameScreen/Compilation';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    Orientation.lockToLandscape();
    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);

  useEffect(() => {
    SystemNavigationBar.navigationHide();
    SystemNavigationBar.setNavigationBarDividerColor('transparent');
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden={true} />
      <AudioProvider>
        <GameProgressProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Startup" screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Startup" component={StartupScreen} />
              <Stack.Screen name="Home" component={MainMenuScreen} />
              <Stack.Screen name="NewGameConfirm" component={NewGameConfirmScreen} />
              <Stack.Screen name="ChapterSelect" component={ChapterSelectScreen} />
              <Stack.Screen name="PartSelect" component={PartSelectScreen} />

              <Stack.Screen name="Part1" component={Chap1Part1Screen} />
              <Stack.Screen name="Part2" component={Chap1Part2Screen} />
              <Stack.Screen name="Part3" component={Chap1Part3Screen} />
              <Stack.Screen name="Part4" component={Chap1Part4Screen} />
              <Stack.Screen name="Part5" component={Chap1Part5Screen} />
              <Stack.Screen name="Part6" component={Chap1Part6Screen} />
              <Stack.Screen name="Part7" component={Chap1Part7Screen} />
              <Stack.Screen name="Part8" component={Chap1Part8Screen} />

              <Stack.Screen name="Second" component={Setting_screen} />
              <Stack.Screen name="AudioScreen" component={AudioScreen} />
              <Stack.Screen name="Journal" component={Journalbook} />
            </Stack.Navigator>
          </NavigationContainer>
        </GameProgressProvider>
      </AudioProvider>
    </View>
  );
}