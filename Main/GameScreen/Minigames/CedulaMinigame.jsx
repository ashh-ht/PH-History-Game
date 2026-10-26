import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Image,
  ImageBackground,
  PanResponder,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import { useAudio } from "../../../Audiostore";

const IMG = {
  background: require("../../../Background Images/Usuals/Paper_scroll.png"),
  panel: require("../../../Background Images/Usuals/Minigames_Foreground.png"),
  button: require("../../../assets/buttons/choice_button.png"),
};

const CEDULA = require("../../../assets/Minigames/Part1/Part5/Cedula.jpg");
const CEDULA_TORN = require("../../../assets/Minigames/Part1/Part5/Cedula Torn.jpg");


const PANEL_HAS_TAB = false;
const PANEL_PAD_TOP = PANEL_HAS_TAB ? 58 : 38;
const PANEL_PAD_BOTTOM = PANEL_HAS_TAB ? 26 : 42;
const PANEL_PAD_SIDE = PANEL_HAS_TAB ? 34 : 54;
const PANEL_INSET = PANEL_HAS_TAB
  ? { left: 0, right: 0, top: 0, bottom: 0 }
  : { left: 0.023, right: 0.01, top: 0.06, bottom: 0.06 };

const REQUIRED_TEARS = 5;
const GAME_TIME = 30;
const START_MESSAGE =
  "Swipe across the cédula to tear it. The clock starts on your first swipe.";

const CEDULA_SOURCE = Image.resolveAssetSource(CEDULA);
const CEDULA_RATIO =
  CEDULA_SOURCE?.width && CEDULA_SOURCE?.height
    ? CEDULA_SOURCE.width / CEDULA_SOURCE.height
    : 0.75;


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



