import React, { useRef, useState } from 'react';
import {
  Image,
  PanResponder,
  StyleSheet,
  Text,
  View,
  Animated,
  Pressable,
  ImageBackground,
  useWindowDimensions,
} from 'react-native';
import Sound_clicks from '../../Components/Sound_clicks';
import useScale from '../../Components/ScreenScaler';
import { useDisplaySettings, MIN_BOX_OPACITY } from './DisplaySetting';

const BG_BASE = require('../../assets/Settings_Assets/Display_Base.png');
const PANEL_FONT_SIZE = require('../../assets/Settings_Assets/Display_FontSize.png');
const BANNER_OPACITY = require('../../assets/Settings_Assets/Display_DialogueOpacity.png');
const CIRCLE_THUMB = require('../../assets/Settings_Assets/CircleButton.png');
const CIRCLE_THUMB_CHECKED = require('../../assets/Settings_Assets/CircleButton_Checked.png');

const PANEL_ASPECT = 1205 / 630;

const ROW_LEFT = 215/1920;
const ROW_W = 370/1920;
const ROW_H = 90/1080;
const CIRCLE_CX = 252/1920;
const CIRCLE_W = 60/1920;

const FONT_OPTIONS = [
  { value: 'Small', y: 473/1080 },
  { value: 'Medium', y: 587/1080 },
  { value: 'Large', y: 708/1080 },
];

const SLIDER_LEFT = 703/1920;
const SLIDER_W = 1000/1920;
const SLIDER_CY = 670/1080;
const SLIDER_H = 170/1080;
const THUMB_W = 64/1920;
const TRACK_H = 14/1080;
const PERCENT_FONT = 54/1920;

function OpacitySlider({ panelW, panelH, value, onChange }) {
  const [width, setWidth] = useState(0);
  const widthRef = useRef(0);
  const thumb = THUMB_W * panelW;
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const setFromTouch = (locationX) => {
    const usable = widthRef.current - thumb;
    if (usable <= 0) return;
    const f = Math.min(1, Math.max(0, (locationX - thumb / 2) / usable));
    onChangeRef.current(MIN_BOX_OPACITY + f * (1 - MIN_BOX_OPACITY));
  };

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: (e) => setFromTouch(e.nativeEvent.locationX),
      onPanResponderMove: (e) => setFromTouch(e.nativeEvent.locationX),
    })
  ).current;

  const fraction = (value - MIN_BOX_OPACITY) / (1 - MIN_BOX_OPACITY);
  const handleLeft = fraction * Math.max(0, width - thumb);

  const percentFont = PERCENT_FONT * panelW;
  const trackH = TRACK_H * panelH;

  return (
    <View
      style={{ flex: 1 }}
      onLayout={(e) => {
        widthRef.current = e.nativeEvent.layout.width;
        setWidth(e.nativeEvent.layout.width);
      }}
      {...pan.panHandlers}
    >
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: handleLeft + thumb / 2 - percentFont * 1.5,
          width: percentFont * 3,
          alignItems: 'center',
        }}
        pointerEvents="none"
      >
        <Text style={[styles.percentText, { fontSize: percentFont }]} allowFontScaling={false}>
          {Math.round(value * 100)}%
        </Text>
      </View>

      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          left: thumb / 2,
          right: 0,
          top: '50%',
          marginTop: -trackH / 2 + percentFont * 0.2,
          height: trackH,
          borderRadius: trackH / 2,
          backgroundColor: '#8C9395',
        }}
      />

      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          left: thumb / 2,
          top: '50%',
          marginTop: -trackH / 2 + percentFont * 0.2,
          width: handleLeft,
          height: trackH,
          borderRadius: trackH / 2,
          backgroundColor: '#9D704E',
        }}
      />

      <Image
        source={CIRCLE_THUMB}
        pointerEvents="none"
        resizeMode="contain"
        style={{
          position: 'absolute',
          left: handleLeft,
          top: '50%',
          marginTop: -thumb / 2 + percentFont * 0.2,
          width: thumb,
          height: thumb,
        }}
      />
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
      <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <Image source={pressed ? pressedImage : image} style={imageStyle} resizeMode="contain" />
      </Pressable>
    </Animated.View>
  );
}

export default function DisplayScreen({ navigation }) {
  const { fontSize, setFontSize, boxOpacity, setBoxOpacity } = useDisplaySettings();
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

      <View style={{ width: panelW, height: panelH }}>
        <ImageBackground source={BG_BASE} style={{ width: panelW, height: panelH }} resizeMode="stretch">
          <Image source={PANEL_FONT_SIZE} style={{ position: 'absolute', width: panelW, height: panelH }} resizeMode="stretch" pointerEvents="none" />
          <Image source={BANNER_OPACITY} style={{ position: 'absolute', width: panelW, height: panelH }} resizeMode="stretch" pointerEvents="none" />

          {FONT_OPTIONS.map((opt) => (
            <Sound_clicks
              key={opt.value}
              onPress={() => setFontSize(opt.value)}
              style={{
                position: 'absolute',
                left: ROW_LEFT * panelW,
                top: (opt.y - ROW_H / 2) * panelH,
                width: ROW_W * panelW,
                height: ROW_H * panelH,
                justifyContent: 'center',
              }}
            >
              <Image
                source={fontSize === opt.value ? CIRCLE_THUMB_CHECKED : CIRCLE_THUMB}
                resizeMode="contain"
                style={{
                  position: 'absolute',
                  left: (CIRCLE_CX - (CIRCLE_W / 2) - ROW_LEFT) * panelW,
                  width: CIRCLE_W * panelW,
                  height: CIRCLE_W * panelW,
                }}
              />
            </Sound_clicks>
          ))}

          <View
            style={{
              position: 'absolute',
              left: SLIDER_LEFT * panelW,
              top: (SLIDER_CY - SLIDER_H / 2) * panelH,
              width: SLIDER_W * panelW,
              height: SLIDER_H * panelH,
            }}
          >
            <OpacitySlider
              panelW={panelW}
              panelH={panelH}
              value={boxOpacity}
              onChange={setBoxOpacity}
            />
          </View>
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
  percentText: {
    fontFamily: "serif",
    color: "#5A4A32",
    fontWeight: "bold",
  },
});