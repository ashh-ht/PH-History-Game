<<<<<<< Updated upstream
import { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, Pressable, Image } from 'react-native';
=======
import React, { useEffect, useRef, useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  Pressable,
} from 'react-native';
>>>>>>> Stashed changes
import Slider from '@react-native-community/slider';
import { useAudio } from '../../Audiostore';

<<<<<<< Updated upstream
=======
// Round icon button with a spring press animation and the click sound.
// Uses Pressable directly, so press-in / press-out always work.
function SpringImageButton({ image, pressedImage, onPress }) {
  const audio = useAudio();
  const scale = useRef(new Animated.Value(1)).current;
  const [pressed, setPressed] = useState(false);

  const animateTo = (toValue) => {
    Animated.spring(scale, {
      toValue,
      useNativeDriver: true,
      speed: 20,
      bounciness: 10,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPressIn={() => {
          setPressed(true);
          animateTo(0.9);
        }}
        onPressOut={() => {
          setPressed(false);
          animateTo(1);
        }}
        onPress={() => {
          audio?.Playclick?.();
          onPress?.();
        }}
      >
        <Image
          source={pressed ? pressedImage : image}
          style={styles.icon}
          resizeMode="contain"
        />
      </Pressable>
    </Animated.View>
  );
}

// While the finger is dragging, only this slider re-renders.
// The shared audio state is updated once, when the finger lifts.
>>>>>>> Stashed changes
function VolumeSlider({ label, value, onValueChange, fillColor }) {
  const [local, setLocal] = useState(value);

  // keep in sync if the value changes from somewhere else
  useEffect(() => {
    setLocal(value);
  }, [value]);

  return (
    <View style={styles.sliderRow}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.trackContainer}>
        <View style={styles.trackBackground} />
        <View
          style={[
            styles.trackFill,
            { width: `${local * 100}%`, backgroundColor: fillColor },
          ]}
        />
        <Slider
          style={styles.sliderOverlay}
          thumbImage={require('../../assets/diamonds.png')}
          minimumValue={0}
          maximumValue={1}
          value={local}
          onValueChange={setLocal}
          onSlidingComplete={onValueChange}
          minimumTrackTintColor="transparent"
          maximumTrackTintColor="transparent"
        />
      </View>
    </View>
  );
}

function AudioScreen({ navigation }) {
  const audio = useAudio();

  // Provider missing: show nothing instead of crashing
  if (!audio) return null;

  const {
    masterVolume,
    musicVolume,
    soundVolume,
    changeMasterVolume,
    changeMusicVolume,
    changeSoundVolume,
  } = audio;

  return (
<<<<<<< Updated upstream
    <ImageBackground source={require('../../assets/Settingbg.png')} style={styles.container}>
      <Sound_clicks
        onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require('../../assets/return.png')} style={styles.icon} />
      </Sound_clicks>
=======
    <ImageBackground
      source={require('../../assets/Settingbg.png')}
      style={styles.container}
    >
      <View style={styles.topIcon}>
        <SpringImageButton
          image={require('../../assets/icons/x_button.png')}
          pressedImage={require('../../assets/icons/x_buttonpressed.png')}
          onPress={() => navigation.goBack()}
        />
        <SpringImageButton
          image={require('../../assets/icons/journal_button.png')}
          pressedImage={require('../../assets/icons/journal_buttonpressed.png')}
          onPress={() => navigation.navigate('Journal')}
        />
      </View>
>>>>>>> Stashed changes

      <View style={styles.panel}>
        <Text style={styles.title}>Audio</Text>

        <VolumeSlider
          label="Master volume"
          value={masterVolume}
          onValueChange={changeMasterVolume}
          fillColor="#897438"
        />

        <VolumeSlider
          label="Music Volume"
          value={musicVolume}
          onValueChange={changeMusicVolume}
          fillColor="#897438"
        />

        <VolumeSlider
          label="Sound Effects"
          value={soundVolume}
          onValueChange={changeSoundVolume}
          fillColor="#897438"
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 40,
    height: 40,
  },
  panel: {
    backgroundColor: '#f5e6c8',
    borderRadius: 24,
    padding: 24,
    width: '75%',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#3a2e1f',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 1,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3a2e1f',
    width: 90,
    marginRight: 12,
  },
  trackContainer: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
  },
  trackBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#c9b896',
  },
  trackFill: {
    position: 'absolute',
    left: 0,
    height: 6,
    borderRadius: 3,
  },
  sliderOverlay: {
    width: '100%',
    height: 40,
  },
});

export default AudioScreen;