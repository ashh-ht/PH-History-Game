import { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, Pressable, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import { useAudio } from '../Audiostore';
import Sound_clicks from '../Components/Sound_clicks';

function VolumeSlider({ label, value, onValueChange, fillColor }) {
  return (
    <View style={styles.sliderRow}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.trackContainer}>
        <View style={styles.trackBackground} />
        <View style={[styles.trackFill, { width: `${value * 100}%`, backgroundColor: fillColor }]} />
        <Slider
          style={styles.sliderOverlay}
          thumbImage={require('../assets/diamonds.png')}
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
  const { masterVolume, musicVolume, soundVolume ,changeMasterVolume,changeMusicVolume, changeSoundVolume } = useAudio();
  
  /*const [voiceVolume, setVoiceVolume] = useState(0.8);*/

  return (
    <ImageBackground source={require('../assets/Settingbg.png')} style={styles.container}>
      <Sound_clicks
        onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require('../assets/return.png')} style={styles.icon} />


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

  icon: { width: 
    40, 
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
  sliderRow: { flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 16 },

  label: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#3a2e1f', 
    width: 90, 
    marginRight: 12 },

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