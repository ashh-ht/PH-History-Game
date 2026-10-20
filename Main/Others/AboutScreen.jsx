
import { useState, useRef } from 'react';
import {
  ImageBackground,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  View,
  Animated,
  Pressable,
} from 'react-native';

import Sound_clicks from '../../Components/Sound_clicks';
import styles from '../../Styles/Others/StyleAbout';

function About_screen({ navigation }) {
  const [activeOverlay, setActiveOverlay] = useState(null);

  // Spring animation values for the top-left buttons
  const returnScale = useRef(new Animated.Value(1)).current;
  const journalScale = useRef(new Animated.Value(1)).current;

  const [returnPressed, setReturnPressed] = useState(false);
  const [journalPressed, setJournalPressed] = useState(false);

  const handlePress = (label) => {
    if (label === 'Credits') setActiveOverlay('Credits');
    else if (label === 'About Team') setActiveOverlay('AboutTeam');
  };

  const animateButton = (scale, pressed, setPressed, value) => {
    setPressed(value);

    Animated.spring(scale, {
      toValue: value ? 0.88 : 1,
      friction: 4,
      tension: 180,
      useNativeDriver: true,
    }).start();
  };

  const PillButton = ({ label }) => (
    <Sound_clicks
      style={styles.pillButton}
      onPress={() => handlePress(label)}
    >
      <Image
        source={require('../../assets/pillbutton.png')}
        style={styles.pillImage}
        resizeMode="stretch"
      />
      <Text style={styles.pillText}>{label}</Text>
    </Sound_clicks>
  );

  return (
    <ImageBackground
      source={require('../../assets/Settingbg.png')}
      style={styles.container}
    >
      {/* Top-left animated Return and Journal buttons */}
      <View style={styles.topIcon}>
        <Pressable
          onPressIn={() =>
            animateButton(
              returnScale,
              returnPressed,
              setReturnPressed,
              true
            )
          }
          onPressOut={() =>
            animateButton(
              returnScale,
              returnPressed,
              setReturnPressed,
              false
            )
          }
          onPress={() => navigation.goBack()}
        >
          <Animated.Image
            source={
              returnPressed
                ? require('../../assets/icons/x_buttonpressed.png')
                : require('../../assets/icons/x_button.png')
            }
            style={[
              styles.icon,
              { transform: [{ scale: returnScale }] },
            ]}
            resizeMode="contain"
          />
        </Pressable>

        <Pressable
          onPressIn={() =>
            animateButton(
              journalScale,
              journalPressed,
              setJournalPressed,
              true
            )
          }
          onPressOut={() =>
            animateButton(
              journalScale,
              journalPressed,
              setJournalPressed,
              false
            )
          }
          onPress={() => navigation.navigate('Journal')}
        >
          <Animated.Image
            source={
              journalPressed
                ? require('../../assets/icons/journal_buttonpressed.png')
                : require('../../assets/icons/journal_button.png')
            }
            style={[
              styles.icon,
              { transform: [{ scale: journalScale }] },
            ]}
            resizeMode="contain"
          />
        </Pressable>
      </View>

      <View style={styles.panel}>
        {/* Title */}
        <View style={styles.titleRow}>
          <View style={styles.titleRule} />
          <Text style={styles.title}>About</Text>
          <View style={styles.titleRule} />
        </View>

        {/* Button rows */}
        <View style={styles.row}>
          <PillButton label="Credits" />
          <PillButton label="About Team" />
        </View>
      </View>

      {/* Credits overlay */}
      {activeOverlay === 'Credits' && (
        <View style={styles.overlay}>
          <View style={styles.overlayPanel}>
            <Text style={styles.overlayTitle}>Credits</Text>

            <ScrollView style={styles.creditsScroll}>
              <Text style={styles.overlayBody}>
                <Text style={{ fontWeight: 'bold' }}>
                  Lead Developer
                </Text>
                {'\n'}
                Fulgencio, John Hendrick
                {'\n\n'}

                <Text style={{ fontWeight: 'bold' }}>
                  Game Design
                </Text>
                {'\n'}
                Sulla, Sylvia Heart
                {'\n'}
                Arellano, Janell Ashtene R.
                {'\n\n'}

                <Text style={{ fontWeight: 'bold' }}>
                  Programmer
                </Text>
                {'\n'}
                Arellano, Janell Ashtene
                {'\n'}
                Catapang, Maureign Anne Christyanna M.
                {'\n'}
                Solis, Markuz Andre Merek R.
                {'\n'}
                Sulla, Sylvia Heart L.
                {'\n\n'}

                <Text style={{ fontWeight: 'bold' }}>
                  Scriptwriter
                </Text>
                {'\n'}
                Arellano, Janell Ashtene
                {'\n'}
                Catapang, Maureign Anne Christyanna M.
                {'\n'}
                Solis, Markuz Andre Merek R.
                {'\n'}
                Sulla, Sylvia Heart L.
                {'\n\n'}

                <Text style={{ fontWeight: 'bold' }}>
                  SFX/BGM
                </Text>
                {'\n'}
                Solis, Markuz Andre Merek R.
              </Text>
            </ScrollView>

            <Sound_clicks
              style={styles.overlayClose}
              onPress={() => setActiveOverlay(null)}
            >
              <Text style={styles.overlayCloseText}>Close</Text>
            </Sound_clicks>
          </View>
        </View>
      )}

      {/* About Team overlay */}
      {activeOverlay === 'AboutTeam' && (
        <View style={styles.overlay}>
          <View style={styles.overlayPanel}>
            <Text style={styles.overlayTitle}>About the Team</Text>

            <Text style={styles.overlayBody}>
              We're a Team 67 sikibidi, a group of students who are
              interested in creating a Philippine history game tied
              to Spanish colonization. The team created a novel-like
              game to introduce it to people interested in
              history-based games.
            </Text>

            <Sound_clicks
              style={styles.overlayClose}
              onPress={() => setActiveOverlay(null)}
            >
              <Text style={styles.overlayCloseText}>Close</Text>
            </Sound_clicks>
          </View>
        </View>
      )}
    </ImageBackground>
  );
}

export default About_screen;
