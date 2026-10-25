import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  useWindowDimensions,
  PanResponder,
  Animated,
} from "react-native";

import { useAudio } from "../../../Audiostore"; // same file PartRenderer uses

// =====================================================
// ARTWORK
// Same images and paths as DecipherMinigame. Adjust the
// paths if your folders are laid out differently.
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

const INK = "#352313"; // same brown the speaker names use
const BUTTON_INK = "#371f10"; // same as quiz buttons
const GOLD = "#7a5a2a";
const GREEN = "#3d6b45";
const RED = "#a3281b";

const STARTING_TIME = 45;
const TIME_BONUS = 10;
const WRONG_ANSWER_PENALTY = 2;
const POINTS_PER_CORRECT = 100;
const MAX_ROUND_CHOICES = 4;

const CHARACTER_INFO = [
  { id: "rizal", name: "Dr. José Rizal" },
  { id: "bonifacio", name: "Andrés Bonifacio" },
  { id: "mabini", name: "Apolinario Mabini" },
  { id: "franco", name: "Domingo Franco" },
  { id: "dagohoy", name: "Francisco Dagohoy" },
  { id: "legazpi", name: "Miguel López de Legazpi" },
  { id: "dula", name: "Lakan Dula" },
  { id: "sulayman", name: "Rajah Sulayman" },
];

