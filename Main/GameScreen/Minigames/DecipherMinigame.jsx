import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  Animated,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";

import { useAudio } from "../../../Audiostore"; // same file PartRenderer uses

// =====================================================
// ARTWORK
// These are the same images the story screens use.
// This file lives in the Minigames folder, so the paths
// go one folder deeper than PartRenderer's. Adjust them
// if your folders are laid out differently.
//
// To use a real scroll image, drop it in assets/foreground
// and change IMG.panel to point at it. That's the only line
// you need to touch.
// =====================================================

const IMG = {
  background: require("../../../Background Images/Usuals/Paper_scroll.png"),
  panel: require("../../../Background Images/Usuals/Minigames_Foreground.png"),
  button: require("../../../assets/buttons/choice_button.png"),
};

// Does the panel image have a name tab built in (like dialogue_box.png)?
//  true  -> labels sit on the tab
//  false -> plain framed image: the label shows as a small heading inside
//           the panel, and padding is wider to clear a decorative border
const PANEL_HAS_TAB = false;
const PANEL_PAD_TOP = PANEL_HAS_TAB ? 58 : 38;
const PANEL_PAD_BOTTOM = PANEL_HAS_TAB ? 26 : 42;
const PANEL_PAD_SIDE = PANEL_HAS_TAB ? 34 : 54;

// How much blank/transparent space the panel PNG has around its visible
// frame, as a fraction of the image (0.1 = 10%). Tune these if the content
// still looks off-center. Use all zeros for an image with no blank margins.
const PANEL_INSET = PANEL_HAS_TAB
  ? { left: 0, right: 0, top: 0, bottom: 0 }
  : { left: 0.023, right: 0.01, top: 0.06, bottom: 0.06 };

const START_SECONDS = 45;
const BONUS_SECONDS = 10;
const TICK_MS = 200;

// Keep puzzle content separate from the screen and validation logic.
const PUZZLES = [
  {
    answer: "DAGOHOY",
    scrambled: ["O", "H", "Y", "A", "G", "O", "D"],
    clue: "The leader who resisted Spanish rule in Bohol.",
    hint: "His rebellion began in 1744.",
  },
  {
    answer: "BOHOL",
    scrambled: ["L", "O", "B", "H", "O"],
    clue: "The island where the long rebellion took place.",
    hint: "It is in the Central Visayas region.",
  },
  {
    answer: "MOUNTAIN",
    scrambled: ["N", "I", "A", "T", "U", "M", "O", "N"],
    clue: "The rugged terrain where Dagohoy's community found refuge.",
    hint: "It is a high area of land.",
  },
  {
    answer: "REBELLION",
    scrambled: ["L", "I", "O", "N", "B", "E", "L", "R"],
    clue: "An organized resistance against an authority.",
    hint: "It describes Dagohoy's long resistance.",
  },
  {
    answer: "PARDON",
    scrambled: ["D", "O", "N", "R", "A", "P"],
    clue: "Forgiveness of an offense; the rebels were granted this when peace was accepted.",
    hint: "It begins with P and has six letters.",
  },
];

const TOTAL_MS = START_SECONDS * 1000 + 4 * BONUS_SECONDS * 1000;

const normalizeAnswer = (value) =>
  String(value || "").trim().replace(/\s+/g, "").toUpperCase();

// =====================================================
// BUTTON (same spring press feel as the story buttons)
// =====================================================

function GameButton({ label, onPress, secondary }) {
  const scale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const animate = (isPressed) => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: isPressed ? 0.94 : 1,
        speed: 20,
        bounciness: 12,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: isPressed ? 3 : 0,
        speed: 20,
        bounciness: 10,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View
      style={[
        styles.buttonWrap,
        secondary && styles.buttonSecondary,
        { transform: [{ scale }, { translateY }] },
      ]}
    >
      <TouchableOpacity
        activeOpacity={1}
        accessibilityRole="button"
        onPressIn={() => animate(true)}
        onPressOut={() => animate(false)}
        onPress={onPress}
      >
        <ImageBackground
          source={IMG.button}
          style={styles.buttonBg}
          resizeMode="stretch"
        >
          <Text style={styles.buttonText}>{label}</Text>
        </ImageBackground>
      </TouchableOpacity>
    </Animated.View>
  );
}

