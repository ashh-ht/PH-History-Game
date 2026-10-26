import { useState, useRef } from 'react';
import {
  Image,
  Text,
  View,
  Animated,
  ImageBackground,
  Pressable,
  StyleSheet,
  useWindowDimensions
} from 'react-native';
import useScale from '../../Components/ScreenScaler';
import styles from '../../Styles/Others/StyleSettings';
import { useAudio } from '../../Audiostore';

const BG_PARCHMENT = require('../../assets/Settings_Assets/Settings_Base.png');

const BTN_SAVES = require('../../assets/Settings_Assets/Settings_Saves.png');
const BTN_GAMEPLAY = require('../../assets/Settings_Assets/Settings_Gameplay.png');
const BTN_AUDIO = require('../../assets/Settings_Assets/Settings_Audio.png');
const BTN_DISPLAY = require('../../assets/Settings_Assets/Settings_Display.png');
const BTN_SOURCES = require('../../assets/Settings_Assets/Settings_Sources.png');
const BTN_ABOUT = require('../../assets/Settings_Assets/Settings_About.png');
const BTN_EXIT = require('../../assets/Settings_Assets/Settings_ExitGame.png');

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

const GUIDE_LEFT = [
  { label: 'Saves',    text: 'Review and manage your saved progress.' },
  { label: 'Gameplay', text: 'Change the text speed and auto-play.' },
  { label: 'Audio',    text: 'Adjust the music and sound volume.' },
  { label: 'Display',  text: 'Change the text size and the dialogue box.' },
];

const GUIDE_RIGHT = [
  { label: 'Sources',   text: 'See the historical sources behind the story.' },
  { label: 'About',     text: 'Learn about the game and its team.' },
  { label: 'Exit Game', text: 'Leave the story and go back to the main menu.' },
  { label: 'X button',  text: 'Close settings and go back to the game.' },
];

const GUIDE_PAGES = [
  { title: 'SETTINGS GUIDE', type: 'settings' },
  {
    title: 'MAKING CHOICES',
    type: 'image',
    image: require('../../assets/guide/decide.png'),
    description: 'At key moments in the story, you will be asked to make a decision. Tap a choice to see what happens next. Your decision leads you to the next scene.',
  },
  {
    title: 'MINIGAMES',
    type: 'image',
    image: require('../../assets/guide/quiz.png'),
    description: 'Along the way, you will play minigames such as quizzes and more. Test what you have learned to move the story forward.',
  },
  {
    title: 'REMNANTS',
    type: 'image',
    image: require('../../assets/guide/remnant_tutorial.png'),
    description: 'When you answer a question correctly during a quiz, you earn a remnant. Every remnant you collect is saved in your Journal.',
  },
];

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

function AnimatedHelpButton({ onPress, size }) {
  const scale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const animate = (isPressed) => {
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
        style={[
          guideStyles.helpCircle,
          { width: size, height: size, borderRadius: size / 2 },
        ]}
      >
        <Text
          style={[guideStyles.helpText, { fontSize: size * 0.62 }]}
          allowFontScaling={false}
        >
          ?
        </Text>
      </Sound_clicks>
    </Animated.View>
  );
}

