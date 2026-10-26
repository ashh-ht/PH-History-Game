import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ImageBackground,
  Animated,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  StatusBar,
} from "react-native";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useAudio } from "../../../Audiostore";
import MinigameOverlay from "../../../Components/Minigameoverlay";


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
const CORRECT_TIME_BONUS = 5;
const WRONG_TIME_PENALTY = 3;
const FEEDBACK_MS = 2600;


const DEFAULT_QUESTIONS = [
  {
    id: "chapter-1-sikatuna",
    chapter: 1,
    type: "quoteToCharacter",
    characterName: "Datu Sikatuna",
    quote: "From this moment, our blood is one.",
    portrait: require("../../../Character Images/Chapter 1/Sikatuna Talk.png"),
    choices: [
      { id: "sikatuna", text: "Datu Sikatuna" },
      { id: "tupas", text: "Rajah Tupas" },
      { id: "legazpi", text: "Miguel López de Legazpi" },
      { id: "dula", text: "Lakan Dula" },
    ],
    correctChoiceId: "sikatuna",
  },
  {
    id: "chapter-2-dagohoy",
    chapter: 2,
    type: "characterToQuote",
    characterName: "Francisco Dagohoy",
    quote:
      "Kung walang katarungan, hindi kami susuko. Hindi kami titigil hangga't hindi naririnig ang aming tinig!",
    portrait: require("../../../Character Images/Chapter 2/Dagohoy Mad.png"),
    choices: [
      {
        id: "dagohoy",
        text: "Kung walang katarungan, hindi kami susuko. Hindi kami titigil hangga't hindi naririnig ang aming tinig!",
      },
      {
        id: "jacinto",
        text: "Ang tunay na kabanalan ay ang pagkakawanggawa at pag-ibig sa kapwa.",
      },
      {
        id: "aguinaldo",
        text: "Kailangan natin ng iisang utos. Hindi tayo mananalo kung magkakanya-kanya tayo.",
      },
      {
        id: "bonifacio",
        text: "Mga Pilipino... kayo mismo ang gumawa nito sa akin.",
      },
    ],
    correctChoiceId: "dagohoy",
  },
  {
    id: "chapter-3-rizal",
    chapter: 3,
    type: "quoteToCharacter",
    characterName: "Dr. José Rizal",
    quote: "Consummatum est.",
    portrait: require("../../../Character Images/Chapter 3/Rizal.png"),
    choices: [
      { id: "rizal", text: "Dr. José Rizal" },
      { id: "bonifacio", text: "Andrés Bonifacio" },
      { id: "mabini", text: "Apolinario Mabini" },
      { id: "jacinto", text: "Emilio Jacinto" },
    ],
    correctChoiceId: "rizal",
  },
  {
    id: "chapter-4-jacinto",
    chapter: 4,
    type: "characterToQuote",
    characterName: "Emilio Jacinto",
    quote:
      "Ang tunay na kabanalan ay ang pagkakawanggawa, ang pag-ibig sa kapwa, at ang pagsunod sa katuwiran.",
    portrait: require("../../../Character Images/Chapter 4/Jacinto Talking R.png"),
    choices: [
      {
        id: "jacinto",
        text: "Ang tunay na kabanalan ay ang pagkakawanggawa, ang pag-ibig sa kapwa, at ang pagsunod sa katuwiran.",
      },
      {
        id: "rizal",
        text: "Consummatum est.",
      },
      {
        id: "sikatuna",
        text: "From this moment, our blood is one.",
      },
      {
        id: "dagohoy",
        text: "Kung walang katarungan, hindi kami susuko. Hindi kami titigil hangga't hindi naririnig ang aming tinig!",
      },
    ],
    correctChoiceId: "jacinto",
  },
  {
    id: "chapter-5-bonifacio",
    chapter: 5,
    type: "quoteToCharacter",
    characterName: "Andrés Bonifacio",
    quote: "This paper says we belong to Spain. Tonight, we say otherwise.",
    portrait: require("../../../Character Images/Chapter 5/Bonifacio Cedula.png"),
    choices: [
      { id: "bonifacio", text: "Andrés Bonifacio" },
      { id: "plata", text: "Teodoro Plata" },
      { id: "jacinto", text: "Emilio Jacinto" },
      { id: "dagohoy", text: "Francisco Dagohoy" },
    ],
    correctChoiceId: "bonifacio",
  },
  {
    id: "chapter-6-aguinaldo",
    chapter: 6,
    type: "characterToQuote",
    characterName: "Emilio Aguinaldo",
    quote:
      "Kailangan natin ng iisang utos, Don Mariano. Hindi tayo mananalo kung magkakanya-kanya tayo.",
    portrait: require("../../../Character Images/Chapter 6/Emilio Serious.png"),
    choices: [
      {
        id: "aguinaldo",
        text: "Kailangan natin ng iisang utos, Don Mariano. Hindi tayo mananalo kung magkakanya-kanya tayo.",
      },
      {
        id: "bonifacio",
        text: "Hindi ko tatanggapin ang isang halalang hindi tapat.",
      },
      {
        id: "tirona",
        text: "Hindi angkop na ang isang taong walang diploma ang mamuno sa Kagawaran ng Interior!",
      },
      {
        id: "jacinto",
        text: "Ang tunay na kabanalan ay ang pagkakawanggawa at pag-ibig sa kapwa.",
      },
    ],
    correctChoiceId: "aguinaldo",
  },
  {
    id: "chapter-7-tirona",
    chapter: 7,
    type: "quoteToCharacter",
    characterName: "Daniel Tirona",
    quote:
      "Hindi angkop na ang isang taong walang diploma ang mamuno sa Kagawaran ng Interior!",
    portrait: require("../../../Character Images/Chapter 7/Tirona Mad.png"),
    choices: [
      { id: "tirona", text: "Daniel Tirona" },
      { id: "aguinaldo", text: "Emilio Aguinaldo" },
      { id: "bonifacio", text: "Andrés Bonifacio" },
      { id: "ricarte", text: "Artemio Ricarte" },
    ],
    correctChoiceId: "tirona",
  },
  {
    id: "chapter-7-bonifacio-annulment",
    chapter: 7,
    type: "characterToQuote",
    characterName: "Andrés Bonifacio",
    quote:
      "Isulat ninyo ito. Hindi totoo ang halalan kahapon. Hindi nito kinatawan ang tunay na kalooban ng mga narito.",
    portrait: require("../../../Character Images/Chapter 6/Bonifacio Talking.png"),
    choices: [
      {
        id: "bonifacio",
        text: "Isulat ninyo ito. Hindi totoo ang halalan kahapon. Hindi nito kinatawan ang tunay na kalooban ng mga narito.",
      },
      {
        id: "tirona",
        text: "Hindi angkop na ang isang taong walang diploma ang mamuno sa Kagawaran ng Interior!",
      },
      {
        id: "aguinaldo",
        text: "Sila ay mga anak din ng bayan. Hindi ko kayang dagdagan pa ang dugong Pilipinong ibinubuhos natin.",
      },
      {
        id: "jacinto",
        text: "Ang tunay na kabanalan ay ang pagkakawanggawa at pag-ibig sa kapwa.",
      },
    ],
    correctChoiceId: "bonifacio",
  },
  {
    id: "chapter-7-bonifacio-limbon",
    chapter: 7,
    type: "quoteToCharacter",
    characterName: "Andrés Bonifacio",
    quote: "Mga Pilipino... kayo mismo ang gumawa nito sa akin.",
    portrait: require("../../../Character Images/Chapter 6/Bonifacio Sad.png"),
    choices: [
      { id: "bonifacio-limbon", text: "Andrés Bonifacio" },
      { id: "tirona", text: "Daniel Tirona" },
      { id: "ricarte", text: "Artemio Ricarte" },
      { id: "aguinaldo", text: "Emilio Aguinaldo" },
    ],
    correctChoiceId: "bonifacio-limbon",
  },
  {
    id: "chapter-7-aguinaldo",
    chapter: 7,
    type: "characterToQuote",
    characterName: "Emilio Aguinaldo",
    quote:
      "Sila ay mga anak din ng bayan. Hindi ko kayang dagdagan pa ang dugong Pilipinong ibinubuhos natin.",
    portrait: require("../../../Character Images/Chapter 7/Emilio Serious R.png"),
    choices: [
      {
        id: "aguinaldo",
        text: "Sila ay mga anak din ng bayan. Hindi ko kayang dagdagan pa ang dugong Pilipinong ibinubuhos natin.",
      },
      {
        id: "bonifacio",
        text: "Hindi ko tatanggapin ang isang halalang hindi tapat.",
      },
      {
        id: "tirona",
        text: "Hindi angkop na ang isang taong walang diploma ang mamuno sa Kagawaran ng Interior!",
      },
      {
        id: "jacinto",
        text: "Ang tunay na kabanalan ay ang pagkakawanggawa at pag-ibig sa kapwa.",
      },
    ],
    correctChoiceId: "aguinaldo",
  },
];

