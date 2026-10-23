import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  Animated,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
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
  : { left: 0, right: 0.166, top: 0.06, bottom: 0.06 };

const INK = "#352313"; // same brown the speaker names use
const BUTTON_INK = "#371f10"; // same as quiz buttons
const GOLD = "#7a5a2a";
const GREEN = "#1f6b34";
const RED = "#a3281b";

const START_SECONDS = 45;
const BONUS_SECONDS = 10;
const TICK_MS = 200;
const CARD_GAP = 6;

const EVENT_LIBRARY = {
  legazpi: {
    id: "legazpi",
    date: "1565",
    sortDate: 1565,
    text: "Miguel López de Legazpi establishes a permanent Spanish settlement in Cebu.",
  },
  dagohoy: {
    id: "dagohoy",
    date: "1744",
    sortDate: 1744,
    text: "Francisco Dagohoy's rebellion begins in Bohol.",
  },
  liga: {
    id: "liga",
    date: "July 3, 1892",
    sortDate: 18920703,
    text: "José Rizal helps establish La Liga Filipina.",
  },
  katipunan: {
    id: "katipunan",
    date: "July 7, 1892",
    sortDate: 18920707,
    text: "Andrés Bonifacio and fellow patriots establish the Katipunan.",
  },
  pugadLawin: {
    id: "pugadLawin",
    date: "Commonly dated August 23, 1896",
    sortDate: 18960823,
    text: "The Cry of Pugad Lawin marks an open break with Spanish colonial rule.",
  },
  rizalExecution: {
    id: "rizalExecution",
    date: "December 30, 1896",
    sortDate: 18961230,
    text: "José Rizal is executed at Bagumbayan.",
  },
};

const ROUNDS = [
  {
    title: "The Roots of Resistance",
    subtitle: "Arrange the events from earliest to latest.",
    eventIds: ["legazpi", "dagohoy", "liga", "katipunan"],
  },
  {
    title: "The Road to Revolution",
    subtitle: "Place these milestones in chronological order.",
    eventIds: [
      "dagohoy",
      "liga",
      "katipunan",
      "pugadLawin",
      "rizalExecution",
    ],
  },
  {
    title: "The Revolution Unfolds",
    subtitle: "Arrange all six milestones.",
    eventIds: [
      "legazpi",
      "dagohoy",
      "liga",
      "katipunan",
      "pugadLawin",
      "rizalExecution",
    ],
  },
];

const shuffle = (items) => {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  if (
    result.length > 1 &&
    result.every((item, index) => item.id === items[index].id)
  ) {
    [result[0], result[1]] = [result[1], result[0]];
  }

  return result;
};

const moveItem = (items, fromIndex, toIndex) => {
  if (
    fromIndex < 0 ||
    fromIndex >= items.length ||
    toIndex < 0 ||
    toIndex >= items.length ||
    fromIndex === toIndex
  ) {
    return items;
  }

  const result = [...items];
  const [item] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, item);

  return result;
};

