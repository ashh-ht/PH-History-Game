import React, { useState, useRef } from 'react';
import {
  ImageBackground,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  View,
  Animated,
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
const BTN_W = 0.55;       // 34% of the panel width per button
const BTN_ASPECT = 1.45;  // Width / Height ratio (makes them nice and chunky)
const BTN_TOP = 0.16;     // 36% down from the top (vertically centered)
const COLS = [0.02, 0.42]; // Left button starts at 12%, Right button starts at 54%

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

  return (
    <View style={styles.screenOverlay}>
      <View style={[styles.topIconContainer, dynamicStyles.topIconContainer]}>
        <SpringImageButton imageStyle={dynamicStyles.topIconImage}
          image={require('../../assets/icons/x_button.png')}
          pressedImage={require('../../assets/icons/x_buttonpressed.png')}
          onPress={() => navigation.goBack()}
        />
      </View>

      <ImageBackground source={BG_MAIN} style={{ width: panelW, height: panelH }} resizeMode="stretch">

        {/* Team Button */}
        <Sound_clicks
          style={{
            position: 'absolute',
            left: COLS[0] * panelW,
            top: BTN_TOP * panelH,
            width: btnW,
            height: btnH
          }}
          onPress={() => setActiveOverlay('Team')}
        >
          <Image source={BTN_TEAM} style={styles.buttonImage} resizeMode="stretch" />
        </Sound_clicks>

        {/* Game Button */}
        <Sound_clicks
          style={{
            position: 'absolute',
            left: COLS[1] * panelW,
            top: BTN_TOP * panelH,
            width: btnW,
            height: btnH
          }}
          onPress={() => setActiveOverlay('Game')}
        >
          <Image source={BTN_GAME} style={styles.buttonImage} resizeMode="stretch" />
        </Sound_clicks>

      </ImageBackground>

        {/* overlays  */}
      {activeOverlay === 'Credits' && (
        <View style={styles.overlay}>
          <View style={styles.overlayPanel}>
            <Text style={styles.overlayTitle}>Credits</Text>
            <ScrollView style={styles.creditsScroll}>
                <Text style={styles.overlayBody}>
                <Text style={{ fontWeight: 'bold' }}>Lead Developer</Text>
                {'\n'}
                Fulgencio, John Hendrick{'\n'}
                {'\n'}
                <Text style={{ fontWeight: 'bold' }}>Game Design</Text>
                {'\n'}
                Sulla, Sylvia Heart{'\n'}
                Arellano, Janell Ashtene R.{'\n'}
                {'\n'}
                <Text style={{ fontWeight: 'bold' }}>Programmer</Text>
                {'\n'}
                Arellano, Janell Ashtene {'\n'}
                Catapang, Maureign Anne Christyanna M.{'\n'}
                Solis, Markuz Andre Merek R.{'\n'}
                Sulla, Sylvia Heart L.{'\n'}
                {'\n'}
                <Text style={{ fontWeight: 'bold' }}>Scriptwriter</Text>
                {'\n'}
                Arellano, Janell Ashtene {'\n'}
                Catapang, Maureign Anne Christyanna M.{'\n'}
                Solis, Markuz Andre Merek R.{'\n'}
                Sulla, Sylvia Heart L.{'\n'}
                {'\n'}
                <Text style={{ fontWeight: 'bold' }}>SFX/BGM</Text>
                {'\n'}
                Solis, Markuz Andre Merek R.{'\n'}
                </Text>



            </ScrollView>
            <Sound_clicks style={styles.closeButton} onPress={() => setActiveOverlay(null)}>
              <Text style={styles.closeButtonText}>CLOSE</Text>
            </Sound_clicks>
          </View>
        </ImageBackground>
      )}

      {activeOverlay === 'AboutTeam' && (
        <View style={styles.overlay}>
          <View style={styles.overlayPanel}>
            <Text style={styles.overlayTitle}>About the Team</Text>
            <Text style={styles.overlayBody}>
              We're a Team 67 sikibidi a group of students who are shows interest on creating
              a Philippine History game that is tied to spanish colonization, The team created
              a novel like game to introduce it to people who are interest on history based games.
            </Text>
            <Sound_clicks style={styles.overlayClose} onPress={() => setActiveOverlay(null)}>
              <Text style={styles.overlayCloseText}>Close</Text>
            </Sound_clicks>
          </View>
        </ImageBackground>
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
  buttonImage: {
    width: "100%",
    height: "100%",
  },

  // Overlay Styles
  overlayWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "15%",
    paddingBottom: "5%",
  },
  scrollView: {
    width: "70%",
    maxHeight: "65%",
    marginBottom: 20,
  },
  scrollContent: {
    paddingVertical: 10,
  },
  overlayBody: {
    fontSize: 22,
    fontFamily: 'serif',
    color: '#5A4A32',
    textAlign: 'center',
    lineHeight: 34,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  closeButton: {
    backgroundColor: '#A87C5E',
    borderWidth: 2,
    borderColor: '#5A4A32',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 35,
    marginTop: 10,
  },
  closeButtonText: {
    fontFamily: 'serif',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
});