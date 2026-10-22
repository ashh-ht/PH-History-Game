import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  ImageBackground,
  ScrollView,
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getUnlockedPart } from '../Others/saveProgress'; // adjust path if your file lives elsewhere
import Sound_clicks from '../../Components/Sound_clicks';

const PART_ROUTES = [
  'Part1',
  'Part2',
  'Part3',
  'Part4',
  'Part5',
  'Part6',
  'Part7',
  'Part8',
];

const UNLOCKED_IMAGES = [
  require('../../Background Images/PartSelect/Unlocked1.png'),
  require('../../Background Images/PartSelect/Unlocked2.png'),
  require('../../Background Images/PartSelect/Unlocked3.png'),
  require('../../Background Images/PartSelect/Unlocked4.png'),
  require('../../Background Images/PartSelect/Unlocked5.png'),
  require('../../Background Images/PartSelect/Unlocked6.png'),
  require('../../Background Images/PartSelect/Unlocked7.png'),
  require('../../Background Images/PartSelect/Unlocked8.png'),
];

const PREVIEW_IMAGES = [
  require('../../Background Images/PartSelect/Preview1.png'),
  require('../../Background Images/PartSelect/Preview2.png'),
  require('../../Background Images/PartSelect/Preview3.png'),
  require('../../Background Images/PartSelect/Preview4.png'),
  require('../../Background Images/PartSelect/Preview5.png'),
  require('../../Background Images/PartSelect/Preview6.png'),
  require('../../Background Images/PartSelect/Preview7.png'),
  require('../../Background Images/PartSelect/Preview8.png'),
];

const TAP_TO_CONTINUE_IMAGE = require('../../Background Images/PartSelect/TapToContinue.png');

const LOCKED_IMAGE = require('../../Background Images/PartSelect/Locked.png');
const BACKGROUND_IMAGE = require('../../Background Images/PartSelect/Continue Game.png');

const POLAROID_WIDTH = 180;
const POLAROID_HEIGHT = 180;
const VERTICAL_GAP = 20;

// Spring-animated return button.
function SpringBackButton({ onPress }) {
  const scale = useRef(new Animated.Value(1)).current;
  const [pressed, setPressed] = useState(false);

  const handlePressIn = () => {
    setPressed(true);

    Animated.spring(scale, {
      toValue: 0.85,
      speed: 30,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setPressed(false);

    Animated.spring(scale, {
      toValue: 1,
      speed: 20,
      bounciness: 10,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.backButton}
      hitSlop={10}
    >
      <Animated.Image
        source={
          pressed
            ? require('../../assets/icons/x_buttonpressed.png')
            : require('../../assets/icons/x_button.png')
        }
        style={[
          styles.backIcon,
          { transform: [{ scale }] },
        ]}
        resizeMode="contain"
      />
    </Pressable>
  );
}

// Spring animation for the polaroid press.
function PolaroidItem({ image, unlocked, onPress }) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.spring(scale, {
        toValue: 0.94,
        speed: 35,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        speed: 25,
        bounciness: 7,
        useNativeDriver: true,
      }),
    ]).start();

    onPress();
  };

  return (
    <Sound_clicks onPress={handlePress} disabled={!unlocked}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <Image
          source={unlocked ? image : LOCKED_IMAGE}
          style={styles.polaroid}
          resizeMode="contain"
        />
      </Animated.View>
    </Sound_clicks>
  );
}

function Chapter1Selection({ navigation }) {
  // Highest part the player has ever reached, loaded from saved progress
  const [unlockedPart, setUnlockedPart] = useState(1);
  const [showBackBtn, setShowBackBtn] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const { width } = useWindowDimensions();

  const instructionFloat = useRef(new Animated.Value(0)).current;

  // Reload saved progress every time this screen is shown,
  // so it survives closing the app and updates after finishing a part
  useFocusEffect(
    useCallback(() => {
      let active = true;
      getUnlockedPart().then((p) => {
        if (active) setUnlockedPart(p);
      });
      return () => {
        active = false;
      };
    }, [])
  );

  // Part 1 is always unlocked. Saved progress unlocks the later parts.
  const isUnlocked = (index) => index === 0 || index < unlockedPart;

  // Gently float the instruction image while a preview is visible.
  useEffect(() => {
    if (selectedIndex === null) {
      instructionFloat.setValue(0);
      return;
    }

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(instructionFloat, {
          toValue: -4,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(instructionFloat, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [selectedIndex, instructionFloat]);

  const handleScroll = (event) => {
    setShowBackBtn(event.nativeEvent.contentOffset.y < 50);
  };

  // First tap previews a part. Tapping the same part again opens it.
  const handlePolaroidPress = (index) => {
    if (!isUnlocked(index)) {
      return;
    }

    if (selectedIndex === index) {
      navigation.navigate(PART_ROUTES[index]);
      return;
    }

    setSelectedIndex(index);
  };

  return (
    <ImageBackground
      source={BACKGROUND_IMAGE}
      resizeMode="cover"
      style={styles.background}
    >
      {showBackBtn && (
        <SpringBackButton onPress={() => navigation.goBack()} />
      )}

      {/* Preview and instruction stay hidden until a polaroid is tapped. */}
      {selectedIndex !== null && (
        <View
          pointerEvents="none"
          style={[
            styles.previewArea,
            { width: Math.max(130, width - 390) },
          ]}
        >
          <View style={styles.previewGlow}>
            <Image
              key={selectedIndex}
              source={PREVIEW_IMAGES[selectedIndex]}
              style={styles.previewImage}
              resizeMode="contain"
            />
          </View>

          <Animated.View
            style={[
              styles.tapInstruction,
              {
                transform: [{ translateY: instructionFloat }],
              },
            ]}
          >
            <Image
              source={TAP_TO_CONTINUE_IMAGE}
              style={styles.tapInstructionImage}
              resizeMode="contain"
            />
          </Animated.View>
        </View>
      )}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.list}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {UNLOCKED_IMAGES.map((image, index) => {
          const unlocked = isUnlocked(index);

          return (
            <View
              key={index}
              style={[
                styles.polaroidPosition,
                {
                  marginLeft: index % 2 === 0 ? 0 : 100,
                },
              ]}
            >
              <PolaroidItem
                image={image}
                unlocked={unlocked}
                onPress={() => handlePolaroidPress(index)}
              />
            </View>
          );
        })}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  backButton: {
    position: 'absolute',
    top: 32,
    left: 25,
    zIndex: 10,
  },

  backIcon: {
    width: 35,
    height: 25,
  },

  previewArea: {
    position: 'absolute',
    left: 12,
    top: 20,
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },

  previewGlow: {
    width: '100%',
    alignItems: 'center',
    shadowColor: '#FFD45C',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },

  previewImage: {
    width: '100%',
    height: 290,
  },

  tapInstruction: {
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
  },

  tapInstructionImage: {
    width: '90%',
    height: 45,
  },

  scrollView: {
    flex: 1,
    marginTop: 180,
  },

  list: {
    paddingLeft: 10,
    paddingRight: 100,
    paddingBottom: 40,
    alignItems: 'flex-start',
    width: 340,
    alignSelf: 'flex-end',
  },

  polaroidPosition: {
    width: POLAROID_WIDTH,
    height: POLAROID_HEIGHT,
    marginBottom: VERTICAL_GAP,
  },

  polaroid: {
    width: POLAROID_WIDTH,
    height: POLAROID_HEIGHT,
  },
});

export default Chapter1Selection;