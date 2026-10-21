<<<<<<< Updated upstream
import { useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
=======
import { useMemo, useRef, useState } from 'react';
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
>>>>>>> Stashed changes
import Sound_clicks from '../../Components/Sound_clicks';
import useScale from '../../Components/ScreenScaler';

const PILL = require('../../assets/pillbutton.png');

// this is for the buttons so it won't mess up sa other biger screen
const { width: PILL_W, height: PILL_H } = Image.resolveAssetSource(PILL);
const PILL_RATIO = PILL_W / PILL_H;

const SETTING_ITEMS = ['Saves', 'Educational', 'Gameplay', 'About', 'Audio', 'Exit', 'Display'];

<<<<<<< Updated upstream
=======
// =====================================================
// ANIMATED TOP BUTTON
// =====================================================

function AnimatedTopButton({
  normalSource,
  pressedSource,
  onPress,
  iconStyle,
}) {
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
    <Animated.View
      style={{
        transform: [{ scale }, { translateY }],
      }}
    >
      <Pressable
        onPressIn={() => animate(true)}
        onPressOut={() => animate(false)}
        onPress={onPress}
      >
        <Image
          source={pressed ? pressedSource : normalSource}
          style={iconStyle}
          resizeMode="contain"
        />
      </Pressable>
    </Animated.View>
  );
}

// =====================================================
// SETTINGS SCREEN
// =====================================================

>>>>>>> Stashed changes
function Setting_screen({ navigation }) {
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const { s, height, insets } = useScale();

  const styles = useMemo(
    () => makeStyles(s, height, insets),
    [s, height, insets.top, insets.left],
  );

  const handlePress = (label) => {
    if (label === 'Audio') {
      navigation.navigate('AudioScreen');
    } else if (label === 'Saves') {
      navigation.navigate('SaveScreen');
    } else if (label === 'Educational') {
      navigation.navigate('Educational');
    } else if (label === 'Gameplay') {
      navigation.navigate('GameplayScreen');
    } else if (label === 'About') {
      navigation.navigate('About');
    } else if (label === 'Display') {
      navigation.navigate('DisplayScreen');
    } else if (label === 'Exit') {
      setShowExitConfirm(true);
    }
  };

  return (
    <View style={[styles.container, styles.overlay]}>
      <View style={styles.topIcon}>
<<<<<<< Updated upstream
        <Sound_clicks onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/return.png')} style={styles.icon} />
        </Sound_clicks>
        <Sound_clicks onPress={() => navigation.navigate('Journal')}>
          <Image source={require('../../assets/Journal_page.png')} style={styles.icon} />
        </Sound_clicks>
=======

        {/* X / RETURN BUTTON */}
        <AnimatedTopButton
          normalSource={require('../../assets/icons/x_button.png')}
          pressedSource={require('../../assets/icons/x_buttonpressed.png')}
          onPress={() => navigation.goBack()}
          iconStyle={styles.icon}
        />

        {/* JOURNAL BUTTON */}
        <AnimatedTopButton
          normalSource={require('../../assets/icons/journal_button.png')}
          pressedSource={require('../../assets/icons/journal_buttonpressed.png')}
          onPress={() => navigation.navigate('Journal')}
          iconStyle={styles.icon}
        />

>>>>>>> Stashed changes
      </View>

      <View style={styles.settingPanel}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
        >
          {SETTING_ITEMS.map((label) => (
            <Sound_clicks
              key={label}
              style={styles.cyclinderbutton}
              onPress={() => handlePress(label)}
            >
              <Image source={PILL} style={styles.imagepillbutton} resizeMode="stretch" />
              <Text
                style={styles.cylindertexts}
                numberOfLines={1}
                adjustsFontSizeToFit
                allowFontScaling={false}
              >
                {label}
              </Text>
            </Sound_clicks>
          ))}
        </ScrollView>
      </View>

      {showExitConfirm && (
        <View style={styles.confirmOverlay}>
          <View style={styles.confirmPanel}>
            <Text style={styles.confirmText} allowFontScaling={false}>
              Do you want to exit?
            </Text>

            <View style={styles.confirmButtonsRow}>
              <Sound_clicks
                style={styles.confirmButton}
                onPress={() => setShowExitConfirm(false)}
              >
                <Image source={PILL} style={styles.confirmButtonImage} resizeMode="stretch" />
                <Text style={styles.cylindertexts} allowFontScaling={false}>No</Text>
              </Sound_clicks>

              <Sound_clicks
                style={styles.confirmButton}
                onPress={() => navigation.navigate('Home')}
              >
                <Image source={PILL} style={styles.confirmButtonImage} resizeMode="stretch" />
                <Text style={styles.cylindertexts} allowFontScaling={false}>Yes</Text>
              </Sound_clicks>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const makeStyles = (s, height, insets) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.55)',
    },
    topIcon: {
      position: 'absolute',
      zIndex: 10, // icons stay on top of the panel
      top: Math.max(insets.top, 12 * s),
      left: Math.max(insets.left, 20 * s),
      flexDirection: 'row',
      gap: 15 * s,
    },
    icon: {
      width: 70 * s,
      height: 70 * s,
    },
    settingPanel: {
      backgroundColor: '#FFF2CB',
      borderRadius: 15 * s,
      padding: 20 * s,
      width: '70%',
      maxWidth: 700,
      height: height * 0.55,
      alignSelf: 'center',
    },
    scroll: {
      flexGrow: 0,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingTop: -14 * s
    },
    cyclinderbutton: {
      width: '45%',
      aspectRatio: PILL_RATIO,
      marginBottom: 10 * s,
      alignItems: 'center',
      justifyContent: 'center',
    },
    imagepillbutton: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
    cylindertexts: {
      fontSize: 23 * s,
      fontWeight: '500',
    },
    // try for the setting that have problems with bigger screen
    confirmOverlay: {
    position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9,
        elevation: 10,
      },
    confirmPanel: {
      backgroundColor: '#FFF2CB',
      borderRadius: 15 * s,
      padding: 30 * s,
      width: '45%',
      minWidth: 280 * s,
      maxWidth: 600,
      alignItems: 'center',
    },
    confirmText: {
      fontSize: 50 * s,
      fontWeight: '600',
      textAlign: 'center',
      marginBottom: 20 * s,
    },
    confirmButtonsRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 30 * s,
    },
    confirmButton: {
      width: 250 * s,
      height: 90 * s,
      alignItems: 'center',
      justifyContent: 'center',
    },
    confirmButtonImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
  });

export default Setting_screen;