<<<<<<< Updated upstream
import { useState, useCallback } from 'react';
import { ImageBackground, ScrollView, View, Image, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
=======
import { useCallback, useEffect, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  Animated,
  ImageBackground,
  ScrollView,
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  Pressable,
} from 'react-native';
>>>>>>> Stashed changes
import { useGameProgress } from '../../GameProgress';
import { getUnlockedPart } from '../Others/saveProgress'; // adjust path to where your saveProgress file is
import Sound_clicks from '../../Components/Sound_clicks';

const PART_ROUTES = ['Part1', 'Part2', 'Part3', 'Part4', 'Part5', 'Part6', 'Part7', 'Part8'];

const PLAY_IMAGES = [
  require('../../assets/chap1/Part1_btn_play.png'),
  require('../../assets/chap1/Part2_btn_play.png'),
  require('../../assets/chap1/Part3_btn_play.png'),
  require('../../assets/chap1/Part4_btn_play.png'),
  require('../../assets/chap1/Part5_btn_play.png'),
  require('../../assets/chap1/Part6_btn_play.png'),
  require('../../assets/chap1/Part7_btn_play.png'),
  require('../../assets/chap1/Part8_btn_play.png'),
];

const LOCK_IMAGES = [
  require('../../assets/chap1/Part1_btn_lock.png'),
  require('../../assets/chap1/Part2_btn_lock.png'),
  require('../../assets/chap1/Part3_btn_lock.png'),
  require('../../assets/chap1/Part4_btn_lock.png'),
  require('../../assets/chap1/Part5_btn_lock.png'),
  require('../../assets/chap1/Part6_btn_lock.png'),
  require('../../assets/chap1/Part7_btn_lock.png'),
  require('../../assets/chap1/Part8_btn_lock.png'),
];

const BUTTON_HEIGHT = 60;
const BUTTON_GAP = 12;
const VISIBLE_COUNT = 4;
const VIEWPORT_HEIGHT = BUTTON_HEIGHT * VISIBLE_COUNT + BUTTON_GAP * (VISIBLE_COUNT - 1);

function Chapter1Selection({ navigation }) {
  const { part } = useGameProgress();
  const [savedPart, setSavedPart] = useState(1);
  const [showBackBtn, setShowBackBtn] = useState(true);
<<<<<<< Updated upstream
  const [unlockedPart, setUnlockedPart] = useState(1);
  
  useFocusEffect(
    useCallback(() => {
      getUnlockedPart().then(setUnlockedPart);
    }, [])
  );
=======
  const [selectedIndex, setSelectedIndex] = useState(null);
  const { width } = useWindowDimensions();

  const instructionFloat = useRef(new Animated.Value(0)).current;

  // Reload saved progress from storage every time this screen is focused
  // (so it also updates when you come back from a Part, and after an app restart)
  useFocusEffect(
    useCallback(() => {
      let active = true;

      getUnlockedPart().then((p) => {
        if (active) {
          setSavedPart(p);
        }
      });

      return () => {
        active = false;
      };
    }, [])
  );

  // Whichever is higher: saved progress or in-memory progress
  const unlockedPart = Math.max(savedPart, part);

  // Part 1 is always unlocked. Any part up to the furthest one reached is playable.
  // (If you want the furthest part to stay locked until the previous is finished,
  // change this to: index === 0 || index < unlockedPart)
  const isUnlocked = (index) => index === 0 || index < unlockedPart;

  // Gently float the instruction image while a preview is visible.
  useEffect(() => {
    if (selectedIndex === null) {
      instructionFloat.setValue(0);
      return;
    }

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(instructionFloat, {
          toValue: -4,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(instructionFloat, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [selectedIndex, instructionFloat]);
>>>>>>> Stashed changes

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    setShowBackBtn(scrollY < 50);
  };

  const isUnlocked = (i) => i === 0 || i < Math.max(part, unlockedPart);

  return (
    <ImageBackground
      source={require('../../assets/Parts_bg.png')}
      resizeMode="cover"
      style={styles.background}
    >
      {showBackBtn && (
        <Sound_clicks style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/return.png')} style={styles.backIcon} />
        </Sound_clicks>
      )}

      <View style={styles.banner} />

      <ScrollView
        style={styles.viewport}
        contentContainerStyle={styles.list}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {PLAY_IMAGES.map((image, i) => (
          <Sound_clicks
            key={i}
            onPress={() => {
              if (isUnlocked(i)) navigation.navigate(PART_ROUTES[i]);
            }}
          >
            <Image source={isUnlocked(i) ? image : LOCK_IMAGES[i]} style={styles.button} />
          </Sound_clicks>
        ))}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
      flex: 1
  },

  backButton: {
      position: 'absolute',
      top: 12,
      left: 20,
      zIndex: 10
      },

  backIcon: {
      width: 40,
      height: 40
      },

  banner: {
      height: 180
      },

  viewport: {
      maxHeight: VIEWPORT_HEIGHT,
      alignSelf: 'center'
      },

 list: { alignItems: 'center',
     gap: BUTTON_GAP
     },

  button: {
      width: 360,
      height: BUTTON_HEIGHT,
      resizeMode: 'contain'
      },
});

export default Chapter1Selection;