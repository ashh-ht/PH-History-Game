import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  StatusBar,
} from "react-native";

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
        text: "One person may be wiser, richer, or more skilled than another, but that doesn't make them more human. This is what should guide every member.",
      },
      {
        id: "rizal",
        text: "If we want a better future for our people, we cannot wait for the government to change. We must build it ourselves.",
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
  // The game always includes one question from Chapters 1–6 and four from Chapter 7.
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

export default function WhoSaidItMinigame({
  questions = DEFAULT_QUESTIONS,
  onComplete,
}) {
  const { width } = useWindowDimensions();
  const compact = width < 380;
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
        onComplete({
          score: finalScore,
          correct: finalAnswers.filter((answer) => answer.correct).length,
          total: totalQuestions,
          accuracy:
            totalQuestions > 0
              ? Math.round(
                  (finalAnswers.filter((answer) => answer.correct).length /
                    totalQuestions) *
                    100
                )
              : 0,
        });
      }
    },
    [answers, onComplete, score, totalQuestions]
  );

  const goNext = useCallback(
    (nextAnswers, nextScore) => {
      if (questionIndex + 1 >= totalQuestions) {
        finishGame(nextAnswers, nextScore);
      } else {
        setQuestionIndex((index) => index + 1);
        setSelectedChoiceId(null);
        setFeedback(null);
        setRevealing(false);
      }
    },
    [finishGame, questionIndex, totalQuestions]
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
      if (!currentQuestion || revealing || finished || selectedChoiceId !== null) {
        return;
      }
      const correct = choice.id === currentQuestion.correctChoiceId;
      const timeAtAnswer = secondsLeft;
      const pointsEarned = correct ? 100 + Math.max(0, timeAtAnswer) * 2 : 0;
      const nextScore = score + pointsEarned;
      const answerRecord = {
        questionId: currentQuestion.id,
        chapter: currentQuestion.chapter,
        correct,
        choiceId: choice.id,
        pointsEarned,
      };
      const nextAnswers = [...answers, answerRecord];

      setSelectedChoiceId(choice.id);
      setAnswers(nextAnswers);
      setScore(nextScore);
      setFeedback(
        correct
          ? { kind: "correct", text: `Correct! +${pointsEarned} points` }
          : { kind: "wrong", text: "Not quite. The correct answer is revealed below." }
      );
      setSecondsLeft((time) =>
        Math.max(
          0,
          time + (correct ? CORRECT_TIME_BONUS : -WRONG_TIME_PENALTY)
        )
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

  if (!currentQuestion && !finished) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centered}>
          <Text style={styles.title}>Who Said It?</Text>
          <Text style={styles.bodyText}>No questions are available.</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (finished) {
    const accuracy = totalQuestions
      ? Math.round((correctCount / totalQuestions) * 100)
      : 0;
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <ScrollView contentContainerStyle={styles.resultsScroll}>
          <View style={styles.header}>
            <Text style={styles.eyebrow}>HISTORY CHALLENGE</Text>
            <Text style={styles.title}>Game Complete!</Text>
            <Text style={styles.subtitle}>The Revolution's words live on.</Text>
          </View>

          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>FINAL SCORE</Text>
            <Text style={styles.resultScore}>{score.toLocaleString()}</Text>
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>{correctCount}/{totalQuestions}</Text>
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
            <Text style={styles.resultMessage}>
              {accuracy >= 80
                ? "Excellent work, historian!"
                : accuracy >= 50
                ? "Good effort. Keep learning the voices of history."
                : "Keep practicing—you'll recognize more voices next time."}
            </Text>
          </View>

          <Pressable accessibilityRole="button" onPress={replay} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Play Again</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const correctChoice = currentQuestion.choices.find(
    (choice) => choice.id === currentQuestion.correctChoiceId
  );
  const selectedChoice = currentQuestion.choices.find(
    (choice) => choice.id === selectedChoiceId
  );
  const choiceIsCorrect = selectedChoiceId === currentQuestion.correctChoiceId;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.screenContent}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>PHILIPPINE HISTORY</Text>
          <Text style={styles.title}>Who Said It?</Text>
          <Text style={styles.subtitle}>Recognize the voices of the Revolution</Text>
        </View>

        <View style={styles.topStats}>
          <View style={styles.timerPill}>
            <Text style={styles.timerLabel}>TIME</Text>
            <Text style={[styles.timerValue, secondsLeft <= 10 && styles.timerUrgent]}>
              {formatTime(secondsLeft)}
            </Text>
          </View>
          <View style={styles.scorePill}>
            <Text style={styles.timerLabel}>SCORE</Text>
            <Text style={styles.scoreValue}>{score.toLocaleString()}</Text>
          </View>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressLabels}>
            <Text style={styles.progressText}>Question {questionIndex + 1} of {totalQuestions}</Text>
            <Text style={styles.progressText}>Chapter {currentQuestion.chapter}</Text>
          </View>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${((questionIndex + 1) / totalQuestions) * 100}%` },
              ]}
            />
          </View>
        </View>

        <View style={styles.questionCard}>
          <Text style={styles.questionType}>
            {currentQuestion.type === "quoteToCharacter"
              ? "WHO SAID THIS?"
              : "WHICH LINE DID THEY SAY?"}
          </Text>
          {currentQuestion.type === "quoteToCharacter" ? (
            <Text style={[styles.quoteText, compact && styles.quoteTextCompact]}>
              “{currentQuestion.quote}”
            </Text>
          ) : (
            <View style={styles.characterPrompt}>
              <Image source={currentQuestion.portrait} style={styles.promptPortrait} resizeMode="contain" />
              <Text style={styles.promptName}>{currentQuestion.characterName}</Text>
              <Text style={styles.promptHint}>Choose the line spoken by this character.</Text>
            </View>
          )}
        </View>

        <View style={styles.choicesSection}>
          <Text style={styles.sectionTitle}>Choose your answer</Text>
          {currentQuestion.choices.map((choice, index) => {
            const isSelected = selectedChoiceId === choice.id;
            const isCorrect = choice.id === currentQuestion.correctChoiceId;
            let choiceStyle = styles.choiceButton;
            if (revealing && isCorrect) choiceStyle = [styles.choiceButton, styles.choiceCorrect];
            else if (revealing && isSelected && !isCorrect) choiceStyle = [styles.choiceButton, styles.choiceWrong];

            return (
              <Pressable
                key={`${currentQuestion.id}-${choice.id}`}
                accessibilityRole="button"
                accessibilityState={{ disabled: revealing || selectedChoiceId !== null }}
                disabled={revealing || selectedChoiceId !== null}
                onPress={() => answerQuestion(choice)}
                style={choiceStyle}
              >
                <View style={styles.choiceLetter}>
                  <Text style={styles.choiceLetterText}>{String.fromCharCode(65 + index)}</Text>
                </View>
                <Text style={styles.choiceText}>{choice.text}</Text>
                {revealing && isCorrect ? <Text style={styles.choiceMark}>✓</Text> : null}
                {revealing && isSelected && !isCorrect ? <Text style={styles.choiceMark}>×</Text> : null}
              </Pressable>
            );
          })}
        </View>

        {feedback ? (
          <View style={[styles.feedbackBanner, feedback.kind === "correct" ? styles.feedbackCorrect : styles.feedbackWrong]}>
            <Text style={styles.feedbackText}>{feedback.text}</Text>
          </View>
        ) : null}

        {revealing ? (
          <View style={styles.revealCard}>
            <Text style={styles.revealEyebrow}>{choiceIsCorrect ? "WELL DONE" : "THE CORRECT ANSWER"}</Text>
            <View style={styles.revealIdentity}>
              <Image source={currentQuestion.portrait} style={styles.revealPortrait} resizeMode="contain" />
              <View style={styles.revealIdentityText}>
                <Text style={styles.revealName}>{currentQuestion.characterName}</Text>
                <Text style={styles.revealChapter}>Chapter {currentQuestion.chapter}</Text>
              </View>
            </View>
            <Text style={styles.revealQuote}>“{currentQuestion.quote}”</Text>
          </View>
        ) : null}

        <Text style={styles.footerHint}>
          Correct answer: +5 seconds · Incorrect answer: −3 seconds · Fast answers earn more points
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4E8CE",
  },
  screenContent: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 28,
    maxWidth: 720,
    width: "100%",
    alignSelf: "center",
  },
  resultsScroll: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 18,
    paddingVertical: 28,
    maxWidth: 720,
    width: "100%",
    alignSelf: "center",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 18,
  },
  eyebrow: {
    color: "#7B5B2D",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 2.1,
    marginBottom: 5,
  },
  title: {
    color: "#234536",
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: 0.2,
    textAlign: "center",
  },
  subtitle: {
    color: "#77664D",
    fontSize: 13,
    marginTop: 4,
    textAlign: "center",
  },
  topStats: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 17,
  },
  timerPill: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: "#FFF8E9",
    borderWidth: 1,
    borderColor: "#D7C39D",
  },
  scorePill: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: "#234536",
  },
  timerLabel: {
    color: "#8B7045",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.5,
  },
  timerValue: {
    color: "#234536",
    fontSize: 22,
    fontWeight: "900",
    fontVariant: ["tabular-nums"],
    marginTop: 1,
  },
  timerUrgent: {
    color: "#B23B32",
  },
  scoreValue: {
    color: "#FFF2D1",
    fontSize: 22,
    fontWeight: "900",
    marginTop: 1,
  },
  progressSection: {
    marginBottom: 16,
  },
  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 7,
  },
  progressText: {
    color: "#6C5B42",
    fontSize: 12,
    fontWeight: "800",
  },
  progressTrack: {
    height: 7,
    borderRadius: 99,
    backgroundColor: "#DFD0B2",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 99,
    backgroundColor: "#B68A3A",
  },
  questionCard: {
    backgroundColor: "#FFFAEF",
    borderColor: "#D8C49D",
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    marginBottom: 18,
    shadowColor: "#4C3820",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  questionType: {
    color: "#A4772C",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.8,
    textAlign: "center",
    marginBottom: 14,
  },
  quoteText: {
    color: "#283E32",
    fontSize: 21,
    lineHeight: 31,
    fontWeight: "700",
    fontStyle: "italic",
    textAlign: "center",
  },
  quoteTextCompact: {
    fontSize: 18,
    lineHeight: 27,
  },
  characterPrompt: {
    alignItems: "center",
  },
  promptPortrait: {
    width: 124,
    height: 124,
    marginBottom: 7,
  },
  promptName: {
    color: "#234536",
    fontSize: 22,
    fontWeight: "900",
    textAlign: "center",
  },
  promptHint: {
    color: "#77664D",
    fontSize: 12,
    marginTop: 5,
    textAlign: "center",
  },
  choicesSection: {
    marginBottom: 12,
  },
  sectionTitle: {
    color: "#234536",
    fontSize: 15,
    fontWeight: "900",
    marginBottom: 10,
  },
  choiceButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF9EC",
    borderColor: "#D8C49D",
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 9,
    minHeight: 54,
  },
  choiceCorrect: {
    backgroundColor: "#E3F0E3",
    borderColor: "#4F875D",
    borderWidth: 2,
  },
  choiceWrong: {
    backgroundColor: "#F8E2D9",
    borderColor: "#B84B3D",
    borderWidth: 2,
  },
  choiceLetter: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: "#EAD9B7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },
  choiceLetterText: {
    color: "#5E4727",
    fontSize: 13,
    fontWeight: "900",
  },
  choiceText: {
    flex: 1,
    color: "#343B31",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
  },
  choiceMark: {
    color: "#234536",
    fontSize: 20,
    fontWeight: "900",
    marginLeft: 8,
  },
  feedbackBanner: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 12,
  },
  feedbackCorrect: {
    backgroundColor: "#DCEBDD",
  },
  feedbackWrong: {
    backgroundColor: "#F4DCD3",
  },
  feedbackText: {
    color: "#2F4635",
    fontSize: 14,
    fontWeight: "900",
    textAlign: "center",
  },
  revealCard: {
    backgroundColor: "#234536",
    borderRadius: 18,
    padding: 16,
    marginTop: 2,
    marginBottom: 12,
  },
  revealEyebrow: {
    color: "#E7C57D",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.7,
    marginBottom: 10,
  },
  revealIdentity: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  revealPortrait: {
    width: 76,
    height: 76,
    marginRight: 13,
  },
  revealIdentityText: {
    flex: 1,
  },
  revealName: {
    color: "#FFF4D9",
    fontSize: 20,
    fontWeight: "900",
  },
  revealChapter: {
    color: "#D8C49D",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 4,
  },
  revealQuote: {
    color: "#FFF4D9",
    fontSize: 15,
    lineHeight: 23,
    fontStyle: "italic",
  },
  footerHint: {
    color: "#867354",
    fontSize: 11,
    lineHeight: 17,
    textAlign: "center",
    marginTop: 7,
  },
  resultCard: {
    backgroundColor: "#FFFAEF",
    borderColor: "#D8C49D",
    borderWidth: 1,
    borderRadius: 22,
    padding: 22,
    alignItems: "center",
    marginBottom: 20,
  },
  resultLabel: {
    color: "#9B762F",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 2,
  },
  resultScore: {
    color: "#234536",
    fontSize: 48,
    fontWeight: "900",
    marginTop: 4,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: "row",
    width: "100%",
    gap: 8,
    marginBottom: 18,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#F2E5C9",
    borderRadius: 13,
    paddingVertical: 12,
    alignItems: "center",
  },
  statValue: {
    color: "#234536",
    fontSize: 18,
    fontWeight: "900",
  },
  statLabel: {
    color: "#77664D",
    fontSize: 11,
    fontWeight: "700",
    marginTop: 3,
  },
  resultMessage: {
    color: "#5F523D",
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 21,
  },
  primaryButton: {
    backgroundColor: "#234536",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#FFF4D9",
    fontSize: 16,
    fontWeight: "900",
  },
});
