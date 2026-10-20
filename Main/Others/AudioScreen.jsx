import React, { useRef, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, Image, Animated } from 'react-native';
import Slider from '@react-native-community/slider';
import { useAudio } from '../../Audiostore';
import Sound_clicks from '../../Components/Sound_clicks';

function SpringImageButton({ image, pressedImage, onPress }) {
  const scale = useRef(new Animated.Value(1)).current;
  const [pressed, setPressed] = useState(false);

  const handlePressIn = () => {
    setPressed(true);
    Animated.spring(scale, {
      toValue: 0.9,
      useNativeDriver: true,
      speed: 20,
      bounciness: 10,
    }).start();
  };

  const handlePressOut = () => {
    setPressed(false);
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 10,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Sound_clicks
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Image
          source={pressed ? pressedImage : image}
          style={styles.icon}
          resizeMode="contain"
        />
      </Sound_clicks>
    </Animated.View>
  );
}

function VolumeSlider({ label, value, onValueChange, fillColor }) {
  return (
    <View style={styles.sliderRow}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.trackContainer}>
        <View style={styles.trackBackground} />
        <View style={[styles.trackFill, { width: `${value * 100}%`, backgroundColor: fillColor }]} />
        <Slider
          style={styles.sliderOverlay}
          thumbImage={require('../../assets/diamonds.png')}
          minimumValue={0}
          maximumValue={1}
          value={value}
          onValueChange={onValueChange}
          minimumTrackTintColor="transparent"
          maximumTrackTintColor="transparent"
        />
      </View>
    </View>
  );
}

function AudioScreen({ navigation }) {
  const { masterVolume, musicVolume, soundVolume, changeMasterVolume, changeMusicVolume, changeSoundVolume } = useAudio();

  return (
    <ImageBackground source={require('../../assets/Settingbg.png')} style={styles.container}>
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

      <Sound_clicks
        onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require('../../assets/return.png')} style={styles.icon} />
      </Sound_clicks>

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
    justifyContent: 'center'
  },
  backButton: {
    position: 'absolute',
    top: 12,
    left: 20
  },
  topIcon: {
    position: 'absolute',
    top: 12,
    left: 20,
    flexDirection: 'row',
    gap: 15,
    zIndex: 1,
  },
  icon: {
    width: 40,
    height: 40
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
    marginBottom: 16
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3a2e1f',
    width: 90,
    marginRight: 12
  },
  trackContainer: {
    flex: 1,
    height: 40,
    justifyContent: 'center'
  },
  trackBackground: {
    position: 'absolute',
    left: 0, right: 0,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#c9b896'
  },
  trackFill: {
    position: 'absolute',
    left: 0,
    height: 6,
    borderRadius: 3
  },
  sliderOverlay: {
    width: '100%',
    height: 40
  },
});

export default AudioScreen;