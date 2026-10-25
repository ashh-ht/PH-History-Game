import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  ImageBackground,
  Image,
  StyleSheet,
  Animated,
  BackHandler,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import Sound_clicks from '../../Components/Sound_clicks';
import { useGameProgress } from '../../GameProgress';
import { getCheckpoints, restartProgress } from '../Others/saveProgress';
import { useAudio } from '../../Audiostore';
import { useJournal } from './JournalContext';

const EXIT_BG = require('../../Background Images/Intro/EXITGAME_BG.png');
const EXIT_BUTTON = require('../../Background Images/Intro/exit.png');
const CANCEL_BUTTON = require('../../Background Images/Intro/cancel.png');

// A checkpoint must contain a usable chapter, part, and scene index.
// This prevents empty objects and malformed entries from enabling Continue.
const isValidCheckpoint = (checkpoint) => {
  if (!checkpoint || typeof checkpoint !== 'object') {
    return false;
  }

  const chapter = Number(checkpoint.chap);
  const part = Number(checkpoint.part);
  const sceneIdx = Number(checkpoint.sceneIdx);

  return (
    Number.isInteger(chapter) &&
    chapter >= 1 &&
    Number.isInteger(part) &&
    part >= 1 &&
    Number.isInteger(sceneIdx) &&
    sceneIdx >= 0
  );
};

const hasValidSave = (checkpoints) => {
  if (!Array.isArray(checkpoints)) {
    return false;
  }

  return checkpoints.some(isValidCheckpoint);
};

// Same spring animation structure as NewGameConfirmScreen.
function AnimatedButton({ onPress, image, style }) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.spring(scale, {
        toValue: 0.94,
        speed: 35,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        speed: 25,
        bounciness: 7,
        useNativeDriver: true,
      }),
    ]).start();

    onPress?.();
  };

  return (
    <Sound_clicks onPress={handlePress}>
      <Animated.View
        style={{
          transform: [{ scale }],
        }}
      >
        <Image
          source={image}
          style={[styles.confirmButton, style]}
          resizeMode="contain"
        />
      </Animated.View>
    </Sound_clicks>
  );
}

function MainMenuScreen({ navigation }) {
  const [selectedButton, setSelectedButton] = useState(null);
  const [hasSave, setHasSave] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [checkingSave, setCheckingSave] = useState(true);

  const game = useGameProgress();
  const { Quitapp } = useAudio();
  const { resetUnlocks } = useJournal();

  // Check the stored checkpoints before displaying Continue Game.
  const refreshSaveState = useCallback(async () => {
    try {
      const checkpoints = await getCheckpoints();
      const validSave = hasValidSave(checkpoints);

      setHasSave(validSave);
      return validSave;
    } catch (error) {
      console.warn('Failed to load saved checkpoints:', error);
      setHasSave(false);
      return false;
    } finally {
      setCheckingSave(false);
    }
  }, []);

  // Refresh whenever the main menu comes into focus.
  useFocusEffect(
    useCallback(() => {
      let active = true;

      setSelectedButton(null);
      setCheckingSave(true);

      const loadSaves = async () => {
        try {
          const checkpoints = await getCheckpoints();

          if (!active) return;

          setHasSave(hasValidSave(checkpoints));
        } catch (error) {
          console.warn('Failed to load saved checkpoints:', error);

          if (active) {
            setHasSave(false);
          }
        } finally {
          if (active) {
            setCheckingSave(false);
          }
        }
      };

      loadSaves();

      return () => {
        active = false;
      };
    }, [])
  );

  // Handle Android hardware-back while exit confirmation is open.
  useEffect(() => {
    if (!showExitConfirm) return undefined;

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        setShowExitConfirm(false);
        setSelectedButton(null);
        return true;
      }
    );

    return () => subscription.remove();
  }, [showExitConfirm]);

  // Start a fresh journey and clear previous saved progress.
  const startFresh = async () => {
    setHasSave(false);

    try {
      const cleared = await restartProgress();

      if (!cleared) {
        await refreshSaveState();
        return;
      }

      await resetUnlocks();

      game.setChapter(1);
      game.setPart(1);
      game.setScene(0);

      navigation.navigate('Part1', { startScene: 0 });
    } catch (error) {
      console.warn('Failed to start a fresh game:', error);
      await refreshSaveState();
    }
  };

  const confirmExit = () => {
    setSelectedButton('exit');
    setShowExitConfirm(true);
  };

  const cancelExit = () => {
    setShowExitConfirm(false);
    setSelectedButton(null);
  };

  const exitGame = () => {
    setShowExitConfirm(false);
    setTimeout(() => Quitapp?.(), 150);
  };

  const menuButtons = [
    {
      id: 'newGame',
      white: require('../../Menu Images/New Game White.png'),
      gold: require('../../Menu Images/New Game Gold.png'),
      onPress: () => {
        if (checkingSave) return;

        if (hasSave) {
          navigation.navigate('NewGameConfirm');
        } else {
          startFresh();
        }
      },
    },

    ...(hasSave && !checkingSave
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

  // EXIT CONFIRMATION SCREEN
  if (showExitConfirm) {
    return (
      <ImageBackground
        source={EXIT_BG}
        resizeMode="cover"
        style={styles.background}
      >
        <View style={styles.exitButtonRow}>
          <AnimatedButton
            image={EXIT_BUTTON}
            onPress={exitGame}
          />

          <AnimatedButton
            image={CANCEL_BUTTON}
            onPress={cancelExit}
          />
        </View>
      </ImageBackground>
    );
  }

  // MAIN MENU SCREEN
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
              if (checkingSave && button.id !== 'settings') return;

              setSelectedButton(button.id);
              button.onPress();
            }}
          >
            <Image
              source={
                selectedButton === button.id
                  ? button.gold
                  : button.white
              }
              style={styles.menuButton}
              resizeMode="contain"
            />
          </Sound_clicks>
        ))}

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
    left: '3%',
    top: '37%',
    alignItems: 'flex-start',
    gap: 1,
  },

  menuButton: {
    width: 260,
    height: 58,
  },

  exitButtonRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 45,
    paddingTop: 115,
  },

  confirmButton: {
    width: 245,
    height: 85,
  },
});

export default MainMenuScreen;