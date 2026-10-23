import React, { useState, useCallback } from 'react';
import {
  View,
  ImageBackground,
  Image,
  StyleSheet,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Sound_clicks from '../../Components/Sound_clicks';
import { useGameProgress } from '../../GameProgress';
import { getCheckpoints, clearCheckpoints ,restartProgress  } from '../Others/saveProgress';
import { useAudio } from '../../Audiostore'; // Added for Quitapp
import { useJournal } from './JournalContext';

function MainMenuScreen({ navigation }) {
  const [selectedButton, setSelectedButton] = useState(null);
  const [hasSave, setHasSave] = useState(false); // Added state for saving
  const game = useGameProgress();
  const { Quitapp } = useAudio();
  const { resetUnlocks } = useJournal(); // Extracted Quitapp

  useFocusEffect(
    useCallback(() => {
      setSelectedButton(null);
      // FIXED: Fetch checkpoints to determine if "Continue" should show
      getCheckpoints().then((saves) => {
        setHasSave(saves.length > 0);
      });
    }, [])
  );

  // FIXED: Defined startFresh to wipe data and start at Part 1
 const startFresh = async () => {
  await restartProgress();   // clears saves + unlocked parts
  await resetUnlocks();      // clears remnants, timeline, profiles, glossary
  game.setChapter(1);
  game.setPart(1);
  game.setScene(0);
  navigation.navigate('Part1', { startScene: 0 });
};

  const menuButtons = [
    {
      id: 'newGame',
      white: require('../../Menu Images/New Game White.png'),
      gold: require('../../Menu Images/New Game Gold.png'),
      onPress: () => (hasSave ? navigation.navigate('NewGameConfirm') : startFresh()),
    },
    // Continue only pops if nakalaro na yung player like the title
    ...(hasSave
      ? [{
          id: 'continue',
          white: require('../../Menu Images/Continue White.png'),
          gold: require('../../Menu Images/Continue Gold.png'),
          onPress: () => navigation.navigate('PartSelect'),
        }]
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
            // FIXED: Now correctly calls the button's specific onPress function
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

        <Sound_clicks
          onPress={() => {
            setSelectedButton('exit');
            setTimeout(Quitapp, 150);
          }}
        >
          <Image
            source={require('../../Menu Images/Exit White.png')}
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

    // Note: keep the spacing even without spreading buttons too far apart.
    gap: 1,
  },

  menuButton: {
    // Note: increase the button size while preserving image proportions.
    width: 260,
    height: 58,
  },
});

export default MainMenuScreen;