export default function CedulaMinigame({
  onComplete,
  paused = false, 
  onPhaseChange, 
}) {
  const { width, height } = useWindowDimensions();
  const compact = height < 700;
  const horizontalPadding = width < 360 ? 12 : 20;

  const audio = useAudio();
  const sfx = useCallback(
    (key) => {
      try {
        audio?.playSfx?.(key);
      } catch (e) {}
    },
    [audio]
  );

  const [screen, setScreen] = useState("playing");
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [tears, setTears] = useState([]);
  const [slash, setSlash] = useState(null);
  const [message, setMessage] = useState(START_MESSAGE);

  const [paperArea, setPaperArea] = useState({ width: 0, height: 0 });
  const [paperSize, setPaperSize] = useState({ width: 1, height: 1 });


  const [areaH, setAreaH] = useState(0);
  const [contentH, setContentH] = useState(0);

  const screenRef = useRef("playing");
  const startRef = useRef(null);
  const tearCountRef = useRef(0);
  const finishingRef = useRef(false);
  const deadlineRef = useRef(null); 
  const finishTimerRef = useRef(null);

  const shake = useRef(new Animated.Value(0)).current;
  const flash = useRef(new Animated.Value(0)).current;


  const pausedRef = useRef(false);
  const pausedAtRef = useRef(null);

  useEffect(() => {
    if (paused) {
      pausedRef.current = true;
      pausedAtRef.current = Date.now();
      startRef.current = null;
      setSlash(null);
    } else if (pausedRef.current) {
      pausedRef.current = false;

      if (pausedAtRef.current != null && deadlineRef.current != null) {
        deadlineRef.current += Date.now() - pausedAtRef.current;
      }

      pausedAtRef.current = null;
    }
  }, [paused]);

 
  useEffect(() => {
    if (!onPhaseChange) return;
    onPhaseChange(screen === "playing" ? "playing" : "result");
  }, [screen, onPhaseChange]);

  const changeScreen = (next) => {
    screenRef.current = next;
    setScreen(next);
  };

  const clearFinishTimer = () => {
    if (finishTimerRef.current) {
      clearTimeout(finishTimerRef.current);
      finishTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      clearFinishTimer();
      deadlineRef.current = null;
    };
  }, []);

  const availableWidth = Math.max(
    1,
    Math.min(width - horizontalPadding * 2 - 80, 460)
  );

  const fittedPaper = useMemo(() => {
    const areaWidth = paperArea.width || availableWidth;
    const areaHeight = paperArea.height || Math.max(1, height * 0.5);

    let fittedWidth = Math.min(availableWidth, areaWidth);
    let fittedHeight = fittedWidth / CEDULA_RATIO;

    if (fittedHeight > areaHeight) {
      fittedHeight = areaHeight;
      fittedWidth = fittedHeight * CEDULA_RATIO;
    }

    return {
      width: Math.max(1, fittedWidth),
      height: Math.max(1, fittedHeight),
    };
  }, [availableWidth, height, paperArea.width, paperArea.height]);

  const handlePaperAreaLayout = (event) => {
    const { width: w, height: h } = event.nativeEvent.layout;
    setPaperArea((previous) =>
      previous.width === w && previous.height === h ? previous : { width: w, height: h }
    );
  };

  useEffect(() => {
    setPaperSize((previous) =>
      previous.width === fittedPaper.width && previous.height === fittedPaper.height
        ? previous
        : fittedPaper
    );
  }, [fittedPaper]);

 
  useEffect(() => {
    if (screen !== "playing") return;

    const tick = () => {
      if (screenRef.current !== "playing" || deadlineRef.current == null) return;
      if (pausedRef.current) return;

      const remainingMs = Math.max(0, deadlineRef.current - Date.now());
      setTimeLeft(Math.ceil(remainingMs / 1000));

      if (remainingMs <= 0 && !finishingRef.current) {
        clearFinishTimer();
        startRef.current = null;
        setSlash(null);
        deadlineRef.current = null;
        changeScreen("failed");
        setMessage("Time is up. Try again.");
        sfx("wrong");
      }
    };

    tick();
    const interval = setInterval(tick, 150);
    return () => clearInterval(interval);
  }, [screen, sfx]);

  const startGame = () => {
    clearFinishTimer();

    tearCountRef.current = 0;
    finishingRef.current = false;
    startRef.current = null;
    deadlineRef.current = null;

    setTears([]);
    setSlash(null);
    setTimeLeft(GAME_TIME);
    setMessage(START_MESSAGE);

    shake.stopAnimation();
    flash.stopAnimation();
    shake.setValue(0);
    flash.setValue(0);

    changeScreen("playing");
  };

  const animateTear = useCallback(() => {
    shake.stopAnimation();
    flash.stopAnimation();
    shake.setValue(0);
    flash.setValue(0);

    Animated.parallel([
      Animated.sequence([
        Animated.timing(shake, { toValue: 1, duration: 45, useNativeDriver: true }),
        Animated.timing(shake, { toValue: -1, duration: 55, useNativeDriver: true }),
        Animated.spring(shake, { toValue: 0, speed: 22, bounciness: 5, useNativeDriver: true }),
      ]),
      Animated.sequence([
        Animated.timing(flash, { toValue: 0.18, duration: 65, useNativeDriver: true }),
        Animated.timing(flash, { toValue: 0, duration: 230, useNativeDriver: true }),
      ]),
    ]).start();
  }, [shake, flash]);

  const finishSwipe = useCallback(
    (start, end) => {
      if (screenRef.current !== "playing" || finishingRef.current || !start || !end) {
        return;
      }
      if (pausedRef.current) return;

      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);

      const horizontal = absX > absY * 1.2;
      const vertical = absY > absX * 1.2;

      const longEnough = horizontal
        ? absX >= paperSize.width * 0.22
        : vertical && absY >= paperSize.height * 0.18;

      if ((!horizontal && !vertical) || !longEnough) {
        setSlash(null);
        setMessage("Swipe farther across the paper.");
        startRef.current = null;
        return;
      }

      const clampX = (x) => Math.max(0, Math.min(paperSize.width, x));
      const clampY = (y) => Math.max(0, Math.min(paperSize.height, y));

      const newTear = {
        id: `${Date.now()}-${tearCountRef.current}`,
        x1: clampX(start.x),
        y1: clampY(start.y),
        x2: clampX(end.x),
        y2: clampY(end.y),
      };

      const nextCount = tearCountRef.current + 1;
      tearCountRef.current = nextCount;

      setTears((previous) => [...previous, newTear]);
      setSlash(null);
      startRef.current = null;
      animateTear();
      sfx("correct");

      if (nextCount >= REQUIRED_TEARS) {
        finishingRef.current = true;
        setMessage("The cédula has been torn.");
        clearFinishTimer();

        finishTimerRef.current = setTimeout(() => {
          if (screenRef.current === "playing") {
            deadlineRef.current = null;
            changeScreen("won");
          }
          finishTimerRef.current = null;
        }, 450);
      } else {
        setMessage(
          nextCount === REQUIRED_TEARS - 1
            ? "One more tear."
            : `${nextCount} of ${REQUIRED_TEARS} tears completed.`
        );
      }
    },
    [paperSize.width, paperSize.height, animateTear, sfx]
  );

  const canSwipe = () =>
    screenRef.current === "playing" && !finishingRef.current && !pausedRef.current;

  const responder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: canSwipe,
        onMoveShouldSetPanResponder: canSwipe,
        onStartShouldSetPanResponderCapture: canSwipe,
        onMoveShouldSetPanResponderCapture: canSwipe,
        onPanResponderTerminationRequest: () => false,

        onPanResponderGrant: (event) => {
          if (!canSwipe()) return;

       
          if (deadlineRef.current == null) {
            deadlineRef.current = Date.now() + GAME_TIME * 1000;
          }

          const start = {
            x: event.nativeEvent.locationX,
            y: event.nativeEvent.locationY,
          };
          startRef.current = start;
          setSlash({ x1: start.x, y1: start.y, x2: start.x, y2: start.y });
        },

        onPanResponderMove: (_, gesture) => {
          if (!startRef.current || !canSwipe()) {
            return;
          }
          setSlash({
            x1: startRef.current.x,
            y1: startRef.current.y,
            x2: startRef.current.x + gesture.dx,
            y2: startRef.current.y + gesture.dy,
          });
        },

        onPanResponderRelease: (_, gesture) => {
          if (!startRef.current || !canSwipe()) {
            startRef.current = null;
            setSlash(null);
            return;
          }
          const start = startRef.current;
          finishSwipe(start, { x: start.x + gesture.dx, y: start.y + gesture.dy });
        },

        onPanResponderTerminate: () => {
          startRef.current = null;
          setSlash(null);
        },
      }),
    [finishSwipe]
  );

  const renderSlash = (line, isLive = false) => {
    const dx = line.x2 - line.x1;
    const dy = line.y2 - line.y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    if (length < 1) return null;

    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    const midX = (line.x1 + line.x2) / 2;
    const midY = (line.y1 + line.y2) / 2;

    return (
      <View
        key={line.id || "live-slash"}
        pointerEvents="none"
        style={[
          styles.slashWrap,
          {
            width: length,
            left: midX - length / 2,
            top: midY - 2,
            transform: [{ rotate: `${angle}deg` }],
          },
        ]}
      >
        <View style={[styles.slashGlow, !isLive && styles.seamGlow]} />
        <View style={[styles.slashCore, !isLive && styles.seamCore]} />
        <View style={styles.slashHighlight} />
      </View>
    );
  };

  const renderPaper = () => (
    <Animated.View
      style={[
        styles.paperOuter,
        {
          width: fittedPaper.width,
          height: fittedPaper.height,
          transform: [
            {
              translateX: shake.interpolate({
                inputRange: [-1, 0, 1],
                outputRange: [-3, 0, 3],
              }),
            },
          ],
        },
      ]}
    >
      <View
        style={styles.paperFrame}
        onLayout={(event) => {
          const { width: w, height: h } = event.nativeEvent.layout;
          setPaperSize((previous) =>
            previous.width === w && previous.height === h ? previous : { width: w, height: h }
          );
        }}
        {...(screen === "playing" && !finishingRef.current ? responder.panHandlers : {})}
      >
        <Image
          source={CEDULA}
          resizeMode="contain"
          style={styles.paperImage}
          pointerEvents="none"
        />
        {tears.map((tear) => renderSlash(tear))}
        {slash && screen === "playing" && renderSlash(slash, true)}
        <Animated.View pointerEvents="none" style={[styles.flash, { opacity: flash }]} />
      </View>
    </Animated.View>
  );

  const lowTime = timeLeft <= 10;


  const header = (showTimer) => (
    <View style={[styles.header, showTimer && styles.headerWithPause]}>
      <Text style={styles.title}>The Cry of Pugad Lawin</Text>
      {showTimer ? (
        <View
          style={[styles.timerPill, lowTime && styles.timerPillLow]}
          accessibilityLabel={`${timeLeft} seconds remaining`}
        >
          <Text style={[styles.timerValue, lowTime && styles.timerTextLow]}>
            {timeLeft}s
          </Text>
        </View>
      ) : null}
    </View>
  );

  const shell = (body) => (
    <ImageBackground source={IMG.background} style={styles.background} resizeMode="cover">
      <View style={styles.dim} />
      <SafeAreaView style={styles.safeArea}>{body}</SafeAreaView>
    </ImageBackground>
  );


  const FIT_PADDING = 28;
  const fitScale =
    areaH > 0 && contentH > 0
      ? Math.min(1, Math.max(0.4, (areaH - FIT_PADDING) / contentH))
      : 1;

  
  const fit = (body) => (
    <View
      style={[styles.fitArea, { paddingHorizontal: horizontalPadding }]}
      onLayout={(e) => setAreaH(e.nativeEvent.layout.height)}
    >
      <View
        style={{ transform: [{ scale: fitScale }] }}
        onLayout={(e) => setContentH(e.nativeEvent.layout.height)}
      >
        {body}
      </View>
    </View>
  );

  if (screen === "won") {
    return shell(
      fit(
        <>
          {header(false)}
          <Panel style={styles.centerPanel}>
            <PanelTab>A SYMBOL TORN</PanelTab>
            <Text style={styles.panelTitle}>There Is No Turning Back</Text>

            <View style={[styles.completionImageWrap, { height: compact ? 170 : 210 }]}>
              <Image source={CEDULA_TORN} resizeMode="contain" style={styles.completionImage} />
            </View>

            <Text style={styles.bodyText}>
              Under Spanish rule, the cédula served as an identification document and tax
              certificate. Tearing it became a rejection of colonial authority, and a
              declaration that freedom was worth fighting for.
            </Text>

            <GameButton label="Continue Story" onPress={() => onComplete?.()} />
          </Panel>
        </>
      )
    );
  }

  if (screen === "failed") {
    return shell(
      fit(
        <>
          {header(false)}
          <Panel style={styles.centerPanel}>
            <PanelTab>TIME EXPIRED</PanelTab>
            <Text style={styles.panelTitle}>The Moment Slips Away</Text>
            <Text style={styles.bodyText}>
              Tear it before the crowd moves on. Start anywhere on the document and make five
              long swipes within 30 seconds.
            </Text>
            <Text style={styles.bigNumber}>
              {tears.length}/{REQUIRED_TEARS}
            </Text>
            <GameButton label="Try Again" onPress={startGame} />
          </Panel>
        </>
      )
    );
  }


  return shell(
    <View style={[styles.gameWrap, { paddingHorizontal: horizontalPadding }]}>
      {header(true)}

      <Panel style={styles.playPanel}>
        <PanelTab>TEAR YOUR CÉDULA · {tears.length}/{REQUIRED_TEARS}</PanelTab>

        <View style={styles.progressTrack}>
          {Array.from({ length: REQUIRED_TEARS }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.progressSegment,
                i < tears.length && styles.progressComplete,
                i === tears.length && styles.progressCurrent,
              ]}
            />
          ))}
        </View>

        <Text style={styles.message} numberOfLines={2}>
          {message}
        </Text>

        <View style={styles.paperArea} onLayout={handlePaperAreaLayout}>
          {renderPaper()}
        </View>

        <Text style={styles.hintText}>Swipe across the paper horizontally or vertically</Text>
      </Panel>
    </View>
  );
}



