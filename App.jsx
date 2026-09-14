import { useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import SystemNavigationBar from 'react-native-system-navigation-bar';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AudioProvider } from './Audiostore';
import { GameProgressProvider } from './GameProgress';

import StartupScreen from './Screens/Startup';
import NewGameConfirmScreen from './Screens/newgame';
import ChapterSelectScreen from './Screens/chapterselectionScreen';
import PartSelectScreen from './Screens/chapter1selection';

import MainMenuScreen from './Screens/mainmenuscreen.jsx';

import Part1 from './Screens/chapter1gameplay/Part1';
import Part2 from './Screens/chapter1gameplay/Part2';
import Part3 from './Screens/chapter1gameplay/Part3';
import Part4 from './Screens/chapter1gameplay/Part4';
import Part5 from './Screens/chapter1gameplay/Part5';
import Part6 from './Screens/chapter1gameplay/Part6';
import Part7 from './Screens/chapter1gameplay/Part7';
import Part8 from './Screens/chapter1gameplay/Part8';

import Setting_screen from './Screens/Setting_screen';
import AudioScreen from './Screens/AudioScreen';
import Journalbook from './Screens/Journalbook';

const Stack = createNativeStackNavigator();

export default function App() {
  // = = = = = = = = = = HUD Changes = = = = = = = = = =
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

              <Stack.Screen name="Part1" component={Part1} />
              <Stack.Screen name="Part2" component={Part2} />
              <Stack.Screen name="Part3" component={Part3} />
              <Stack.Screen name="Part4" component={Part4} />
              <Stack.Screen name="Part5" component={Part5} />
              <Stack.Screen name="Part6" component={Part6} />
              <Stack.Screen name="Part7" component={Part7} />
              <Stack.Screen name="Part8" component={Part8} />

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