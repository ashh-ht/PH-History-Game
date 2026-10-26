
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
import { useGameProgress } from '../../GameProgress';
import { getUnlockedPart, markPartReached } from '../Others/saveProgress';
import Sound_clicks from '../../Components/Sound_clicks';

import ChapterUnlockSequence, { UnlockingPolaroid } from './ChapterUnlockSequence';
import ChapterCompleted from './ChapterCompleted';

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


const HOME_ROUTE = 'Home';


let pendingSequence = null;
const PENDING_MAX_AGE_MS = 60000;
const readPending = () =>
  pendingSequence && Date.now() - pendingSequence.at < PENDING_MAX_AGE_MS
    ? pendingSequence.seq
    : null;

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


function PolaroidItem({ image, unlocked, selected, onPress }) {
  const scale = useRef(new Animated.Value(1)).current;
  const pulse = useRef(new Animated.Value(0)).current;

  
  useEffect(() => {
    if (!selected) {
      pulse.setValue(0);
      return;
    }

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [selected, pulse]);

  const highlightOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 1],
  });

  const selectedScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1.04, 1.08],
  });

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
        <Animated.View
          style={
            selected
              ? { transform: [{ scale: selectedScale }] }
              : undefined
          }
        >
          {selected && (
            <Animated.View
              pointerEvents="none"
              style={[styles.selectedHighlight, { opacity: highlightOpacity }]}
            />
          )}

          <Image
            source={unlocked ? image : LOCKED_IMAGE}
            style={styles.polaroid}
            resizeMode="contain"
          />
        </Animated.View>
      </Animated.View>
    </Sound_clicks>
  );
}

