import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
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

import { useAudio } from "../../../Audiostore";

// =====================================================
// ARTWORK (same set as the Decipher minigame)
// =====================================================

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
const FEEDBACK_MS = 850;

const DEFAULT_QUESTIONS = [
  {
    id: "chapter-1-sikatuna",
    chapter: 1,
    type: "quoteToCharacter",
    characterName: "Datu Sikatuna",
    quote: "Legazpi, take this cup. From this moment, our blood is one.",
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
      "Kung wala man lang paggalang ang inyong simbahan para sa mga tapat na lingkod, hindi na kami dapat manatiling tapat!",
    portrait: require("../../../Character Images/Chapter 2/Dagohoy Mad.png"),
    choices: [
      {
        id: "dagohoy",
        text: "Kung wala man lang paggalang ang inyong simbahan para sa mga tapat na lingkod, hindi na kami dapat manatiling tapat!",
      },
      {
        id: "jacinto",
        text: "One person may be wiser, richer, or more skilled than another, but that doesn't make them more human. This is what should guide every member.",
      },
      {
        id: "alvarez",
        text: "Ang aking utos ay galing sa Supremo. Hindi ako maaaring sumunod sa dalawang pinuno nang sabay.",
      },
      {
        id: "bonifacio",
        text: "This paper says we belong to Spain. Tonight, we say otherwise.",
      },
    ],
    correctChoiceId: "dagohoy",
  },
  {
    id: "chapter-3-rizal",
    chapter: 3,
    type: "quoteToCharacter",
    characterName: "Dr. José Rizal",
    quote:
      "If we want a better future for our people, we cannot wait for the government to change. We must build it ourselves.",
    portrait: require("../../../Character Images/Chapter 3/Rizal.png"),
    choices: [
      { id: "rizal", text: "Dr. José Rizal" },
      { id: "bonifacio", text: "Andrés Bonifacio" },
      { id: "mabini", text: "Apolinario Mabini" },
      { id: "franco", text: "Domingo Franco" },
    ],
    correctChoiceId: "rizal",
  },
  {
    id: "chapter-4-jacinto",
    chapter: 4,
    type: "characterToQuote",
    characterName: "Emilio Jacinto",
    quote:
      "One person may be wiser, richer, or more skilled than another, but that doesn't make them more human. This is what should guide every member.",
    portrait: require("../../../Character Images/Chapter 4/Jacinto Talking R.png"),
    choices: [
      {
        id: "jacinto",
        text: "One person may be wiser, richer, or more skilled than another, but that doesn't make them more human.\n This is what should guide every member.",
      },
      {
        id: "rizal",
        text: "If we want a better future for our people, we cannot wait for the government to change. We must build \nit ourselves.",
      },
      {
        id: "sikatuna",
        text: "Legazpi, take this cup. From this moment, our blood is one.",
      },
      {
        id: "dagohoy",
        text: "Kung wala man lang paggalang ang inyong simbahan para sa mga tapat na lingkod, hindi na kami dapat manatiling tapat!",
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
      { id: "teodoro", text: "Teodoro Plata" },
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
        id: "alvarez",
        text: "Ang aking utos ay galing sa Supremo. Hindi ako maaaring sumunod sa dalawang pinuno nang sabay.",
      },
      {
        id: "tirona",
        text: "Wala na tayong sapat na armas. Kung magpapatuloy tayo, baka lalo lang tayong malugi.",
      },
      {
        id: "bonifacio",
        text: "Emilio, may alok daw ng amnestiya. Pero kung pagsuko ang kapalit, hindi natin basta matatanggap iyon.",
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
        text: "Dapat abogado ang humawak ng puwestong iyan!",
      },
      {
        id: "aguinaldo",
        text: "Sila ay mga anak din ng bayan. Hindi ko kayang dagdagan pa ang dugong Pilipinong ibinubuhos natin.",
      },
      {
        id: "bonifacio-limbon",
        text: "Mga Pilipino... kayo mismo ang gumawa nito sa akin.",
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
        text: "Hindi ko tatanggapin ang isang halalang hindi tapat. Dito, ipagpapatuloy natin ang laban.",
      },
      {
        id: "tirona",
        text: "Hindi angkop na ang isang taong walang diploma ang mamuno sa Kagawaran ng Interior!",
      },
      {
        id: "alvarez",
        text: "Ang aking utos ay galing sa Supremo. Hindi ako maaaring sumunod sa dalawang pinuno nang sabay.",
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
  // One question from Chapters 1–6 and four from Chapter 7.
  const chosen = [];
  for (let chapter = 1; chapter <= 6; chapter += 1) {
    const candidates = sourceQuestions.filter((question) => question.chapter === chapter);
    if (candidates.length) chosen.push(shuffle(candidates)[0]);
  }
  const chapterSeven = shuffle(
    sourceQuestions.filter((question) => question.chapter === 7)
  ).slice(0, 4);

  return shuffle([...chosen, ...chapterSeven]).map((question) => ({
    ...question,
    choices: shuffle(question.choices),
  }));
}

function formatTime(seconds) {
  const safeSeconds = Math.max(0, seconds);
  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = safeSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

// =====================================================
// SHARED UI (button + panel, same as Decipher)
// =====================================================

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

  return { animate, transform: [{ scale }, { translateY }] };
}

function GameButton({ label, onPress }) {
  const { animate, transform } = useSpringPress();

  return (
    <Animated.View style={[styles.buttonWrap, { transform }]}>
      <TouchableOpacity
        activeOpacity={1}
        accessibilityRole="button"
        onPressIn={() => animate(true)}
        onPressOut={() => animate(false)}
        onPress={onPress}
      >
        <ImageBackground source={IMG.button} style={styles.buttonBg} resizeMode="stretch">
          <Text style={styles.buttonText}>{label}</Text>
        </ImageBackground>
      </TouchableOpacity>
    </Animated.View>
  );
}

// Answer choice: same button art, with a letter, long-text support, and a
// green/red tint when the answer is revealed.
function ChoiceButton({ letter, text, onPress, disabled, state }) {
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
        <ImageBackground source={IMG.button} style={styles.choiceBg} resizeMode="stretch">
          {state ? (
            <View
              pointerEvents="none"
              style={[
                StyleSheet.absoluteFillObject,
                state === "correct" ? styles.tintCorrect : styles.tintWrong,
              ]}
            />
          ) : null}
          <Text style={styles.choiceLetter}>{letter}</Text>
          <Text style={styles.choiceText}>{text}</Text>
          {state === "correct" ? <Text style={styles.choiceMarkGood}>✓</Text> : null}
          {state === "wrong" ? <Text style={styles.choiceMarkBad}>×</Text> : null}
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
    <View onLayout={onLayout} style={[styles.panel, style, { overflow: "visible" }]}>
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

// =====================================================
// MINIGAME
// =====================================================

export default function WhoSaidItMinigame({
  questions = DEFAULT_QUESTIONS,
  onComplete,
}) {
  const { width } = useWindowDimensions();
  const compact = width < 380;

  const audio = useAudio();
  const sfx = useCallback(
    (key) => {
      try {
        audio?.playSfx?.(key);
      } catch (e) {}
    },
    [audio]
  );

  const [gameQuestions, setGameQuestions] = useState(() => makeGameQuestions(questions));
  const [questionIndex, setQuestionIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(START_SECONDS);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedChoiceId, setSelectedChoiceId] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [revealing, setRevealing] = useState(false);
  const [finished, setFinished] = useState(false);
  const feedbackTimeout = useRef(null);
  const currentQuestion = gameQuestions[questionIndex];
  const totalQuestions = gameQuestions.length;
  const correctCount = answers.filter((answer) => answer.correct).length;

  const finishGame = useCallback(
    (finalAnswers = answers, finalScore = score) => {
      setFinished(true);
      setRevealing(false);
      setFeedback(null);
      if (typeof onComplete === "function") {
        const correct = finalAnswers.filter((answer) => answer.correct).length;
        onComplete({
          score: finalScore,
          correct,
          total: totalQuestions,
          accuracy: totalQuestions > 0 ? Math.round((correct / totalQuestions) * 100) : 0,
        });
      }
    },
    [answers, onComplete, score, totalQuestions]
  );

  useEffect(() => {
    if (finished || revealing) return undefined;
    if (secondsLeft <= 0) {
      finishGame();
      return undefined;
    }
    const timer = setTimeout(() => setSecondsLeft((time) => time - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, finished, revealing, finishGame]);

  useEffect(
    () => () => {
      if (feedbackTimeout.current) clearTimeout(feedbackTimeout.current);
    },
    []
  );

  const answerQuestion = useCallback(
    (choice) => {
      if (!currentQuestion || revealing || finished || selectedChoiceId !== null) return;

      const correct = choice.id === currentQuestion.correctChoiceId;
      const pointsEarned = correct ? 100 + Math.max(0, secondsLeft) * 2 : 0;
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
      setFeedback(
        correct
          ? { kind: "correct", text: `Correct! +${pointsEarned} points` }
          : { kind: "wrong", text: "Not quite. The correct answer is revealed below." }
      );
      setSecondsLeft((time) =>
        Math.max(0, time + (correct ? CORRECT_TIME_BONUS : -WRONG_TIME_PENALTY))
      );
      setRevealing(true);

      feedbackTimeout.current = setTimeout(() => {
        setRevealing(false);
        setFeedback(null);
        if (questionIndex + 1 >= totalQuestions) {
          finishGame(nextAnswers, nextScore);
        } else {
          setQuestionIndex((index) => index + 1);
          setSelectedChoiceId(null);
        }
      }, FEEDBACK_MS);
    },
    [
      answers,
      currentQuestion,
      finishGame,
      finished,
      questionIndex,
      revealing,
      score,
      secondsLeft,
      selectedChoiceId,
      totalQuestions,
      sfx,
    ]
  );

  const replay = useCallback(() => {
    if (feedbackTimeout.current) clearTimeout(feedbackTimeout.current);
    setGameQuestions(makeGameQuestions(questions));
    setQuestionIndex(0);
    setSecondsLeft(START_SECONDS);
    setScore(0);
    setAnswers([]);
    setSelectedChoiceId(null);
    setFeedback(null);
    setRevealing(false);
    setFinished(false);
  }, [questions]);

  const shell = (body) => (
    <ImageBackground source={IMG.background} style={styles.background} resizeMode="cover">
      <View style={styles.dim} />
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        {body}
      </SafeAreaView>
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

  // ---------------------------------------------------
  // RESULTS
  // ---------------------------------------------------
  if (finished) {
    const accuracy = totalQuestions ? Math.round((correctCount / totalQuestions) * 100) : 0;
    return shell(
      <ScrollView
        contentContainerStyle={styles.resultsScroll}
        showsVerticalScrollIndicator={false}
      >
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
              : "Keep practicing—you'll recognize more voices next time."}
          </Text>

          <GameButton label="Play Again" onPress={replay} />
        </Panel>
      </ScrollView>
    );
  }

  const choiceIsCorrect = selectedChoiceId === currentQuestion.correctChoiceId;
  const lowTime = secondsLeft <= 10;

  // ---------------------------------------------------
  // GAMEPLAY
  // ---------------------------------------------------
  return shell(
    <>
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
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

      <View style={styles.progressTrack}>
        {gameQuestions.map((q, i) => (
          <View
            key={q.id}
            style={[
              styles.progressSegment,
              i < answers.length && styles.progressComplete,
              i === questionIndex && styles.progressCurrent,
            ]}
          />
        ))}
      </View>

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
            <Text style={styles.promptName}>{currentQuestion.characterName}</Text>
            <Text style={styles.hintText}>Choose the line spoken by this character.</Text>
          </View>
        )}
      </Panel>

      <Text style={styles.inputLabel}>Choose your answer</Text>
      {currentQuestion.choices.map((choice, index) => {
        const isSelected = selectedChoiceId === choice.id;
        const isCorrect = choice.id === currentQuestion.correctChoiceId;
        let state = null;
        if (revealing && isCorrect) state = "correct";
        else if (revealing && isSelected && !isCorrect) state = "wrong";

        return (
          <ChoiceButton
            key={`${currentQuestion.id}-${choice.id}`}
            letter={String.fromCharCode(65 + index)}
            text={choice.text}
            state={state}
            disabled={revealing || selectedChoiceId !== null}
            onPress={() => answerQuestion(choice)}
          />
        );
      })}

      {feedback ? (
        <Text
          style={[
            styles.feedback,
            feedback.kind === "correct" ? styles.successText : styles.errorText,
          ]}
        >
          {feedback.text}
        </Text>
      ) : (
        <View style={styles.feedbackSpacer} />
      )}

      <Text style={styles.footerHint}>
        Correct answer: +5 seconds · Incorrect answer: −3 seconds · Fast answers earn more
        points
      </Text>
    </ScrollView>

    {revealing ? (
      <View style={styles.overlay} pointerEvents="none">
        <Panel style={styles.overlayPanel}>
          <View
            style={[
              styles.overlayTint,
              choiceIsCorrect ? styles.tintCorrectStrong : styles.tintWrongStrong,
            ]}
          />
          <Text
            style={[
              styles.overlayTitle,
              choiceIsCorrect ? styles.successText : styles.errorText,
            ]}
          >
            {choiceIsCorrect ? "CORRECT!" : "WRONG!"}
          </Text>
          <Text style={styles.kicker}>
            {choiceIsCorrect ? "WELL DONE" : "THE CORRECT ANSWER"}
          </Text>
          <View style={styles.revealIdentity}>
            <Image
              source={currentQuestion.portrait}
              style={styles.revealPortrait}
              resizeMode="contain"
            />
            <View style={styles.revealIdentityText}>
              <Text style={styles.revealName}>{currentQuestion.characterName}</Text>
              <Text style={styles.revealChapter}>Chapter {currentQuestion.chapter}</Text>
            </View>
          </View>
          <Text style={styles.revealQuote}>“{currentQuestion.quote}”</Text>
        </Panel>
      </View>
    ) : null}
    </>
  );
}

// =====================================================
// STYLES
// =====================================================

const INK = "#352313";
const BUTTON_INK = "#371f10";

const styles = StyleSheet.create({
  background: { flex: 1, width: "100%", height: "100%", backgroundColor: "#000" },
  dim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  safeArea: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 14,
    maxWidth: 640,
    width: "100%",
    alignSelf: "center",
  },
  resultsScroll: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  centered: { flex: 1, justifyContent: "center", paddingHorizontal: 20 },

  // HEADER
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
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
  pillLow: { borderColor: "#ff9b82", backgroundColor: "rgba(90, 20, 10, 0.75)" },
  pillValue: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    fontVariant: ["tabular-nums"],
  },
  pillTextLow: { color: "#ff9b82" },

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
  fullPanel: { width: "100%", marginBottom: 10 },
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

  // QUESTION
  quoteText: {
    color: "#0f0f0f",
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "600",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 4,
  },
  quoteTextCompact: { fontSize: 14, lineHeight: 20 },
  characterPrompt: { alignItems: "center" },
  promptPortrait: { width: 90, height: 90, marginBottom: 6 },
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

  // CHOICES
  choiceWrap: { width: "100%", marginBottom: 6 },
  choiceBg: {
    width: "100%",
    minHeight: 46,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 22,
    paddingVertical: 9,
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
    fontSize: 10,
    lineHeight: 16,
    fontWeight: "bold",
  },
  choiceMarkGood: { color: "#1f6b34", fontSize: 22, fontWeight: "bold", marginLeft: 8 },
  choiceMarkBad: { color: "#a3281b", fontSize: 22, fontWeight: "bold", marginLeft: 8 },
  tintCorrect: { backgroundColor: "rgba(60, 160, 85, 0.55)", borderRadius: 8 },
  tintWrong: { backgroundColor: "rgba(200, 50, 35, 0.55)", borderRadius: 8 },

  feedback: {
    marginTop: 6,
    marginBottom: 6,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  feedbackSpacer: { height: 26 },
  successText: { color: "#1f6b34" },
  errorText: { color: "#a3281b" },

  // REVEAL OVERLAY
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  overlayPanel: { width: "100%", maxWidth: 520, alignSelf: "center" },
  overlayTint: {
    position: "absolute",
    top: 18,
    bottom: 20,
    left: 26,
    right: 26,
    borderRadius: 10,
  },
  tintCorrectStrong: { backgroundColor: "rgba(60, 160, 85, 0.40)" },
  tintWrongStrong: { backgroundColor: "rgba(200, 50, 35, 0.40)" },
  overlayTitle: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 2,
    textAlign: "center",
    marginBottom: 2,
  },

  // REVEAL
  revealIdentity: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  revealPortrait: { width: 70, height: 70, marginRight: 12 },
  revealIdentityText: { flex: 1 },
  revealName: { color: INK, fontSize: 16, fontWeight: "bold" },
  revealChapter: { color: "#7a5a2a", fontSize: 12, fontWeight: "bold", marginTop: 3 },
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

  // RESULTS
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
  statsRow: { flexDirection: "row", gap: 8, marginBottom: 10 },
  statBox: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 6,
    backgroundColor: "rgba(120, 85, 40, 0.18)",
    borderWidth: 1.5,
    borderColor: "#7a5a2a",
  },
  statValue: { color: INK, fontSize: 16, fontWeight: "bold" },
  statLabel: { color: "#141414", fontSize: 11, marginTop: 2 },
  timeSummary: {
    color: "#141414",
    textAlign: "center",
    fontSize: 13,
    marginBottom: 6,
  },

  // BUTTONS
  buttonWrap: { alignSelf: "center", width: "80%", maxWidth: 300, marginTop: 8 },
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