import React, { useState, useEffect, useRef, useCallback } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Animated,
  Easing,
  StyleSheet,
} from "react-native";

import { useGameProgress } from "../../GameProgress";
import { useAudio } from "../../Audiostore";
import { useGameplaySettings } from "../Others/GameplaySetting";
import { useDisplaySettings, FONT_SCALE } from "../Others/DisplaySetting";
import { saveCheckpoint, markPartReached } from "../Others/saveProgress";
import { Chapter1 } from "./StoryScreen/Chapter1";
import { useJournal } from "../../Main/Others/JournalContext";
import { useFocusEffect } from "@react-navigation/native";
import { REMNANT_DATA } from "../RemnantData";

import VoyageMinigame from "../GameScreen/Minigames/VoyageMinigame";
import SantoNinoMinigame from "../GameScreen/Minigames/SantoNinoMinigame";
import CedulaMinigame from "../GameScreen/Minigames/CedulaMinigame";
import DecipherMinigame from "../GameScreen/Minigames/DecipherMinigame";
import CharacterMatchingMinigame from "../GameScreen/Minigames/CharacterMatchingMinigame";
import ChronologicalOrderMinigame from "../GameScreen/Minigames/ChronologicalOrderMinigame";
import WhoSaidItMinigame from "../GameScreen/Minigames/WhoSaidItMinigame";
import TimelineSort from "../GameScreen/Minigames/Timelinesort";
import { BloodTrace, OathTrace } from "../GameScreen/Minigames/TracingMinigame";
import MinigameOverlay from "../../Components/Minigameoverlay";

// =====================================================
// QUIZ UI IMAGES
// =====================================================
const QUIZ_BACKGROUND = require("../../assets/Quiz_Assets/Quiz_Background.png");
const QUIZ_CHOICES = require("../../assets/Quiz_Assets/Quiz_Choices.png");
const QUIZ_CHOICES_SELECTED = require("../../assets/Quiz_Assets/Quiz_ChoicesSelected.png");
const QUIZ_SUBMIT = require("../../assets/Quiz_Assets/Quiz_Submit.png");
const QUIZ_SUBMIT_PRESSED = require("../../assets/Quiz_Assets/Quiz_SubmitPressed.png");
const QUIZ_QUESTION_IMAGES = [
  require("../../assets/Quiz_Assets/QuizQuestion_1.png"),
  require("../../assets/Quiz_Assets/QuizQuestion_2.png"),
  require("../../assets/Quiz_Assets/QuizQuestion_3.png"),
  require("../../assets/Quiz_Assets/QuizQuestion_4.png"),
  require("../../assets/Quiz_Assets/QuizQuestion_5.png"),
  require("../../assets/Quiz_Assets/QuizQuestion_6.png"),
];

// =====================================================
// QUIZ UI IMAGES
// =====================================================
const QUIZ_BACKGROUND = require("../../assets/Quiz_Assets/Quiz_Background.png");
const QUIZ_CHOICES = require("../../assets/Quiz_Assets/Quiz_Choices.png");
const QUIZ_CHOICES_SELECTED = require("../../assets/Quiz_Assets/Quiz_ChoicesSelected.png");
const QUIZ_SUBMIT = require("../../assets/Quiz_Assets/Quiz_Submit.png");
const QUIZ_SUBMIT_PRESSED = require("../../assets/Quiz_Assets/Quiz_SubmitPressed.png");
const QUIZ_QUESTION_IMAGES = [
  require("../../assets/Quiz_Assets/QuizQuestion_1.png"),
  require("../../assets/Quiz_Assets/QuizQuestion_2.png"),
  require("../../assets/Quiz_Assets/QuizQuestion_3.png"),
  require("../../assets/Quiz_Assets/QuizQuestion_4.png"),
  require("../../assets/Quiz_Assets/QuizQuestion_5.png"),
  require("../../assets/Quiz_Assets/QuizQuestion_6.png"),
];

const getMusicFor = (sceneData, idx) => {
  for (let i = Math.min(idx, sceneData.length - 1); i >= 0; i--) {
    const music = sceneData[i].music ?? sceneData[i].Music;
    if (music) return music;
  }
  return null;
};

function ChapterCompleteScreen({ onContinue }) {
  const titleScale = useRef(new Animated.Value(0.65)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.sequence([
      Animated.delay(250),
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.spring(titleScale, {
          toValue: 1,
          speed: 10,
          bounciness: 10,
          useNativeDriver: true,
        }),
      ]),
    ]);
    animation.start();
    return () => animation.stop();
  }, [titleOpacity, titleScale]);

  return (
    <ImageBackground
      source={require("../../Background Images/Intro/CHAPTERCOMPLETE_BG.png")}
      style={styles.chapterCompleteScreen}
      resizeMode="cover"
    >
      <Animated.Image
        pointerEvents="none"
        source={require("../../Background Images/Intro/CHAPTERCOMPLETE.png")}
        resizeMode="contain"
        style={[
          styles.chapterCompleteArtwork,
          { opacity: titleOpacity, transform: [{ scale: titleScale }] },
        ]}
      />
      <AnimatedNextButton onPress={onContinue} />
    </ImageBackground>
  );
}

