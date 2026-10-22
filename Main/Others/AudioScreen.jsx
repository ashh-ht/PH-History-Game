import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Animated,
  PanResponder,
  ImageBackground,
  useWindowDimensions,
} from 'react-native';
import Sound_clicks from '../../Components/Sound_clicks';
import useScale from '../../Components/ScreenScaler';
import { useAudio } from '../../Audiostore';

const BG_BASE = require('../../assets/Settings_Assets/Audio_Base.png');
const PANEL_LABELS = require('../../assets/Settings_Assets/Audio_MasterVolume.png');
const CIRCLE_THUMB = require('../../assets/Settings_Assets/CircleButton.png');

const PANEL_ASPECT = 1205 / 630;

// Your manually adjusted left panel
const LEFT_PANEL_BOX = { left: 0.03, top: 0.05, width: 0.90, height: 0.90 };

const SLIDER_LEFT = 0.38;
const SLIDER_RIGHT = 0.12;
const SLIDER_Y = [0.33, 0.50, 0.67];

// INCREASED THUMB SIZE: From 80 to 140
const THUMB_SIZE_PCT = 140 / 1205;
const TRACK_HEIGHT = 16; // Slightly thicker track

// Hitbox tall enough to cover the big thumb
const HITBOX_H = 100;

function VolumeSlider({ panelW, value, onChange }) {
  const [width, setWidth] = useState(0);
  const widthRef = useRef(0);
  const containerRef = useRef(null);
  const leftRef = useRef(0); // container's screen-absolute left edge
  const thumb = THUMB_SIZE_PCT * panelW;
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  // pageX is screen-absolute, so it doesn't matter which child was touched
  const setFromPageX = (pageX) => {
    const usable = widthRef.current - thumb;
    if (usable <= 0) return;
    const f = Math.min(1, Math.max(0, (pageX - leftRef.current - thumb / 2) / usable));
    onChangeRef.current(f);
  };

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: (e) => {
        const pageX = e.nativeEvent.pageX;
        // Re-measure on every touch so layout changes / transitions don't matter
        containerRef.current?.measure((x, y, w, h, px) => {
          leftRef.current = px;
          setFromPageX(pageX);
        });
      },
      onPanResponderMove: (e) => setFromPageX(e.nativeEvent.pageX),
    })
  ).current;

  const handleLeft = value * Math.max(0, width - thumb);

  return (
    <View
      ref={containerRef}
      collapsable={false}
      style={{ width: "100%", height: "100%", justifyContent: "center" }}
      onLayout={(e) => {
        widthRef.current = e.nativeEvent.layout.width;
        setWidth(e.nativeEvent.layout.width);
      }}
      {...pan.panHandlers}
    >
      {/* Grey Track Background */}
      <View
        style={{
          position: "absolute",
          left: thumb / 2,
          right: thumb / 2,
          height: TRACK_HEIGHT,
          borderRadius: TRACK_HEIGHT / 2,
          backgroundColor: "#8C9395",
          top: '50%',
          marginTop: -TRACK_HEIGHT / 2
        }}
        pointerEvents="none"
      />

      {/* Brown Track Fill */}
      <View
        style={{
          position: "absolute",
          left: thumb / 2,
          height: TRACK_HEIGHT,
          borderRadius: TRACK_HEIGHT / 2,
          backgroundColor: "#9D704E",
          width: handleLeft,
          top: '50%',
          marginTop: -TRACK_HEIGHT / 2
        }}
        pointerEvents="none"
      />

      {/* Thumb Circle (Image wrapped in a View so pointerEvents is reliable) */}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          width: thumb,
          height: thumb,
          left: handleLeft,
          top: '50%',
          marginTop: -thumb / 2
        }}
      >
        <Image
          source={CIRCLE_THUMB}
          style={{ width: '100%', height: '100%' }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

function SpringImageButton({ image, pressedImage, onPress, imageStyle }) {
  const scale = useRef(new Animated.Value(1)).current;
  const [pressed, setPressed] = useState(false);

  const handlePressIn = () => {
    setPressed(true);
    Animated.spring(scale, { toValue: 0.9, useNativeDriver: true, speed: 20, bounciness: 10 }).start();
  };

  const handlePressOut = () => {
    setPressed(false);
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 10 }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Sound_clicks onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <Image source={pressed ? pressedImage : image} style={imageStyle} resizeMode="contain" />
      </Sound_clicks>
    </Animated.View>
  );
}

export default function AudioScreen({ navigation }) {
  const { masterVolume, musicVolume, soundVolume, changeMasterVolume, changeMusicVolume, changeSoundVolume } = useAudio();
  const { s, insets } = useScale();
  const { width: winW, height: winH } = useWindowDimensions();

  const panelH = Math.min(winH * 0.92, 700, (winW * 0.9) / PANEL_ASPECT);
  const panelW = panelH * PANEL_ASPECT;

  const dynamicStyles = {
    topIconContainer: {
      top: Math.max(insets.top, 12 * s),
      left: Math.max(insets.left, 20 * s),
    },
    topIconImage: {
      width: 40 * s,
      height: 40 * s,
    },
  };

  const sliderBox = (index) => ({
    position: 'absolute',
    left: SLIDER_LEFT * panelW,
    right: SLIDER_RIGHT * panelW,
    top: SLIDER_Y[index] * panelH,
    height: HITBOX_H,
    transform: [{ translateY: -HITBOX_H / 2 }],
  });

  return (
    <View style={styles.screenOverlay}>
      <View style={[styles.topIconContainer, dynamicStyles.topIconContainer]}>
        <SpringImageButton
          imageStyle={dynamicStyles.topIconImage}
          image={require('../../assets/icons/x_button.png')}
          pressedImage={require('../../assets/icons/x_buttonpressed.png')}
          onPress={() => navigation.goBack()}
        />
      </View>

      <ImageBackground source={BG_BASE} style={{ width: panelW, height: panelH }} resizeMode="stretch">

        <Image
          source={PANEL_LABELS}
          style={{
            position: 'absolute',
            left: LEFT_PANEL_BOX.left * panelW,
            top: LEFT_PANEL_BOX.top * panelH,
            width: LEFT_PANEL_BOX.width * panelW,
            height: LEFT_PANEL_BOX.height * panelH,
          }}
          resizeMode="stretch"
          pointerEvents="none"
        />

        <View style={sliderBox(0)}>
          <VolumeSlider panelW={panelW} value={masterVolume} onChange={changeMasterVolume} />
        </View>

        <View style={sliderBox(1)}>
          <VolumeSlider panelW={panelW} value={musicVolume} onChange={changeMusicVolume} />
        </View>

        <View style={sliderBox(2)}>
          <VolumeSlider panelW={panelW} value={soundVolume} onChange={changeSoundVolume} />
        </View>

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  screenOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    justifyContent: "center",
    alignItems: "center",
  },
  topIconContainer: {
    position: "absolute",
    zIndex: 10,
    flexDirection: "row",
  },
});