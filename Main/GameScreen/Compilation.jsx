import React, { useState, useEffect, useRef, useCallback } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Animated,
  StyleSheet,
} from "react-native";

import { useGameProgress } from "../../GameProgress";
import { useAudio } from "../../Audiostore";
import { useGameplaySettings } from "../Others/GameplaySetting";
import { useDisplaySettings, FONT_SCALE } from "../Others/DisplaySetting";
import { saveCheckpoint, markPartReached } from "../Others/saveProgress";
import { Chapter1 } from "./StoryScreen/Chapter1";
import { useJournal } from "../../Main/Others/JournalContext";

// =====================================================
// MINIGAMES
// =====================================================
import VoyageMinigame from "./Minigames/VoyageMinigame";
import SantoNinoMinigame from "./Minigames/SantoNinoMinigame";
import CedulaMinigame from "./Minigames/CedulaMinigame";
import DecipherMinigame from "./Minigames/DecipherMinigame";
import CharacterMatchingMinigame from "./Minigames/CharacterMatchingMinigame";
import ChronologicalOrderMinigame from "./Minigames/ChronologicalOrderMinigame";
import WhoSaidItMinigame from "./Minigames/WhoSaidItMinigame";
import TimelineSort from "./Minigames/Timelinesort";
import { BloodTrace, OathTrace } from "./Minigames/TracingMinigame";

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
// CHAPTER COMPLETE SCREEN
// Shows the background first, then pops in the title.
// =====================================================
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
          {
            opacity: titleOpacity,
            transform: [{ scale: titleScale }],
          },
        ]}
      />

      <AnimatedNextButton onPress={onContinue} />
    </ImageBackground>
  );
}

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
          onPress?.();
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