// Parchment panel
// The panel image is drawn slightly oversized and shifted so that its
// VISIBLE frame lines up exactly with the box, even when the PNG has blank
// transparent margins. Content is then centered inside the visible frame.
function Panel({ children, style }) {
  // The box is measured after layout, and the image is sized in real pixels
  // from that measurement. (Percent sizes can come out short when the box
  // grows with its content.)
  const [size, setSize] = useState({ w: 0, h: 0 });

  const L = PANEL_INSET.left;
  const R = PANEL_INSET.right;
  const T = PANEL_INSET.top;
  const B = PANEL_INSET.bottom;
  const w = 1 - L - R;
  const h = 1 - T - B;

  const onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;

    setSize((previous) =>
      Math.abs(previous.w - width) < 0.5 && Math.abs(previous.h - height) < 0.5
        ? previous
        : { w: width, h: height }
    );
  };

  const imgW = size.w / w;
  const imgH = size.h / h;

  return (
    <View
      onLayout={onLayout}
      style={[styles.panel, style, { overflow: "visible" }]}
    >
      {size.w > 0 ? (
        <Image
          source={IMG.panel}
          resizeMode="stretch"
          pointerEvents="none"
          style={{
            position: "absolute",
            width: imgW,
            height: imgH,
            left: -L * imgW,
            top: -T * imgH,
          }}
        />
      ) : null}
      {children}
    </View>
  );
}

// Text that sits inside the little name tab built into the box art.
// Sized in percentages so it stays on the tab however the box stretches.
function PanelTab({ children }) {
  if (!PANEL_HAS_TAB) {
    return <Text style={styles.kicker}>{children}</Text>;
  }

  return (
    <View style={styles.tab} pointerEvents="none">
      <Text style={styles.tabText} numberOfLines={1}>
        {children}
      </Text>
    </View>
  );
}

// =====================================================
// MINIGAME
// =====================================================

