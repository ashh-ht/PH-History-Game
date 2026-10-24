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
// IMPORT THE REMNANT DATA
import { REMNANT_DATA } from "../RemnantData"; 

// =====================================================
// MINIGAMES
// =====================================================
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
// HELPERS
// =====================================================
const getMusicFor = (sceneData, idx) => {
  for (let i = Math.min(idx, sceneData.length - 1); i >= 0; i--) {
    const m = sceneData[i].music ?? sceneData[i].Music;
    if (m) return m;
  }
  return null;
};

// =====================================================
// ANIMATED BUTTONS
// =====================================================
function AnimatedNextButton({ onPress }) {
  const { playSfx } = useAudio();
  const [pressed, setPressed] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const animatePress = (isPressed) => {
    setPressed(isPressed);
    Animated.parallel([
      Animated.spring(scale, {
        toValue: isPressed ? 0.88 : 1,
        speed: isPressed ? 24 : 18,
        bounciness: isPressed ? 8 : 12,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: isPressed ? 4 : 0,
        speed: isPressed ? 24 : 18,
        bounciness: isPressed ? 4 : 12,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View
      style={[
        styles.arrowButton,
        { transform: [{ scale }, { translateY }] },
      ]}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={() => animatePress(true)}
        onPressOut={() => animatePress(false)}
        onPress={() => {
          playSfx("dialogueClick");
          onPress();
        }}
      >
        <Image
          source={
            pressed
              ? require("../../assets/icons/arrow_nextpressed.png")
              : require("../../assets/icons/arrow_next.png")
          }
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
      style={[style, { transform: [{ scale }, { translateY }] }]}
    >
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

function AnimatedQuizButton({ children, onPress, style }) {
  const scale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const animate = (isPressed) => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: isPressed ? 0.93 : 1,
        speed: 22,
        bounciness: 10,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: isPressed ? 3 : 0,
        speed: 22,
        bounciness: 8,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View
      style={[style, { transform: [{ scale }, { translateY }] }]}
    >
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

function AnimatedImageButton({ normalSource, pressedSource, onPress, style, imageStyle }) {
  const [pressed, setPressed] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const animate = (isPressed) => {
    setPressed(isPressed);
    Animated.parallel([
      Animated.spring(scale, {
        toValue: isPressed ? 0.90 : 1,
        speed: isPressed ? 22 : 18,
        bounciness: isPressed ? 6 : 12,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: isPressed ? 3 : 0,
        speed: isPressed ? 22 : 18,
        bounciness: isPressed ? 4 : 10,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View
      style={[style, { transform: [{ scale }, { translateY }] }]}
    >
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

// NOTE: bloodtrace / oathtrace are NOT in this map anymore.
// They are rendered in PartRenderer with the pause overlay (see below).
const MINIGAMES = {
  voyage: VoyageMinigame,
  santoNino: SantoNinoMinigame,
  sortingtimeline: TimelineSort,
};

const MINIGAME_TYPES = new Set([
  "voyage",
  "santoNino",
  "cedula", 
  "decipher",
  "matching",
  "chronological",
  "whoSaidIt",
  "sortingtimeline",
  "bloodtrace",
  "oathtrace",
]);

// =====================================================
// TYPEWRITER
// =====================================================
const SPEED_MS = { Slow: 60, Normal: 30, Fast: 12 };

function useTypewriter(text, msPerChar, resetKey) {
  const [state, setState] = useState({ key: resetKey, count: 0 });
  const length = text ? text.length : 0;

  const count = state.key === resetKey ? state.count : 0;

  useEffect(() => {
    setState({ key: resetKey, count: 0 });
    if (!length) return;

    const id = setInterval(() => {
      setState((s) =>
        s.key === resetKey && s.count < length
          ? { ...s, count: s.count + 1 }
          : s
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

// =====================================================
// MENU OVERLAY
// =====================================================
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

// =====================================================
// CHARACTER LAYER (with head bobbing)
// =====================================================

// How the characters move. Change these to tune the feel.
const BOB_IDLE_PX = 8; // how far up an idle character moves
const BOB_IDLE_MS = 1200; // time for one half-bob while idle
const BOB_TALK_PX = 80; // how far up the speaking character moves
const BOB_TALK_MS = 1200; // time for one half-bob while talking

// One character that bobs up and down.
// Idle: a slow, small bob. Talking: a faster, bigger bob.
function CharacterSprite({ char, talking }) {
  const bob = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const amount = talking ? -BOB_TALK_PX : -BOB_IDLE_PX;
    const duration = talking ? BOB_TALK_MS : BOB_IDLE_MS;

    bob.setValue(0);
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(bob, {
          toValue: amount,
          duration,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(bob, {
          toValue: 0,
          duration,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();

    return () => loop.stop();
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
        { transform: [{ translateY: bob }] },
      ]}
    />
  );
}

// `speaker` = the name shown on the dialogue box
// `typing`  = true while the text is still being typed out
function CharacterLayer({ characters, speaker, typing }) {
  if (!characters || characters.length === 0) return null;

  const speakerName = (speaker || "").toLowerCase();
  const isSpeaker = (char) => {
    const name = (char?.name || "").toLowerCase();
    if (!name || !speakerName) return false;
    return speakerName.includes(name) || name.includes(speakerName);
  };

  return (
    <View style={styles.characterLayer} pointerEvents="none">
      {characters.map((char, index) => {
        if (!char?.source) return null;

        return (
          <CharacterSprite
            key={`${char.name || "character"}-${index}`}
            char={char}
            talking={!!typing && isSpeaker(char)}
          />
        );
      })}
    </View>
  );
}

// =====================================================
// PART RENDERER
// =====================================================
function PartRenderer(props) {
  const { sceneData, chapterNumber, partNumber, isLastPart, navigation, route } = props;

  const game = useGameProgress();
  const { playMusic, stopLoops, playSfx } = useAudio();

  const settings = useGameplaySettings();
  const display = useDisplaySettings();
  const fontScale = FONT_SCALE[display?.fontSize] ?? 1;

  const boxImage = {
    opacity: display?.boxOpacity ?? 1,
  };

  const scaled = (style) => {
    const s = StyleSheet.flatten(style) || {};
    return {
      ...s,
      ...(s.fontSize ? { fontSize: Math.round(s.fontSize * fontScale) } : {}),
      ...(s.lineHeight ? { lineHeight: Math.round(s.lineHeight * fontScale) } : {}),
    };
  };

  const startIdx = route?.params?.startScene ?? game.scene;

  const [sceneIdx, setSceneIdx] = useState(startIdx);
  const [picked, setPicked] = useState(null);
  const [quizAnswer, setQuizAnswer] = useState(null);

  // --- MINIGAME PAUSE ---
  const [paused, setPaused] = useState(false);
  // Reported by the minigame on screen: "intro" (instructions),
  // "playing", or "result" (win / lose screen)
  const [minigamePhase, setMinigamePhase] = useState("intro");

  useEffect(() => {
    setPaused(false);
  }, [sceneIdx]);

  useFocusEffect(
  useCallback(() => {
    setPaused(false);
  }, [])
);

  // --- REMNANT POPUP STATES ---
  const [showRewardPopup, setShowRewardPopup] = useState(false);
  const [rewardImage, setRewardImage] = useState(null);

  const introProgress = useRef(new Animated.Value(1)).current;
  const [introChanging, setIntroChanging] = useState(false);
  const [introNextIndex, setIntroNextIndex] = useState(null);
  const chapterTitleOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    game.setChapter(chapterNumber);
    game.setPart(partNumber);
    game.setInGame(true);
    markPartReached(partNumber);

    console.log(`loaded ch${chapterNumber} part${partNumber}`);

    return () => {
      game.setInGame(false);
      stopLoops();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startScene = route?.params?.startScene;
  const lastAppliedStartScene = useRef(null);

  useEffect(() => {
    if (startScene == null) return;
    if (lastAppliedStartScene.current === startScene) return;

    lastAppliedStartScene.current = startScene;
    setPicked(null);
    setQuizAnswer(null);
    setSceneIdx(startScene);
    game.setScene(startScene);
  }, [startScene, game]);

  const hasMoreScenes = sceneIdx < sceneData.length;
  const current = hasMoreScenes ? sceneData[sceneIdx] : null;
  console.log("part", partNumber, "idx", sceneIdx, "type", current?.type);

  const isMinigame = current ? MINIGAME_TYPES.has(current.type) : false;

  useEffect(() => {
    if (!hasMoreScenes && !isLastPart) markPartReached(partNumber + 1);
  }, [hasMoreScenes, isLastPart, partNumber]);

  const { unlock } = useJournal();

  // FIXED: Exclude "quiz" so it doesn't auto-unlock when the screen loads. 
  // Quizzes unlock their items via handleQuizSelect.
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneIdx, sceneData]);

  useEffect(() => {
    if (current?.type !== "chapterIntro") {
      return;
    }

    chapterTitleOpacity.setValue(0);
    const animation = Animated.sequence([
      Animated.delay(500),
      Animated.timing(chapterTitleOpacity, {
        toValue: 1,
        duration: 1800,
        useNativeDriver: true,
      }),
    ]);

    animation.start();

    return () => {
      animation.stop();
    };
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

    saveCheckpoint({
      chap: chapterNumber,
      part: partNumber,
      sceneIdx,
      ...getSceneInfo(sceneIdx),
    });
  }, [sceneIdx, current, chapterNumber, partNumber, sceneData.length, getSceneInfo]);

  const saveDecision = (choiceIndex) => {
    if (!current || current.type !== "choice") return;

    const decNum = current.title?.match(/Choice (\d+\.\d+)/)?.[1] ?? null;
    const resumeIdx = typeof current.nextScene === "number" ? current.nextScene : sceneIdx + 1;

    saveCheckpoint({
      chap: chapterNumber,
      part: partNumber,
      sceneIdx: resumeIdx,
      ...getSceneInfo(resumeIdx),
      decNum,
      choice: current.choices[choiceIndex].text,
    });
  };

  const goToIndex = (index) => {
    if (typeof index !== "number" || index < 0 || index >= sceneData.length) {
      return;
    }
    setPicked(null);
    setQuizAnswer(null);
    setMinigamePhase("intro"); // a new minigame starts on its instructions
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

    Animated.timing(introProgress, {
      toValue: 1,
      duration: 1400,
      useNativeDriver: true,
    }).start(() => {
      setSceneIdx(nextIndex);
      game.setScene(nextIndex);
      setIntroNextIndex(null);
      setIntroChanging(false);
      introProgress.setValue(1);
    });
  };

  const isTyped =
    current &&
    !isMinigame &&
    current.type !== "scene" &&
    current.type !== "quiz";

  let lineText = null;

  if (isTyped) {
    if (current.type === "choice") {
      lineText = picked !== null ? current.choices[picked].dialogue : null;
    } else {
      lineText = current.text;
    }
  }

  const { shown, done, skip } = useTypewriter(
    lineText,
    SPEED_MS[settings?.textSpeed] ?? 30,
    `${sceneIdx}-${picked}`
  );

  const next = () => {
    if (!current) return;
    if (current.type === "choice") {
      return goToIndex(typeof current.nextScene === "number" ? current.nextScene : sceneIdx + 1);
    }
    if (current.type === "system" && current.intro) {
      return goToNextIntro();
    }
    return goNext();
  };

  const advance = () => (done ? next() : skip());

  // Auto Play
  useEffect(() => {
    if (!settings?.autoPlay || !done || !current) return;
    if (isMinigame) return; 
    if (current.type === "quiz") return;
    if (current.type === "choice" && picked === null) return;

    const id = setTimeout(next, settings.autoDelay * 1000);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneIdx, picked, done, settings?.autoPlay, settings?.autoDelay, current, isMinigame]);


  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // MINIGAMES
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  // Adds the pause + settings buttons (top right) on top of a minigame.
  // Only the minigames that understand the `paused` prop use this.
  // The pause + settings buttons only show while the minigame is actually
  // being played (not on the instructions or the win / lose screens).
  // Options: { hideSettings: true } = no menu button at the top right
  //          (the PAUSED panel still has Settings),
  //          { top, right } = where the buttons sit (default 20 / 20).
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

  if (current?.type === "santoNino") return <SantoNinoMinigame onComplete={goNext} />;

  if (current?.type === "cedula") {
    return withMinigameOverlay(
      <CedulaMinigame
        key={`cedula-${chapterNumber}-${partNumber}-${sceneIdx}`}
        paused={paused}
        onPhaseChange={setMinigamePhase}
        onComplete={goNext}
      />,
      // Cedula: pause only, tucked into the corner (same as Decipher)
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
      // Decipher: no top-right menu button, pause tucked into the corner
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
      // Matching: same as Decipher - pause only, tucked into the corner
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
      // Timeline: pause only, tucked into the corner (same as Decipher)
      { hideSettings: true, top: 6, right: 12 }
    );
  }

  // Tracing games (Blood Trace / Oath Trace): instructions screen first,
  // pause button only while tracing.
  if (current?.type === "bloodtrace" || current?.type === "oathtrace") {
    const TraceGame = current.type === "bloodtrace" ? BloodTrace : OathTrace;
    return withMinigameOverlay(
      <TraceGame
        key={`trace-${chapterNumber}-${partNumber}-${sceneIdx}`}
        paused={paused}
        onPhaseChange={setMinigamePhase}
        onComplete={goNext}
      />,
      // Tracing: pause button only (no settings button at the top right)
      { hideSettings: true }
    );
  }

  // Who Said It has its own built-in pause button (see WhoSaidItMinigame.js)
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
    return withOverlay(
      <View style={styles.container}>
        <Text style={scaled(styles.dialogueText)}>Part {partNumber} complete!</Text>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => {
            game.setScene(0);
            if (isLastPart) {
              props.onChapterComplete?.(chapterNumber + 1);
            } else {
              props.onPartComplete?.(partNumber + 1);
            }
          }}
        >
          <Text style={styles.nextButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (current.type === "chapterIntro") {
    return withOverlay(
      <ImageBackground source={current.background} style={styles.chapterIntroScreen} resizeMode="cover">
        <Animated.Image
          source={current.titleImage}
          resizeMode="contain"
          style={[styles.chapterIntroTitle, { opacity: chapterTitleOpacity }]}
        />
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
            <TypedText style={scaled(styles.introText)} full={lineText} shown={shown} />
          </View>
        </ImageBackground>
        {nextIntro && (
          <Animated.View pointerEvents="none" style={[styles.introNextLayer, { opacity: introProgress }]}>
            <ImageBackground source={nextIntro.background} style={styles.introBackground} resizeMode="cover">
              <View style={styles.introTextBox}>
                <TypedText style={scaled(styles.introText)} full={nextIntro.text} shown="" />
              </View>
            </ImageBackground>
          </Animated.View>
        )}
        <TouchableOpacity style={styles.introTouchable} activeOpacity={1} onPress={() => { playSfx("dialogueClick"); advance(); }} />
      </View>
    );
  }

  // =====================================================
  // QUIZ SECTION - FIXED AND CLEANED UP
  // =====================================================
  if (current.type === "quiz") {
    const isAnswered = quizAnswer !== null;
    const isCorrect = quizAnswer === current.correctIndex;

    const handleQuizSelect = (index) => {
      if (isAnswered) return; // Prevent double clicking
      
      setQuizAnswer(index);
      playSfx(index === current.correctIndex ? "correct" : "wrong");

      if (index === current.correctIndex) {
        // Check if the quiz has an unlock array (e.g., ["remnant-part1-1"])
        if (current.unlock && current.unlock.length > 0) {
          unlock(current.unlock);
          
          // Find the specific remnant ID to show the popup image
          const remnantId = current.unlock.find(id => id.startsWith('remnant-part'));
          if (remnantId) {
            const parts = remnantId.split('-');
            const partNum = parseInt(parts[1].replace('part', ''), 10);
            const pieceNum = parseInt(parts[2], 10);
            
            if (REMNANT_DATA[partNum] && REMNANT_DATA[partNum].pieces[pieceNum - 1]) {
              setRewardImage(REMNANT_DATA[partNum].pieces[pieceNum - 1]);
              setShowRewardPopup(true);
            }
          }
        }
      }
    };

    return withOverlay(
      <View style={[styles.choiceScreen, styles.quizBackground]}>
        <View style={styles.choiceParchmentWrapper}>
          <ImageBackground source={require("../../assets/foreground/quizzing_box.png")} style={styles.choiceParchmentBox} imageStyle={boxImage} resizeMode="stretch">
            <Text style={scaled(styles.choiceQuestion)}>{current.question}</Text>
            {isAnswered && (
              <Text style={scaled(isCorrect ? styles.quizCorrectPrompt : styles.quizIncorrectPrompt)}>
                {isCorrect ? "Correct!" : "Not quite..."}
              </Text>
            )}
          </ImageBackground>
        </View>
        
        <View style={styles.quizButtonsGrid}>
          {current.options.map((option, index) => (
            <AnimatedQuizButton key={index} style={styles.quizImageButton} onPress={() => handleQuizSelect(index)}>
              <ImageBackground source={require("../../assets/buttons/choice_button.png")} style={styles.quizImageButtonBg} resizeMode="stretch">
                <Text style={scaled(styles.quizButtonText)}>{option}</Text>
              </ImageBackground>
            </AnimatedQuizButton>
          ))}
        </View>
        
        {isAnswered && <AnimatedNextButton onPress={goNext} />}

        {/* REMNANT CONGRATULATIONS POPUP */}
        {showRewardPopup && (
          <View style={styles.rewardPopupOverlay}>
            <View style={styles.rewardPopupBox}>
              <Text style={styles.rewardTitle}>CONGRATULATIONS!</Text>
              <Text style={styles.rewardSubtitle}>You received a Remnant piece!</Text>
              {rewardImage && (
                <Image source={rewardImage} style={styles.rewardImage} resizeMode="contain" />
              )}
              <TouchableOpacity style={styles.rewardButton} onPress={() => setShowRewardPopup(false)}>
                <Text style={styles.rewardButtonText}>CLAIM</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
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
      return withOverlay(<ImageBackground source={current.background} style={styles.systemScreen} resizeMode="cover">{systemContent}</ImageBackground>);
    }
    return withOverlay(<View style={styles.systemScreen}>{systemContent}</View>);
  }

  if (current.type === "scene") {
    return withOverlay(
      <ImageBackground source={current.background} style={styles.sceneScreen} resizeMode="cover">
        <View style={styles.sceneDarkOverlay}>
          <View style={styles.sceneTitleBox}>
            <Text style={styles.sceneTitle}>{current.title}</Text>
            {current.date ? <Text style={styles.sceneDate}>{current.date}</Text> : null}
          </View>
        </View>
        <AnimatedNextButton onPress={goNext} />
      </ImageBackground>
    );
  }

  if (current.type === "narrator") {
    const narratorContent = (
      <>
        <CharacterLayer characters={current.characters} />
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
      return withOverlay(<ImageBackground source={current.background} style={styles.background} resizeMode="cover">{narratorContent}</ImageBackground>);
    }
    return withOverlay(<View style={styles.background}>{narratorContent}</View>);
  }

  if (current.type === "choice") {
    if (picked === null) {
      const choiceContent = (
        <>
          <View style={styles.choiceParchmentWrapper}>
            <ImageBackground source={require("../../assets/foreground/quizzing_box.png")} style={styles.choiceParchmentBox} imageStyle={boxImage} resizeMode="stretch">
              <Text style={scaled(styles.choiceQuestion)}>{current.question}</Text>
              <Text style={scaled(styles.choicePrompt)}>What will you choose?</Text>
            </ImageBackground>
          </View>
          <View style={styles.choiceButtonsGrid}>
            {current.choices.map((choice, index) => (
              <AnimatedChoiceButton key={index} style={styles.choiceImageButton} onPress={() => { playSfx("choose"); setPicked(index); saveDecision(index); }}>
                <ImageBackground source={require("../../assets/buttons/choice_button.png")} style={styles.choiceImageButtonBg} resizeMode="stretch">
                  <Text style={scaled(styles.choiceButtonText)}>{choice.text}</Text>
                </ImageBackground>
              </AnimatedChoiceButton>
            ))}
          </View>
        </>
      );

      if (current.background) {
        return withOverlay(<ImageBackground source={current.background} style={styles.choiceScreen} resizeMode="cover">{choiceContent}</ImageBackground>);
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
      return withOverlay(<ImageBackground source={current.background} style={styles.background} resizeMode="cover">{responseContent}</ImageBackground>);
    }
    return withOverlay(<View style={styles.background}>{responseContent}</View>);
  }

  const dialogueContent = (
    <>
      <CharacterLayer
        characters={current.characters}
        speaker={current.speaker}
        typing={!done}
      />
      <View style={styles.dialogueWrapper}>
        <ImageBackground source={require("../../assets/foreground/dialogue_box.png")} style={styles.dialogueBox} imageStyle={boxImage} resizeMode="stretch">
          <Text style={scaled(styles.speakerName)}>{current.speaker}</Text>
          <TypedText style={scaled(styles.dialogueText)} full={lineText} shown={shown} />
          {current.translation ? <Text style={scaled(styles.dialogueTranslation)}>{current.translation}</Text> : null}
        </ImageBackground>
      </View>
      <AnimatedNextButton onPress={advance} />
    </>
  );

  if (current.background) {
    return withOverlay(<ImageBackground source={current.background} style={styles.background} resizeMode="cover">{dialogueContent}</ImageBackground>);
  }
  return withOverlay(<View style={styles.background}>{dialogueContent}</View>);
}

// =====================================================
// SCREEN EXPORTS
// =====================================================
export function Chap1Part1Screen({ navigation, ...props }) {
  return <PartRenderer sceneData={Chapter1.part1} chapterNumber={1} partNumber={1} isLastPart={false} onPartComplete={() => navigation.navigate("Part2")} navigation={navigation} {...props} />;
}

export function Chap1Part2Screen({ navigation, ...props }) {
  return <PartRenderer sceneData={Chapter1.part2} chapterNumber={1} partNumber={2} isLastPart={false} onPartComplete={() => navigation.navigate("Part3")} navigation={navigation} {...props} />;
}

export function Chap1Part3Screen({ navigation, ...props }) {
  return <PartRenderer sceneData={Chapter1.part3} chapterNumber={1} partNumber={3} isLastPart={false} onPartComplete={() => navigation.navigate("Part4")} navigation={navigation} {...props} />;
}

export function Chap1Part4Screen({ navigation, ...props }) {
  return <PartRenderer sceneData={Chapter1.part4} chapterNumber={1} partNumber={4} isLastPart={false} onPartComplete={() => navigation.navigate("Part5")} navigation={navigation} {...props} />;
}

export function Chap1Part5Screen({ navigation, ...props }) {
  return <PartRenderer sceneData={Chapter1.part5} chapterNumber={1} partNumber={5} isLastPart={false} onPartComplete={() => navigation.navigate("Part6")} navigation={navigation} {...props} />;
}

export function Chap1Part6Screen({ navigation, ...props }) {
  return <PartRenderer sceneData={Chapter1.part6} chapterNumber={1} partNumber={6} isLastPart={false} onPartComplete={() => navigation.navigate("Part7")} navigation={navigation} {...props} />;
}

export function Chap1Part7Screen({ navigation, ...props }) {
  return <PartRenderer sceneData={Chapter1.part7} chapterNumber={1} partNumber={7} isLastPart={false} onPartComplete={() => navigation.navigate("Part8")} navigation={navigation} {...props} />;
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
        navigation.reset({ index: 0, routes: [{ name: "Home" }] });
      }}
      navigation={navigation}
      {...props}
    />
  );
}

// =====================================================
// STYLES
// =====================================================
const styles = StyleSheet.create({
  opacityZero: { opacity: 0 },
  quizBackground: { backgroundColor: "#fffca0" },
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
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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
    borderRadius: 0,
  },
  introText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 17,
    lineHeight: 24,
  },
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
  narratorWrapper: {
    position: "absolute",
    left: 20,
    right: 5,
    bottom: 5,
    zIndex: 20,
  },
  narratorBox: {
    width: "100%",
    minHeight: 160,
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
    left: "2%",
  },
  characterRight: {
    right: "2%",
  },
  characterCenter: {
    left: "30%",
  },
  dialogueWrapper: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 5,
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
  choiceScreen: {
    flex: 1,
    backgroundColor: "#fafafa",
    justifyContent: "center",
  },
  choiceParchmentWrapper: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  choiceParchmentBox: {
    width: "100%",
    minHeight: 180,
    justifyContent: "center",
    padding: 30,
  },
  choiceQuestion: {
    color: "#fdfdfd",
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
    paddingHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "stretch",
    gap: 12,
    transform: [{ translateX: -15 }],
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
  quizButtonsGrid: {
    paddingHorizontal: 15,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  quizImageButton: {
    width: "47%",
  },
  quizImageButtonBg: {
    width: "100%",
    minHeight: 65,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  quizButtonText: {
    color: "#371f10",
    fontSize: 15,
    lineHeight: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  quizCorrectPrompt: {
    color: "#218838",
    fontSize: 16,
    textAlign: "center",
    marginTop: 15,
    fontWeight: "bold",
  },
  quizIncorrectPrompt: {
    color: "#dc3545",
    fontSize: 16,
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

  // =====================================================
  // REMNANT REWARD POPUP STYLES
  // =====================================================
  rewardPopupOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    elevation: 999, // Required for Android z-index
  },
  rewardPopupBox: {
    backgroundColor: '#F4E4C8',
    padding: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#A87C5E',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',       // Widened to fit the bigger image
    maxWidth: 450,      // Increased max width
  },
  rewardTitle: {
    fontSize: 24,
    fontFamily: 'serif',
    fontWeight: 'bold',
    color: '#5A4A32',
    marginBottom: 8,
    textAlign: 'center',
  },
  rewardSubtitle: {
    fontSize: 15,
    fontFamily: 'serif',
    color: '#5A4A32',
    marginBottom: 20,
    textAlign: 'center',
  },
  rewardImage: {
    width: 150,
    height: 150, 
    marginBottom: 25,
  },
  rewardButton: {
    backgroundColor: '#A87C5E',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#5A4A32',
  },
  rewardButtonText: {
    color: '#FFF',
    fontFamily: 'serif',
    fontWeight: 'bold',
    fontSize: 18,
  },
});