function shuffle(items) {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function makeGameQuestions(sourceQuestions) {
  const chosen = [];

  for (let chapter = 1; chapter <= 6; chapter += 1) {
    const candidates = sourceQuestions.filter(
      (question) => question.chapter === chapter
    );

    if (candidates.length) {
      chosen.push(shuffle(candidates)[0]);
    }
  }

  const chapterSeven = shuffle(
    sourceQuestions.filter((question) => question.chapter === 7)
  ).slice(0, 4);

  return shuffle([...chosen, ...chapterSeven]).map((question) => ({
    ...question,
    choices: shuffle(question.choices),
  }));
}

const MAX_LINE_CHARS = 58;

function breakText(text, maxChars = MAX_LINE_CHARS) {
  return String(text)
    .split("\n")
    .map((part) => {
      const lines = [];
      let line = "";

      part
        .trim()
        .split(/\s+/)
        .forEach((word) => {
          if (line && (line + " " + word).length > maxChars) {
            lines.push(line);
            line = word;
          } else {
            line = line ? line + " " + word : word;
          }
        });

      if (line) lines.push(line);
      return lines.join("\n");
    })
    .join("\n");
}

function formatTime(seconds) {
  const safeSeconds = Math.max(0, seconds);
  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = safeSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}

function useSpringPress() {
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

  return {
    animate,
    transform: [{ scale }, { translateY }],
  };
}

function GameButton({ label, onPress, secondary }) {
  const { animate, transform } = useSpringPress();

  return (
    <Animated.View
      style={[
        styles.buttonWrap,
        secondary && styles.buttonSecondary,
        { transform },
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

function ChoiceButton({ letter, text, onPress, disabled }) {
  const { animate, transform } = useSpringPress();

  return (
    <Animated.View style={[styles.choiceWrap, { transform }]}>
      <TouchableOpacity
        activeOpacity={1}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        onPressIn={() => animate(true)}
        onPressOut={() => animate(false)}
        onPress={onPress}
      >
        <ImageBackground
          source={IMG.button}
          style={styles.choiceBg}
          resizeMode="stretch"
        >
          <Text style={styles.choiceLetter}>{letter}</Text>
          <Text style={styles.choiceText}>{breakText(text)}</Text>
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
      Math.abs(previous.w - width) < 0.5 &&
      Math.abs(previous.h - height) < 0.5
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

function RevealOverlay({ correct, question, onContinue }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  return (
    <Animated.View style={[styles.overlay, { opacity }]}>
      <TouchableOpacity
        activeOpacity={1}
        style={StyleSheet.absoluteFillObject}
        onPress={onContinue}
        accessibilityRole="button"
        accessibilityLabel="Continue"
      />

      <View style={styles.overlayCenter} pointerEvents="none">
        <Panel style={styles.overlayPanel}>
          <View
            pointerEvents="none"
            style={[
              styles.overlayTint,
              correct ? styles.tintCorrectStrong : styles.tintWrongStrong,
            ]}
          />

          <Text
            style={[
              styles.overlayTitle,
              correct ? styles.successText : styles.errorText,
            ]}
          >
            {correct ? "CORRECT!" : "WRONG!"}
          </Text>

          <Text style={styles.kicker}>
            {correct ? "WELL DONE" : "THE CORRECT ANSWER"}
          </Text>

          <View style={styles.revealIdentity}>
            <Image
              source={question.portrait}
              style={styles.revealPortrait}
              resizeMode="contain"
            />

            <View style={styles.revealIdentityText}>
              <Text style={styles.revealName}>{question.characterName}</Text>
              <Text style={styles.revealChapter}>
                Chapter {question.chapter}
              </Text>
            </View>
          </View>

          <Text style={styles.revealQuote}>“{question.quote}”</Text>
          <Text style={styles.tapHint}>Tap to continue</Text>
        </Panel>
      </View>
    </Animated.View>
  );
}

export default function WhoSaidItMinigame({
  questions = DEFAULT_QUESTIONS,
  onComplete,
  paused: pausedProp = false,
  onPhaseChange,
}) {
  const { width, height } = useWindowDimensions();
  const compact = width < 380;
  const landscape = width > height;

  const navigation = useNavigation();
  const parentControlsPause = typeof onPhaseChange === "function";

  const [localPaused, setLocalPaused] = useState(false);
  const paused = pausedProp || localPaused;

  useFocusEffect(
    useCallback(() => {
      setLocalPaused(false);
    }, [])
  );

  const audio = useAudio();

  const sfx = useCallback(
    (key) => {
      try {
        audio?.playSfx?.(key);
      } catch (e) {
    }
  },
    [audio]
  );

  const [gameQuestions, setGameQuestions] = useState(() =>
    makeGameQuestions(questions)
  );
  const [questionIndex, setQuestionIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(START_SECONDS);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedChoiceId, setSelectedChoiceId] = useState(null);
  const [revealing, setRevealing] = useState(false);
  const [finished, setFinished] = useState(false);

  const [areaH, setAreaH] = useState(0);
  const [contentH, setContentH] = useState(0);

  const feedbackTimeout = useRef(null);
  const advanceRef = useRef(null);
  const pausedRef = useRef(paused);

  pausedRef.current = paused;

  const currentQuestion = gameQuestions[questionIndex];
  const totalQuestions = gameQuestions.length;
  const correctCount = answers.filter((answer) => answer.correct).length;

  useEffect(() => {
    if (!onPhaseChange) return;
    onPhaseChange(finished ? "result" : "playing");
  }, [finished, onPhaseChange]);

  const finishGame = useCallback(() => {
    setFinished(true);
    setRevealing(false);
  }, []);

  useEffect(() => {
    if (finished || revealing || paused) return undefined;

    if (secondsLeft <= 0) {
      finishGame();
      return undefined;
    }

    const timer = setTimeout(() => {
      setSecondsLeft((time) => time - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [secondsLeft, finished, revealing, paused, finishGame]);

  useEffect(
    () => () => {
      if (feedbackTimeout.current) {
        clearTimeout(feedbackTimeout.current);
      }
    },
    []
  );

  const answerQuestion = useCallback(
    (choice) => {
      if (!currentQuestion || revealing || finished || paused) return;
      if (selectedChoiceId !== null) return;

      const correct = choice.id === currentQuestion.correctChoiceId;
      const pointsEarned = correct
        ? 100 + Math.max(0, secondsLeft) * 2
        : 0;

      const nextScore = score + pointsEarned;

      const nextAnswers = [
        ...answers,
        {
          questionId: currentQuestion.id,
          chapter: currentQuestion.chapter,
          correct,
          choiceId: choice.id,
          pointsEarned,
        },
      ];

      sfx(correct ? "correct" : "wrong");

      setSelectedChoiceId(choice.id);
      setAnswers(nextAnswers);
      setScore(nextScore);

      setSecondsLeft((time) =>
        Math.max(
          0,
          time + (correct ? CORRECT_TIME_BONUS : -WRONG_TIME_PENALTY)
        )
      );

      setRevealing(true);

      const advance = () => {
        if (pausedRef.current) {
          feedbackTimeout.current = setTimeout(advance, 200);
          return;
        }

        advanceRef.current = null;
        setRevealing(false);

        if (questionIndex + 1 >= totalQuestions) {
          finishGame();
        } else {
          setQuestionIndex((index) => index + 1);
          setSelectedChoiceId(null);
        }
      };

      advanceRef.current = advance;
      feedbackTimeout.current = setTimeout(advance, FEEDBACK_MS);
    },
    [
      answers,
      currentQuestion,
      finishGame,
      finished,
      paused,
      questionIndex,
      revealing,
      score,
      secondsLeft,
      selectedChoiceId,
      totalQuestions,
      sfx,
    ]
  );

  const skipReveal = useCallback(() => {
    if (pausedRef.current || !advanceRef.current) return;

    if (feedbackTimeout.current) {
      clearTimeout(feedbackTimeout.current);
    }

    advanceRef.current();
  }, []);

  const replay = useCallback(() => {
    if (feedbackTimeout.current) {
      clearTimeout(feedbackTimeout.current);
    }

    advanceRef.current = null;

    setGameQuestions(makeGameQuestions(questions));
    setQuestionIndex(0);
    setSecondsLeft(START_SECONDS);
    setScore(0);
    setAnswers([]);
    setSelectedChoiceId(null);
    setRevealing(false);
    setFinished(false);
  }, [questions]);

  const accuracy = totalQuestions
    ? Math.round((correctCount / totalQuestions) * 100)
    : 0;

  const continueStory = useCallback(() => {
    if (typeof onComplete === "function") {
      onComplete({
        score,
        correct: correctCount,
        total: totalQuestions,
        accuracy,
      });
    }
  }, [onComplete, score, correctCount, totalQuestions, accuracy]);

  const FIT_PADDING = 28;

  const fitScale =
    areaH > 0 && contentH > 0
      ? Math.min(1, Math.max(0.4, (areaH - FIT_PADDING) / contentH))
      : 1;

  const shell = (body, withOverlay = null) => (
    <ImageBackground
      source={IMG.background}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.dim} />

      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />

        <View
          style={styles.fitArea}
          onLayout={(event) => setAreaH(event.nativeEvent.layout.height)}
        >
          <View
            pointerEvents={paused ? "none" : "auto"}
            style={[styles.content, { transform: [{ scale: fitScale }] }]}
            onLayout={(event) =>
              setContentH(event.nativeEvent.layout.height)
            }
          >
            {body}
          </View>
        </View>
      </SafeAreaView>

      {!parentControlsPause && !finished && currentQuestion ? (
        <MinigameOverlay
          paused={localPaused}
          hideSettings
          top={6}
          right={12}
          onPause={() => setLocalPaused(true)}
          onResume={() => setLocalPaused(false)}
          onSettings={() => {
            setLocalPaused(true);
            navigation.navigate("Second");
          }}
        />
      ) : null}

      {withOverlay}
    </ImageBackground>
  );

  if (!currentQuestion && !finished) {
    return shell(
      <View style={styles.centered}>
        <Panel style={styles.centerPanel}>
          <Text style={styles.panelTitle}>Who Said It?</Text>
          <Text style={styles.bodyText}>No questions are available.</Text>
        </Panel>
      </View>
    );
  }

  if (finished) {
    return shell(
      <Panel style={styles.centerPanel}>
        <PanelTab>HISTORY CHALLENGE</PanelTab>

        <Text style={styles.panelTitle}>Game Complete!</Text>
        <Text style={styles.bodyText}>The Revolution's words live on.</Text>

        <Text style={styles.bigNumber}>{score.toLocaleString()}</Text>
        <Text style={styles.statCaption}>FINAL SCORE</Text>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>
              {correctCount}/{totalQuestions}
            </Text>
            <Text style={styles.statLabel}>Correct</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statValue}>{accuracy}%</Text>
            <Text style={styles.statLabel}>Accuracy</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statValue}>{formatTime(secondsLeft)}</Text>
            <Text style={styles.statLabel}>Time left</Text>
          </View>
        </View>

        <Text style={styles.timeSummary}>
          {accuracy >= 80
            ? "Excellent work, historian!"
            : accuracy >= 50
            ? "Good effort. Keep learning the voices of history."
            : "Keep practicing. You'll recognize more voices next time."}
        </Text>

        {typeof onComplete === "function" ? (
          <GameButton label="Continue Story" onPress={continueStory} />
        ) : null}

        <GameButton
          label="Play Again"
          onPress={replay}
          secondary={typeof onComplete === "function"}
        />
      </Panel>
    );
  }

  const choiceIsCorrect =
    selectedChoiceId === currentQuestion.correctChoiceId;
  const lowTime = secondsLeft <= 10;


  const header = (
    <View style={styles.header}>
      <Text style={styles.title}>Who Said It?</Text>

      <View style={styles.pillRow}>
        <View style={[styles.pill, lowTime && styles.pillLow]}>
          <Text style={[styles.pillValue, lowTime && styles.pillTextLow]}>
            {formatTime(secondsLeft)}
          </Text>
        </View>

        <View style={styles.pill}>
          <Text style={styles.pillValue}>{score.toLocaleString()}</Text>
        </View>
      </View>
    </View>
  );

  const progressBar = (
    <View style={styles.progressTrack}>
      {gameQuestions.map((question, index) => (
        <View
          key={question.id}
          style={[
            styles.progressSegment,
            index < answers.length && styles.progressComplete,
            index === questionIndex && styles.progressCurrent,
          ]}
        />
      ))}
    </View>
  );

  const questionPanel = (
    <Panel style={styles.fullPanel}>
      <PanelTab>
        {currentQuestion.type === "quoteToCharacter"
          ? `WHO SAID THIS? · CHAPTER ${currentQuestion.chapter}`
          : `WHICH LINE DID THEY SAY? · CHAPTER ${currentQuestion.chapter}`}
      </PanelTab>

      {currentQuestion.type === "quoteToCharacter" ? (
        <Text style={[styles.quoteText, compact && styles.quoteTextCompact]}>
          “{currentQuestion.quote}”
        </Text>
      ) : (
        <View style={styles.characterPrompt}>
          <Image
            source={currentQuestion.portrait}
            style={styles.promptPortrait}
            resizeMode="contain"
          />

          <Text style={styles.promptName}>
            {currentQuestion.characterName}
          </Text>

          <Text style={styles.hintText}>
            Choose the line spoken by this character.
          </Text>
        </View>
      )}
    </Panel>
  );

  const choiceList = (
    <>
      <Text style={styles.inputLabel}>Choose your answer</Text>

      {currentQuestion.choices.map((choice, index) => (
        <ChoiceButton
          key={`${currentQuestion.id}-${choice.id}`}
          letter={String.fromCharCode(65 + index)}
          text={choice.text}
          disabled={revealing || selectedChoiceId !== null || paused}
          onPress={() => answerQuestion(choice)}
        />
      ))}
    </>
  );

  const revealOverlay = revealing ? (
    <RevealOverlay
      correct={choiceIsCorrect}
      question={currentQuestion}
      onContinue={skipReveal}
    />
  ) : null;

  return shell(
    <>
      {header}
      {progressBar}

      {landscape ? (
        <View style={styles.row}>
          <View style={styles.leftCol}>{questionPanel}</View>
          <View style={styles.rightCol}>{choiceList}</View>
        </View>
      ) : (
        <>
          {questionPanel}
          {choiceList}

          <Text style={styles.footerHint}>
            Correct answer: +5 seconds · Incorrect answer: −3 seconds · Fast
            answers earn more points
          </Text>
        </>
      )}
    </>,
    revealOverlay
  );
}

const INK = "#352313";
const BUTTON_INK = "#371f10";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
  },
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
  content: {
    width: "100%",
    maxWidth: 760,
    alignSelf: "center",
  },
  centered: { justifyContent: "center" },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  leftCol: { flex: 1 },
  rightCol: { flex: 1.15 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingRight: 60,
  },
  title: { color: INK, fontSize: 19, fontWeight: "bold" },
  pillRow: { flexDirection: "row", gap: 8 },
  pill: {
    minWidth: 64,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderWidth: 1,
    borderColor: "#d7cfbe",
  },
  pillLow: {
    borderColor: "#ff9b82",
    backgroundColor: "rgba(90, 20, 10, 0.75)",
  },
  pillValue: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    fontVariant: ["tabular-nums"],
  },
  pillTextLow: { color: "#ff9b82" },

  progressTrack: {
    flexDirection: "row",
    gap: 5,
    marginBottom: 10,
  },
  progressSegment: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(53, 35, 19, 0.2)",
  },
  progressComplete: { backgroundColor: "#7a5a2a" },
  progressCurrent: { backgroundColor: INK },

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
  fullPanel: {
    width: "100%",
    marginBottom: 6,
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

  quoteText: {
    color: "#0f0f0f",
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "600",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 4,
  },
  quoteTextCompact: {
    fontSize: 14,
    lineHeight: 20,
  },
  characterPrompt: {
    alignItems: "center",
  },
  promptPortrait: {
    width: 90,
    height: 90,
    marginBottom: 6,
  },
  promptName: {
    color: INK,
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
  },
  hintText: {
    color: "#141414",
    fontSize: 11,
    lineHeight: 16,
    textAlign: "center",
    fontStyle: "italic",
    marginTop: 4,
  },
  inputLabel: {
    color: INK,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 6,
  },

  choiceWrap: {
    width: "100%",
    marginBottom: 6,
  },
  choiceBg: {
    width: "100%",
    minHeight: 46,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 30,
    paddingRight: 40,
    paddingVertical: 10,
  },
  choiceLetter: {
    color: "#7a5a2a",
    fontSize: 13,
    fontWeight: "bold",
    width: 22,
  },
  choiceText: {
    flex: 1,
    color: BUTTON_INK,
    fontSize: 9,
    lineHeight: 14,
    fontWeight: "bold",
  },

  successText: { color: "#1f6b34" },
  errorText: { color: "#a3281b" },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    elevation: 999,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayCenter: {
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  overlayPanel: {
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
  },
  overlayTint: {
    position: "absolute",
    top: 18,
    bottom: 20,
    left: 26,
    right: 26,
    borderRadius: 10,
  },
  tintCorrectStrong: {
    backgroundColor: "rgba(60, 160, 85, 0.40)",
  },
  tintWrongStrong: {
    backgroundColor: "rgba(200, 50, 35, 0.40)",
  },
  overlayTitle: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 2,
    textAlign: "center",
    marginBottom: 2,
  },
  tapHint: {
    color: "#7a5a2a",
    fontSize: 10,
    textAlign: "center",
    marginTop: 8,
    fontStyle: "italic",
  },

  revealIdentity: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  revealPortrait: {
    width: 70,
    height: 70,
    marginRight: 12,
  },
  revealIdentityText: { flex: 1 },
  revealName: {
    color: INK,
    fontSize: 16,
    fontWeight: "bold",
  },
  revealChapter: {
    color: "#7a5a2a",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 3,
  },
  revealQuote: {
    color: "#0f0f0f",
    fontSize: 12.5,
    lineHeight: 18,
    fontStyle: "italic",
    textAlign: "center",
  },
  footerHint: {
    color: INK,
    fontSize: 10,
    lineHeight: 14,
    textAlign: "center",
    marginTop: 6,
  },

  bigNumber: {
    color: INK,
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  statCaption: {
    color: "#7a5a2a",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1.6,
    textAlign: "center",
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10,
  },
  statBox: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 6,
    backgroundColor: "rgba(120, 85, 40, 0.18)",
    borderWidth: 1.5,
    borderColor: "#7a5a2a",
  },
  statValue: {
    color: INK,
    fontSize: 16,
    fontWeight: "bold",
  },
  statLabel: {
    color: "#141414",
    fontSize: 11,
    marginTop: 2,
  },
  timeSummary: {
    color: "#141414",
    textAlign: "center",
    fontSize: 13,
    marginBottom: 6,
  },

  buttonWrap: {
    alignSelf: "center",
    width: "80%",
    maxWidth: 300,
    marginTop: 8,
  },
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