function AnimatedNextButton({ onPress }) {
  const { playSfx } = useAudio();
  const [pressed, setPressed] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const animatePress = (isPressed) => {
    setPressed(isPressed);
    Animated.parallel([
      Animated.spring(scale, { toValue: isPressed ? 0.88 : 1, speed: isPressed ? 24 : 18, bounciness: isPressed ? 8 : 12, useNativeDriver: true }),
      Animated.spring(translateY, { toValue: isPressed ? 4 : 0, speed: isPressed ? 24 : 18, bounciness: isPressed ? 4 : 12, useNativeDriver: true }),
    ]).start();
  };

  return (
    <Animated.View style={[styles.arrowButton, { transform: [{ scale }, { translateY }] }]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={() => animatePress(true)}
        onPressOut={() => animatePress(false)}
        onPress={() => {
          playSfx("dialogueClick");
          onPress?.();
        }}
      >
        <Image
          source={pressed ? require("../../assets/icons/arrow_nextpressed.png") : require("../../assets/icons/arrow_next.png")}
          style={styles.arrowImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </Animated.View>
  );
}

function AnimatedChoiceButton({ children, onPress, style }) {
  const scale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const animate = (isPressed) => {
    Animated.parallel([
      Animated.spring(scale, { toValue: isPressed ? 0.94 : 1, speed: 20, bounciness: 12, useNativeDriver: true }),
      Animated.spring(translateY, { toValue: isPressed ? 3 : 0, speed: 20, bounciness: 10, useNativeDriver: true }),
    ]).start();
  };

  return (
    <Animated.View style={[style, { transform: [{ scale }, { translateY }] }]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={() => animate(true)}
        onPressOut={() => animate(false)}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
}

// Custom button for the Quiz choices (handles normal/selected image states)
function AnimatedQuizChoiceButton({ children, onPress, style, isSelected }) {
  const scale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const animate = (isPressed) => {
    Animated.parallel([
      Animated.spring(scale, { toValue: isPressed ? 0.93 : 1, speed: 22, bounciness: 10, useNativeDriver: true }),
      Animated.spring(translateY, { toValue: isPressed ? 3 : 0, speed: 22, bounciness: 8, useNativeDriver: true }),
    ]).start();
  };

  return (
    <Animated.View style={[style, { transform: [{ scale }, { translateY }] }]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={() => animate(true)}
        onPressOut={() => animate(false)}
        onPress={onPress}
      >
        <ImageBackground
          source={isSelected ? QUIZ_CHOICES_SELECTED : QUIZ_CHOICES}
          style={styles.quizImageButtonBg}
          resizeMode="stretch"
        >
          {children}
        </ImageBackground>
      </TouchableOpacity>
    </Animated.View>
  );
}

function AnimatedImageButton({ normalSource, pressedSource, onPress, style, imageStyle }) {
  const [pressed, setPressed] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const animate = (isPressed) => {
    setPressed(isPressed);
    Animated.parallel([
      Animated.spring(scale, { toValue: isPressed ? 0.9 : 1, speed: isPressed ? 22 : 18, bounciness: isPressed ? 6 : 12, useNativeDriver: true }),
      Animated.spring(translateY, { toValue: isPressed ? 3 : 0, speed: isPressed ? 22 : 18, bounciness: isPressed ? 4 : 10, useNativeDriver: true }),
    ]).start();
  };

  return (
    <Animated.View style={[style, { transform: [{ scale }, { translateY }] }]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={() => animate(true)}
        onPressOut={() => animate(false)}
        onPress={onPress}
      >
        <Image
          source={pressed ? pressedSource : normalSource}
          style={imageStyle}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </Animated.View>
  );
}

const QUIZ_BACKGROUND = require("../../assets/quiz_assets/Quiz_Background.png");

const QUIZ_PANELS = [
  require("../../assets/quiz_assets/QuizQuestion_1.png"),
  require("../../assets/quiz_assets/QuizQuestion_2.png"),
  require("../../assets/quiz_assets/QuizQuestion_3.png"),
  require("../../assets/quiz_assets/QuizQuestion_4.png"),
  require("../../assets/quiz_assets/QuizQuestion_5.png"),
  require("../../assets/quiz_assets/QuizQuestion_6.png"),
];

const MINIGAMES = {
  voyage: VoyageMinigame,
  santoNino: SantoNinoMinigame,
  sortingtimeline: TimelineSort,
};

const MINIGAME_TYPES = new Set([
  "voyage", "santoNino", "cedula", "decipher", "matching", "chronological", "whoSaidIt", "sortingtimeline", "bloodtrace", "oathtrace",
]);

const SPEED_MS = { Slow: 60, Normal: 30, Fast: 12 };

function useTypewriter(text, msPerChar, resetKey) {
  const [state, setState] = useState({ key: resetKey, count: 0 });
  const length = text ? text.length : 0;
  const count = state.key === resetKey ? state.count : 0;

  useEffect(() => {
    setState({ key: resetKey, count: 0 });
    if (!length) return undefined;

    const id = setInterval(() => {
      setState((previous) =>
        previous.key === resetKey && previous.count < length
          ? { ...previous, count: previous.count + 1 }
          : previous
      );
    }, msPerChar);

    return () => clearInterval(id);
  }, [resetKey, length, msPerChar]);

  return {
    shown: text ? text.slice(0, count) : "",
    done: count >= length,
    skip: () => setState({ key: resetKey, count: length }),
  };
}

function TypedText({ style, full, shown }) {
  return (
    <View>
      <Text style={[style, styles.opacityZero]}>{full}</Text>
      <Text style={[style, styles.typedOverlay]}>{shown}</Text>
    </View>
  );
}

function GameplayMenuOverlay({ navigation }) {
  return (
    <View style={styles.menuOverlay}>
      <AnimatedImageButton
        normalSource={require("../../assets/icons/menu_button.png")}
        pressedSource={require("../../assets/icons/menu_buttonpressed.png")}
        style={styles.menuButton}
        imageStyle={styles.menuButtonImage}
        onPress={() => navigation.navigate("Second")}
      />
      <AnimatedImageButton
        normalSource={require("../../assets/icons/journal_button.png")}
        pressedSource={require("../../assets/icons/journal_buttonpressed.png")}
        style={styles.menuButton}
        imageStyle={styles.menuButtonImage}
        onPress={() => navigation.navigate("Journal")}
      />
    </View>
  );
}

function FadeBackground({ source, style, children, duration = 700 }) {
  const [srcA, setSrcA] = useState(source);
  const [srcB, setSrcB] = useState(null);
  const bOpacity = useRef(new Animated.Value(0)).current;
  const showingB = useRef(false);
  const targetRef = useRef(source);
  const startFadeRef = useRef(null);
  const timerRef = useRef(null);

  const startFade = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    const run = startFadeRef.current;
    startFadeRef.current = null;
    if (run) run();
  }, []);

  useEffect(() => {
    if (source === targetRef.current) return;
    targetRef.current = source;

    startFade();
    bOpacity.stopAnimation();

    const intoB = !showingB.current;
    const alreadyThere = intoB ? srcB === source : srcA === source;

    if (intoB) setSrcB(source);
    else setSrcA(source);
    showingB.current = intoB;

    startFadeRef.current = () => {
      Animated.timing(bOpacity, {
        toValue: intoB ? 1 : 0,
        duration,
        useNativeDriver: true,
      }).start();
    };

    if (alreadyThere) startFade();
    else timerRef.current = setTimeout(startFade, 400);
  }, [source]);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      bOpacity.stopAnimation();
    },
    [bOpacity]
  );

  return (
    <View style={style}>
      <Image
        source={srcA}
        resizeMode="cover"
        onLoad={startFade}
        style={styles.fadeLayer}
      />
      {srcB != null ? (
        <Animated.Image
          source={srcB}
          resizeMode="cover"
          onLoad={startFade}
          style={[styles.fadeLayer, { opacity: bOpacity }]}
        />
      ) : null}
      {children}
    </View>
  );
}

function CharacterSprite({ char, talking }) {
  const bob = useRef(new Animated.Value(0)).current;
  const animationRef = useRef(null);

  useEffect(() => {
    animationRef.current?.stop();
    bob.stopAnimation();

    if (talking) {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(bob, {
            toValue: -2.5,
            duration: 550,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(bob, {
            toValue: 0,
            duration: 650,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      );

      animationRef.current = loop;
      loop.start();
    } else {
      const settle = Animated.timing(bob, {
        toValue: 0,
        duration: 450,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      });

      animationRef.current = settle;
      settle.start();
    }

    return () => {
      animationRef.current?.stop();
      bob.stopAnimation();
    };
  }, [talking, bob]);

  const isLeft = char.position === "left";
  const isCenter = char.position === "center";

  return (
    <Animated.Image
      source={char.source}
      resizeMode="contain"
      style={[
        styles.characterImage,
        isLeft
          ? styles.characterLeft
          : isCenter
            ? styles.characterCenter
            : styles.characterRight,
        { transform: [{ translateY: Animated.add(bob, 9) }] },
      ]}
    />
  );
}

function CharacterLayer({ characters, speaker, typing, sceneKey }) {
  if (!characters || characters.length === 0) return null;

  const speakerName = (speaker || "").trim().toLowerCase();

  const isSpeaker = (char) => {
    const name = (
      char?.name ||
      char?.characterName ||
      char?.id ||
      ""
    )
      .trim()
      .toLowerCase();

    if (!name || !speakerName) return false;

    return speakerName.includes(name) || name.includes(speakerName);
  };

  return (
    <View style={styles.characterLayer} pointerEvents="none">
      {characters.map((char, index) => {
        if (!char?.source) return null;

        return (
          <CharacterSprite
            key={`${sceneKey ?? "scene"}-${char.name || char.characterName || char.id || "character"}-${index}`}
            char={char}
            talking={!!typing && isSpeaker(char)}
          />
        );
      })}
    </View>
  );
}

function PartRenderer(props) {
  const { sceneData, chapterNumber, partNumber, isLastPart, navigation } = props;

  const game = useGameProgress();
  const { playMusic, stopLoops, playSfx } = useAudio();
  const settings = useGameplaySettings();
  const display = useDisplaySettings();

  const fontScale = FONT_SCALE[display?.fontSize] ?? 1;
  const boxImage = { opacity: display?.boxOpacity ?? 1 };

  const scaled = (style) => {
    const flattened = StyleSheet.flatten(style) || {};

    return {
      ...flattened,
      ...(flattened.fontSize
        ? { fontSize: Math.round(flattened.fontSize * fontScale) }
        : {}),
      ...(flattened.lineHeight
        ? { lineHeight: Math.round(flattened.lineHeight * fontScale) }
        : {}),
    };
  };

  const startIdx = props.route?.params?.startScene ?? game.scene ?? 0;

  const [sceneIdx, setSceneIdx] = useState(startIdx);

  const [picked, setPicked] = useState(null);
  const [choiceConfirmed, setChoiceConfirmed] = useState(false);

  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizConfirmed, setQuizConfirmed] = useState(false);

  const [paused, setPaused] = useState(false);
  const [minigamePhase, setMinigamePhase] = useState("intro");

  useEffect(() => {
    setPaused(false);
  }, [sceneIdx]);

  useFocusEffect(
    useCallback(() => {
      setPaused(false);
    }, [])
  );

  const [showRewardPopup, setShowRewardPopup] = useState(false);
  const [rewardImage, setRewardImage] = useState(null);

  const introProgress = useRef(new Animated.Value(1)).current;
  const [introChanging, setIntroChanging] = useState(false);
  const [introNextIndex, setIntroNextIndex] = useState(null);
  const chapterTitleOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const g = gameRef.current;
    g.setChapter(chapterNumber);
    g.setPart(partNumber);
    g.setInGame(true);
    markPartReached(partNumber);

    return () => {
      gameRef.current.setInGame(false);
      stopLoopsRef.current();
    };
  }, []);

  const getSceneInfo = useCallback(
    (idx) => {
      let sceneNumber = 0;
      let sceneTitle = "";

      for (let i = 0; i <= idx && i < sceneData.length; i++) {
        if (sceneData[i].type === "scene") {
          sceneNumber += 1;
          sceneTitle = sceneData[i].title;
        }
      }

      return { sceneNumber, sceneTitle };
    },
    [sceneData]
  );

  useEffect(() => {
    saveCheckpoint({
      chap: chapterNumber,
      part: partNumber,
      sceneIdx: startIdx,
      ...getSceneInfo(startIdx),
    });
  }, []);

  const hasMoreScenes = sceneIdx < sceneData.length;
  const current = hasMoreScenes ? sceneData[sceneIdx] : null;

  console.log("part", partNumber, "idx", sceneIdx, "type", current?.type);

  const isMinigame = current ? MINIGAME_TYPES.has(current.type) : false;

  useEffect(() => {
    if (!hasMoreScenes && !isLastPart) {
      markPartReached(partNumber + 1);
    }
  }, [hasMoreScenes, isLastPart, partNumber]);

  const { unlock } = useJournal();

  useEffect(() => {
    if (current && current.unlock && current.type !== "quiz") {
      unlock(current.unlock);
    }
  }, [current, unlock]);

  useEffect(() => {
    const track = getMusicFor(sceneData, sceneIdx);
    if (track) playMusic(track);
  }, [sceneIdx, sceneData, playMusic]);

  useEffect(() => {
    const scene = sceneData[sceneIdx];
    if (!scene) return;

    if (scene.stopSfx) stopLoops();

    [].concat(scene.sfx ?? []).forEach((key) => playSfx(key));
    if (scene.stopSfx) stopLoopsRef.current();
    [].concat(scene.sfx ?? []).forEach((key) => playSfxRef.current(key));
  }, [sceneIdx, sceneData]);

  useEffect(() => {
    if (current?.type !== "chapterIntro") return undefined;
    chapterTitleOpacity.setValue(0);
    const animation = Animated.sequence([
      Animated.delay(500),
      Animated.timing(chapterTitleOpacity, { toValue: 1, duration: 1800, useNativeDriver: true }),
    ]);
    animation.start();
    return () => animation.stop();
  }, [sceneIdx, current?.type, chapterTitleOpacity]);

  const getSceneInfo = useCallback((idx) => {
    let sceneNumber = 0;
    let sceneTitle = "";
    for (let i = 0; i <= idx && i < sceneData.length; i++) {
      if (sceneData[i].type === "scene") {
        sceneNumber += 1;
        sceneTitle = sceneData[i].title;
      }
    }
    return { sceneNumber, sceneTitle };
  }, [sceneData]);

  useEffect(() => {
    if (!current || current.type !== "scene") return;
    if (sceneIdx === sceneData.length - 1) return;
    saveCheckpoint({ chap: chapterNumber, part: partNumber, sceneIdx, ...getSceneInfo(sceneIdx) });
  }, [sceneIdx, current, chapterNumber, partNumber, sceneData.length, getSceneInfo]);

  const saveDecision = (choiceIndex) => {
    if (!current || current.type !== "choice") return;
    const decNum = current.title?.match(/Choice (\d+\.\d+)/)?.[1] ?? null;
    const resumeIdx = typeof current.nextScene === "number" ? current.nextScene : sceneIdx + 1;
    saveCheckpoint({ chap: chapterNumber, part: partNumber, sceneIdx: resumeIdx, ...getSceneInfo(resumeIdx), decNum, choice: current.choices[choiceIndex].text });
  };

  const goToIndex = (index) => {
    if (typeof index !== "number" || index < 0 || index >= sceneData.length) return;
    setPicked(null);
    setChoiceConfirmed(false);
    setQuizAnswer(null);
    setQuizConfirmed(false);
    setMinigamePhase("intro");

    setSceneIdx(index);
    game.setScene(index);
  };

  const goNext = () => {
    const nextIndex = sceneIdx + 1;
    if (nextIndex >= sceneData.length) {
      setSceneIdx(sceneData.length);
      game.setScene(sceneData.length);
      return;
    }
    goToIndex(nextIndex);
  };

  const goToNextIntro = () => {
    if (introChanging) return;
    const nextIndex = sceneIdx + 1;
    if (nextIndex < 0 || nextIndex >= sceneData.length) return;
    const nextScene = sceneData[nextIndex];
    if (!nextScene || nextScene.type !== "system" || nextScene.intro !== true) {
      goToIndex(nextIndex);
      return;
    }
    setIntroNextIndex(nextIndex);
    setIntroChanging(true);
    introProgress.setValue(0);
    Animated.timing(introProgress, { toValue: 1, duration: 1400, useNativeDriver: true }).start(() => {
      setSceneIdx(nextIndex);
      game.setScene(nextIndex);
      setIntroNextIndex(null);
      setIntroChanging(false);
      introProgress.setValue(1);
    });
  };

  const isTyped = current && !isMinigame && current.type !== "scene" && current.type !== "quiz";
  let lineText = null;

  if (isTyped) {
    if (current.type === "choice") {
      lineText =
        picked !== null && choiceConfirmed
          ? current.choices[picked].dialogue
          : null;
    } else {
      lineText = current.text;
    }
  }

  const { shown, done, skip } = useTypewriter(
    lineText,
    SPEED_MS[settings?.textSpeed] ?? 30,
    `${sceneIdx}-${picked}-${choiceConfirmed}`
  );

  const next = () => {
    if (!current) return;
    if (current.type === "choice") {
      if (!choiceConfirmed || picked === null) return;

      return goToIndex(
        typeof current.nextScene === "number"
          ? current.nextScene
          : sceneIdx + 1
      );
    }
    if (current.type === "system" && current.intro) {
      return goToNextIntro();
    }
    return goNext();
  };

  // Always points at the newest `next`, so the auto-play timer below
  // never calls an out-of-date version.
  nextRef.current = next;

  const advance = () => (done ? next() : skip());

  useEffect(() => {
    if (!settings?.autoPlay || !done || !current) return;
    if (isMinigame || !lineText) return;

    const id = setTimeout(next, settings.autoDelay * 1000);
    return () => clearTimeout(id);
  }, [
    sceneIdx,
    picked,
    choiceConfirmed,
    done,
    lineText,
    settings?.autoPlay,
    settings?.autoDelay,
    current,
    isMinigame,
  ]);

  if (current?.type === "voyage") {
    return <VoyageMinigame onComplete={goNext} />;
  }

  const withMinigameOverlay = (
    node,
    { hideSettings = false, top = 20, right = 20 } = {}
  ) => (
    <>
      {node}
      {minigamePhase === "playing" && (
        <MinigameOverlay
          paused={paused}
          hideSettings={hideSettings}
          top={top}
          right={right}
          onPause={() => setPaused(true)}
          onResume={() => setPaused(false)}
          onSettings={() => {
            setPaused(true);
            navigation.navigate("Second");
          }}
        />
      )}
    </>
  );

  if (current?.type === "voyage") {
    return withMinigameOverlay(
      <VoyageMinigame
        paused={paused}
        onPhaseChange={setMinigamePhase}
        onComplete={goNext}
      />
    );
  }

  if (current?.type === "santoNino") {
    return <SantoNinoMinigame onComplete={goNext} />;
  }

  if (current?.type === "cedula") {
    return withMinigameOverlay(
      <CedulaMinigame
        key={`cedula-${chapterNumber}-${partNumber}-${sceneIdx}`}
        paused={paused}
        onPhaseChange={setMinigamePhase}
        onComplete={goNext}
      />,
      { hideSettings: true, top: 6, right: 12 }
    );
  }

  if (current?.type === "decipher") {
    return withMinigameOverlay(
      <DecipherMinigame
        key={`decipher-${chapterNumber}-${partNumber}-${sceneIdx}`}
        paused={paused}
        onPhaseChange={setMinigamePhase}
        onComplete={goNext}
      />,
      { hideSettings: true, top: 6, right: 12 }
    );
  }

  if (current?.type === "matching") {
    return withMinigameOverlay(
      <CharacterMatchingMinigame
        key={`matching-${chapterNumber}-${partNumber}-${sceneIdx}`}
        characters={current.characters}
        paused={paused}
        onPhaseChange={setMinigamePhase}
        onComplete={goNext}
      />,
      { hideSettings: true, top: 6, right: 12 }
    );
  }

  if (current?.type === "chronological") {
    return withMinigameOverlay(
      <ChronologicalOrderMinigame
        key={`chronological-${chapterNumber}-${partNumber}-${sceneIdx}`}
        events={current.events}
        paused={paused}
        onPhaseChange={setMinigamePhase}
        onComplete={goNext}
      />,
      { hideSettings: true, top: 6, right: 12 }
    );
  }

  if (
    current?.type === "bloodtrace" ||
    current?.type === "oathtrace"
  ) {
    const TraceGame =
      current.type === "bloodtrace" ? BloodTrace : OathTrace;

    return withMinigameOverlay(
      <TraceGame
        key={`trace-${chapterNumber}-${partNumber}-${sceneIdx}`}
        paused={paused}
        onPhaseChange={setMinigamePhase}
        onComplete={goNext}
      />,
      { hideSettings: true }
    );
  }

  if (current?.type === "whoSaidIt") {
    return <WhoSaidItMinigame key={`who-said-it-${chapterNumber}-${partNumber}-${sceneIdx}`} onComplete={(results) => { console.log("Who Said It results:", results); goNext(); }} />;
  }

  const Minigame = current ? MINIGAMES[current.type] : null;
  if (Minigame) return <Minigame onComplete={goNext} />;

  const withOverlay = (node) => (
    <>
      {node}
      <GameplayMenuOverlay navigation={navigation} />
    </>
  );

  if (!hasMoreScenes) {
    return (
      <ChapterCompleteScreen
        onContinue={() => {
          game.setScene(0);
          if (isLastPart) {
            props.onChapterComplete?.(chapterNumber + 1);
          } else {
            props.onPartComplete?.(partNumber + 1);
          }
        }}
      />
    );
  }

  if (current.type === "chapterIntro") {
    return withOverlay(
      <ImageBackground source={current.background} style={styles.chapterIntroScreen} resizeMode="cover">
        <Animated.Image source={current.titleImage} resizeMode="contain" style={[styles.chapterIntroTitle, { opacity: chapterTitleOpacity }]} />
        <AnimatedNextButton onPress={goNext} />
      </ImageBackground>
    );
  }

  if (current.type === "system" && current.intro === true) {
    const nextIntro = introNextIndex !== null ? sceneData[introNextIndex] : null;
    return withOverlay(
      <View style={styles.introScreen}>
        <ImageBackground source={current.background} style={styles.introBackground} resizeMode="cover">
          <View style={styles.introTextBox}>
            <TypedText
              style={scaled(styles.introText)}
              full={lineText}
              shown={shown}
            />
          </View>
        </ImageBackground>
        {nextIntro && (
          <Animated.View pointerEvents="none" style={[styles.introNextLayer, { opacity: introProgress }]}>
            <ImageBackground source={nextIntro.background} style={styles.introBackground} resizeMode="cover">
              <View style={styles.introTextBox}>
                <TypedText
                  style={scaled(styles.introText)}
                  full={nextIntro.text}
                  shown=""
                />
              </View>
            </ImageBackground>
          </Animated.View>
        )}

        <TouchableOpacity
          style={styles.introTouchable}
          activeOpacity={1}
          onPress={() => {
            playSfx("dialogueClick");
            advance();
          }}
        />
      </View>
    );
  }

  if (current.type === "quiz") {
    const isConfirmed = quizConfirmed;
    const isAnswered = quizAnswer !== null;
    const isCorrect = quizAnswer === current.correctIndex;
    const submitVisible = !isAnswered && selectedOption !== null;

    const quizIndex = sceneData.slice(0, sceneIdx).filter(s => s.type === 'quiz').length;
    const questionParchment = QUIZ_QUESTION_IMAGES[quizIndex % QUIZ_QUESTION_IMAGES.length];

    const quizNumber = sceneData
      .slice(0, sceneIdx + 1)
      .filter((scene) => scene.type === "quiz").length;

    const panelIndex = current.panel ? current.panel - 1 : quizNumber - 1;
    const panelSource = QUIZ_PANELS[panelIndex % QUIZ_PANELS.length];

    const handleQuizTap = (index) => {
      if (isConfirmed) return;

      if (quizAnswer !== index) {
        setQuizAnswer(index);
        playSfx("choose");
        return;
      }

      setQuizConfirmed(true);

      const correct = index === current.correctIndex;
      playSfx(correct ? "correct" : "wrong");

      if (correct && current.unlock && current.unlock.length > 0) {
        unlock(current.unlock);

        const remnantId = current.unlock.find((id) =>
          id.startsWith("remnant-part")
        );

        if (remnantId) {
          const parts = remnantId.split("-");
          const partNum = parseInt(
            parts[1].replace("part", ""),
            10
          );
          const pieceNum = parseInt(parts[2], 10);

          if (
            REMNANT_DATA[partNum] &&
            REMNANT_DATA[partNum].pieces[pieceNum - 1]
          ) {
            setRewardImage(
              REMNANT_DATA[partNum].pieces[pieceNum - 1]
            );
            setShowRewardPopup(true);
          }
        }
      }
    };

    return withOverlay(
      <ImageBackground
        source={QUIZ_BACKGROUND}
        style={styles.choiceScreen}
        resizeMode="cover"
      >
        <View style={styles.quizParchmentWrapper}>
          <ImageBackground
            source={panelSource}
            style={styles.quizParchmentBox}
            imageStyle={boxImage}
            resizeMode="stretch"
          >
            <Text style={scaled(styles.choiceQuestion)}>
              {current.question}
            </Text>

            {!isConfirmed && (
              <Text style={scaled(styles.quizTapPrompt)}>
                {isAnswered
                  ? "Tap your selected answer again to confirm."
                  : "Tap an answer to select it."}
              </Text>
            )}

            {isConfirmed && (
              <Text
                style={scaled(
                  isCorrect
                    ? styles.quizCorrectPrompt
                    : styles.quizIncorrectPrompt
                )}
              >
                {isCorrect ? "Correct!" : "Not quite!"}
              </Text>
            )}
          </ImageBackground>
        </View>

        <View style={styles.quizButtonsGrid}>
          {current.options.map((option, index) => {
            let buttonSource = require("../../assets/buttons/Quiz_Choices.png");

            if (quizAnswer === index) {
              if (!isConfirmed) {
                buttonSource = require("../../assets/buttons/Quiz_ChoicesSelected.png");
              } else if (index === current.correctIndex) {
                buttonSource = require("../../assets/buttons/wrong.png");
              } else {
                buttonSource = require("../../assets/buttons/right.png");
              }
            }

            return (
              <AnimatedQuizButton
                key={index}
                style={styles.quizImageButton}
                onPress={() => handleQuizTap(index)}
              >
                <ImageBackground
                  source={buttonSource}
                  style={styles.quizImageButtonBg}
                  resizeMode="stretch"
                >
                  <Text style={scaled(styles.quizButtonText)}>
                    {option}
                  </Text>
                </ImageBackground>
              </AnimatedQuizButton>
            );
          })}
        </View>

        {/* SUBMIT BUTTON (Always in layout, but only visible/active when selected) */}
        <View 
          style={[
            styles.quizSubmitWrapper, 
            submitVisible ? styles.quizSubmitVisible : styles.quizSubmitHidden,
          ]} 
          pointerEvents={submitVisible ? 'auto' : 'none'}
        >
          <AnimatedImageButton
            normalSource={QUIZ_SUBMIT}
            pressedSource={QUIZ_SUBMIT_PRESSED}
            onPress={handleQuizSubmit}
            style={styles.quizSubmitBtn}
            imageStyle={styles.quizSubmitImage}
          />
        </View>

        {/* NEXT ARROW (Only shows after submitting) */}
        {isAnswered && (
          <AnimatedNextButton onPress={goNext} />
        )}

        {/* REMNANT CONGRATULATIONS POPUP */}
        {showRewardPopup && (
          <View style={styles.rewardPopupOverlay}>
            <View style={styles.rewardPopupBox}>
              <Text style={styles.rewardTitle}>
                CONGRATULATIONS!
              </Text>

              <Text style={styles.rewardSubtitle}>
                You received a Remnant piece!
              </Text>

              {rewardImage && (
                <Image
                  source={rewardImage}
                  style={styles.rewardImage}
                  resizeMode="contain"
                />
              )}

              <TouchableOpacity
                style={styles.rewardButton}
                onPress={() => setShowRewardPopup(false)}
              >
                <Text style={styles.rewardButtonText}>CLAIM</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ImageBackground>
    );
  }

  if (current.type === "system") {
    const systemContent = (
      <>
        <View style={styles.systemParchmentWrapper}>
          <ImageBackground source={require("../../assets/foreground/narration_box.png")} style={styles.systemParchmentBox} imageStyle={boxImage} resizeMode="stretch">
            <TypedText style={scaled(styles.systemText)} full={lineText} shown={shown} />
          </ImageBackground>
        </View>
        <AnimatedNextButton onPress={advance} />
      </>
    );
    if (current.background) {
      return withOverlay(
        <ImageBackground
          source={current.background}
          style={styles.systemScreen}
          resizeMode="cover"
        >
          {systemContent}
        </ImageBackground>
      );
    }
    return withOverlay(<View style={styles.systemScreen}>{systemContent}</View>);
  }

  if (current.type === "scene") {
    return withOverlay(
      <FadeBackground
        source={current.background}
        style={styles.sceneScreen}
      >
        <View style={styles.sceneDarkOverlay}>
          <View style={styles.sceneTitleBox}>
            <Text style={styles.sceneTitle}>{current.title}</Text>
            {current.date ? <Text style={styles.sceneDate}>{current.date}</Text> : null}
          </View>
        </View>
        <AnimatedNextButton onPress={goNext} />
      </FadeBackground>
    );
  }

  if (current.type === "narrator") {
    const narratorContent = (
      <>
        <CharacterLayer
          characters={current.characters}
          sceneKey={sceneIdx}
        />

        <View style={styles.narratorWrapper}>
          <ImageBackground source={require("../../assets/foreground/narration_box.png")} style={styles.narratorBox} imageStyle={boxImage} resizeMode="stretch">
            <Text style={scaled(styles.narratorLabel)}>Narrator:</Text>
            <TypedText style={scaled(styles.narratorText)} full={lineText} shown={shown} />
          </ImageBackground>
        </View>
        <AnimatedNextButton onPress={advance} />
      </>
    );
    if (current.background) {
      return withOverlay(
        <ImageBackground
          source={current.background}
          style={styles.background}
          resizeMode="cover"
        >
          {narratorContent}
        </ImageBackground>
      );
    }
    return withOverlay(<View style={styles.background}>{narratorContent}</View>);
  }

  if (current.type === "choice") {
    if (picked === null || !choiceConfirmed) {
      const handleChoiceTap = (index) => {
        if (choiceConfirmed) return;

        if (picked !== index) {
          setPicked(index);
          playSfx("choose");
          return;
        }

        setChoiceConfirmed(true);
        playSfx("dialogueClick");
        saveDecision(index);
      };

      const choiceContent = (
        <>
          <View style={styles.choiceParchmentWrapper}>
            <ImageBackground
              source={require("../../assets/foreground/quizzing_box.png")}
              style={styles.choiceParchmentBox}
              imageStyle={[boxImage, { transform: [{ translateX: 32 }] }]}
              resizeMode="stretch"
            >
              <Text style={scaled(styles.choiceQuestion)}>
                {current.question}
              </Text>

              <Text style={scaled(styles.choicePrompt)}>
                {picked === null
                  ? "What will you choose?"
                  : "Tap your selected choice again to confirm."}
              </Text>
            </ImageBackground>
          </View>
          <View style={styles.choiceButtonsGrid}>
            {current.choices.map((choice, index) => {
              const isSelected = picked === index;

              const buttonSource = isSelected
                ? require("../../assets/buttons/choice_picked.png")
                : require("../../assets/buttons/choice_button.png");

              return (
                <AnimatedChoiceButton
                  key={index}
                  style={styles.choiceImageButton}
                  onPress={() => handleChoiceTap(index)}
                >
                  <ImageBackground
                    source={buttonSource}
                    style={styles.choiceImageButtonBg}
                    imageStyle={{ transform: [{ translateX: 10 }] }}
                    resizeMode="stretch"
                  >
                    <Text style={scaled(styles.choiceButtonText)}>
                      {choice.text}
                    </Text>
                  </ImageBackground>
                </AnimatedChoiceButton>
              );
            })}
          </View>
        </>
      );
      if (current.background) {
        return withOverlay(
          <ImageBackground
            source={current.background}
            style={styles.choiceScreen}
            resizeMode="cover"
          >
            {choiceContent}
          </ImageBackground>
        );
      }
      return withOverlay(<View style={styles.choiceScreen}>{choiceContent}</View>);
    }

    const selectedChoice = current.choices[picked];
    const responseContent = (
      <>
        <CharacterLayer
          characters={selectedChoice.characters}
          speaker={selectedChoice.speaker}
          typing={!done}
          sceneKey={`${sceneIdx}-${picked}`}
        />

        <View style={styles.dialogueWrapper}>
          <ImageBackground source={require("../../assets/foreground/dialogue_box.png")} style={styles.dialogueBox} imageStyle={boxImage} resizeMode="stretch">
            <Text style={scaled(styles.speakerName)}>{selectedChoice.speaker}</Text>
            <TypedText style={scaled(styles.dialogueText)} full={lineText} shown={shown} />
            {selectedChoice.translation ? <Text style={scaled(styles.dialogueTranslation)}>{selectedChoice.translation}</Text> : null}
          </ImageBackground>
        </View>
        <AnimatedNextButton onPress={advance} />
      </>
    );
    if (current.background) {
      return withOverlay(
        <ImageBackground
          source={current.background}
          style={styles.background}
          resizeMode="cover"
        >
          {responseContent}
        </ImageBackground>
      );
    }
    return withOverlay(<View style={styles.background}>{responseContent}</View>);
  }

  const dialogueContent = (
    <>
      <CharacterLayer
        characters={current.characters}
        speaker={current.speaker}
        typing={!done}
        sceneKey={sceneIdx}
      />

      <View style={styles.dialogueWrapper}>
        <ImageBackground
          source={require("../../assets/foreground/dialogue_box.png")}
          style={styles.dialogueBox}
          imageStyle={boxImage}
          resizeMode="stretch"
        >
          <Text style={scaled(styles.speakerName)}>
            {current.speaker}
          </Text>

          <TypedText
            style={scaled(styles.dialogueText)}
            full={lineText}
            shown={shown}
          />

          {current.translation ? (
            <Text style={scaled(styles.dialogueTranslation)}>
              {current.translation}
            </Text>
          ) : null}
        </ImageBackground>
      </View>
      <AnimatedNextButton onPress={advance} />
    </>
  );

  if (current.background) {
    return withOverlay(
      <ImageBackground
        source={current.background}
        style={styles.background}
        resizeMode="cover"
      >
        {dialogueContent}
      </ImageBackground>
    );
  }
  return withOverlay(<View style={styles.background}>{dialogueContent}</View>);
}

const PART_SELECT_ROUTE = "PartSelect";

const goToUnlockSequence = (navigation, completedPart) => {
  const params = { unlockSequence: { completedPart, token: Date.now() } };
  if (typeof navigation.popTo === "function") {
    navigation.popTo(PART_SELECT_ROUTE, params);
  } else {
    navigation.navigate(PART_SELECT_ROUTE, params);
  }
};

export function Chap1Part1Screen({ navigation, ...props }) {
  return <PartRenderer sceneData={Chapter1.part1} chapterNumber={1} partNumber={1} isLastPart={false} onPartComplete={() => goToUnlockSequence(navigation, 1)} navigation={navigation} {...props} />;
}
export function Chap1Part2Screen({ navigation, ...props }) {
  return <PartRenderer sceneData={Chapter1.part2} chapterNumber={1} partNumber={2} isLastPart={false} onPartComplete={() => goToUnlockSequence(navigation, 2)} navigation={navigation} {...props} />;
}
export function Chap1Part3Screen({ navigation, ...props }) {
  return <PartRenderer sceneData={Chapter1.part3} chapterNumber={1} partNumber={3} isLastPart={false} onPartComplete={() => goToUnlockSequence(navigation, 3)} navigation={navigation} {...props} />;
}
export function Chap1Part4Screen({ navigation, ...props }) {
  return <PartRenderer sceneData={Chapter1.part4} chapterNumber={1} partNumber={4} isLastPart={false} onPartComplete={() => goToUnlockSequence(navigation, 4)} navigation={navigation} {...props} />;
}
export function Chap1Part5Screen({ navigation, ...props }) {
  return <PartRenderer sceneData={Chapter1.part5} chapterNumber={1} partNumber={5} isLastPart={false} onPartComplete={() => goToUnlockSequence(navigation, 5)} navigation={navigation} {...props} />;
}
export function Chap1Part6Screen({ navigation, ...props }) {
  return <PartRenderer sceneData={Chapter1.part6} chapterNumber={1} partNumber={6} isLastPart={false} onPartComplete={() => goToUnlockSequence(navigation, 6)} navigation={navigation} {...props} />;
}
export function Chap1Part7Screen({ navigation, ...props }) {
  return <PartRenderer sceneData={Chapter1.part7} chapterNumber={1} partNumber={7} isLastPart={false} onPartComplete={() => goToUnlockSequence(navigation, 7)} navigation={navigation} {...props} />;
}
export function Chap1Part8Screen({ navigation, ...props }) {
  const { stopLoops } = useAudio();
  return (
    <PartRenderer
      sceneData={Chapter1.part8}
      chapterNumber={1}
      partNumber={8}
      isLastPart={true}
      onChapterComplete={() => {
        stopLoops();
        goToUnlockSequence(navigation, 8);
      }}
      navigation={navigation}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  fadeLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  opacityZero: {
    opacity: 0,
  },

  chapterIntroScreen: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  chapterIntroTitle: {
    width: "60%",
    height: "45%",
  },

  chapterCompleteScreen: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  chapterCompleteArtwork: {
    width: "60%",
    height: "45%",
  },

  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#000000",
  },
  typedOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
  },

  // ---------- MENU OVERLAY ----------
  menuOverlay: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 100,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  menuButton: {
    width: 42,
    height: 42,
  },
  menuButtonImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  // ---------- SYSTEM INTRO ----------
  introScreen: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#000000",
  },
  introBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  introNextLayer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  introTouchable: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  introTextBox: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.78)",
    paddingVertical: 12,
    paddingHorizontal: 48,
  },
  introText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 17,
    lineHeight: 24,
  },

  // ---------- SCENE TITLE ----------
  sceneScreen: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#000000",
  },
  sceneDarkOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  sceneTitleBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  sceneTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  sceneDate: {
    color: "#FFFFFF",
    fontSize: 18,
    textAlign: "center",
  },

  // ---------- NEXT ARROW ----------
  arrowButton: {
    position: "absolute",
    right: 50,
    bottom: 25,
    zIndex: 50,
  },
  arrowImage: {
    width: 35,
    height: 35,
    resizeMode: "contain",
  },

  // ---------- SYSTEM NARRATION ----------
  systemScreen: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#000000",
  },
  systemParchmentWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },
  systemParchmentBox: {
    width: "100%",
    minHeight: 180,
    justifyContent: "center",
    padding: 30,
  },
  systemText: {
    color: "#000000",
    fontSize: 18,
    textAlign: "center",
    lineHeight: 25,
  },

  // ---------- NARRATOR ----------
  narratorWrapper: {
    position: "absolute",
    left: 20,
    right: 5,
    bottom: 5,
    zIndex: 20,
  },
  narratorBox: {
    width: "100%",
    minHeight: 165,
    justifyContent: "center",
    paddingTop: 40,
    paddingBottom: 25,
    paddingLeft: 30,
    paddingRight: -120,
  },
  narratorLabel: {
    position: "absolute",
    top: -1,
    left: -10,
    width: 300,
    height: 45,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
    includeFontPadding: false,
  },
  narratorText: {
    color: "#FFFFFF",
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },

  // ---------- CHARACTERS ----------
  characterLayer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
    zIndex: 10,
  },
  characterImage: {
    position: "absolute",
    bottom: 100,
    width: "35%",
    height: "72%",
    resizeMode: "contain",
  },
  characterLeft: {
    width: "28%",
    left: "2%",
  },
  characterRight: {
    width: "28%",
    right: "4%",
  },
  characterCenter: {
    left: "30%",
  },

  // ---------- DIALOGUE ----------
  dialogueWrapper: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 7,
    zIndex: 20,
  },
  dialogueBox: {
    width: "100%",
    minHeight: 160,
    justifyContent: "center",
    paddingTop: 40,
    paddingBottom: 25,
    paddingLeft: 10,
    paddingRight: -30,
  },
  speakerName: {
    position: "absolute",
    top: -1,
    left: 25,
    width: 300,
    height: 45,
    color: "#352313",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
    includeFontPadding: false,
  },
  dialogueText: {
    color: "#0f0f0f",
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  dialogueTranslation: {
    color: "#141414",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    marginTop: 10,
    fontStyle: "italic",
  },

  // ---------- CHOICES ----------
  choiceScreen: {
    flex: 1,
    backgroundColor: "#fafafa",
    justifyContent: "center",
    alignItems: "center",
    alignItems: "center",
  },
  choiceParchmentWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 100,
    paddingVertical: 25,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 100,
    paddingVertical: 25,
  },
  choiceParchmentBox: {
    width: "100%",
    minHeight: 180,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    alignItems: "center",
  },

  quizParchmentWrapper: {
    width: "85%",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  quizParchmentBox: {
    width: "100%",
    minHeight: 175,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,

  },

  choiceQuestion: {
    color: "#ecc28c",
    fontSize: 18,
    lineHeight: 25,
    textAlign: "center",
  },
  choicePrompt: {
    color: "#d7cfbe",
    fontSize: 16,
    textAlign: "center",
    marginTop: 15,
    fontWeight: "bold",
  },
  choiceButtonsGrid: {
    width: "98%",
    alignSelf: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "stretch",
    gap: 12,
  },
  choiceImageButton: {
    width: "47%",
  },
  choiceImageButtonBg: {
    width: "100%",
    minHeight: 90,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  choiceButtonText: {
    color: "#000000",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },

  // =====================================================
  // QUIZ UI STYLES (Adjust sizes here)
  // =====================================================
  quizScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 65,
  },

  // 1. Question Parchment Image Sizing
  quizQuestionWrapper: {
    width: "85%",
    marginTop: 90,
    marginBottom: 10,
    alignItems: "center",
  },
  quizQuestionBox: {
    width: "100%",
    minHeight: 175,
    justifyContent: "center",
    padding: 10,
  },

  quizQuestionText: {
    color: "#72503d", 
    fontSize: 18,
    lineHeight: 25,
    textAlign: "center",
  },

  // 2. Choices Grid and Buttons
  quizChoicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 15,
    width: "90%",
  },
  quizImageButton: {
    width: "45%",
    height: 50,
  },
  quizImageButtonBg: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  quizButtonText: {
    color: "#724c35",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    fontWeight: "bold",
  },

  // 3. Submit Button
  quizSubmitWrapper: {
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  quizSubmitVisible: {
    opacity: 1,
  },
  quizSubmitHidden: {
    opacity: 0,
  },
  quizSubmitBtn: {
    width: 120,
    height: 70,
  },
  quizSubmitImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  // 4. Result Text
  quizCorrectPrompt: {
    color: "#218838",
    fontSize: 18,
    textAlign: "center",
    marginTop: 15,
    fontWeight: "bold",
  },
  quizIncorrectPrompt: {
    color: "#af1121",
    fontSize: 18,
    textAlign: "center",
    marginTop: 15,
    fontWeight: "bold",
  },

  quizTapPrompt: {
    color: "#5A4A32",
    fontSize: 15,
    textAlign: "center",
    marginTop: 15,
    fontWeight: "bold",
  },

  nextButton: {
    marginTop: 20,
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
  },

  nextButtonText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
  },

  rewardPopupOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    elevation: 999,
  },

  rewardPopupBox: {
    backgroundColor: "#F4E4C8",
    padding: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#A87C5E",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    maxWidth: 450,
  },

  rewardTitle: {
    fontSize: 24,
    fontFamily: "serif",
    fontWeight: "bold",
    color: "#5A4A32",
    marginBottom: 8,
    textAlign: "center",
  },

  rewardSubtitle: {
    fontSize: 15,
    fontFamily: "serif",
    color: "#5A4A32",
    marginBottom: 20,
    textAlign: "center",
  },

  rewardImage: {
    width: 150,
    height: 150,
    marginBottom: 25,
  },

  rewardButton: {
    backgroundColor: "#A87C5E",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#5A4A32",
  },

  rewardButtonText: {
    color: "#FFF",
    fontFamily: "serif",
    fontWeight: "bold",
    fontSize: 18,
  },
});