function Chapter1Selection({ navigation, route }) {
  const { part, setPart } = useGameProgress();
  const [showBackBtn, setShowBackBtn] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const { width } = useWindowDimensions();

  const [highestPart, setHighestPart] = useState(1);


  useFocusEffect(
    useCallback(() => {
      let active = true;
      getUnlockedPart().then((p) => {
        console.log('[part-select] highestPart from storage =', p);
        if (active) setHighestPart(p);
      });
      return () => {
        active = false;
      };
    }, [])
  );

  const instructionFloat = useRef(new Animated.Value(0)).current;

  const restored = useRef(readPending()).current;

  const scrollRef = useRef(null);
  const scrollMetrics = useRef({ offset: 0, viewH: 0, contentH: 0 });
  const revealProgress = useRef(new Animated.Value(restored ? 1 : 0)).current;
  const [sequence, setSequence] = useState(restored);
  const [revealedIndex, setRevealedIndex] = useState(
    restored ? restored.nextIndex : null
  );
  const [showCompleted, setShowCompleted] = useState(!!restored);
  const handledToken = useRef(restored ? restored.token : null);


  useEffect(() => {
    console.log('[part-select] mounted, restored =', !!restored);
    return () => console.log('[part-select] unmounted');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isUnlockedBase = (index) => index === 0 || index < part;

  const isUnlocked = (index) =>
    isUnlockedBase(index) ||
    index < highestPart ||
    (revealedIndex !== null && index <= revealedIndex);

  const incomingSequence = route?.params?.unlockSequence;

  useEffect(() => {
    if (!incomingSequence) return;
    if (handledToken.current === incomingSequence.token) return;
    handledToken.current = incomingSequence.token;

    console.log('[part-select] incoming sequence', incomingSequence);

    const completedIndex = incomingSequence.completedPart - 1;
    const nextIndex =
      completedIndex + 1 < PART_ROUTES.length ? completedIndex + 1 : null;

    const newSequence = {
      token: incomingSequence.token,
      completedIndex,
      nextIndex,
      needsReveal: nextIndex !== null && !isUnlockedBase(nextIndex),
    };

    pendingSequence = { seq: newSequence, at: Date.now() };

    revealProgress.setValue(0);
    setRevealedIndex(null);
    setSelectedIndex(null);
    setShowCompleted(false);
    setSequence(newSequence);


    navigation.setParams({ unlockSequence: undefined });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incomingSequence?.token]);

  useEffect(() => {
    if (!sequence) return undefined;
    const id = setTimeout(() => {
      console.log('[part-select] failsafe -> show completed');
      setShowCompleted(true);
    }, 15000);
    return () => clearTimeout(id);
  }, [sequence?.token]); // eslint-disable-line react-hooks/exhaustive-deps


  const handleSequenceDone = () => setShowCompleted(true);

 
  const handleRevealDone = () => {
    if (!sequence || sequence.nextIndex === null) return;
    setRevealedIndex(sequence.nextIndex);
  };


  const commitUnlock = () => {
    if (sequence && sequence.nextIndex !== null) {
      const reached = sequence.nextIndex + 1;
      setPart(Math.max(part, reached));
      markPartReached(reached);
      setHighestPart((h) => Math.max(h, reached));
    }
  };


  const handleShowPreview = (index) => {
    setSelectedIndex(index);
  };

  const handleReturnToMenu = () => {
    commitUnlock(); 
    pendingSequence = null; 
    setSequence(null);
    setShowCompleted(false);
    setSelectedIndex(null);
    navigation.reset({ index: 0, routes: [{ name: HOME_ROUTE }] });
  };


  const handleContinue = () => {
    const nextIndex = sequence?.nextIndex;
    commitUnlock(); 
    pendingSequence = null; 
    setSequence(null);
    setShowCompleted(false);
    setSelectedIndex(null);
    if (nextIndex !== null && nextIndex !== undefined) {
      navigation.navigate(PART_ROUTES[nextIndex]);
    }
  };

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
    scrollMetrics.current.offset = event.nativeEvent.contentOffset.y;
    setShowBackBtn(event.nativeEvent.contentOffset.y < 50);
  };


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
      <SpringBackButton onPress={() => navigation.goBack()} />

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
        ref={scrollRef}
        onLayout={(e) => {
          scrollMetrics.current.viewH = e.nativeEvent.layout.height;
        }}
        onContentSizeChange={(_, h) => {
          scrollMetrics.current.contentH = h;
        }}
        style={styles.scrollView}
        contentContainerStyle={styles.list}
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
              {/* [UNLOCK-SEQ] the polaroid being unlocked uses the animated version. */}
              {sequence && sequence.needsReveal && sequence.nextIndex === index ? (
                <UnlockingPolaroid
                  lockedImage={LOCKED_IMAGE}
                  unlockedImage={image}
                  progress={revealProgress}
                  width={POLAROID_WIDTH}
                  height={POLAROID_HEIGHT}
                />
              ) : (
                <PolaroidItem
                  image={image}
                  unlocked={unlocked}
                  onPress={() => handlePolaroidPress(index)}
                />
              )}
            </View>
          );
        })}
      </ScrollView>

      {/* [UNLOCK-SEQ] cinematic overlay. CHANGED: not mounted once the
          buttons screen is showing (or after a restore), so it can't restart. */}
      {sequence && !showCompleted && (
        <ChapterUnlockSequence
          key={sequence.token}
          sequence={sequence}
          scrollRef={scrollRef}
          scrollMetrics={scrollMetrics}
          revealProgress={revealProgress}
          itemHeight={POLAROID_HEIGHT}
          itemStride={POLAROID_HEIGHT + VERTICAL_GAP}
          onRevealDone={handleRevealDone}
          onShowPreview={handleShowPreview}
          onSequenceDone={handleSequenceDone}
        />
      )}

      {/* Owned by PartSelect, so it can't be lost if the sequence restarts */}
      {sequence && showCompleted && (
        <ChapterCompleted
          showContinue={sequence.nextIndex !== null}
          onReturnToMenu={handleReturnToMenu}
          onContinue={handleContinue}
        />
      )}
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
    left: 20,
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
    left: 20
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


  selectedHighlight: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 12,
    elevation: 10,
  },
});

export default Chapter1Selection;