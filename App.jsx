import { useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import SystemNavigationBar from 'react-native-system-navigation-bar';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AudioProvider } from './Audiostore';
import { GameProgressProvider } from './GameProgress';
import { GameplaySettingsProvider } from './Main/Others/GameplaySetting';
import { DisplaySettingsProvider } from './Main/Others/DisplaySetting';

import StartupScreen from './Main/Others/Startup';
import MainMenuScreen from './Main/Others/Menu';
import NewGameConfirmScreen from './Main/Others/NewGame';
import ChapterSelectScreen from './Main/Others/ChapterSelect';
import PartSelectScreen from './Main/Others/PartSelect';
import Setting_screen from './Main/Others/Settings';
import AudioScreen from './Main/Others/AudioScreen';
import Journalbook from './Main/Others/Journal';
import SaveScreen from './Main/Others/SaveScreen';
import AboutScreen from './Main/Others/AboutScreen';
import EducationalScreen from './Main/Others/EducationalScreen';
import GameplayScreen from './Main/Others/GameplayScreen';
import DisplayScreen from './Main/Others/DisplayScreen';
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
          <GameplaySettingsProvider>
            <DisplaySettingsProvider>
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

              <Stack.Screen
                name="Second"
                component={Setting_screen}
                options={{ presentation: 'transparentModal', animation: 'fade' }}
              />

              <Stack.Screen name="AudioScreen" component={AudioScreen} />

              <Stack.Screen
                name="Journal"
                component={Journalbook}
                options={{ presentation: 'transparentModal' }}
              />
              <Stack.Screen name="SaveScreen" component={SaveScreen} />
              <Stack.Screen name="About" component={AboutScreen} />
              <Stack.Screen name="Educational" component={EducationalScreen}/>
              <Stack.Screen name="GameplayScreen" component={GameplayScreen}/>
              <Stack.Screen name="DisplayScreen" component={DisplayScreen}/>
            </Stack.Navigator>
            </NavigationContainer>
            </DisplaySettingsProvider>
          </GameplaySettingsProvider>
        </GameProgressProvider>
      </AudioProvider>
    </View>
  );
}