function shuffle(items) {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function formatTime(seconds) {
  const safeSeconds = Math.max(0, seconds);
  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = safeSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}

// =====================================================
// SHARED UI PIECES
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

// The panel image is drawn slightly oversized and shifted so that its
// VISIBLE frame lines up exactly with the box, even when the PNG has blank
// transparent margins. Content is then centered inside the visible frame.
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

// Text that sits on the little name tab built into the box art.
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

// Fit-to-screen shell (same idea as DecipherMinigame): the screen never
// scrolls. If the content is taller than the space available, it is scaled
// down a little instead.
function Screen({
  children,
  paused = false,
  scale,
  onAreaLayout,
  onContentLayout,
}) {
  return (
    <ImageBackground
      source={IMG.background}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.flex}>
          <View style={styles.fitArea} onLayout={onAreaLayout}>
            {/* While paused, nothing in the game can be touched or dragged */}
            <View
              pointerEvents={paused ? "none" : "auto"}
              style={{ transform: [{ scale }] }}
              onLayout={onContentLayout}
            >
              {children}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

// =====================================================
// DRAGGABLE NAME CHIP
//
// The chip itself is the touch target (no Pressable inside it), so there is
// no fight between "tap" and "drag" gestures. We decide on release:
//   - finger barely moved  -> it was a TAP  (select / unselect the name)
//   - finger moved         -> it was a DRAG (try to drop it on a portrait)
//
// The gesture handler is created ONCE and always reads the latest props
// through `live`, so the 1-second timer re-renders never interrupt a drag.
// =====================================================

const DRAG_THRESHOLD = 8;

// Which portrait row is the finger actually ON? Strictly inside the row
// (tiny margin only). No "close enough" guessing, so nothing is accepted
// unless you really drop it on a portrait.
function findHit(rects, x, y) {
  const MARGIN = 4;
  let best = null;
  let bestDistance = Infinity;

  (rects || []).forEach((rect) => {
    if (!rect) return;

    const inside =
      x >= rect.x - MARGIN &&
      x <= rect.x + rect.width + MARGIN &&
      y >= rect.y - MARGIN &&
      y <= rect.y + rect.height + MARGIN;

    if (!inside) return;

    const distance = Math.hypot(
      x - (rect.x + rect.width / 2),
      y - (rect.y + rect.height / 2)
    );

    if (distance < bestDistance) {
      bestDistance = distance;
      best = rect.target;
    }
  });

  return best;
}

function DraggableName({
  character,
  isMatched,
  isSelected,
  disabled,
  minHeight,
  scale,
  onDragStart,
  onDragMove,
  onDrop,
  onTap,
}) {
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const [dragging, setDragging] = useState(false);
  const [pressedDown, setPressedDown] = useState(false);
  const startedRef = useRef(false);

  const live = useRef({});
  live.current = {
    character,
    isMatched,
    disabled,
    scale,
    onDragStart,
    onDragMove,
    onDrop,
    onTap,
  };

  const springBack = () => {
    setDragging(false);
    setPressedDown(false);
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
      speed: 24,
      bounciness: 3,
    }).start();
  };

  const responder = useRef(
    PanResponder.create({
      // Claim the touch immediately so nothing else (a parent, a sibling)
      // can steal it halfway through a drag.
      onStartShouldSetPanResponder: () =>
        !live.current.isMatched && !live.current.disabled,
      onStartShouldSetPanResponderCapture: () =>
        !live.current.isMatched && !live.current.disabled,
      onMoveShouldSetPanResponder: () =>
        !live.current.isMatched && !live.current.disabled,
      onPanResponderTerminationRequest: () => false,
      onShouldBlockNativeResponder: () => true,

      onPanResponderGrant: () => {
        startedRef.current = false;
        pan.stopAnimation();
        pan.setValue({ x: 0, y: 0 });
        setPressedDown(true);
      },

      onPanResponderMove: (_, gesture) => {
        const moved =
          Math.abs(gesture.dx) > DRAG_THRESHOLD ||
          Math.abs(gesture.dy) > DRAG_THRESHOLD;

        if (!startedRef.current && moved) {
          startedRef.current = true;
          setDragging(true);
          live.current.onDragStart(live.current.character);
        }

        if (startedRef.current) {
          // The board may be scaled down to fit, so divide by that scale
          // to keep the chip under the finger.
          const s = live.current.scale || 1;
          pan.setValue({ x: gesture.dx / s, y: gesture.dy / s });
          live.current.onDragMove(gesture.moveX, gesture.moveY);
        }
      },

      onPanResponderRelease: (_, gesture) => {
        const wasDrag = startedRef.current;
        startedRef.current = false;

        if (wasDrag) {
          live.current.onDrop(
            live.current.character,
            gesture.moveX,
            gesture.moveY
          );
        } else {
          live.current.onTap(live.current.character);
        }

        springBack();
      },

      onPanResponderTerminate: () => {
        startedRef.current = false;
        springBack();
      },
    })
  ).current;

  return (
    <Animated.View
      {...responder.panHandlers}
      accessible
      accessibilityRole="button"
      accessibilityLabel={character.name}
      accessibilityState={{ selected: isSelected, disabled: isMatched }}
      style={[
        styles.nameOptionWrapper,
        {
          transform: [
            { translateX: pan.x },
            { translateY: pan.y },
            { scale: dragging ? 1.08 : 1 },
          ],
        },
        (isSelected || dragging) && styles.nameOptionWrapperSelected,
        dragging && styles.nameOptionWrapperDragging,
        isMatched && styles.nameOptionWrapperMatched,
      ]}
    >
      <View
        style={[
          styles.nameOption,
          { minHeight },
          isSelected && styles.nameOptionSelected,
          isMatched && styles.nameOptionMatched,
          pressedDown && !isMatched && !dragging && styles.pressed,
        ]}
      >
        <Text
          style={[
            styles.nameText,
            isSelected && styles.nameTextSelected,
            isMatched && styles.nameTextMatched,
          ]}
          numberOfLines={3}
          adjustsFontSizeToFit
          minimumFontScale={0.78}
        >
          {isMatched ? "✓  " : ""}
          {character.name}
        </Text>
      </View>
    </Animated.View>
  );
}

// =====================================================
// MINIGAME
// =====================================================

