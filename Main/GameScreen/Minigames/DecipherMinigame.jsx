import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  Animated,
  PanResponder,
  StyleSheet,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";

import { useAudio } from "../../../Audiostore";


const IMG = {
  background: require("../../../Background Images/Usuals/Paper_scroll.png"),
  panel: require("../../../Background Images/Usuals/Minigames_Foreground.png"),
  button: require("../../../assets/buttons/choice_button.png"),
};


const PANEL_HAS_TAB = false;
const PANEL_PAD_TOP = PANEL_HAS_TAB ? 58 : 38;
const PANEL_PAD_BOTTOM = PANEL_HAS_TAB ? 26 : 42;
const PANEL_PAD_SIDE = PANEL_HAS_TAB ? 34 : 54;


const PANEL_INSET = PANEL_HAS_TAB
  ? { left: 0, right: 0, top: 0, bottom: 0 }
  : { left: 0.023, right: 0.01, top: 0.06, bottom: 0.06 };

const START_SECONDS = 60;
const BONUS_SECONDS = 10;
const TICK_MS = 200;

// Each puzzle's `scrambled` list contains every letter of the answer
// PLUS a few decoy letters that don't belong. The number of answer boxes
// comes from answer.length, so decoys just stay unused in the tray.
const PUZZLES = [
  {
    answer: "DAGOHOY",
    // + decoys: K, S, R
    scrambled: ["O", "K", "H", "Y", "S", "A", "G", "R", "O", "D"],
    clue: "The leader who resisted Spanish rule in Bohol.",
    hint: "His rebellion began in 1744.",
  },
  {
    answer: "BOHOL",
    // + decoys: T, N, E
    scrambled: ["L", "T", "O", "B", "N", "H", "E", "O"],
    clue: "The island where the long rebellion took place.",
    hint: "It is in the Central Visayas region.",
  },
  {
    answer: "MOUNTAIN",
    // + decoys: E, S, R
    scrambled: ["N", "I", "E", "A", "T", "U", "S", "M", "O", "N", "R"],
    clue: "The rugged terrain where Dagohoy's community found refuge.",
    hint: "It is a high area of land.",
  },
  {
    answer: "REBELLION",
    // + decoys: T, A  (REBELLION has two E's and two L's)
    scrambled: ["L", "T", "I", "O", "N", "B", "A", "E", "L", "R", "E"],
    clue: "An organized resistance against an authority.",
    hint: "It describes Dagohoy's long resistance.",
  },
  {
    answer: "PARDON",
    // + decoys: M, S, E
    scrambled: ["D", "M", "O", "N", "S", "R", "A", "E", "P"],
    clue: "Forgiveness of an offense; the rebels were granted this when peace was accepted.",
    hint: "It begins with P and has six letters.",
  },
];

const TOTAL_MS = START_SECONDS * 1000 + 4 * BONUS_SECONDS * 1000;

const normalizeAnswer = (value) =>
  String(value || "").trim().replace(/\s+/g, "").toUpperCase();

const emptySlots = (puzzleIndex) =>
  Array(PUZZLES[puzzleIndex].answer.length).fill(null);


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


function Panel({ children, style }) {

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

function DraggableTile({
  letter,
  index,
  width,
  height,
  fontSize,
  used,
  locked,
  scale,
  onDrop,
  onTap,
}) {
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const [lifted, setLifted] = useState(false);

  const live = useRef({});
  live.current = { index, used, locked, scale, onDrop, onTap };

  const springBack = () => {
    setLifted(false);
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
      speed: 24,
      bounciness: 4,
    }).start();
  };

  const snapHome = () => {
    setLifted(false);
    pan.setValue({ x: 0, y: 0 });
  };

  const responder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () =>
        !live.current.used && !live.current.locked,
      onMoveShouldSetPanResponder: () =>
        !live.current.used && !live.current.locked,

      onPanResponderGrant: () => setLifted(true),

      onPanResponderMove: (_, gesture) => {

        const s = live.current.scale || 1;
        pan.setValue({ x: gesture.dx / s, y: gesture.dy / s });
      },

      onPanResponderRelease: (_, gesture) => {
        const moved = Math.abs(gesture.dx) > 6 || Math.abs(gesture.dy) > 6;

        if (!moved) {
          snapHome();
          live.current.onTap(live.current.index);
          return;
        }

        Promise.resolve(
          live.current.onDrop(
            live.current.index,
            gesture.moveX,
            gesture.moveY
          )
        ).then((placed) => {
          if (placed) snapHome();
          else springBack();
        });
      },

      onPanResponderTerminate: springBack,
    })
  ).current;

  return (
    <Animated.View
      {...responder.panHandlers}
      style={[
        styles.letterTile,
        { width, height },
        used && styles.tileUsed,
        lifted && styles.tileLifted,
        {
          transform: [
            { translateX: pan.x },
            { translateY: pan.y },
            { scale: lifted ? 1.15 : 1 },
          ],
        },
      ]}
    >
      <Text style={[styles.letterText, { fontSize }]}>{letter}</Text>
    </Animated.View>
  );
}