const INK = "#352313";
const BUTTON_INK = "#371f10";

const styles = StyleSheet.create({
  background: { flex: 1, width: "100%", height: "100%", backgroundColor: "#000" },
  dim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  safeArea: { flex: 1 },

  fitArea: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 14,
  },
  gameWrap: { flex: 1, paddingVertical: 14 },


  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerWithPause: { paddingRight: 46 },
  title: { color: INK, fontSize: 22, fontWeight: "bold", flexShrink: 1 },
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
  playPanel: {
    flex: 1,
    width: "100%",
    maxWidth: 560,
    alignSelf: "center",
    paddingTop: 34,
    paddingBottom: 36,
    paddingHorizontal: 40,
    justifyContent: "flex-start",
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
  message: {
    color: "#0f0f0f",
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center",
    marginTop: 8,
    minHeight: 36,
  },
  hintText: {
    color: "#141414",
    fontSize: 12,
    lineHeight: 16,
    textAlign: "center",
    fontStyle: "italic",
    marginTop: 6,
  },


  progressTrack: { flexDirection: "row", gap: 5 },
  progressSegment: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(53, 35, 19, 0.2)",
  },
  progressComplete: { backgroundColor: "#7a5a2a" },
  progressCurrent: { backgroundColor: INK },

  paperArea: {
    flex: 1,
    minHeight: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  paperOuter: { alignSelf: "center" },
  paperFrame: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
    borderRadius: 2,
    borderWidth: 2,
    borderColor: "#7a5a2a",
    backgroundColor: "#FFF8E8",
    elevation: 3,
    shadowColor: "#352313",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  paperImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  slashWrap: {
    position: "absolute",
    height: 5,
    justifyContent: "center",
    zIndex: 10,
  },
  slashGlow: {
    position: "absolute",
    left: -3,
    right: -3,
    height: 10,
    borderRadius: 6,
    backgroundColor: "rgba(215, 203, 176, 0.45)",
  },
  slashCore: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 4,
    borderRadius: 4,
    backgroundColor: "#a3281b",
  },
  slashHighlight: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "#FFF8E9",
  },
  seamGlow: { backgroundColor: "rgba(53, 35, 19, 0.25)" },
  seamCore: { height: 3, backgroundColor: INK },
  flash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#FFFCF5",
  },

  completionImageWrap: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  completionImage: { width: "100%", height: "100%" },
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
    marginTop: 8,
    marginBottom: 6,
  },


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