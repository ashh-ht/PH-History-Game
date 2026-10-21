import { useState, useRef } from 'react';
import {
  Image,
  Text,
  View,
  Animated,
  ImageBackground,
  useWindowDimensions
} from 'react-native';
import Sound_clicks from '../../Components/Sound_clicks';
import useScale from '../../Components/ScreenScaler';
import styles from '../../Styles/Others/StyleSettings';

// --- IMAGE IMPORTS ---
const BG_PARCHMENT = require('../../assets/Settings_Assets/Settings_Base.png');

const BTN_SAVES = require('../../assets/Settings_Assets/Settings_Saves.png');
const BTN_GAMEPLAY = require('../../assets/Settings_Assets/Settings_Gameplay.png');
const BTN_AUDIO = require('../../assets/Settings_Assets/Settings_Audio.png');
const BTN_DISPLAY = require('../../assets/Settings_Assets/Settings_Display.png');
const BTN_SOURCES = require('../../assets/Settings_Assets/Settings_Sources.png');
const BTN_ABOUT = require('../../assets/Settings_Assets/Settings_About.png');
const BTN_EXIT = require('../../assets/Settings_Assets/Settings_ExitGame.png');

// Layout fractions of the parchment panel
const PANEL_ASPECT = 1205 / 630;

// ---  BUTTON SIZES
const BTN_ASPECT = 2.0;
const BTN_W = 0.43;
const COLS = [0.00005, 0.29, 0.58];
const ROWS = [0.10, 0.36];

// --- EXIT GAME BUTTON ADJUSTED ---
const EXIT_ASPECT = 3.0;  // Made it taller (was 4.25) to match the goal image
const EXIT_W = 0.35;      // Slightly narrower so it doesn't look like a long bar
const EXIT_LEFT = 0.325;  // Perfectly centered: (1 - 0.35) / 2
const EXIT_TOP = 0.71;    // Moved up slightly so it's not touching the bottom vines

const SETTING_ITEMS = [
  { label: 'Saves',    image: BTN_SAVES,    route: 'SaveScreen',     col: COLS[0], row: ROWS[0] },
  { label: 'Gameplay', image: BTN_GAMEPLAY, route: 'GameplayScreen', col: COLS[1], row: ROWS[0] },
  { label: 'Audio',    image: BTN_AUDIO,    route: 'AudioScreen',    col: COLS[2], row: ROWS[0] },
  { label: 'Display',  image: BTN_DISPLAY,  route: 'DisplayScreen',  col: COLS[0], row: ROWS[1] },
  { label: 'Sources',  image: BTN_SOURCES,  route: 'Sources',        col: COLS[1], row: ROWS[1] },
  { label: 'About',    image: BTN_ABOUT,    route: 'About',          col: COLS[2], row: ROWS[1] },
];

// =====================================================
// ANIMATED TOP BUTTON (X)
// =====================================================
function AnimatedTopButton({ normalSource, pressedSource, onPress, imageStyle }) {
  const [pressed, setPressed] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const animate = (isPressed) => {
    setPressed(isPressed);
    Animated.parallel([
      Animated.spring(scale, {
        toValue: isPressed ? 0.9 : 1,
        speed: isPressed ? 22 : 18,
        bounciness: isPressed ? 6 : 12,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: isPressed ? 3 : 0,
        speed: isPressed ? 22 : 18,
        bounciness: isPressed ? 4 : 10,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }, { translateY }] }}>
      <Sound_clicks
        onPressIn={() => animate(true)}
        onPressOut={() => animate(false)}
        onPress={onPress}
      >
        <Image
          source={pressed ? pressedSource : normalSource}
          style={imageStyle}
          resizeMode="contain"
        />
      </Sound_clicks>
    </Animated.View>
  );
}

// =====================================================
// ANIMATED PANEL BUTTON
// =====================================================
function AnimatedPanelButton({ source, onPress, containerStyle, imageStyle }) {
  const [pressed, setPressed] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const animate = (isPressed) => {
    setPressed(isPressed);
    Animated.parallel([
      Animated.spring(scale, {
        toValue: isPressed ? 0.95 : 1,
        speed: isPressed ? 30 : 18,
        bounciness: isPressed ? 0 : 10,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: isPressed ? 3 : 0,
        speed: isPressed ? 30 : 18,
        bounciness: isPressed ? 0 : 8,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={containerStyle}>
      <Animated.View style={{ flex: 1, transform: [{ scale }, { translateY }] }}>
        <Sound_clicks
          style={{ flex: 1 }}
          onPressIn={() => animate(true)}
          onPressOut={() => animate(false)}
          onPress={onPress}
        >
          <Image source={source} style={imageStyle} resizeMode="stretch" />
          {pressed && <View pointerEvents="none" style={styles.pressOverlay} />}
        </Sound_clicks>
      </Animated.View>
    </View>
  );
}

// =====================================================
// SETTINGS SCREEN
// =====================================================
function Setting_screen({ navigation }) {
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const { s, insets } = useScale();
  const { width: winW, height: winH } = useWindowDimensions();

  const panelH = Math.min(winH * 0.92, 700, (winW * 0.9) / PANEL_ASPECT);
  const panelW = panelH * PANEL_ASPECT;

  const btnW = panelW * BTN_W;
  const btnH = btnW / BTN_ASPECT;
  const exitW = panelW * EXIT_W;
  const exitH = exitW / EXIT_ASPECT;

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

      {/* Top-left: only the X (close) button */}
      <View style={[styles.topIconContainer, dynamicStyles.topIconContainer]}>
        <AnimatedTopButton
          normalSource={require('../../assets/icons/x_button.png')}
          pressedSource={require('../../assets/icons/x_buttonpressed.png')}
          onPress={() => navigation.goBack()}
          imageStyle={dynamicStyles.topIconImage}
        />
      </View>

      {/* The Parchment Panel */}
      <View style={{ width: panelW, height: panelH }}>
        <ImageBackground
          source={BG_PARCHMENT}
          style={{ width: panelW, height: panelH }}
          resizeMode="stretch"
        >
          {SETTING_ITEMS.map((item) => (
            <AnimatedPanelButton
              key={item.label}
              source={item.image}
              onPress={() => navigation.navigate(item.route)}
              containerStyle={{
                position: 'absolute',
                left: item.col * panelW,
                top: item.row * panelH,
                width: btnW,
                height: btnH,
              }}
              imageStyle={styles.menuButtonImage}
            />
          ))}

          {/* Exit Button */}
          <AnimatedPanelButton
            source={BTN_EXIT}
            onPress={() => setShowExitConfirm(true)}
            containerStyle={{
              position: 'absolute',
              left: EXIT_LEFT * panelW,
              top: EXIT_TOP * panelH,
              width: exitW,
              height: exitH,
            }}
            imageStyle={styles.exitButtonImage}
          />
        </ImageBackground>
      </View>

      {/* Exit Confirmation Overlay */}
      {showExitConfirm && (
        <View style={styles.confirmOverlay}>
          <View style={styles.confirmPanel}>
            <Text style={styles.confirmText} allowFontScaling={false}>
              Do you want to exit?
            </Text>

            <View style={styles.confirmButtonsRow}>
              <Sound_clicks
                style={styles.confirmButtonNo}
                onPress={() => setShowExitConfirm(false)}
              >
                <Text style={styles.confirmBtnText}>No</Text>
              </Sound_clicks>

              <Sound_clicks
                style={styles.confirmButtonYes}
                onPress={() => navigation.navigate('Home')}
              >
                <Text style={styles.confirmBtnText}>Yes</Text>
              </Sound_clicks>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

export default Setting_screen;