import React, { useState, useRef } from 'react';
import {
  Image,
  StyleSheet,
  View,
  Animated,
  Pressable,
  ImageBackground,
  useWindowDimensions,
} from 'react-native';
import Sound_clicks from '../../Components/Sound_clicks';
import useScale from '../../Components/ScreenScaler';
import { useGameplaySettings } from './GameplaySetting';

const BG_BASE = require('../../assets/Settings_Assets/Gameplay_Base.png');
const BG_TEXT_SPEED = require('../../assets/Settings_Assets/Gameplay_TextSpeed.png');
const BG_PLAY_MODE = require('../../assets/Settings_Assets/Gameplay_PlayMode.png');

const IMG_CIRCLE = require('../../assets/Settings_Assets/CircleButton.png');
const IMG_CIRCLE_CHECKED = require('../../assets/Settings_Assets/CircleButton_Checked.png');

const PANEL_ASPECT = 1205 / 630;

// BIGGER RADIO CIRCLES
const CIRCLE_W = 90/1920;  
const ROW_H = 300/1080;     

const SPEED_ROW = { left: 240/1920, w: 410/1920, cx: 318/1920 };
const AUTO_ROW = { left: 855/1920, w: 350/1920, cx: 921/1920 };
const DELAY_ROW = { left: 1273/1920, w: 440/1920, cx: 1339/1920 };
const DELAY_DIM = { left: 1270/1920, top: 420/1080, w: 445/1920, h: 360/1080 };

const SPEED_OPTIONS = [
  { value: 'Slow', y: 473/1080 },
  { value: 'Normal', y: 587/1080 },
  { value: 'Fast', y: 707/1080 },
];
const AUTO_OPTIONS = [
  { value: true, y: 548/1080 },
  { value: false, y: 670/1080 },
];
const DELAY_OPTIONS = [
  { value: 5, y: 480/1080 },
  { value: 10, y: 595/1080 },
  { value: 20, y: 714/1080 },
];

function SpringImageButton({ onPress, image, pressedImage, imageStyle }) {
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
      <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <Image source={pressed ? pressedImage : image} style={imageStyle} resizeMode="contain" />
      </Pressable>
    </Animated.View>
  );
}

function RadioRow({ panelW, panelH, row, y, selected, onPress, disabled }) {
  const size = CIRCLE_W * panelW;

  return (
    <Sound_clicks
      onPress={disabled ? undefined : onPress}
      style={{
        position: 'absolute',
        left: row.left * panelW,
        top: (y - ROW_H / 2) * panelH,
        width: row.w * panelW,
        height: ROW_H * panelH,
        justifyContent: 'center',
      }}
    >
      <Image
        source={selected ? IMG_CIRCLE_CHECKED : IMG_CIRCLE}
        resizeMode="stretch"
        style={{
          position: 'absolute',
          left: (row.cx - CIRCLE_W / 2 - row.left) * panelW,
          width: size,
          height: size,
        }}
      />
    </Sound_clicks>
  );
}

export default function GameplayScreen({ navigation }) {
  const { textSpeed, setTextSpeed, autoPlay, setAutoPlay, autoDelay, setAutoDelay } = useGameplaySettings();
  const { s, insets } = useScale();
  const { width: winW, height: winH } = useWindowDimensions();
  const autoOff = !autoPlay;

  const panelH = Math.min(winH * 0.92, 700, (winW * 0.9) / PANEL_ASPECT);
  const panelW = panelH * PANEL_ASPECT;

  const dynamicStyles = {
    topIconContainer: {
      top: Math.max(insets.top, 12 * s),
      left: Math.max(insets.left, 20 * s),
    },
    topIconImage: { width: 40 * s, height: 40 * s },
  };

  return (
    <View style={styles.screenOverlay}>
      <View style={[styles.topIconContainer, dynamicStyles.topIconContainer]}>
        <SpringImageButton
          imageStyle={dynamicStyles.topIconImage}
          onPress={() => navigation.goBack()}
          image={require('../../assets/icons/x_button.png')}
          pressedImage={require('../../assets/icons/x_buttonpressed.png')}
        />
      </View>

      <View style={{ width: panelW, height: panelH }}>
        <ImageBackground source={BG_BASE} style={{ width: panelW, height: panelH }} resizeMode="stretch">
          <Image source={BG_TEXT_SPEED} style={{ position: 'absolute', width: panelW, height: panelH }} resizeMode="stretch" pointerEvents="none" />
          <Image source={BG_PLAY_MODE} style={{ position: 'absolute', width: panelW, height: panelH }} resizeMode="stretch" pointerEvents="none" />

          {SPEED_OPTIONS.map((opt) => (
            <RadioRow key={opt.value} panelW={panelW} panelH={panelH} row={SPEED_ROW} y={opt.y} selected={textSpeed === opt.value} onPress={() => setTextSpeed(opt.value)} />
          ))}

          {AUTO_OPTIONS.map((opt) => (
            <RadioRow key={String(opt.value)} panelW={panelW} panelH={panelH} row={AUTO_ROW} y={opt.y} selected={autoPlay === opt.value} onPress={() => setAutoPlay(opt.value)} />
          ))}

          {DELAY_OPTIONS.map((opt) => (
            <RadioRow key={opt.value} panelW={panelW} panelH={panelH} row={DELAY_ROW} y={opt.y} selected={autoDelay === opt.value} disabled={autoOff} onPress={() => setAutoDelay(opt.value)} />
          ))}

          {autoOff && (
            <View
              pointerEvents="none"
              style={{
                position: 'absolute',
                left: DELAY_DIM.left * panelW,
                top: DELAY_DIM.top * panelH,
                width: DELAY_DIM.w * panelW,
                height: DELAY_DIM.h * panelH,
                backgroundColor: 'rgba(168, 124, 94, 0.55)',
              }}
            />
          )}
        </ImageBackground>
      </View>
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