import React, { useState, useCallback } from 'react';
import {
  View,
  ImageBackground,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Sound_clicks from '../../Components/Sound_clicks';
import { useGameProgress } from '../../GameProgress';
import { getCheckpoints, clearCheckpoints, restartProgress } from '../Others/saveProgress';
import { useAudio } from '../../Audiostore'; 
import { useJournal } from './JournalContext';

function MainMenuScreen({ navigation }) {
  const [selectedButton, setSelectedButton] = useState(null);
  const [hasSave, setHasSave] = useState(false);
  const game = useGameProgress();
  const { Quitapp } = useAudio();
  const { resetUnlocks } = useJournal();

  useFocusEffect(
    useCallback(() => {
      setSelectedButton(null);
      getCheckpoints().then((saves) => {
        setHasSave(saves.length > 0);
      });
    }, [])
  );


  const startFresh = async () => {
    await restartProgress(); // clears saves + unlocked parts
    await resetUnlocks(); // clears remnants, timeline, profiles, glossary
    game.setChapter(1);
    game.setPart(1);
    game.setScene(0);
    navigation.navigate('Part1', { startScene: 0 });
  };

  // Exit confirmation: only calls Quitapp if the player confirms
  const confirmExit = () => {
    setSelectedButton('exit');

    Alert.alert(
      'Exit Game',
      'Are you sure you want to quit?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => setSelectedButton(null),
        },
        {
          text: 'Exit',
          style: 'destructive',
          onPress: () => setTimeout(Quitapp, 150),
        },
      ],
      {
        cancelable: true,
        onDismiss: () => setSelectedButton(null), // Android: tapping outside the box
      }
    );
  };

  const menuButtons = [
    {
      id: 'newGame',
      white: require('../../Menu Images/New Game White.png'),
      gold: require('../../Menu Images/New Game Gold.png'),
      onPress: () => (hasSave ? navigation.navigate('NewGameConfirm') : startFresh()),
    },
    ...(hasSave
      ? [
          {
            id: 'continue',
            white: require('../../Menu Images/Continue White.png'),
            gold: require('../../Menu Images/Continue Gold.png'),
            onPress: () => navigation.navigate('PartSelect'),
          },
        ]
      : []),
    {
      id: 'settings',
      white: require('../../Menu Images/Settings White.png'),
      gold: require('../../Menu Images/Settings Gold.png'),
      onPress: () => navigation.navigate('Second'),
    },
  ];

  return (
    <ImageBackground
      source={require('../../Menu Images/Main Menu.png')}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.menuContainer}>
        {menuButtons.map((button) => (
          <Sound_clicks
            key={button.id}
            onPress={() => {
              setSelectedButton(button.id);
              button.onPress();
            }}
          >
            <Image
              source={selectedButton === button.id ? button.gold : button.white}
              style={styles.menuButton}
              resizeMode="contain"
            />
          </Sound_clicks>
        ))}

        {/* Exit button now asks for confirmation first */}
        <Sound_clicks onPress={confirmExit}>
          <Image
            source={
              selectedButton === 'exit'
                ? require('../../Menu Images/Exit Gold.png')
                : require('../../Menu Images/Exit White.png')
            }
            style={styles.menuButton}
            resizeMode="contain"
          />
        </Sound_clicks>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  menuContainer: {
    position: 'absolute',
    left: '3%', // actual left
    top: '37%', // pababa
    alignItems: 'flex-start',
    gap: 1,
  },

  menuButton: {
    width: 260,
    height: 58,
  },
});

export default MainMenuScreen;