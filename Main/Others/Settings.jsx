import { useState, useRef } from 'react';
import {
  Image,
  Text,
  View,
  Animated,
  ImageBackground,
  useWindowDimensions,
  TouchableOpacity
} from 'react-native';
import useScale from '../../Components/ScreenScaler';
import styles from '../../Styles/Others/StyleSettings';
import { useAudio } from '../../Audiostore'; // ADDED: for menu music on exit

// --- IMAGE IMPORTS ---
const BG_PARCHMENT = require('../../assets/Settings_Assets/Settings_Base.png');

const BTN_SAVES = require('../../assets/Settings_Assets/Settings_Saves.png');
const BTN_GAMEPLAY = require('../../assets/Settings_Assets/Settings_Gameplay.png');
const BTN_AUDIO = require('../../assets/Settings_Assets/Settings_Audio.png');
const BTN_DISPLAY = require('../../assets/Settings_Assets/Settings_Display.png');
const BTN_SOURCES = require('../../assets/Settings_Assets/Settings_Sources.png');
const BTN_ABOUT = require('../../assets/Settings_Assets/Settings_About.png');
const BTN_EXIT = require('../../assets/Settings_Assets/Settings_ExitGame.png');

const BTN_SAVES_C = require('../../assets/Settings_Assets/Settings_SavesClicked.png');
const BTN_GAMEPLAY_C = require('../../assets/Settings_Assets/Settings_GameplayClicked.png');
const BTN_AUDIO_C = require('../../assets/Settings_Assets/Settings_AudioClicked.png');
const BTN_DISPLAY_C = require('../../assets/Settings_Assets/Settings_DisplayClicked.png');
const BTN_SOURCES_C = require('../../assets/Settings_Assets/Settings_SourcesClicked.png');
const BTN_ABOUT_C = require('../../assets/Settings_Assets/Settings_AboutClicked.png');
const BTN_EXIT_C = require('../../assets/Settings_Assets/Settings_ExitGameClicked.png');

const PANEL_ASPECT = 1205 / 630;
const BTN_ASPECT = 2.0;
const BTN_W = 0.43;
const COLS = [0.00005, 0.29, 0.58];
const ROWS = [0.10, 0.36];

const EXIT_ASPECT = 3.0;
const EXIT_W = 0.19;
const EXIT_LEFT = 0.41;
const EXIT_TOP = 0.74;

const SETTING_ITEMS = [
  { label: 'Saves',    image: BTN_SAVES,    clicked: BTN_SAVES_C,    route: 'SaveScreen',     col: COLS[0], row: ROWS[0] },
  { label: 'Gameplay', image: BTN_GAMEPLAY, clicked: BTN_GAMEPLAY_C, route: 'GameplayScreen', col: COLS[1], row: ROWS[0] },
  { label: 'Audio',    image: BTN_AUDIO,    clicked: BTN_AUDIO_C,    route: 'AudioScreen',    col: COLS[2], row: ROWS[0] },
  { label: 'Display',  image: BTN_DISPLAY,  clicked: BTN_DISPLAY_C,  route: 'DisplayScreen',  col: COLS[0], row: ROWS[1] },
  { label: 'Sources',  image: BTN_SOURCES,  clicked: BTN_SOURCES_C,  route: 'Sources',        col: COLS[1], row: ROWS[1] },
  { label: 'About',    image: BTN_ABOUT,    clicked: BTN_ABOUT_C,    route: 'About',          col: COLS[2], row: ROWS[1] },
];

// =====================================================
// ANIMATED TOP BUTTON (X)
// =====================================================
function AnimatedTopButton({ normalSource, pressedSource, onPress, imageStyle }) {
  const { playSfx } = useAudio();
  const [pressed, setPressed] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const animatePress = (isPressed) => {
    setPressed(isPressed);
    Animated.parallel([
      Animated.spring(scale, {
        toValue: isPressed ? 0.88 : 1,
        speed: isPressed ? 24 : 18,
        bounciness: isPressed ? 8 : 12,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: isPressed ? 4 : 0,
        speed: isPressed ? 24 : 18,
        bounciness: isPressed ? 4 : 12,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }, { translateY }] }}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={() => animatePress(true)}
        onPressOut={() => animatePress(false)}
        onPress={() => {
          playSfx("dialogueClick");
          onPress();
        }}
      >
        <Image
          source={pressed ? pressedSource : normalSource}
          style={imageStyle}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </Animated.View>
  );
}

// =====================================================
// ANIMATED PANEL BUTTON
// =====================================================
function AnimatedPanelButton({ source, pressedSource, onPress, containerStyle, imageStyle }) {
  const { playSfx } = useAudio();
  const [pressed, setPressed] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const animatePress = (isPressed) => {
    setPressed(isPressed);
    Animated.parallel([
      Animated.spring(scale, {
        toValue: isPressed ? 0.88 : 1,
        speed: isPressed ? 24 : 18,
        bounciness: isPressed ? 8 : 12,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: isPressed ? 4 : 0,
        speed: isPressed ? 24 : 18,
        bounciness: isPressed ? 4 : 12,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={containerStyle}>
      <Animated.View style={{ flex: 1, transform: [{ scale }, { translateY }] }}>
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          onPressIn={() => animatePress(true)}
          onPressOut={() => animatePress(false)}
          onPress={() => {
            playSfx("dialogueClick");
            onPress();
          }}
        >
          <Image source={pressed ? pressedSource : source} style={imageStyle} resizeMode="stretch" />
        </TouchableOpacity>
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
  const { playMusic, stopLoops } = useAudio(); // ADDED

  // ADDED: leave the game -> menu music + clear the game screens off the stack
  const handleExitToMenu = () => {
    setShowExitConfirm(false);
    stopLoops();           // kill looping sfx (oil lamp, etc.)
    playMusic('somber');   // back to menu music
    navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
  };

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
              pressedSource={item.clicked}
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
            pressedSource={BTN_EXIT_C}
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
              <TouchableOpacity
                style={styles.confirmButtonNo}
                onPress={() => setShowExitConfirm(false)}
              >
                <Text style={styles.confirmBtnText}>No</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmButtonYes}
                onPress={handleExitToMenu}
              >
                <Text style={styles.confirmBtnText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

export default Setting_screen;