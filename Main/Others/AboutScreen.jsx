import React, { useState, useRef } from 'react';
import {
  ImageBackground,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  View,
  Animated,
  Pressable,
  Modal,
  useWindowDimensions,
} from 'react-native';

import Sound_clicks from '../../Components/Sound_clicks';
import useScale from '../../Components/ScreenScaler';

const BG_MAIN = require('../../assets/Settings_Assets/About_Base.png');
const BTN_TEAM = require('../../assets/Settings_Assets/About_Team.png');
const BTN_GAME = require('../../assets/Settings_Assets/About_Game.png');
const BG_TEAM_OVERLAY = require('../../assets/Settings_Assets/AboutTeam_Base.png');
const BG_GAME_OVERLAY = require('../../assets/Settings_Assets/AboutGame_Base.png');

const PANEL_ASPECT = 1205 / 630;

// --- BUTTON LAYOUT MATH ---
const BTN_W = 0.55;
const BTN_ASPECT = 1.45;
const BTN_TOP = 0.16;
const COLS = [0.02, 0.42];

// --- POPUP SIZE (max fraction of the whole screen) ---
const POPUP_MAX_W = 0.80;
const POPUP_MAX_H = 0.85;

// --- POPUP TEXT AREA (fractions of the popup card itself) ---
// TEXT_TOP: where text starts, just below the baked-in title.
const TEXT_TOP = 0.28;
const TEXT_BOTTOM = 0.08;
const TEXT_SIDE = 0.12;

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

// Centered popup: dim backdrop + card at the artwork's own aspect ratio (no stretching)
function InfoOverlay({ source, onClose, children }) {
  const { width: winW, height: winH } = useWindowDimensions();
  const asset = Image.resolveAssetSource(source);
  const aspect = asset && asset.width && asset.height ? asset.width / asset.height : PANEL_ASPECT;

  let cardW = winW * POPUP_MAX_W;
  let cardH = cardW / aspect;
  if (cardH > winH * POPUP_MAX_H) {
    cardH = winH * POPUP_MAX_H;
    cardW = cardH * aspect;
  }

  return (
    <Modal
      transparent
      animationType="fade"
      statusBarTranslucent
      supportedOrientations={['landscape', 'portrait']}
      onRequestClose={onClose}
    >
    <View style={styles.backdrop}>
      {/* Tap outside the card to close */}
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

      <ImageBackground source={source} style={{ width: cardW, height: cardH }} resizeMode="stretch">
        <View
          style={{
            position: 'absolute',
            top: TEXT_TOP * cardH,
            bottom: TEXT_BOTTOM * cardH,
            left: TEXT_SIDE * cardW,
            right: TEXT_SIDE * cardW,
            alignItems: 'center',
          }}
        >
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>

          <Sound_clicks onPress={onClose}>
            <View style={styles.closeButton}>
              <Text style={styles.closeButtonText}>CLOSE</Text>
            </View>
          </Sound_clicks>
        </View>
      </ImageBackground>
    </View>
    </Modal>
  );
}

export default function AboutScreen({ navigation }) {
  const [activeOverlay, setActiveOverlay] = useState(null);
  const { s, insets } = useScale();
  const { width: winW, height: winH } = useWindowDimensions();

  const panelH = Math.min(winH * 0.92, 700, (winW * 0.9) / PANEL_ASPECT);
  const panelW = panelH * PANEL_ASPECT;

  const btnW = panelW * BTN_W;
  const btnH = btnW / BTN_ASPECT;

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

  const closeOverlay = () => setActiveOverlay(null);

  return (
    <View style={styles.screenOverlay}>
      <View style={[styles.topIconContainer, dynamicStyles.topIconContainer]}>
        <SpringImageButton imageStyle={dynamicStyles.topIconImage}
          image={require('../../assets/icons/x_button.png')}
          pressedImage={require('../../assets/icons/x_buttonpressed.png')}
          onPress={() => navigation.goBack()}
        />
      </View>

      {/* Main About panel */}
      <ImageBackground source={BG_MAIN} style={{ width: panelW, height: panelH }} resizeMode="stretch">

        {/* Team Button */}
        <View
          style={{
            position: 'absolute',
            left: COLS[0] * panelW,
            top: BTN_TOP * panelH,
            width: btnW,
            height: btnH
          }}
        >
          <Sound_clicks onPress={() => setActiveOverlay('Team')}>
            <Image source={BTN_TEAM} style={{ width: btnW, height: btnH }} resizeMode="stretch" />
          </Sound_clicks>
        </View>

        {/* Game Button */}
        <View
          style={{
            position: 'absolute',
            left: COLS[1] * panelW,
            top: BTN_TOP * panelH,
            width: btnW,
            height: btnH
          }}
        >
          <Sound_clicks onPress={() => setActiveOverlay('Game')}>
            <Image source={BTN_GAME} style={{ width: btnW, height: btnH }} resizeMode="stretch" />
          </Sound_clicks>
        </View>

      </ImageBackground>

      {/* ================= GAME POPUP (Credits) ================= */}
      {activeOverlay === 'Game' && (
        <InfoOverlay source={BG_GAME_OVERLAY} onClose={closeOverlay}>
          <Text style={styles.overlayBody}>
            <Text style={styles.boldText}>Lead Developer</Text>
            {'\n'}Fulgencio, John Hendrick{'\n\n'}

            <Text style={styles.boldText}>Game Design</Text>
            {'\n'}Sulla, 
            {'\n'}Arellano, Janell Ashtene {'\n'}
            Catapang, Maureign Anne Christyanna M.{'\n'}
            Sulla, Sylvia Heart L.{'\n\n'}

            <Text style={styles.boldText}>SFX/BGM</Text>
            {'\n'}Solis, Markuz Andre Merek R.{'\n'}
          </Text>
        </InfoOverlay>
      )}

      {/* ================= TEAM POPUP (About Team) ================= */}
      {activeOverlay === 'Team' && (
        <InfoOverlay source={BG_TEAM_OVERLAY} onClose={closeOverlay}>
          <Text style={styles.overlayBody}>
          The Pamana Development Team is a group of Computer Science students with different skills and talents. 
          The team was formed to create Pamana as a school project.
            {'\n\n'}
          Together, they work to make the game fun, interesting, 
          and educational for players.
          </Text>
        </InfoOverlay>
      )}
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
  // Full-screen dim layer; the popup card is centered inside it
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  overlayBody: {
    fontFamily: "serif",
    fontSize: 16,
    lineHeight: 24,
    color: "#5A4A32",
    textAlign: "center",
  },
  boldText: {
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 28,
    borderRadius: 8,
    backgroundColor: "#9D704E",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    fontFamily: "serif",
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});