export default function DecipherMinigame({ onComplete }) {
  const { width, height } = useWindowDimensions();
  const landscape = width > height;

  const audio = useAudio();

  const [screen, setScreen] = useState("start");
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [remainingMs, setRemainingMs] = useState(START_SECONDS * 1000);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");
  const [completed, setCompleted] = useState([]);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const deadlineRef = useRef(null);
  const timerRef = useRef(null);
  const phaseRef = useRef("start");
  const puzzleIndexRef = useRef(0);
  const submittedRef = useRef(false);
  const completedRef = useRef([]);
  const remainingMsRef = useRef(START_SECONDS * 1000);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Sound helper that never crashes if audio isn't ready
  const sfx = useCallback(
    (key) => {
      try {
        audio?.playSfx?.(key);
      } catch (e) {}
    },
    [audio]
  );

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const finishGameOver = useCallback(() => {
    if (phaseRef.current !== "active") return;
    phaseRef.current = "gameover";
    stopTimer();
    remainingMsRef.current = 0;
    setRemainingMs(0);
    setFeedback("");
    setScreen("gameover");
  }, [stopTimer]);

  const startTimer = useCallback(
    (initialMs) => {
      stopTimer();
      const now = Date.now();
      deadlineRef.current = now + initialMs;
      remainingMsRef.current = initialMs;
      setRemainingMs(initialMs);

      timerRef.current = setInterval(() => {
        if (phaseRef.current !== "active" || deadlineRef.current == null) return;
        const ms = Math.max(0, deadlineRef.current - Date.now());
        remainingMsRef.current = ms;
        setRemainingMs(ms);
        if (ms <= 0) {
          // Set the phase synchronously so no submission can win at the deadline.
          phaseRef.current = "gameover";
          stopTimer();
          setRemainingMs(0);
          remainingMsRef.current = 0;
          setFeedback("");
          setScreen("gameover");
        }
      }, TICK_MS);
    },
    [stopTimer]
  );

  useEffect(() => () => stopTimer(), [stopTimer]);

  const startGame = useCallback(() => {
    stopTimer();
    phaseRef.current = "active";
    puzzleIndexRef.current = 0;
    submittedRef.current = false;
    completedRef.current = [];
    remainingMsRef.current = START_SECONDS * 1000;
    setPuzzleIndex(0);
    setAnswer("");
    setFeedback("");
    setFeedbackType("");
    setCompleted([]);
    setElapsedSeconds(0);
    setScreen("active");
    startTimer(START_SECONDS * 1000);
  }, [startTimer, stopTimer]);

  const submitAnswer = useCallback(() => {
    if (phaseRef.current !== "active" || submittedRef.current) return;

    const now = Date.now();
    const liveRemaining =
      deadlineRef.current == null ? 0 : Math.max(0, deadlineRef.current - now);

    // Check the actual deadline instead of relying on the next interval tick.
    if (liveRemaining <= 0) {
      finishGameOver();
      return;
    }

    const puzzle = PUZZLES[puzzleIndexRef.current];
    const guess = normalizeAnswer(answer);
    if (!guess) {
      setFeedback("Enter an answer first.");
      setFeedbackType("error");
      return;
    }

    if (guess !== puzzle.answer) {
      setFeedback("Not quite. Try again.");
      setFeedbackType("error");
      sfx("wrong");
      return;
    }

    submittedRef.current = true;
    sfx("correct");
    const nextCompleted = [...completedRef.current, puzzleIndexRef.current];
    completedRef.current = nextCompleted;
    setCompleted(nextCompleted);
    setFeedback("Decoded! +10 seconds");
    setFeedbackType("success");

    const nextRemaining = liveRemaining + BONUS_SECONDS * 1000;
    remainingMsRef.current = nextRemaining;
    deadlineRef.current = now + nextRemaining;
    setRemainingMs(nextRemaining);

    if (puzzleIndexRef.current === PUZZLES.length - 1) {
      phaseRef.current = "victory";
      stopTimer();
      const elapsed = Math.max(0, Math.ceil((TOTAL_MS - nextRemaining) / 1000));
      setElapsedSeconds(elapsed);
      setScreen("victory");
      return;
    }

    const nextIndex = puzzleIndexRef.current + 1;
    puzzleIndexRef.current = nextIndex;
    setPuzzleIndex(nextIndex);
    setAnswer("");
    // Allow the next puzzle to be submitted; the single existing timer continues
    // against the updated absolute deadline.
    submittedRef.current = false;
  }, [answer, finishGameOver, stopTimer, sfx]);

  const retry = useCallback(() => {
    startGame();
  }, [startGame]);

  const seconds = Math.ceil(remainingMs / 1000);
  const progress = Math.max(0, Math.min(1, remainingMs / TOTAL_MS));
  const currentPuzzle = PUZZLES[puzzleIndex];
  const lowTime = seconds <= 10;

  // Tiles shrink on small / landscape screens so long words always fit
  const tileW = landscape ? 30 : 36;
  const tileH = landscape ? 38 : 46;
  const tileFont = landscape ? 18 : 21;

  // ---------------------------------------------------
  // SCREENS
  // ---------------------------------------------------

  const startPanel = (
    <Panel style={styles.centerPanel}>
      <PanelTab>BOHOL · 1744</PanelTab>
      <Text style={styles.panelTitle}>Decode the Story</Text>
      <Text style={styles.bodyText}>
        Unscramble five words connected to Francisco Dagohoy's rebellion.
      </Text>

      <View style={styles.ruleBox}>
        <Text style={styles.ruleText}>• You start with 45 seconds.</Text>
        <Text style={styles.ruleText}>• Each correct word adds 10 seconds.</Text>
        <Text style={styles.ruleText}>• The clock never stops, so be quick!</Text>
      </View>

      <GameButton label="Begin Deciphering" onPress={startGame} />
    </Panel>
  );

  const puzzleCard = (
    <Panel style={landscape ? styles.leftCol : styles.fullPanel}>
      <PanelTab>FIELD NOTE #{puzzleIndex + 1}</PanelTab>
      <Text style={styles.clueText}>{currentPuzzle.clue}</Text>

      <View style={styles.letterTray}>
        {currentPuzzle.scrambled.map((letter, index) => (
          <View
            key={`${letter}-${index}`}
            style={[styles.letterTile, { width: tileW, height: tileH }]}
          >
            <Text style={[styles.letterText, { fontSize: tileFont }]}>
              {letter}
            </Text>
          </View>
        ))}
      </View>

      <Text style={styles.hintText}>Hint: {currentPuzzle.hint}</Text>
    </Panel>
  );

  const answerCard = (
    <View style={landscape ? styles.rightCol : styles.answerCol}>
      <Text style={styles.inputLabel}>Your deciphered word</Text>

      <TextInput
        value={answer}
        onChangeText={(value) => {
          setAnswer(value);
          if (feedbackType === "error") {
            setFeedback("");
            setFeedbackType("");
          }
        }}
        onSubmitEditing={submitAnswer}
        returnKeyType="done"
        autoCapitalize="characters"
        autoCorrect={false}
        editable={screen === "active"}
        maxLength={20}
        placeholder="Type your answer"
        placeholderTextColor="#8a7a62"
        accessibilityLabel="Deciphered answer"
        style={styles.input}
      />

      {feedback ? (
        <Text
          style={[
            styles.feedback,
            feedbackType === "success" ? styles.successText : styles.errorText,
          ]}
        >
          {feedback}
        </Text>
      ) : (
        <View style={styles.feedbackSpacer} />
      )}

      <GameButton label="Submit Answer" onPress={submitAnswer} />
    </View>
  );

  const activeBody = (
    <>
      <View style={styles.progressTrack}>
        {PUZZLES.map((p, i) => (
          <View
            key={p.answer}
            style={[
              styles.progressSegment,
              i < completed.length && styles.progressComplete,
              i === puzzleIndex && styles.progressCurrent,
            ]}
          />
        ))}
      </View>

      <View style={landscape ? styles.row : styles.column}>
        {puzzleCard}
        {answerCard}
      </View>

      <View style={styles.timerTrack}>
        <View
          style={[
            styles.timerFill,
            lowTime && styles.timerFillLow,
            { width: `${progress * 100}%` },
          ]}
        />
      </View>
    </>
  );

  const gameOverPanel = (
    <Panel style={styles.centerPanel}>
      <PanelTab>TIME EXPIRED</PanelTab>
      <Text style={styles.panelTitle}>The Trail Goes Cold</Text>
      <Text style={styles.bodyText}>
        You decoded {completed.length} of 5 words. Try again?
      </Text>
      <Text style={styles.bigNumber}>{completed.length}/5</Text>
      <GameButton label="Try Again" onPress={retry} />
    </Panel>
  );

  const victoryPanel = (
    <Panel style={styles.centerPanel}>
      <PanelTab>CIPHER COMPLETE</PanelTab>
      <Text style={styles.panelTitle}>The Story Is Preserved</Text>
      <Text style={styles.bodyText}>
        All five words decoded. You followed the trail through Dagohoy's long
        resistance and the eventual peace.
      </Text>
      <Text style={styles.bigNumber}>5/5</Text>
      <Text style={styles.timeSummary}>
        Completed in about {elapsedSeconds} seconds
      </Text>
      {typeof onCompleteRef.current === "function" ? (
        <GameButton
          label="Continue Story"
          onPress={() => onCompleteRef.current()}
        />
      ) : null}
      <GameButton label="Play Again" onPress={retry} secondary />
    </Panel>
  );

  return (
    <ImageBackground
      source={IMG.background}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.dim} />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <Text style={styles.title}>The Cipher Trail</Text>

              {screen === "active" ? (
                <View style={[styles.timerPill, lowTime && styles.timerPillLow]}>
                  <Text
                    style={[styles.timerValue, lowTime && styles.timerTextLow]}
                  >
                    {seconds}s
                  </Text>
                </View>
              ) : null}
            </View>

            {screen === "start" ? startPanel : null}
            {screen === "active" ? activeBody : null}
            {screen === "gameover" ? gameOverPanel : null}
            {screen === "victory" ? victoryPanel : null}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

// =====================================================
// STYLES
// =====================================================

const INK = "#352313"; // same brown the speaker names use
const BUTTON_INK = "#371f10"; // same as quiz buttons

const styles = StyleSheet.create({
  flex: { flex: 1 },
  background: { flex: 1, width: "100%", height: "100%", backgroundColor: "#000" },
  dim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  safeArea: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },

  // HEADER
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    color: INK,
    fontSize: 22,
    fontWeight: "bold",
  },
  timerPill: {
    minWidth: 64,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderWidth: 1,
    borderColor: "#d7cfbe",
  },
  timerPillLow: { borderColor: "#ff9b82", backgroundColor: "rgba(90, 20, 10, 0.75)" },
  timerValue: { color: "#FFFFFF", fontSize: 20, fontWeight: "bold" },
  timerTextLow: { color: "#ff9b82" },

  // PANELS
  panel: {
    paddingTop: PANEL_PAD_TOP,
    paddingBottom: PANEL_PAD_BOTTOM,
    paddingHorizontal: PANEL_PAD_SIDE,
    justifyContent: "center",
  },
  centerPanel: {
    width: "100%",
    maxWidth: 560,
    alignSelf: "center",
    minHeight: 240,
  },
  fullPanel: { width: "100%" },
  leftCol: { flex: 1.15 },
  rightCol: { flex: 1, justifyContent: "center", paddingLeft: 6 },
  answerCol: { width: "100%", marginTop: 10 },
  row: { flexDirection: "row", alignItems: "center", gap: 14 },
  column: { flexDirection: "column" },

  kicker: {
    color: "#7a5a2a",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1.6,
    textAlign: "center",
    marginBottom: 6,
  },
  tab: {
    position: "absolute",
    top: 0,
    left: "2.5%",
    width: "38%",
    height: "20%",
    minHeight: 36,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  tabText: {
    color: INK,
    fontSize: 13,
    fontWeight: "bold",
    letterSpacing: 1.2,
    textAlign: "center",
  },
  panelTitle: {
    color: INK,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  bodyText: {
    color: "#0f0f0f",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },
  clueText: {
    color: "#0f0f0f",
    fontSize: 16,
    lineHeight: 23,
    textAlign: "center",
  },
  ruleBox: { marginVertical: 14, alignSelf: "center" },
  ruleText: { color: INK, fontSize: 14, lineHeight: 22 },

  // LETTERS
  letterTray: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 14,
    marginBottom: 10,
  },
  letterTile: {
    borderRadius: 6,
    backgroundColor: "rgba(120, 85, 40, 0.18)",
    borderWidth: 1.5,
    borderColor: "#7a5a2a",
    justifyContent: "center",
    alignItems: "center",
  },
  letterText: { color: INK, fontWeight: "bold" },
  hintText: {
    color: "#141414",
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center",
    fontStyle: "italic",
  },

  // INPUT
  inputLabel: {
    color: INK,
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 6,
  },
  input: {
    minHeight: 48,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#7a5a2a",
    backgroundColor: "rgba(255, 248, 232, 0.92)",
    paddingHorizontal: 14,
    color: INK,
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 2,
    textAlign: "center",
  },
  feedback: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  feedbackSpacer: { height: 26 },
  successText: { color: "#1f6b34" },
  errorText: { color: "#a3281b" },

  // BUTTONS
  buttonWrap: { alignSelf: "center", width: "80%", maxWidth: 300, marginTop: 8 },
  buttonSecondary: { opacity: 0.85 },
  buttonBg: {
    width: "100%",
    minHeight: 56,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  buttonText: {
    color: BUTTON_INK,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  // PROGRESS
  progressTrack: { flexDirection: "row", gap: 5, marginBottom: 10 },
  progressSegment: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(53, 35, 19, 0.2)",
  },
  progressComplete: { backgroundColor: "#7a5a2a" },
  progressCurrent: { backgroundColor: INK },
  timerTrack: {
    height: 5,
    borderRadius: 3,
    backgroundColor: "rgba(53, 35, 19, 0.2)",
    overflow: "hidden",
    marginTop: 12,
  },
  timerFill: { height: "100%", backgroundColor: "#7a5a2a", borderRadius: 3 },
  timerFillLow: { backgroundColor: "#a3281b" },

  // RESULTS
  bigNumber: {
    color: INK,
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  timeSummary: {
    color: "#141414",
    textAlign: "center",
    fontSize: 13,
    marginBottom: 6,
  },
});