function AnimatedImageButton({
  normalSource,
  pressedSource,
  onPress,
  style,
  imageStyle,
}) {
  const [pressed, setPressed] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const animate = (isPressed) => {
    setPressed(isPressed);

    Animated.parallel([
      Animated.spring(scale, {
        toValue: isPressed ? 0.9 : 1,
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

const MINIGAMES = {
  voyage: VoyageMinigame,
  santoNino: SantoNinoMinigame,
  sortingtimeline: TimelineSort,
  bloodtrace: BloodTrace,
  oathtrace: OathTrace,
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
    if (!length) return undefined;

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
// CHARACTER LAYER
// =====================================================
function CharacterLayer({ characters }) {
  if (!characters || characters.length === 0) return null;

  return (
    <View style={styles.characterLayer} pointerEvents="none">
      {characters.map((char, index) => {
        if (!char?.source) return null;

        const isLeft = char.position === "left";
        const isCenter = char.position === "center";

        return (
          <Image
            key={`${char.name || "character"}-${index}`}
            source={char.source}
            resizeMode="contain"
            style={[
              styles.characterImage,
              isLeft
                ? styles.characterLeft
                : isCenter
                  ? styles.characterCenter
                  : styles.characterRight,
            ]}
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
  const {
    sceneData,
    chapterNumber,
    partNumber,
    isLastPart,
    navigation,
  } = props;

  const game = useGameProgress();
  const { playMusic, stopLoops, playSfx } = useAudio();
  const settings = useGameplaySettings();
  const display = useDisplaySettings();
  const { unlock } = useJournal();

  const fontScale = FONT_SCALE[display?.fontSize] ?? 1;

  const boxImage = {
    opacity: display?.boxOpacity ?? 1,
  };

  const scaled = (style) => {
    const s = StyleSheet.flatten(style) || {};

    return {
      ...s,
      ...(s.fontSize
        ? { fontSize: Math.round(s.fontSize * fontScale) }
        : {}),
      ...(s.lineHeight
        ? { lineHeight: Math.round(s.lineHeight * fontScale) }
        : {}),
    };
  };

  const startIdx = props.route?.params?.startScene ?? game.scene;

  const [sceneIdx, setSceneIdx] = useState(startIdx);
  const [picked, setPicked] = useState(null);
  const [quizAnswer, setQuizAnswer] = useState(null);

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

  const startScene = props.route?.params?.startScene;
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
  const isMinigame = current ? MINIGAME_TYPES.has(current.type) : false;

  useEffect(() => {
    if (!hasMoreScenes && !isLastPart) markPartReached(partNumber + 1);
  }, [hasMoreScenes, isLastPart, partNumber]);

  // Unlock journal entries when their scene becomes current.
  useEffect(() => {
    if (current?.unlock) {
      unlock(current.unlock);
    }
  }, [current, unlock]);

  // Music
  useEffect(() => {
    const track = getMusicFor(sceneData, sceneIdx);
    if (track) playMusic(track);
  }, [sceneIdx, sceneData, playMusic]);

  // Scene sound effects
  useEffect(() => {
    const scene = sceneData[sceneIdx];
    if (!scene) return;

    if (scene.stopSfx) stopLoops();

    [].concat(scene.sfx ?? []).forEach((key) => playSfx(key));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneIdx, sceneData]);

  // Chapter title animation
  useEffect(() => {
    if (current?.type !== "chapterIntro") return undefined;

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

    return () => animation.stop();
  }, [sceneIdx, current?.type, chapterTitleOpacity]);

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

  // Save checkpoints on scene screens.
  useEffect(() => {
    if (!current || current.type !== "scene") return;
    if (sceneIdx === sceneData.length - 1) return;

    saveCheckpoint({
      chap: chapterNumber,
      part: partNumber,
      sceneIdx,
      ...getSceneInfo(sceneIdx),
    });
  }, [
    sceneIdx,
    current,
    chapterNumber,
    partNumber,
    sceneData.length,
    getSceneInfo,
  ]);

  const saveDecision = (choiceIndex) => {
    if (!current || current.type !== "choice") return;

    const decNum =
      current.title?.match(/Choice (\d+\.\d+)/)?.[1] ?? null;

    const resumeIdx =
      typeof current.nextScene === "number"
        ? current.nextScene
        : sceneIdx + 1;

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
    if (
      typeof index !== "number" ||
      index < 0 ||
      index >= sceneData.length
    ) {
      return;
    }

    setPicked(null);
    setQuizAnswer(null);
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

    if (
      !nextScene ||
      nextScene.type !== "system" ||
      nextScene.intro !== true
    ) {
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

  const advance = () => (done ? next() : skip());

  // Auto Play never skips minigames or quizzes.
  useEffect(() => {
    if (!settings?.autoPlay || !done || !current) return undefined;
    if (isMinigame) return undefined;
    if (current.type === "quiz") return undefined;
    if (current.type === "choice" && picked === null) return undefined;

    const id = setTimeout(next, settings.autoDelay * 1000);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    sceneIdx,
    picked,
    done,
    settings?.autoPlay,
    settings?.autoDelay,
    current,
    isMinigame,
  ]);

  // =====================================================
  // MINIGAMES
  // =====================================================
  if (current?.type === "voyage") {
    return <VoyageMinigame onComplete={goNext} />;
  }

  if (current?.type === "santoNino") {
    return <SantoNinoMinigame onComplete={goNext} />;
  }

  if (current?.type === "cedula") {
    return (
      <CedulaMinigame
        key={`cedula-${sceneIdx}`}
        onComplete={goNext}
      />
    );
  }

  if (current?.type === "decipher") {
    return (
      <DecipherMinigame
        key={`decipher-${chapterNumber}-${partNumber}-${sceneIdx}`}
        onComplete={goNext}
      />
    );
  }

  if (current?.type === "matching") {
    return (
      <CharacterMatchingMinigame
        key={`matching-${chapterNumber}-${partNumber}-${sceneIdx}`}
        characters={current.characters}
        onComplete={goNext}
      />
    );
  }

  if (current?.type === "chronological") {
    return (
      <ChronologicalOrderMinigame
        key={`chronological-${chapterNumber}-${partNumber}-${sceneIdx}`}
        events={current.events}
        onComplete={goNext}
      />
    );
  }

  if (current?.type === "whoSaidIt") {
    return (
      <WhoSaidItMinigame
        key={`who-said-it-${chapterNumber}-${partNumber}-${sceneIdx}`}
        onComplete={(results) => {
          console.log("Who Said It results:", results);
          goNext();
        }}
      />
    );
  }

  const Minigame = current ? MINIGAMES[current.type] : null;
  if (Minigame) return <Minigame onComplete={goNext} />;

  const withOverlay = (node) => (
    <>
      {node}
      <GameplayMenuOverlay navigation={navigation} />
    </>
  );

  // =====================================================
  // PART COMPLETE
  // =====================================================
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

  // =====================================================
  // CHAPTER INTRO
  // =====================================================
  if (current.type === "chapterIntro") {
    return withOverlay(
      <ImageBackground
        source={current.background}
        style={styles.chapterIntroScreen}
        resizeMode="cover"
      >
        <Animated.Image
          source={current.titleImage}
          resizeMode="contain"
          style={[
            styles.chapterIntroTitle,
            { opacity: chapterTitleOpacity },
          ]}
        />
        <AnimatedNextButton onPress={goNext} />
      </ImageBackground>
    );
  }

  // =====================================================
  // SYSTEM INTRO
  // =====================================================
  if (current.type === "system" && current.intro === true) {
    const nextIntro =
      introNextIndex !== null ? sceneData[introNextIndex] : null;

    return withOverlay(
      <View style={styles.introScreen}>
        <ImageBackground
          source={current.background}
          style={styles.introBackground}
          resizeMode="cover"
        >
          <View style={styles.introTextBox}>
            <TypedText
              style={scaled(styles.introText)}
              full={lineText}
              shown={shown}
            />
          </View>
        </ImageBackground>

        {nextIntro && (
          <Animated.View
            pointerEvents="none"
            style={[
              styles.introNextLayer,
              { opacity: introProgress },
            ]}
          >
            <ImageBackground
              source={nextIntro.background}
              style={styles.introBackground}
              resizeMode="cover"
            >
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

  // =====================================================
  // QUIZ
  // =====================================================
  if (current.type === "quiz") {
    const isAnswered = quizAnswer !== null;
    const isCorrect = quizAnswer === current.correctIndex;

    return withOverlay(
      <View style={[styles.choiceScreen, styles.quizBackground]}>
        <View style={styles.choiceParchmentWrapper}>
          <ImageBackground
            source={require("../../assets/foreground/quizzing_box.png")}
            style={styles.choiceParchmentBox}
            imageStyle={boxImage}
            resizeMode="stretch"
          >
            <Text style={scaled(styles.choiceQuestion)}>
              {current.question}
            </Text>

            {isAnswered && (
              <Text
                style={scaled(
                  isCorrect
                    ? styles.quizCorrectPrompt
                    : styles.quizIncorrectPrompt
                )}
              >
                {isCorrect ? "Correct!" : "Not quite..."}
              </Text>
            )}
          </ImageBackground>
        </View>

        <View style={styles.quizButtonsGrid}>
          {current.options.map((option, index) => (
            <AnimatedQuizButton
              key={index}
              style={styles.quizImageButton}
              onPress={() => {
                if (isAnswered) return;

                setQuizAnswer(index);
                playSfx(index === current.correctIndex ? "correct" : "wrong");
              }}
            >
              <ImageBackground
                source={require("../../assets/buttons/choice_button.png")}
                style={styles.quizImageButtonBg}
                resizeMode="stretch"
              >
                <Text style={scaled(styles.quizButtonText)}>
                  {option}
                </Text>
              </ImageBackground>
            </AnimatedQuizButton>
          ))}
        </View>

        {isAnswered && <AnimatedNextButton onPress={goNext} />}
      </View>
    );
  }

  // =====================================================
  // SYSTEM NARRATION
  // =====================================================
  if (current.type === "system") {
    const systemContent = (
      <>
        <View style={styles.systemParchmentWrapper}>
          <ImageBackground
            source={require("../../assets/foreground/narration_box.png")}
            style={styles.systemParchmentBox}
            imageStyle={boxImage}
            resizeMode="stretch"
          >
            <TypedText
              style={scaled(styles.systemText)}
              full={lineText}
              shown={shown}
            />
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

    return withOverlay(
      <View style={styles.systemScreen}>{systemContent}</View>
    );
  }

  // =====================================================
  // SCENE TITLE
  // =====================================================
  if (current.type === "scene") {
    return withOverlay(
      <ImageBackground
        source={current.background}
        style={styles.sceneScreen}
        resizeMode="cover"
      >
        <View style={styles.sceneDarkOverlay}>
          <View style={styles.sceneTitleBox}>
            <Text style={styles.sceneTitle}>{current.title}</Text>
            {current.date ? (
              <Text style={styles.sceneDate}>{current.date}</Text>
            ) : null}
          </View>
        </View>

        <AnimatedNextButton onPress={goNext} />
      </ImageBackground>
    );
  }

  // =====================================================
  // NARRATOR
  // =====================================================
  if (current.type === "narrator") {
    const narratorContent = (
      <>
        <CharacterLayer characters={current.characters} />

        <View style={styles.narratorWrapper}>
          <ImageBackground
            source={require("../../assets/foreground/narration_box.png")}
            style={styles.narratorBox}
            imageStyle={boxImage}
            resizeMode="stretch"
          >
            <Text style={scaled(styles.narratorLabel)}>Narrator:</Text>
            <TypedText
              style={scaled(styles.narratorText)}
              full={lineText}
              shown={shown}
            />
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

    return withOverlay(
      <View style={styles.background}>{narratorContent}</View>
    );
  }

  // =====================================================
  // CHOICES
  // =====================================================
  if (current.type === "choice") {
    if (picked === null) {
      const choiceContent = (
        <>
          <View style={styles.choiceParchmentWrapper}>
            <ImageBackground
              source={require("../../assets/foreground/quizzing_box.png")}
              style={styles.choiceParchmentBox}
              imageStyle={boxImage}
              resizeMode="stretch"
            >
              <Text style={scaled(styles.choiceQuestion)}>
                {current.question}
              </Text>
              <Text style={scaled(styles.choicePrompt)}>
                What will you choose?
              </Text>
            </ImageBackground>
          </View>

          <View style={styles.choiceButtonsGrid}>
            {current.choices.map((choice, index) => (
              <AnimatedChoiceButton
                key={index}
                style={styles.choiceImageButton}
                onPress={() => {
                  playSfx("choose");
                  setPicked(index);
                  saveDecision(index);
                }}
              >
                <ImageBackground
                  source={require("../../assets/buttons/choice_button.png")}
                  style={styles.choiceImageButtonBg}
                  resizeMode="stretch"
                >
                  <Text style={scaled(styles.choiceButtonText)}>
                    {choice.text}
                  </Text>
                </ImageBackground>
              </AnimatedChoiceButton>
            ))}
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

      return withOverlay(
        <View style={styles.choiceScreen}>{choiceContent}</View>
      );
    }

    const selectedChoice = current.choices[picked];

    const responseContent = (
      <>
        <CharacterLayer characters={selectedChoice.characters} />

        <View style={styles.dialogueWrapper}>
          <ImageBackground
            source={require("../../assets/foreground/dialogue_box.png")}
            style={styles.dialogueBox}
            imageStyle={boxImage}
            resizeMode="stretch"
          >
            <Text style={scaled(styles.speakerName)}>
              {selectedChoice.speaker}
            </Text>

            <TypedText
              style={scaled(styles.dialogueText)}
              full={lineText}
              shown={shown}
            />

            {selectedChoice.translation ? (
              <Text style={scaled(styles.dialogueTranslation)}>
                {selectedChoice.translation}
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
          {responseContent}
        </ImageBackground>
      );
    }

    return withOverlay(
      <View style={styles.background}>{responseContent}</View>
    );
  }

  // =====================================================
  // STANDARD DIALOGUE
  // =====================================================
  const dialogueContent = (
    <>
      <CharacterLayer characters={current.characters} />

      <View style={styles.dialogueWrapper}>
        <ImageBackground
          source={require("../../assets/foreground/dialogue_box.png")}
          style={styles.dialogueBox}
          imageStyle={boxImage}
          resizeMode="stretch"
        >
          <Text style={scaled(styles.speakerName)}>{current.speaker}</Text>

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

  return withOverlay(
    <View style={styles.background}>{dialogueContent}</View>
  );
}

// =====================================================
// PART SELECT HAND-OFF
// =====================================================
const PART_SELECT_ROUTE = "PartSelect";

const goToUnlockSequence = (navigation, completedPart) => {
  const params = {
    unlockSequence: {
      completedPart,
      token: Date.now(),
    },
  };

  if (typeof navigation.popTo === "function") {
    navigation.popTo(PART_SELECT_ROUTE, params);
  } else {
    navigation.navigate(PART_SELECT_ROUTE, params);
  }
};

// =====================================================
// SCREEN EXPORTS
// =====================================================
export function Chap1Part1Screen({ navigation, ...props }) {
  return (
    <PartRenderer
      sceneData={Chapter1.part1}
      chapterNumber={1}
      partNumber={1}
      isLastPart={false}
      onPartComplete={() => goToUnlockSequence(navigation, 1)}
      navigation={navigation}
      {...props}
    />
  );
}

export function Chap1Part2Screen({ navigation, ...props }) {
  return (
    <PartRenderer
      sceneData={Chapter1.part2}
      chapterNumber={1}
      partNumber={2}
      isLastPart={false}
      onPartComplete={() => goToUnlockSequence(navigation, 2)}
      navigation={navigation}
      {...props}
    />
  );
}

export function Chap1Part3Screen({ navigation, ...props }) {
  return (
    <PartRenderer
      sceneData={Chapter1.part3}
      chapterNumber={1}
      partNumber={3}
      isLastPart={false}
      onPartComplete={() => goToUnlockSequence(navigation, 3)}
      navigation={navigation}
      {...props}
    />
  );
}

export function Chap1Part4Screen({ navigation, ...props }) {
  return (
    <PartRenderer
      sceneData={Chapter1.part4}
      chapterNumber={1}
      partNumber={4}
      isLastPart={false}
      onPartComplete={() => goToUnlockSequence(navigation, 4)}
      navigation={navigation}
      {...props}
    />
  );
}

export function Chap1Part5Screen({ navigation, ...props }) {
  return (
    <PartRenderer
      sceneData={Chapter1.part5}
      chapterNumber={1}
      partNumber={5}
      isLastPart={false}
      onPartComplete={() => goToUnlockSequence(navigation, 5)}
      navigation={navigation}
      {...props}
    />
  );
}

export function Chap1Part6Screen({ navigation, ...props }) {
  return (
    <PartRenderer
      sceneData={Chapter1.part6}
      chapterNumber={1}
      partNumber={6}
      isLastPart={false}
      onPartComplete={() => goToUnlockSequence(navigation, 6)}
      navigation={navigation}
      {...props}
    />
  );
}

export function Chap1Part7Screen({ navigation, ...props }) {
  return (
    <PartRenderer
      sceneData={Chapter1.part7}
      chapterNumber={1}
      partNumber={7}
      isLastPart={false}
      onPartComplete={() => goToUnlockSequence(navigation, 7)}
      navigation={navigation}
      {...props}
    />
  );
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

// =====================================================
// STYLES
// =====================================================
const styles = StyleSheet.create({
  opacityZero: {
    opacity: 0,
  },

  quizBackground: {
    backgroundColor: "#fffca0",
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
});