const getCorrectOrder = (eventIds) =>
  eventIds
    .map((id) => EVENT_LIBRARY[id])
    .filter(Boolean)
    .sort((a, b) => a.sortDate - b.sortDate);

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
  const L = PANEL_INSET.left;
  const R = PANEL_INSET.right;
  const T = PANEL_INSET.top;
  const B = PANEL_INSET.bottom;
  const w = 1 - L - R;
  const h = 1 - T - B;

  return (
    <View style={[styles.panel, style, { overflow: "visible" }]}>
      <Image
        source={IMG.panel}
        resizeMode="stretch"
        pointerEvents="none"
        style={{
          position: "absolute",
          width: `${100 / w}%`,
          height: `${100 / h}%`,
          left: `${(-100 * L) / w}%`,
          top: `${(-100 * T) / h}%`,
        }}
      />
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

function Backdrop({ children }) {
  return (
    <ImageBackground
      source={IMG.background}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>
    </ImageBackground>
  );
}

// A card is just text + two arrow buttons. There is NO gesture handler on the
// card, so the list scrolls normally no matter where the finger starts.
function TimelineCard({
  event,
  index,
  total,
  justMoved,
  disabled,
  onMove,
  compact,
}) {
  const canUp = !disabled && index > 0;
  const canDown = !disabled && index < total - 1;

  return (
    <View
      style={[
        styles.eventCard,
        compact && styles.eventCardCompact,
        justMoved && styles.eventCardMoved,
        disabled && styles.eventCardDisabled,
      ]}
    >
      <View
        style={[
          styles.positionBadge,
          compact && styles.positionBadgeCompact,
          justMoved && styles.positionBadgeMoved,
        ]}
      >
        <Text style={styles.positionNumber}>
          {String(index + 1).padStart(2, "0")}
        </Text>
      </View>

      <View style={styles.cardTextContainer}>
        <Text style={[styles.eventText, compact && styles.eventTextCompact]}>
          {event.text}
        </Text>
      </View>

      <View style={styles.arrowRow}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={`Move up. Currently position ${index + 1} of ${total}. ${event.text}`}
          activeOpacity={0.6}
          disabled={!canUp}
          onPress={() => onMove(index, -1)}
          hitSlop={{ top: 4, bottom: 4, left: 2, right: 2 }}
          style={[styles.arrowButton, !canUp && styles.arrowButtonOff]}
        >
          <Text style={[styles.arrowText, !canUp && styles.arrowTextOff]}>
            ▲
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={`Move down. Currently position ${index + 1} of ${total}. ${event.text}`}
          activeOpacity={0.6}
          disabled={!canDown}
          onPress={() => onMove(index, 1)}
          hitSlop={{ top: 4, bottom: 4, left: 2, right: 2 }}
          style={[styles.arrowButton, !canDown && styles.arrowButtonOff]}
        >
          <Text style={[styles.arrowText, !canDown && styles.arrowTextOff]}>
            ▼
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// =====================================================
// MINIGAME
// =====================================================

export default function ChronologicalOrderMinigame({ onComplete }) {
  const { width, height } = useWindowDimensions();
  const audio = useAudio();

  const landscape = width > height;

  // Small cards and tighter spacing on narrow or short devices.
  const compact = width <= 390 || height <= 740;

  const [screen, setScreen] = useState("start");
  const [roundIndex, setRoundIndex] = useState(0);
  const [orderedEvents, setOrderedEvents] = useState([]);
  const [lastMovedId, setLastMovedId] = useState(null);
  const [remainingMs, setRemainingMs] = useState(START_SECONDS * 1000);
  const [score, setScore] = useState(0);
  const [roundsCompleted, setRoundsCompleted] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");
  const [roundPoints, setRoundPoints] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const timerRef = useRef(null);
  const deadlineRef = useRef(null);
  const phaseRef = useRef("start");
  const roundIndexRef = useRef(0);
  const orderedEventsRef = useRef([]);
  const remainingMsRef = useRef(START_SECONDS * 1000);
  const scoreRef = useRef(0);
  const roundsCompletedRef = useRef(0);
  const roundScoredRef = useRef(false);
  const startTimeRef = useRef(null);
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

  const setOrder = useCallback((events) => {
    orderedEventsRef.current = events;
    setOrderedEvents(events);
  }, []);

  const finishGameOver = useCallback(() => {
    if (phaseRef.current !== "active") return;

    phaseRef.current = "gameover";
    stopTimer();
    deadlineRef.current = null;
    remainingMsRef.current = 0;

    setRemainingMs(0);
    setLastMovedId(null);
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
        if (phaseRef.current !== "active" || deadlineRef.current == null) {
          return;
        }

        const ms = Math.max(0, deadlineRef.current - Date.now());

        remainingMsRef.current = ms;
        setRemainingMs(ms);

        if (ms <= 0) {
          phaseRef.current = "gameover";
          stopTimer();
          deadlineRef.current = null;
          remainingMsRef.current = 0;

          setRemainingMs(0);
          setLastMovedId(null);
          setFeedback("");
          setScreen("gameover");
        }
      }, TICK_MS);
    },
    [stopTimer]
  );

  useEffect(() => () => stopTimer(), [stopTimer]);

  const loadRound = useCallback(
    (index) => {
      const round = ROUNDS[index];

      const events = round.eventIds
        .map((id) => EVENT_LIBRARY[id])
        .filter(Boolean);

      setOrder(shuffle(events));
      setLastMovedId(null);
      setFeedback("");
      setFeedbackType("");
      roundScoredRef.current = false;
    },
    [setOrder]
  );

  const startGame = useCallback(() => {
    stopTimer();

    phaseRef.current = "active";
    roundIndexRef.current = 0;
    scoreRef.current = 0;
    roundsCompletedRef.current = 0;
    roundScoredRef.current = false;
    startTimeRef.current = Date.now();

    setRoundIndex(0);
    setScore(0);
    setRoundsCompleted(0);
    setRoundPoints(0);
    setElapsedSeconds(0);
    setLastMovedId(null);
    setFeedback("");
    setFeedbackType("");
    setScreen("active");

    loadRound(0);
    startTimer(START_SECONDS * 1000);
  }, [loadRound, startTimer, stopTimer]);

  // Move one card up (-1) or down (+1). The card keeps a gold outline
  // afterwards so you can see where it landed.
  const moveCard = useCallback(
    (index, direction) => {
      if (phaseRef.current !== "active") return;
      if (roundScoredRef.current) return;

      const events = orderedEventsRef.current;
      const target = index + direction;

      if (target < 0 || target >= events.length) return;

      const movedId = events[index].id;

      setOrder(moveItem(events, index, target));
      setLastMovedId(movedId);
      setFeedback("");
      setFeedbackType("");
    },
    [setOrder]
  );

  const submitAnswer = useCallback(() => {
    if (phaseRef.current !== "active") return;
    if (roundScoredRef.current) return;

    const now = Date.now();

    const liveRemaining =
      deadlineRef.current == null ? 0 : Math.max(0, deadlineRef.current - now);

    if (liveRemaining <= 0) {
      finishGameOver();
      return;
    }

    const correctOrder = getCorrectOrder(ROUNDS[roundIndexRef.current].eventIds);

    const currentOrder = orderedEventsRef.current;

    const isCorrect =
      currentOrder.length === correctOrder.length &&
      currentOrder.every((event, index) => event.id === correctOrder[index]?.id);

    if (!isCorrect) {
      sfx("wrong");
      setFeedback("Not quite. Check the sequence and try again.");
      setFeedbackType("error");
      return;
    }

    sfx("correct");
    roundScoredRef.current = true;

    const secondsLeft = Math.ceil(liveRemaining / 1000);
    const earned = 100 + secondsLeft * 2;

    scoreRef.current += earned;
    roundsCompletedRef.current += 1;

    setScore(scoreRef.current);
    setRoundsCompleted(roundsCompletedRef.current);
    setRoundPoints(earned);
    setLastMovedId(null);
    setFeedback(
      `Correct order! +${earned} points and +${BONUS_SECONDS} seconds.`
    );
    setFeedbackType("success");

    // Reset the timer to 45 seconds after each correct round.
    const nextRemaining = START_SECONDS * 1000;

    deadlineRef.current = now + nextRemaining;
    remainingMsRef.current = nextRemaining;
    setRemainingMs(nextRemaining);

    if (roundIndexRef.current === ROUNDS.length - 1) {
      phaseRef.current = "victory";
      stopTimer();
      deadlineRef.current = null;

      setElapsedSeconds(
        Math.max(0, Math.floor((now - startTimeRef.current) / 1000))
      );

      setScreen("victory");
      return;
    }

    setScreen("roundComplete");
  }, [finishGameOver, stopTimer, sfx]);

  const continueToNextRound = useCallback(() => {
    if (phaseRef.current !== "active") return;
    if (!roundScoredRef.current) return;

    const nextIndex = roundIndexRef.current + 1;

    if (nextIndex >= ROUNDS.length) return;

    roundIndexRef.current = nextIndex;
    setRoundIndex(nextIndex);
    loadRound(nextIndex);
    setScreen("active");
  }, [loadRound]);

  const retry = useCallback(() => {
    startGame();
  }, [startGame]);

  const seconds = Math.ceil(remainingMs / 1000);
  const lowTime = seconds <= 10;

  const progress =
    screen === "victory"
      ? 1
      : Math.max(0, Math.min(1, remainingMs / (START_SECONDS * 1000)));

  // ---------------------------------------------------
  // PIECES
  // ---------------------------------------------------

  const feedbackStyle = [
    styles.feedback,
    feedbackType === "success" && styles.successText,
    feedbackType === "error" && styles.errorText,
  ];

  const timerBar = (
    <View style={styles.timerTrack}>
      <View
        style={[
          styles.timerFill,
          lowTime && styles.timerFillLow,
          { width: `${progress * 100}%` },
        ]}
      />
    </View>
  );

  const introHeader = (
    <View style={styles.introHeader}>
      <Text style={styles.title}>The Timeline Trail</Text>
    </View>
  );

  const roundDots = (
    <View style={styles.roundProgress}>
      {ROUNDS.map((round, index) => (
        <View
          key={round.title}
          style={[
            styles.progressDot,
            index < roundsCompleted && styles.progressDotDone,
            index === roundIndex && styles.progressDotCurrent,
          ]}
        />
      ))}
    </View>
  );

  const activeHeader = (
    <View style={styles.activeHeader}>
      <View style={styles.headerLeft}>
        <Text style={styles.activeTitle}>TIMELINE</Text>
        {roundDots}
      </View>

      <View style={styles.pills}>
        <View style={[styles.pill, lowTime && styles.pillLow]}>
          <Text style={[styles.pillText, lowTime && styles.pillTextLow]}>
            {seconds}s
          </Text>
        </View>

        <View style={styles.pill}>
          <Text style={styles.pillText}>{score} pts</Text>
        </View>
      </View>
    </View>
  );

  const cardsList = (
    <ScrollView
      style={styles.cardsScroll}
      contentContainerStyle={styles.cardsContent}
      showsVerticalScrollIndicator
      keyboardShouldPersistTaps="handled"
      nestedScrollEnabled
    >
      {orderedEvents.map((event, index) => (
        <TimelineCard
          key={event.id}
          event={event}
          index={index}
          total={orderedEvents.length}
          justMoved={lastMovedId === event.id}
          disabled={roundScoredRef.current}
          compact={compact}
          onMove={moveCard}
        />
      ))}
    </ScrollView>
  );

  // Landscape: controls live in a parchment panel beside the list.
  const sidePanel = (
    <Panel style={styles.sidePanel}>
      <PanelTab>
        ROUND {roundIndex + 1}/{ROUNDS.length}
      </PanelTab>

      <Text style={styles.sideTitle}>{ROUNDS[roundIndex].title}</Text>
      <Text style={styles.sideSubtitle}>{ROUNDS[roundIndex].subtitle}</Text>

      <Text style={styles.sideHint}>▲ earliest at the top · latest at the bottom ▼</Text>

      <Text numberOfLines={2} style={feedbackStyle}>
        {feedback || " "}
      </Text>

      <GameButton label="Submit Order" onPress={submitAnswer} />
      {timerBar}
    </Panel>
  );

  // ---------------------------------------------------
  // SCREENS
  // ---------------------------------------------------

  if (screen === "active") {
    return (
      <Backdrop>
        <View style={styles.gameArea}>
          {activeHeader}

          {landscape ? (
            <View style={styles.activeRow}>
              <View style={styles.cardsWrap}>{cardsList}</View>
              {sidePanel}
            </View>
          ) : (
            <View style={styles.activeColumn}>
              <View style={styles.timelineLabels}>
                <Text style={styles.endpointTitle}>↑ EARLIEST</Text>
                <Text style={styles.endpointTitle}>LATEST ↓</Text>
              </View>

              <View style={styles.cardsWrap}>{cardsList}</View>

              <View style={styles.bottomArea}>
                <Text numberOfLines={2} style={feedbackStyle}>
                  {feedback || " "}
                </Text>

                <GameButton label="Submit Order" onPress={submitAnswer} />
                {timerBar}
              </View>
            </View>
          )}
        </View>
      </Backdrop>
    );
  }

  // Every other screen is a centered parchment panel.
  let content = null;

  if (screen === "start") {
    content = (
      <Panel style={styles.centerPanel}>
        <PanelTab>PHILIPPINE HISTORY</PanelTab>

        <Text style={styles.panelTitle}>Put History in Order</Text>

        <Text style={styles.bodyText}>
          Arrange milestones in Philippine history from earliest to latest.
        </Text>

        <View style={styles.ruleBox}>
          <Text style={styles.ruleText}>• Start with 45 seconds.</Text>
          <Text style={styles.ruleText}>
            • Tap ▲ or ▼ on a card to move it one step.
          </Text>
          <Text style={styles.ruleText}>
            • Submit the sequence when you are ready.
          </Text>
          <Text style={styles.ruleText}>
            • Correct rounds earn points and bonus time.
          </Text>
        </View>

        <GameButton label="Begin Timeline" onPress={startGame} />
      </Panel>
    );
  }

  if (screen === "roundComplete") {
    content = (
      <Panel style={styles.centerPanel}>
        <PanelTab>ROUND COMPLETE</PanelTab>

        <Text style={styles.panelTitle}>History in Order</Text>

        <Text style={styles.bodyText}>
          You placed every event in the correct chronological order.
        </Text>

        <Text style={styles.bigNumber}>+{roundPoints}</Text>
        <Text style={styles.timeSummary}>
          POINTS EARNED · Total score: {score}
        </Text>

        <GameButton label="Next Round" onPress={continueToNextRound} />
      </Panel>
    );
  }

  if (screen === "gameover") {
    content = (
      <Panel style={styles.centerPanel}>
        <PanelTab>TIME EXPIRED</PanelTab>

        <Text style={styles.panelTitle}>The Timeline Is Unfinished</Text>

        <Text style={styles.bodyText}>
          You completed {roundsCompleted} of {ROUNDS.length} rounds.
        </Text>

        <Text style={styles.bigNumber}>{score}</Text>
        <Text style={styles.timeSummary}>TOTAL POINTS</Text>

        <GameButton label="Try Again" onPress={retry} />
      </Panel>
    );
  }

  if (screen === "victory") {
    content = (
      <Panel style={styles.centerPanel}>
        <PanelTab>TIMELINE COMPLETE</PanelTab>

        <Text style={styles.panelTitle}>The Past Falls into Place</Text>

        <Text style={styles.bodyText}>
          You arranged all three timelines, from early colonial history to the
          Revolution.
        </Text>

        <Text style={styles.bigNumber}>{score}</Text>
        <Text style={styles.timeSummary}>
          TOTAL POINTS · Completed in {elapsedSeconds} seconds
        </Text>

        {typeof onCompleteRef.current === "function" ? (
          <GameButton
            label="Continue Story"
            onPress={() => onCompleteRef.current()}
          />
        ) : null}
      </Panel>
    );
  }

  return (
    <Backdrop>
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {introHeader}
        {content}
      </ScrollView>
    </Backdrop>
  );
}

// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({
  flex: { flex: 1, minHeight: 0 },
  background: { flex: 1, width: "100%", height: "100%", backgroundColor: "#000" },
  safeArea: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },

  // HEADERS
  introHeader: {
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    color: INK,
    fontSize: 22,
    fontWeight: "bold",
  },
  activeHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    paddingBottom: 8,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  activeTitle: {
    color: INK,
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1.2,
  },
  roundProgress: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  progressDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "rgba(53, 35, 19, 0.25)",
  },
  progressDotDone: { backgroundColor: GOLD },
  progressDotCurrent: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: INK,
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
  ruleBox: { marginVertical: 14, alignSelf: "center" },
  ruleText: { color: INK, fontSize: 14, lineHeight: 22 },
  bigNumber: {
    color: INK,
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  timeSummary: {
    color: "#141414",
    textAlign: "center",
    fontSize: 12,
    marginBottom: 6,
  },

  // GAMEPLAY LAYOUT
  gameArea: {
    flex: 1,
    minHeight: 0,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
  },
  activeRow: {
    flex: 1,
    minHeight: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  activeColumn: {
    flex: 1,
    minHeight: 0,
  },
  cardsWrap: {
    flex: 1,
    minHeight: 0,
    alignSelf: "stretch",
  },
  sidePanel: {
    flex: 0.8,
    maxWidth: 360,
    paddingTop: PANEL_HAS_TAB ? 54 : 34,
    paddingBottom: PANEL_HAS_TAB ? 20 : 36,
    paddingHorizontal: PANEL_HAS_TAB ? 30 : 44,
  },
  sideTitle: {
    color: INK,
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
  },
  sideSubtitle: {
    color: "#0f0f0f",
    fontSize: 12,
    lineHeight: 17,
    textAlign: "center",
    marginTop: 3,
  },
  sideHint: {
    color: "#141414",
    fontSize: 11,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 6,
  },
  timelineLabels: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 248, 232, 0.8)",
    borderWidth: 1.5,
    borderColor: GOLD,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 6,
  },
  endpointTitle: {
    color: INK,
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 0.8,
  },

  // CARDS
  cardsScroll: {
    flex: 1,
    minHeight: 0,
  },
  cardsContent: {
    paddingBottom: 6,
  },
  eventCard: {
    minHeight: 64,
    marginBottom: CARD_GAP,
    borderRadius: 10,
    backgroundColor: "rgba(255, 249, 232, 0.94)",
    borderWidth: 1.5,
    borderColor: GOLD,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 8,
    paddingRight: 6,
    paddingVertical: 6,
    gap: 8,
  },
  eventCardCompact: {
    minHeight: 58,
    gap: 6,
  },
  eventCardMoved: {
    borderColor: INK,
    borderWidth: 2.5,
    backgroundColor: "#fbe9b7",
  },
  eventCardDisabled: { opacity: 0.92 },
  positionBadge: {
    width: 31,
    height: 33,
    borderRadius: 7,
    backgroundColor: "rgba(120, 85, 40, 0.18)",
    borderWidth: 1.5,
    borderColor: GOLD,
    justifyContent: "center",
    alignItems: "center",
  },
  positionBadgeCompact: { width: 29, height: 30 },
  positionBadgeMoved: { backgroundColor: "rgba(214, 180, 106, 0.7)" },
  positionNumber: {
    color: INK,
    fontSize: 12,
    fontWeight: "bold",
  },
  cardTextContainer: {
    flex: 1,
    minWidth: 0,
    justifyContent: "center",
  },
  eventText: {
    color: INK,
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "bold",
    flexShrink: 1,
  },
  eventTextCompact: {
    fontSize: 12,
    lineHeight: 16,
  },

  // Big, thumb-sized arrow buttons.
  arrowRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  arrowButton: {
    width: 40,
    height: 44,
    borderRadius: 9,
    backgroundColor: "#6b4a24",
    borderWidth: 1.5,
    borderColor: INK,
    alignItems: "center",
    justifyContent: "center",
  },
  arrowButtonOff: {
    backgroundColor: "rgba(120, 85, 40, 0.15)",
    borderColor: "rgba(120, 85, 40, 0.35)",
  },
  arrowText: {
    color: "#fff4db",
    fontSize: 16,
    fontWeight: "bold",
  },
  arrowTextOff: { color: "rgba(53, 35, 19, 0.35)" },

  // Controls at the bottom of portrait gameplay.
  bottomArea: {
    flexShrink: 0,
    paddingTop: 2,
  },
  feedback: {
    minHeight: 18,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 3,
    marginTop: 6,
  },
  successText: { color: GREEN },
  errorText: { color: RED },
  timerTrack: {
    height: 5,
    borderRadius: 3,
    backgroundColor: "rgba(53, 35, 19, 0.2)",
    overflow: "hidden",
    marginTop: 10,
  },
  timerFill: {
    height: "100%",
    backgroundColor: GOLD,
    borderRadius: 3,
  },
  timerFillLow: { backgroundColor: RED },

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
});