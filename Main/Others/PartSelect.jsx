// UI BUTTONS + DESIGN

import { useEffect, useRef, useState } from 'react';
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
import { useGameProgress } from '../../GameProgress';
import { getUnlockedPart } from '../Others/saveProgress';
import Sound_clicks from '../../Components/Sound_clicks';
// [UNLOCK-SEQ] new imports
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

// [UNLOCK-SEQ] Same destination your Part 8 handler already used for "back to menu".
const HOME_ROUTE = 'Home';

// CHANGED: survives a remount of this screen (module-level, not component state).
// Expires after 60s so a stale value can never show up on a later visit.
let pendingSequence = null; // { seq, at }
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

// [UNLOCK-SEQ] now also receives `route`
function Chapter1Selection({ navigation, route }) {
  // [UNLOCK-SEQ] also reads setPart (already part of your GameProgress context)
  const { part, setPart } = useGameProgress();
  const [showBackBtn, setShowBackBtn] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const { width } = useWindowDimensions();

  const instructionFloat = useRef(new Animated.Value(0)).current;

  // CHANGED: if this screen was remounted mid-sequence, restore it and
  // go straight to the buttons instead of losing everything.
  const restored = useRef(readPending()).current;

  // [UNLOCK-SEQ] ---- unlock sequence state ----
  const scrollRef = useRef(null);
  const scrollMetrics = useRef({ offset: 0, viewH: 0, contentH: 0 });
  const revealProgress = useRef(new Animated.Value(restored ? 1 : 0)).current;
  const [sequence, setSequence] = useState(restored);
  const [revealedIndex, setRevealedIndex] = useState(
    restored ? restored.nextIndex : null
  );
  const [showCompleted, setShowCompleted] = useState(!!restored);
  const handledToken = useRef(restored ? restored.token : null);

  // CHANGED: log so we can tell if this screen ever remounts.
  useEffect(() => {
    console.log('[part-select] mounted, restored =', !!restored);
    return () => console.log('[part-select] unmounted');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Part 1 is always unlocked. Progress unlocks the later parts.
  // [UNLOCK-SEQ] original rule, kept under a new name
  const isUnlockedBase = (index) => index === 0 || index < part;

  // [UNLOCK-SEQ] original rule plus the polaroid revealed by the sequence
  const isUnlocked = (index) =>
    isUnlockedBase(index) ||
    (revealedIndex !== null && index <= revealedIndex);

  // [UNLOCK-SEQ] Start the sequence when Compilation.jsx sends the player here
  // with params { unlockSequence: { completedPart, token } }.
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

    // CHANGED: remember it outside component state
    pendingSequence = { seq: newSequence, at: Date.now() };

    revealProgress.setValue(0);
    setRevealedIndex(null);
    setSelectedIndex(null);
    setShowCompleted(false);
    setSequence(newSequence);

    // Clear the params so coming back to this screen later never replays it.
    navigation.setParams({ unlockSequence: undefined });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incomingSequence?.token]);

  // Failsafe: the buttons screen always appears, even if the timeline stalls.
  useEffect(() => {
    if (!sequence) return undefined;
    const id = setTimeout(() => {
      console.log('[part-select] failsafe -> show completed');
      setShowCompleted(true);
    }, 15000);
    return () => clearTimeout(id);
  }, [sequence?.token]); // eslint-disable-line react-hooks/exhaustive-deps

  // Called when the timeline finishes normally.
  const handleSequenceDone = () => setShowCompleted(true);

  // CHANGED: no setPart here anymore. Updating shared progress in the middle
  // of the sequence is the suspected cause of the screen losing its state.
  const handleRevealDone = () => {
    if (!sequence || sequence.nextIndex === null) return;
    setRevealedIndex(sequence.nextIndex);
  };

  // CHANGED: progress is saved when the player leaves, same value as before.
  const commitUnlock = () => {
    if (sequence && sequence.nextIndex !== null) {
      setPart(Math.max(part, sequence.nextIndex + 1));
    }
  };

  // Shows the preview of the newly unlocked part next to its polaroid
  // (same preview you get when you tap a polaroid).
  const handleShowPreview = (index) => {
    setSelectedIndex(index);
  };

  // [UNLOCK-SEQ] RETURN TO MENU: same reset your Part 8 handler used.
  const handleReturnToMenu = () => {
    commitUnlock(); // CHANGED
    pendingSequence = null; // CHANGED
    setSequence(null);
    setShowCompleted(false);
    setSelectedIndex(null);
    navigation.reset({ index: 0, routes: [{ name: HOME_ROUTE }] });
  };

  // [UNLOCK-SEQ] CONTINUE: same destination onPartComplete used (Part N+1).
  const handleContinue = () => {
    const nextIndex = sequence?.nextIndex;
    commitUnlock(); // CHANGED
    pendingSequence = null; // CHANGED
    setSequence(null);
    setShowCompleted(false);
    setSelectedIndex(null);
    if (nextIndex !== null && nextIndex !== undefined) {
      navigation.navigate(PART_ROUTES[nextIndex]);
    }
  };

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
    // [UNLOCK-SEQ] remember the offset for the sequence
    scrollMetrics.current.offset = event.nativeEvent.contentOffset.y;
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

      {/* Preview and instruction stay hidden until a polaroid is tapped,
          or until the unlock sequence shows the new part's preview. */}
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
        ref={scrollRef} // [UNLOCK-SEQ]
        onLayout={(e) => {
          // [UNLOCK-SEQ]
          scrollMetrics.current.viewH = e.nativeEvent.layout.height;
        }}
        onContentSizeChange={(_, h) => {
          // [UNLOCK-SEQ]
          scrollMetrics.current.contentH = h;
        }}
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