export default function CharacterMatchingMinigame({
  characters = [],
  onComplete,
  paused = false,
  onPhaseChange,
}) {
  const { width, height } = useWindowDimensions();
  const audio = useAudio();

  const landscape = width > height;
  const isNarrow = width < 380;
  const isCompact = height < 680;

  const choicesPerRound = useMemo(() => {
    if (isNarrow || isCompact) return 2;
    if (width < 600) return 3;
    return MAX_ROUND_CHOICES;
  }, [width, isNarrow, isCompact]);

  const [gameCharacters, setGameCharacters] = useState([]);
  const [roundStart, setRoundStart] = useState(0);
  const [roundChoiceOrder, setRoundChoiceOrder] = useState([]);

  const [matchedIds, setMatchedIds] = useState([]);
  const [selectedNameId, setSelectedNameId] = useState(null);

  const [timeLeft, setTimeLeft] = useState(STARTING_TIME);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("ready");

  const [feedback, setFeedback] = useState(null);
  const [lastCorrectId, setLastCorrectId] = useState(null);
  const [lastWrongId, setLastWrongId] = useState(null);

  const [startedAt, setStartedAt] = useState(null);
  const [finishedAt, setFinishedAt] = useState(null);

  // Fit-to-screen measurements (the screen never scrolls)
  const [areaH, setAreaH] = useState(0);
  const [contentH, setContentH] = useState(0);

  const feedbackTimeout = useRef(null);
  const transitionTimeout = useRef(null);

  const roundLock = useRef(false);
  const matchedRef = useRef([]);
  const scoreRef = useRef(0);
  const finishTimeRef = useRef(null);

  const targetRefs = useRef({});
  const rectsRef = useRef([]);
  const [hoverId, setHoverId] = useState(null);

  // Sound helper that never crashes if audio isn't ready
  const sfx = useCallback(
    (key) => {
      try {
        audio?.playSfx?.(key);
      } catch (e) {}
    },
    [audio]
  );

  const normalizedCharacters = useMemo(() => {
    const supplied = Array.isArray(characters) ? characters : [];
    const byId = new Map(
      supplied.map((character) => [character.id, character])
    );

    return CHARACTER_INFO.map((info) => {
      const provided = byId.get(info.id);

      return {
        ...info,
        ...(provided || {}),
        id: info.id,
        name: info.name,
        image: provided?.image ?? provided?.portrait,
      };
    });
  }, [characters]);

  const validCharacters = useMemo(
    () => normalizedCharacters.filter((character) => character.image != null),
    [normalizedCharacters]
  );

  const currentRound = useMemo(
    () => gameCharacters.slice(roundStart, roundStart + choicesPerRound),
    [gameCharacters, roundStart, choicesPerRound]
  );

  const currentRoundIds = useMemo(
    () => currentRound.map((character) => character.id),
    [currentRound]
  );

  // The order is stored in state rather than randomly regenerated on
  // every render. Timer ticks therefore cannot reshuffle the choices.
  const roundChoices = useMemo(() => {
    const byId = new Map(
      currentRound.map((character) => [character.id, character])
    );

    return roundChoiceOrder.map((id) => byId.get(id)).filter(Boolean);
  }, [roundChoiceOrder, currentRound]);

  const matchedSet = useMemo(() => new Set(matchedIds), [matchedIds]);

  const completedCount = matchedIds.length;
  const totalCharacters = gameCharacters.length || 8;
  const progress = totalCharacters ? completedCount / totalCharacters : 0;

  const clearPendingTimeouts = useCallback(() => {
    if (feedbackTimeout.current) {
      clearTimeout(feedbackTimeout.current);
      feedbackTimeout.current = null;
    }

    if (transitionTimeout.current) {
      clearTimeout(transitionTimeout.current);
      transitionTimeout.current = null;
    }
  }, []);

  useEffect(
    () => () => {
      clearPendingTimeouts();
    },
    [clearPendingTimeouts]
  );

  const finishGame = useCallback((result) => {
    if (finishTimeRef.current !== null) return;

    const now = Date.now();

    finishTimeRef.current = now;
    setFinishedAt(now);
    setSelectedNameId(null);
    roundLock.current = true;
    setStatus(result);
  }, []);

  const startGame = useCallback(() => {
    clearPendingTimeouts();

    const playable = shuffle(
      normalizedCharacters.filter((character) => character.image != null)
    );

    setSelectedNameId(null);
    setFeedback(null);
    setLastCorrectId(null);
    setLastWrongId(null);
    setFinishedAt(null);
    finishTimeRef.current = null;
    roundLock.current = false;
    matchedRef.current = [];
    scoreRef.current = 0;
    targetRefs.current = {};

    if (playable.length !== 8) {
      setGameCharacters(playable);
      setStatus("setupError");
      return;
    }

    setGameCharacters(playable);
    setRoundStart(0);
    setRoundChoiceOrder(
      shuffle(playable.slice(0, choicesPerRound)).map(
        (character) => character.id
      )
    );

    setMatchedIds([]);
    setTimeLeft(STARTING_TIME);
    setScore(0);
    setStartedAt(Date.now());
    setStatus("playing");
  }, [clearPendingTimeouts, normalizedCharacters, choicesPerRound]);

  // One countdown interval is active while a game is in progress.
  // (Pausing simply stops the interval; timeLeft is kept as is.)
  useEffect(() => {
    if (status !== "playing" || paused) return undefined;

    const interval = setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          clearInterval(interval);

          if (finishTimeRef.current === null) {
            finishGame("gameover");
          }

          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [status, paused, finishGame]);

  // Tells the parent which screen we are on ("intro" = instructions,
  // "playing", "result" = final screen) so it can adjust the pause button.
  useEffect(() => {
    if (!onPhaseChange) return;

    if (status === "ready" || status === "setupError") onPhaseChange("intro");
    else if (status === "complete" || status === "gameover")
      onPhaseChange("result");
    else onPhaseChange("playing");
  }, [status, onPhaseChange]);

  const elapsedSeconds = useMemo(() => {
    if (!startedAt) return 0;

    const endTime = finishedAt ?? Date.now();

    return Math.max(0, Math.floor((endTime - startedAt) / 1000));
  }, [startedAt, finishedAt]);

  const selectName = useCallback(
    (character) => {
      if (status !== "playing" || roundLock.current || paused) return;
      if (matchedSet.has(character.id)) return;

      setSelectedNameId((previous) =>
        previous === character.id ? null : character.id
      );

      setFeedback(null);
      setLastWrongId(null);
      setLastCorrectId(null);
    },
    [status, matchedSet, paused]
  );

  // Measures every visible portrait row in screen coordinates.
  const measureTargets = useCallback(
    () =>
      Promise.all(
        currentRound.map(
          (target) =>
            new Promise((resolve) => {
              const node = targetRefs.current[target.id];

              if (!node || typeof node.measureInWindow !== "function") {
                resolve(null);
                return;
              }

              node.measureInWindow((x, y, w, h) => {
                resolve({ target, x, y, width: w, height: h });
              });
            })
        )
      ),
    [currentRound]
  );

  const beginDrag = useCallback(
    (character) => {
      setSelectedNameId(character.id);
      setFeedback(null);
      rectsRef.current = [];
      measureTargets().then((rects) => {
        rectsRef.current = rects;
      });
    },
    [measureTargets]
  );

  // While dragging: light up the portrait the finger is over.
  const moveDrag = useCallback((x, y) => {
    const target = findHit(rectsRef.current, x, y);
    const id = target ? target.id : null;
    setHoverId((previous) => (previous === id ? previous : id));
  }, []);

  const selectPortrait = useCallback(
    (target, draggedNameId = null) => {
      if (status !== "playing" || roundLock.current || paused) return;
      if (matchedSet.has(target.id)) return;

      const nameId = draggedNameId || selectedNameId;

      if (!nameId) {
        setFeedback({
          type: "hint",
          text: "Choose a name, then tap its portrait or matching box.",
        });
        return;
      }

      if (matchedSet.has(nameId)) {
        setSelectedNameId(null);
        return;
      }

      if (nameId === target.id) {
        const nextMatched = [...matchedRef.current];

        // Prevent double scoring from rapid or repeated touches.
        if (nextMatched.includes(target.id)) return;

        nextMatched.push(target.id);
        matchedRef.current = nextMatched;

        sfx("correct");

        setMatchedIds(nextMatched);
        setSelectedNameId(null);
        setLastCorrectId(target.id);
        setLastWrongId(null);

        const pointsEarned = POINTS_PER_CORRECT + Math.max(0, timeLeft) * 2;

        scoreRef.current += pointsEarned;
        setScore(scoreRef.current);

        setTimeLeft((previous) => previous + TIME_BONUS);

        setFeedback({
          type: "correct",
          text: `Correct! +${pointsEarned} points · +${TIME_BONUS}s`,
        });

        if (nextMatched.length === gameCharacters.length) {
          roundLock.current = true;

          transitionTimeout.current = setTimeout(() => {
            finishGame("complete");
          }, 450);

          return;
        }

        const roundComplete = currentRoundIds.every((id) =>
          nextMatched.includes(id)
        );

        if (roundComplete) {
          roundLock.current = true;

          transitionTimeout.current = setTimeout(() => {
            const nextStart = roundStart + choicesPerRound;

            setRoundStart(nextStart);

            const nextRound = gameCharacters.slice(
              nextStart,
              nextStart + choicesPerRound
            );

            setRoundChoiceOrder(
              shuffle(nextRound).map((character) => character.id)
            );

            setLastCorrectId(null);
            setLastWrongId(null);
            setFeedback(null);
            roundLock.current = false;
          }, 450);
        } else {
          feedbackTimeout.current = setTimeout(() => {
            setFeedback((previous) =>
              previous?.type === "correct" ? null : previous
            );
          }, 1600);
        }

        return;
      }

      // Incorrect matches keep the original penalty and scoring rules.
      sfx("wrong");
      setLastWrongId(target.id);
      setLastCorrectId(null);
      setSelectedNameId(null);

      setTimeLeft((previous) => Math.max(0, previous - WRONG_ANSWER_PENALTY));

      setFeedback({
        type: "wrong",
        text: `Not quite. Try another match. −${WRONG_ANSWER_PENALTY}s`,
      });

      if (feedbackTimeout.current) {
        clearTimeout(feedbackTimeout.current);
      }

      feedbackTimeout.current = setTimeout(() => {
        setLastWrongId(null);
        setFeedback((previous) =>
          previous?.type === "wrong" ? null : previous
        );
      }, 1000);
    },
    [
      status,
      paused,
      matchedSet,
      selectedNameId,
      timeLeft,
      gameCharacters,
      currentRoundIds,
      roundStart,
      choicesPerRound,
      finishGame,
      sfx,
    ]
  );

  // Called when a dragged name is released. It is only accepted if the
  // finger is really on a portrait row.
  const dropNameOnPortrait = useCallback(
    async (character, screenX, screenY) => {
      setHoverId(null);

      if (status !== "playing" || roundLock.current || paused) return;

      const rects = rectsRef.current.length
        ? rectsRef.current
        : await measureTargets();

      rectsRef.current = [];

      const hit = findHit(rects, screenX, screenY);

      if (hit) {
        selectPortrait(hit, character.id);
      } else {
        // Released away from every portrait: nothing is accepted. The name
        // stays selected so a tap on the intended portrait still works.
        setSelectedNameId(character.id);
      }
    },
    [status, paused, measureTargets, selectPortrait]
  );

  // Row sizes shrink in landscape so more of the board fits on screen
  const rowMin = landscape ? 78 : 92;
  const imgW = landscape ? 50 : 52;
  const imgH = landscape ? 64 : 80;

  // 1 = fits as is. Smaller = shrink to fit (never below 0.4).
  const FIT_PADDING = 28; // top + bottom padding of the play area
  const fitScale =
    areaH > 0 && contentH > 0
      ? Math.min(1, Math.max(0.4, (areaH - FIT_PADDING) / contentH))
      : 1;

  const onAreaLayout = (e) => setAreaH(e.nativeEvent.layout.height);
  const onContentLayout = (e) => setContentH(e.nativeEvent.layout.height);

  // ---------------------------------------------------
  // PIECES
  // ---------------------------------------------------

  const timeIsLow = timeLeft <= 10;

  const renderHeader = (showStats) => (
    <View style={styles.header}>
      <Text style={styles.title}>Who Am I?</Text>

      {showStats ? (
        <View style={styles.pills}>
          <View style={[styles.pill, timeIsLow && styles.pillLow]}>
            <Text style={[styles.pillText, timeIsLow && styles.pillTextLow]}>
              {formatTime(timeLeft)}
            </Text>
          </View>

          <View style={styles.pill}>
            <Text style={styles.pillText}>{score.toLocaleString()} pts</Text>
          </View>

          <View style={styles.pill}>
            <Text style={styles.pillText}>
              {completedCount}/{totalCharacters}
            </Text>
          </View>
        </View>
      ) : null}
    </View>
  );

  const renderGameBoard = () => (
    <>
      <View style={styles.progressTrack}>
        <View
          style={[styles.progressFill, { width: `${progress * 100}%` }]}
        />
      </View>

      <Panel style={styles.boardPanel}>
        <PanelTab>MATCH THE FIGURES</PanelTab>

        <Text style={styles.instruction}>
          Drag a name onto a portrait, or tap a name and then a portrait.
        </Text>

        <View style={styles.matchingColumns}>
          {/* Portraits and their answer targets */}
          <View style={styles.portraitColumn}>
            {currentRound.map((character, index) => {
              const isMatched = matchedSet.has(character.id);
              const isCorrect = lastCorrectId === character.id;
              const isWrong = lastWrongId === character.id;
              const isHover = hoverId === character.id && !isMatched;

              return (
                <Pressable
                  key={character.id}
                  ref={(node) => {
                    if (node) {
                      targetRefs.current[character.id] = node;
                    } else {
                      delete targetRefs.current[character.id];
                    }
                  }}
                  collapsable={false}
                  onPress={() => selectPortrait(character)}
                  disabled={isMatched || status !== "playing"}
                  accessibilityRole="button"
                  accessibilityLabel={
                    isMatched
                      ? `${character.name}, matched`
                      : `Portrait ${index + 1}, matching target`
                  }
                  style={({ pressed }) => [
                    styles.portraitRow,
                    { minHeight: rowMin },
                    isMatched && styles.portraitRowMatched,
                    isCorrect && styles.portraitRowCorrect,
                    isWrong && styles.portraitRowWrong,
                    isHover && styles.portraitRowHover,
                    pressed && !isMatched && styles.pressed,
                  ]}
                >
                  <View
                    style={[styles.imageFrame, { width: imgW, height: imgH }]}
                  >
                    <Image
                      source={character.image}
                      style={styles.portrait}
                      resizeMode="cover"
                      accessibilityLabel={
                        isMatched ? character.name : "Historical portrait"
                      }
                    />

                    {isMatched ? (
                      <View
                        pointerEvents="none"
                        style={styles.matchedOverlay}
                      />
                    ) : null}
                  </View>

                  <View
                    style={[
                      styles.answerBox,
                      { minHeight: imgH },
                      isMatched && styles.answerBoxMatched,
                      isWrong && styles.answerBoxWrong,
                    ]}
                  >
                    <Text
                      style={[
                        styles.answerText,
                        isMatched && styles.answerTextMatched,
                      ]}
                      numberOfLines={3}
                      adjustsFontSizeToFit
                      minimumFontScale={0.78}
                    >
                      {isMatched ? character.name : "Drop name here"}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>

          {/* Available names stay immediately beside the targets */}
          <View style={styles.namesColumn}>
            <Text style={styles.namesHeading}>AVAILABLE NAMES</Text>

            {roundChoices.map((character) => (
              <DraggableName
                key={character.id}
                character={character}
                isMatched={matchedSet.has(character.id)}
                isSelected={selectedNameId === character.id}
                disabled={status !== "playing" || paused}
                minHeight={rowMin}
                scale={fitScale}
                onDragStart={beginDrag}
                onDragMove={moveDrag}
                onDrop={dropNameOnPortrait}
                onTap={selectName}
              />
            ))}
          </View>
        </View>

        {/* Always reserves its space so the board never jumps when a
            message appears or disappears */}
        <View style={styles.feedbackSlot}>
          {feedback ? (
            <View
              accessibilityLiveRegion="polite"
              style={[
                styles.feedbackBox,
                feedback.type === "correct" && styles.feedbackCorrect,
                feedback.type === "wrong" && styles.feedbackWrong,
                feedback.type === "hint" && styles.feedbackHint,
              ]}
            >
              <Text style={styles.feedbackText}>{feedback.text}</Text>
            </View>
          ) : null}
        </View>
      </Panel>
    </>
  );

  const renderEndScreen = (isComplete) => (
    <Panel style={styles.centerPanel}>
      <PanelTab>{isComplete ? "WELL DONE" : "TIME’S UP"}</PanelTab>

      <Text style={styles.panelTitle}>
        {isComplete ? "All Figures Identified" : "The Clock Ran Out"}
      </Text>

      <Text style={styles.bodyText}>
        {isComplete
          ? "You identified all eight historical figures."
          : "Your time has run out. Review your score and try again."}
      </Text>

      <View style={styles.resultStats}>
        <View style={styles.resultStat}>
          <Text style={styles.resultLabel}>FINAL SCORE</Text>
          <Text style={styles.resultValue}>{score.toLocaleString()}</Text>
        </View>

        <View style={styles.resultStat}>
          <Text style={styles.resultLabel}>TIME ELAPSED</Text>
          <Text style={styles.resultValue}>{formatTime(elapsedSeconds)}</Text>
        </View>

        <View style={styles.resultStat}>
          <Text style={styles.resultLabel}>MATCHED</Text>
          <Text style={styles.resultValue}>{completedCount}/8</Text>
        </View>
      </View>

      {isComplete && onComplete ? (
        <GameButton label="Continue Story" onPress={() => onComplete()} />
      ) : null}

      <GameButton
        label={isComplete ? "Play Again" : "Retry"}
        onPress={startGame}
        secondary={isComplete && !!onComplete}
      />
    </Panel>
  );

  // ---------------------------------------------------
  // SCREENS
  // ---------------------------------------------------

  let body;

  if (status === "ready") {
    body = (
      <>
        {renderHeader(false)}

        <Panel style={styles.centerPanel}>
          <PanelTab>PHILIPPINE HISTORY</PanelTab>

          <Text style={styles.panelTitle}>Know Your History</Text>

          <Text style={styles.bodyText}>
            Match eight important figures from Philippine history with their
            portraits.
          </Text>

          <View style={styles.ruleBox}>
            <Text style={styles.ruleText}>
              • Start with {STARTING_TIME} seconds.
            </Text>
            <Text style={styles.ruleText}>
              • Correct matches earn points and add {TIME_BONUS} seconds.
            </Text>
            <Text style={styles.ruleText}>
              • Wrong matches cost {WRONG_ANSWER_PENALTY} seconds.
            </Text>
          </View>

          {validCharacters.length !== 8 ? (
            <Text style={styles.setupWarning}>
              Portrait setup incomplete: {validCharacters.length}/8 images
              received. Check the character asset mapping in compilation.jsx.
            </Text>
          ) : null}

          <GameButton label="Begin Challenge" onPress={startGame} />
        </Panel>
      </>
    );
  } else if (status === "setupError") {
    body = (
      <>
        {renderHeader(false)}

        <Panel style={styles.centerPanel}>
          <PanelTab>SETUP</PanelTab>

          <Text style={styles.panelTitle}>Portraits Missing</Text>

          <Text style={styles.bodyText}>
            This game needs all eight character portraits. Check that each
            character in compilation.jsx has the correct id and an image
            property referencing its existing asset.
          </Text>

          <GameButton label="Back" onPress={() => setStatus("ready")} />
        </Panel>
      </>
    );
  } else {
    body = (
      <>
        {renderHeader(status === "playing")}

        {status === "playing"
          ? renderGameBoard()
          : renderEndScreen(status === "complete")}
      </>
    );
  }

  return (
    <Screen
      paused={paused}
      scale={fitScale}
      onAreaLayout={onAreaLayout}
      onContentLayout={onContentLayout}
    >
      <View style={styles.container}>{body}</View>
    </Screen>
  );
}

// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({
  flex: { flex: 1 },
  background: { flex: 1, width: "100%", height: "100%", backgroundColor: "#000" },
  safeArea: { flex: 1 },
  // The play area does not scroll. Content is centered and scaled down
  // slightly when it doesn't fit (see fitScale).
  fitArea: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  container: {
    width: "100%",
    maxWidth: 760,
    alignSelf: "center",
  },
  pressed: { opacity: 0.78 },

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
  pills: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  pill: {
    minWidth: 54,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderWidth: 1,
    borderColor: "#d7cfbe",
  },
  pillLow: { borderColor: "#ff9b82", backgroundColor: "rgba(90, 20, 10, 0.75)" },
  pillText: { color: "#FFFFFF", fontSize: 14, fontWeight: "bold" },
  pillTextLow: { color: "#ff9b82" },

  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(53, 35, 19, 0.2)",
    overflow: "hidden",
    marginBottom: 10,
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
    backgroundColor: GOLD,
  },

  // PANELS
  panel: {
    paddingTop: PANEL_PAD_TOP,
    paddingBottom: PANEL_PAD_BOTTOM,
    paddingHorizontal: PANEL_PAD_SIDE,
    justifyContent: "center",
  },
  boardPanel: { width: "100%" },
  centerPanel: {
    width: "100%",
    maxWidth: 560,
    alignSelf: "center",
    minHeight: 240,
  },
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
  instruction: {
    color: "#141414",
    fontSize: 12,
    lineHeight: 17,
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 10,
  },
  ruleBox: { marginVertical: 14, alignSelf: "center" },
  ruleText: { color: INK, fontSize: 14, lineHeight: 22 },
  setupWarning: {
    color: RED,
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
    marginBottom: 6,
  },

  // MATCHING BOARD
  matchingColumns: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  portraitColumn: {
    flex: 1,
    minWidth: 0,
    paddingRight: 5,
    paddingTop: 23,
    zIndex: 1,
  },
  // Drawn above the portraits so a dragged name passes over them
  namesColumn: {
    flex: 1,
    minWidth: 0,
    paddingLeft: 5,
    zIndex: 5,
  },
  namesHeading: {
    color: GOLD,
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 0.8,
    textAlign: "center",
    marginBottom: 7,
    minHeight: 16,
    textAlignVertical: "center",
  },

  portraitRow: {
    flexDirection: "row",
    alignItems: "stretch",
    minWidth: 0,
    padding: 5,
    marginBottom: 7,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: GOLD,
    backgroundColor: "rgba(120, 85, 40, 0.12)",
  },
  portraitRowMatched: {
    borderColor: GREEN,
    backgroundColor: "rgba(61, 107, 69, 0.18)",
  },
  portraitRowCorrect: { borderColor: GREEN, borderWidth: 2.5 },
  portraitRowWrong: { borderColor: RED, borderWidth: 2.5 },
  // the portrait the dragged name is currently over
  portraitRowHover: {
    borderColor: INK,
    borderWidth: 2.5,
    backgroundColor: "rgba(214, 180, 106, 0.4)",
  },

  imageFrame: {
    minWidth: 42,
    borderRadius: 6,
    backgroundColor: "rgba(120, 85, 40, 0.25)",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    alignSelf: "center",
  },
  portrait: { width: "100%", height: "100%" },
  matchedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(61, 107, 69, 0.35)",
  },

  answerBox: {
    flex: 1,
    minWidth: 0,
    marginLeft: 5,
    paddingVertical: 5,
    paddingHorizontal: 3,
    borderRadius: 6,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: GOLD,
    backgroundColor: "rgba(255, 248, 232, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  answerBoxMatched: {
    backgroundColor: "rgba(61, 107, 69, 0.12)",
    borderColor: GREEN,
    borderStyle: "solid",
  },
  answerBoxWrong: { borderColor: RED },
  answerText: {
    color: "#6a5a42",
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  answerTextMatched: { color: INK },

  // NAME CHIPS
  nameOptionWrapper: {
    marginBottom: 7,
    borderRadius: 9,
    zIndex: 1,
  },
  // No elevation / shadow here: on a see-through chip they draw a pale box
  // inside it. zIndex alone is enough to keep the chip above the portraits.
  nameOptionWrapperSelected: { zIndex: 10 },
  nameOptionWrapperDragging: { zIndex: 50 },
  nameOptionWrapperMatched: { opacity: 0.72 },
  nameOption: {
    paddingVertical: 7,
    paddingHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: GOLD,
    backgroundColor: "#fdf3dc",
  },
  nameOptionSelected: {
    backgroundColor: "#e6d097",
    borderColor: INK,
    borderWidth: 2.5,
  },
  nameOptionMatched: {
    backgroundColor: "#dfe6d3",
    borderColor: GREEN,
  },
  nameText: {
    color: INK,
    textAlign: "center",
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "bold",
  },
  nameTextSelected: { color: INK },
  nameTextMatched: { color: GREEN },

  // FEEDBACK
  // Fixed-height slot: the layout stays put whether or not a message shows.
  feedbackSlot: {
    minHeight: 36,
    marginTop: 4,
    justifyContent: "center",
  },
  feedbackBox: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  feedbackCorrect: {
    backgroundColor: "rgba(61, 107, 69, 0.16)",
    borderColor: GREEN,
  },
  feedbackWrong: {
    backgroundColor: "rgba(163, 40, 27, 0.12)",
    borderColor: RED,
  },
  feedbackHint: {
    backgroundColor: "rgba(120, 85, 40, 0.12)",
    borderColor: GOLD,
  },
  feedbackText: {
    color: INK,
    textAlign: "center",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "bold",
  },

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

  // RESULTS
  resultStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "rgba(120, 85, 40, 0.14)",
    borderColor: GOLD,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 12,
    marginVertical: 14,
  },
  resultStat: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 3,
  },
  resultLabel: {
    color: "#50402a",
    fontSize: 9,
    letterSpacing: 0.5,
    fontWeight: "bold",
    textAlign: "center",
  },
  resultValue: {
    color: INK,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 4,
    textAlign: "center",
  },
});