function AnimatedPanelButton({ source, onPress, containerStyle, imageStyle }) {
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

function GuideColumn({ items, s }) {
  return (
    <View style={guideStyles.guideColumn}>
      {items.map((item) => (
        <View key={item.label} style={guideStyles.guideRow}>
          <Text
            style={[guideStyles.guideLabel, { fontSize: 15 * s }]}
            allowFontScaling={false}
          >
            {item.label}
          </Text>
          <Text
            style={[
              guideStyles.guideText,
              { fontSize: 12.5 * s, lineHeight: 17 * s },
            ]}
            allowFontScaling={false}
          >
            {item.text}
          </Text>
        </View>
      ))}
    </View>
  );
}

function SettingsGuide({ onClose, s, winW, winH }) {
  const [page, setPage] = useState(0);
  const boxW = Math.min(winW * 0.88, 720);
  const current = GUIDE_PAGES[page];
  const isFirst = page === 0;
  const isLast = page === GUIDE_PAGES.length - 1;
  const imgH = winH * 0.4;

  return (
    <View style={guideStyles.guideOverlay}>
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

      <View
        style={[
          guideStyles.guideBox,
          { width: boxW, maxHeight: winH * 0.94 },
        ]}
      >
        <Text
          style={[guideStyles.guideTitle, { fontSize: 22 * s }]}
          allowFontScaling={false}
        >
          {current.title}
        </Text>

        {current.type === 'settings' ? (
          <>
            <Text
              style={[guideStyles.guideIntro, { fontSize: 12.5 * s }]}
              allowFontScaling={false}
            >
              Tap a button to open it. Here is what each one does:
            </Text>

            <View style={guideStyles.guideColumns}>
              <GuideColumn items={GUIDE_LEFT} s={s} />
              <GuideColumn items={GUIDE_RIGHT} s={s} />
            </View>
          </>
        ) : (
          <>
            <Text
              style={[
                guideStyles.guideDescription,
                { fontSize: 13.5 * s, lineHeight: 19 * s },
              ]}
              allowFontScaling={false}
            >
              {current.description}
            </Text>
            <Image
              source={current.image}
              style={{ width: '100%', height: imgH, marginBottom: 10 }}
              resizeMode="contain"
            />
          </>
        )}

        <View style={guideStyles.dotsRow}>
          {GUIDE_PAGES.map((_, i) => (
            <View
              key={i}
              style={[guideStyles.dot, i === page && guideStyles.dotActive]}
            />
          ))}
        </View>

        <View style={guideStyles.navRow}>
          <Sound_clicks
            style={[guideStyles.navBtn, isFirst && { opacity: 0.35 }]}
            onPress={() => !isFirst && setPage(page - 1)}
          >
            <Text
              style={[guideStyles.guideCloseText, { fontSize: 16 * s }]}
              allowFontScaling={false}
            >
              Back
            </Text>
          </Sound_clicks>

          <Sound_clicks
            style={guideStyles.navBtn}
            onPress={() => (isLast ? onClose() : setPage(page + 1))}
          >
            <Text
              style={[guideStyles.guideCloseText, { fontSize: 16 * s }]}
              allowFontScaling={false}
            >
              {isLast ? 'Got it' : 'Next'}
            </Text>
          </Sound_clicks>
        </View>
      </View>
    </View>
  );
}

function Setting_screen({ navigation }) {
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const { s, insets } = useScale();
  const { width: winW, height: winH } = useWindowDimensions();
  const { playMusic, stopLoops } = useAudio();

  const handleExitToMenu = () => {
    setShowExitConfirm(false);
    stopLoops();
    playMusic('somber');
    navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
  };

  const panelH = Math.min(winH * 0.92, 700, (winW * 0.9) / PANEL_ASPECT);
  const panelW = panelH * PANEL_ASPECT;

  const btnW = panelW * BTN_W;
  const btnH = btnW / BTN_ASPECT;
  const exitW = panelW * EXIT_W;
  const exitH = exitW / EXIT_ASPECT;

  const iconSize = 40 * s;
  const iconTop = Math.max(insets.top, 12 * s);
  const iconLeft = Math.max(insets.left, 20 * s);

  const dynamicStyles = {
    topIconContainer: {
      top: iconTop,
      left: iconLeft,
    },
    topIconImage: {
      width: iconSize,
      height: iconSize,
    },
  };

  return (
    <View style={styles.screenOverlay}>

      <View style={[styles.topIconContainer, dynamicStyles.topIconContainer]}>
        <AnimatedTopButton
          normalSource={require('../../assets/icons/x_button.png')}
          pressedSource={require('../../assets/icons/x_buttonpressed.png')}
          onPress={() => navigation.goBack()}
          imageStyle={dynamicStyles.topIconImage}
        />
      </View>

      <View
        style={[
          guideStyles.helpWrap,
          { top: iconTop, left: iconLeft + iconSize + 12 * s },
        ]}
      >
        <AnimatedHelpButton size={iconSize} onPress={() => setShowGuide(true)} />
      </View>

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

      {showGuide && (
        <SettingsGuide
          onClose={() => setShowGuide(false)}
          s={s}
          winW={winW}
          winH={winH}
        />
      )}

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

const guideStyles = StyleSheet.create({
  helpWrap: {
    position: 'absolute',
    zIndex: 20,
    elevation: 20,
  },

  helpCircle: {
    backgroundColor: '#AE8160',
    borderWidth: 2,
    borderColor: '#6b4a2f',
    alignItems: 'center',
    justifyContent: 'center',
  },

  helpText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    includeFontPadding: false,
    textAlign: 'center',
  },

  guideOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 200,
    elevation: 200,
  },

  guideBox: {
    backgroundColor: '#F4E4C8',
    borderWidth: 2,
    borderColor: '#A87C5E',
    borderRadius: 15,
    paddingVertical: 18,
    paddingHorizontal: 26,
    alignItems: 'center',
  },

  guideTitle: {
    color: '#5A4A32',
    fontWeight: 'bold',
    letterSpacing: 1.5,
    textAlign: 'center',
  },

  guideIntro: {
    color: '#5A4A32',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 12,
  },

  guideDescription: {
    color: '#4a3b27',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 10,
  },

  guideColumns: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    gap: 24,
  },

  guideColumn: {
    flex: 1,
  },

  guideRow: {
    marginBottom: 10,
  },

  guideLabel: {
    color: '#352313',
    fontWeight: 'bold',
  },

  guideText: {
    color: '#4a3b27',
    marginTop: 1,
  },

  guideCloseText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  dotsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
    marginBottom: 10,
  },

  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#C9B08A',
  },

  dotActive: {
    backgroundColor: '#5A4A32',
  },

  navRow: {
    flexDirection: 'row',
    gap: 16,
  },

  navBtn: {
    paddingVertical: 10,
    paddingHorizontal: 34,
    backgroundColor: '#A87C5E',
    borderWidth: 2,
    borderColor: '#5A4A32',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Setting_screen;