export default function DecipherMinigame({
  onComplete,
  paused = false,
  onPhaseChange,
}) {
  const { width, height } = useWindowDimensions();
  const landscape = width > height;

  const audio = useAudio();

  const [screen, setScreen] = useState("start");
  const [puzzleIndex, setPuzzleIndex] = useState(0);

  const [placed, setPlaced] = useState(() => emptySlots(0));
  const [remainingMs, setRemainingMs] = useState(START_SECONDS * 1000);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");
  const [completed, setCompleted] = useState([]);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);


  const [areaH, setAreaH] = useState(0);
  const [contentH, setContentH] = useState(0);


  const [slotRowW, setSlotRowW] = useState(0);

  const deadlineRef = useRef(null);
  const timerRef = useRef(null);
  const phaseRef = useRef("start");
  const puzzleIndexRef = useRef(0);
  const submittedRef = useRef(false);
  const completedRef = useRef([]);
  const remainingMsRef = useRef(START_SECONDS * 1000);
  const onCompleteRef = useRef(onComplete);

  const slotRefs = useRef([]);
  const placedRef = useRef(placed);
  placedRef.current = placed;

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Pause support: the clock is frozen while `paused` is true, and the
  // deadline is pushed back by however long the pause lasted.
  const pausedRef = useRef(false);
  const pausedAtRef = useRef(null);

  useEffect(() => {
    if (paused) {
      pausedRef.current = true;
      pausedAtRef.current = Date.now();
    } else if (pausedRef.current) {
      pausedRef.current = false;

      if (pausedAtRef.current != null && deadlineRef.current != null) {
        deadlineRef.current += Date.now() - pausedAtRef.current;
      }

      pausedAtRef.current = null;
    }
  }, [paused]);

  // Tells the parent which screen we are on ("intro" = instructions,
  // "playing", "result" = final screen) so it can adjust the pause button.
  useEffect(() => {
    if (!onPhaseChange) return;

    if (screen === "start") onPhaseChange("intro");
    else if (screen === "gameover" || screen === "victory") onPhaseChange("result");
    else onPhaseChange("playing");
  }, [screen, onPhaseChange]);

  // Sound helper that never crashes if audio isn't ready
  const sfx = useCallback(
    (key) => {
      try {
        audio?.playSfx?.(key);
      } catch (e) {}
    },
    [audio]
  );

  const currentPuzzle = PUZZLES[puzzleIndex];
  const letters = currentPuzzle.scrambled;

  // The word the player has built so far
  const answer = placed
    .map((tileIndex) => (tileIndex == null ? "" : letters[tileIndex]))
    .join("");
  const allFilled = placed.length > 0 && placed.every((v) => v !== null);
  const usedTiles = new Set(placed.filter((v) => v !== null));

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
        if (pausedRef.current) return;
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
    setPlaced(emptySlots(0));
    setFeedback("");
    setFeedbackType("");
    setCompleted([]);
    setElapsedSeconds(0);
    setScreen("active");
    startTimer(START_SECONDS * 1000);
  }, [startTimer, stopTimer]);


  const clearErrorFeedback = useCallback(() => {
    setFeedback((previous) => (previous ? "" : previous));
    setFeedbackType("");
  }, []);


  const placeTile = useCallback(
    (tileIndex, slotIndex) => {
      setPlaced((previous) => {
        const next = [...previous];
        next[slotIndex] = tileIndex;
        return next;
      });
      clearErrorFeedback();
      sfx("dialogueClick");
    },
    [clearErrorFeedback, sfx]
  );

  // Tap a tile: it goes into the first empty box
  const handleTileTap = useCallback(
    (tileIndex) => {
      if (phaseRef.current !== "active" || pausedRef.current) return;

      const emptyIndex = placedRef.current.indexOf(null);
      if (emptyIndex === -1) return;

      placeTile(tileIndex, emptyIndex);
    },
    [placeTile]
  );

  // Tap a filled box: the letter goes back to the tray
  const removeFromSlot = useCallback(
    (slotIndex) => {
      if (phaseRef.current !== "active" || pausedRef.current) return;

      setPlaced((previous) => {
        const next = [...previous];
        next[slotIndex] = null;
        return next;
      });
      clearErrorFeedback();
    },
    [clearErrorFeedback]
  );

 
  const handleTileDrop = useCallback(
    (tileIndex, x, y) =>
      new Promise((resolve) => {
        if (phaseRef.current !== "active" || pausedRef.current) {
          resolve(false);
          return;
        }

        const count = placedRef.current.length;
        const rects = new Array(count).fill(null);
        let pending = count;

        const finish = () => {
          let bestSlot = -1;
          let bestDistance = Infinity;

          rects.forEach((rect, slotIndex) => {
            if (!rect) return;

            const inside =
              x >= rect.x &&
              x <= rect.x + rect.w &&
              y >= rect.y &&
              y <= rect.y + rect.h;

            const distance = Math.hypot(
              x - (rect.x + rect.w / 2),
              y - (rect.y + rect.h / 2)
            );

            const closeEnough = distance <= Math.max(rect.w, rect.h) * 1.4;

            if ((inside || closeEnough) && distance < bestDistance) {
              bestDistance = distance;
              bestSlot = slotIndex;
            }
          });

          if (bestSlot >= 0) {
            placeTile(tileIndex, bestSlot);
            resolve(true);
          } else {
            resolve(false);
          }
        };

        if (count === 0) {
          resolve(false);
          return;
        }

        for (let i = 0; i < count; i += 1) {
          const node = slotRefs.current[i];

          if (!node || typeof node.measureInWindow !== "function") {
            pending -= 1;
            if (pending === 0) finish();
            continue;
          }

          node.measureInWindow((rx, ry, rw, rh) => {
            rects[i] = { x: rx, y: ry, w: rw, h: rh };
            pending -= 1;
            if (pending === 0) finish();
          });
        }
      }),
    [placeTile]
  );


  const submitAnswer = useCallback(() => {
    if (phaseRef.current !== "active" || submittedRef.current) return;
    if (pausedRef.current) return;

    const now = Date.now();
    const liveRemaining =
      deadlineRef.current == null ? 0 : Math.max(0, deadlineRef.current - now);

    if (liveRemaining <= 0) {
      finishGameOver();
      return;
    }

    const puzzle = PUZZLES[puzzleIndexRef.current];

    if (!allFilled) {
      setFeedback("Fill every box first.");
      setFeedbackType("error");
      return;
    }

    if (normalizeAnswer(answer) !== puzzle.answer) {
      setFeedback("Not quite. Some letters are decoys! Tap a box to take one back.");
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
    setPlaced(emptySlots(nextIndex));
    // Allow the next puzzle to be submitted; the single existing timer continues
    // against the updated absolute deadline.
    submittedRef.current = false;
  }, [answer, allFilled, finishGameOver, stopTimer, sfx]);

  const retry = useCallback(() => {
    startGame();
  }, [startGame]);

  const seconds = Math.ceil(remainingMs / 1000);
  const progress = Math.max(0, Math.min(1, remainingMs / TOTAL_MS));
  const lowTime = seconds <= 10;

  // 1 = fits as is. Smaller = shrink to fit (never below 0.4).
  const FIT_PADDING = 28; // top + bottom padding of the play area
  const fitScale =
    areaH > 0 && contentH > 0
      ? Math.min(1, Math.max(0.4, (areaH - FIT_PADDING) / contentH))
      : 1;

  // Tray tiles shrink on small / landscape screens so long words always fit
  const tileW = landscape ? 30 : 36;
  const tileH = landscape ? 38 : 46;
  const tileFont = landscape ? 18 : 21;

  // Answer boxes size themselves to fit the row (never bigger than 40)
  const SLOT_GAP = 5;
  const slotCount = placed.length;
  const slotW =
    slotRowW > 0
      ? Math.max(
          22,
          Math.min(40, Math.floor((slotRowW - SLOT_GAP * (slotCount - 1)) / slotCount))
        )
      : 34;
  const slotH = Math.round(slotW * 1.2);
  const slotFont = Math.round(slotW * 0.55);

  // ---------------------------------------------------
  // SCREENS
  // ---------------------------------------------------

  const startPanel = (
    <Panel style={styles.centerPanel}>
      <PanelTab>BOHOL · 1744</PanelTab>
      <Text style={styles.panelTitle}>Decode the Story</Text>
      <Text style={styles.bodyText}>
        Unscramble five words connected to Francisco Dagohoy's rebellion.
        Watch out for extra letters!
      </Text>

      <View style={styles.ruleBox}>
        <Text style={styles.ruleText}>• You start with 45 seconds.</Text>
        <Text style={styles.ruleText}>• Each correct word adds 10 seconds.</Text>
        <Text style={styles.ruleText}>• Drag the letters into the boxes.</Text>
        <Text style={styles.ruleText}>• Beware: some extra letters don't belong!</Text>
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
        {letters.map((letter, index) => (
          <DraggableTile
            key={`${puzzleIndex}-${index}`}
            letter={letter}
            index={index}
            width={tileW}
            height={tileH}
            fontSize={tileFont}
            used={usedTiles.has(index)}
            locked={paused || screen !== "active"}
            scale={fitScale}
            onDrop={handleTileDrop}
            onTap={handleTileTap}
          />
        ))}
      </View>

      <Text style={styles.hintText}>Hint: {currentPuzzle.hint}</Text>
    </Panel>
  );

  const answerCard = (
    <View style={landscape ? styles.rightCol : styles.answerCol}>
      <Text style={styles.inputLabel}>Your deciphered word</Text>

      <View
        style={styles.slotRow}
        onLayout={(e) => setSlotRowW(e.nativeEvent.layout.width)}
      >
        {placed.map((tileIndex, slotIndex) => {
          const filled = tileIndex !== null;

          return (
            <View
              key={`slot-${puzzleIndex}-${slotIndex}`}
              ref={(node) => {
                slotRefs.current[slotIndex] = node;
              }}
              collapsable={false}
              style={[
                styles.slotBox,
                { width: slotW, height: slotH },
                filled && styles.slotFilled,
              ]}
            >
              {filled ? (
                <TouchableOpacity
                  activeOpacity={0.6}
                  accessibilityRole="button"
                  accessibilityLabel={`Remove letter ${letters[tileIndex]}`}
                  onPress={() => removeFromSlot(slotIndex)}
                  style={styles.slotTouch}
                >
                  <Text style={[styles.letterText, { fontSize: slotFont }]}>
                    {letters[tileIndex]}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          );
        })}
      </View>

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
        <Text style={styles.helperText}>
          Drag the letters here, or tap them
        </Text>
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
        <View style={styles.flex}>
          <View
            style={styles.fitArea}
            onLayout={(e) => setAreaH(e.nativeEvent.layout.height)}
          >
            <View
              pointerEvents={paused ? "none" : "auto"}
              style={{ transform: [{ scale: fitScale }] }}
              onLayout={(e) => setContentH(e.nativeEvent.layout.height)}
            >
              <View style={styles.header}>
                <Text style={styles.title}>Decipher Trail</Text>

                {screen === "active" ? (
                  <View
                    style={[styles.timerPill, lowTime && styles.timerPillLow]}
                  >
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
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

// =====================================================
// STYLES
// =====================================================

const INK = "#422912"; // same brown the speaker names use
const BUTTON_INK = "#371f10"; // same as quiz buttons

const styles = StyleSheet.create({
  flex: { flex: 1 },
  background: { flex: 1, width: "100%", height: "100%", backgroundColor: "#000" },
  dim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  safeArea: { flex: 1 },

  fitArea: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },

  // HEADER
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 9,
    right:15
  },
  title: {
    color: 'black',
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
    maxWidth: 700,
    alignSelf: "center",
    minHeight: 100,
  },

  fullPanel: { width: "100%", zIndex: 2 },
  leftCol: { flex: 1.15, zIndex: 2 },
  rightCol: { flex: 1, justifyContent: "center", paddingLeft: 6, zIndex: 1 },
  answerCol: { width: "100%", marginTop: 10, zIndex: 1 },
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

  // LETTERS (tray)
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

  tileUsed: { opacity: 0.2 },

  tileLifted: {
    zIndex: 50,
    elevation: 12,
    backgroundColor: "rgba(214, 180, 106, 0.95)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  letterText: { color: INK, fontWeight: "bold" },
  hintText: {
    color: "#141414",
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center",
    fontStyle: "italic",
  },

  // ANSWER BOXES
  inputLabel: {
    color: INK,
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  slotRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    alignSelf: "stretch",
  },
  slotBox: {
    borderRadius: 6,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: "#7a5a2a",
    backgroundColor: "rgba(255, 248, 232, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  slotFilled: {
    borderStyle: "solid",
    backgroundColor: "rgba(120, 85, 40, 0.18)",
  },
  slotTouch: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  helperText: {
    marginTop: 8,
    minHeight: 26,
    fontSize: 12,
    fontStyle: "italic",
    color: "#50402a",
    textAlign: "center",
  },
  feedback: {
    marginTop: 8,
    minHeight: 26,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
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