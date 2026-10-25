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

const BTN_TEAM_C = require('../../assets/Settings_Assets/About_TeamClicked.png');
const BTN_GAME_C = require('../../assets/Settings_Assets/About_GameClicked.png');

const PANEL_ASPECT = 1205 / 630;
const BTN_W = 0.55;
const BTN_ASPECT = 1.45;
const BTN_TOP = 0.16;
const COLS = [0.02, 0.42];
const POPUP_MAX_W = 0.80;
const POPUP_MAX_H = 0.85;
const TEXT_TOP = 0.28;
const TEXT_BOTTOM = 0.08;
const TEXT_SIDE = 0.12;

function SpringImageButton({ image, pressedImage, onPress, imageStyle }) {
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
      <Sound_clicks
        onPressIn={() => animatePress(true)}
        onPressOut={() => animatePress(false)}
        onPress={onPress}
      >
        <Image source={pressed ? pressedImage : image} style={imageStyle} resizeMode="stretch" />
      </Sound_clicks>
    </Animated.View>
  );
}

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
    <Modal transparent animationType="fade" statusBarTranslucent supportedOrientations={['landscape', 'portrait']} onRequestClose={onClose}>
      <View style={styles.backdrop}>
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
    topIconImage: { width: 40 * s, height: 40 * s },
  };

  const closeOverlay = () => setActiveOverlay(null);

  return (
    <View style={styles.screenOverlay}>
      <View style={[styles.topIconContainer, dynamicStyles.topIconContainer]}>
        <SpringImageButton 
          image={require('../../assets/icons/x_button.png')}
          pressedImage={require('../../assets/icons/x_buttonpressed.png')}
          onPress={() => navigation.goBack()}
          imageStyle={dynamicStyles.topIconImage}
        />
      </View>

      <ImageBackground source={BG_MAIN} style={{ width: panelW, height: panelH }} resizeMode="stretch">
        <View style={{ position: 'absolute', left: COLS[0] * panelW, top: BTN_TOP * panelH, width: btnW, height: btnH }}>
          <SpringImageButton 
            image={BTN_TEAM}
            pressedImage={BTN_TEAM_C}
            onPress={() => setActiveOverlay('Team')}
            imageStyle={{ width: btnW, height: btnH }}
          />
        </View>

        <View style={{ position: 'absolute', left: COLS[1] * panelW, top: BTN_TOP * panelH, width: btnW, height: btnH }}>
          <SpringImageButton 
            image={BTN_GAME}
            pressedImage={BTN_GAME_C}
            onPress={() => setActiveOverlay('Game')}
            imageStyle={{ width: btnW, height: btnH }}
          />
        </View>
      </ImageBackground>

      {activeOverlay === 'Game' && (
        <InfoOverlay source={BG_GAME_OVERLAY} onClose={closeOverlay}>
          <Text style={styles.overlayBody}>
            PAMANA: Chronicles of Philippine History, is an educational game that brings Philippine history to life through interactive storytelling and engaging minigames. It aims to make learning about the country's past more enjoyable, accessible, and meaningful for young players.
            {'\n\n'}
            Traditional history lessons can sometimes feel overwhelming or difficult to connect with. PAMANA provides an opportunity to explore historical events, understand the struggles and contributions of Filipino heroes, and develop a deeper appreciation for our cultural heritage.
            {'\n\n'}
            <Text style={styles.boldText}>Our Goal:</Text> To promote historical awareness, strengthen Filipino identity, and encourage young learners to discover and preserve the nation's rich history through fun and interactive gameplay.
          </Text>
        </InfoOverlay>
      )}

      {activeOverlay === 'Team' && (
        <InfoOverlay source={BG_TEAM_OVERLAY} onClose={closeOverlay}>
          <Text style={styles.overlayBody}>
            The Pamana Development Team is a group of Computer Science students from Technological Institute of the Philippines QC with different skills and talents. The team was formed to create Pamana as a school project. Together, they work to make the game fun, interesting, and educational for players.
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