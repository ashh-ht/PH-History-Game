import React, { useState, useEffect, useRef } from "react";

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
import { useAudio } from "../../Audiostore"; // adjust path if needed
import { useGameplaySettings } from "../Others/GameplaySetting";
import { useDisplaySettings, FONT_SCALE } from "../Others/DisplaySetting";
import { saveCheckpoint } from "../Others/saveProgress";
import { Chapter1 } from "./StoryScreen/Chapter1";
<<<<<<< Updated upstream

=======
import { useJournal } from "../Others/JournalContext";



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
// ANIMATED NEXT BUTTON
// =====================================================

function AnimatedNextButton({ onPress }) {
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
        {
          transform: [{ scale }, { translateY }],
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={() => animatePress(true)}
        onPressOut={() => animatePress(false)}
        onPress={onPress}
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

// =====================================================
// ANIMATED STORY CHOICE BUTTON
// =====================================================

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
      style={[
        style,
        {
          transform: [{ scale }, { translateY }],
        },
      ]}
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

// =====================================================
// ANIMATED QUIZ ANSWER BUTTON
// =====================================================

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
      style={[
        style,
        {
          transform: [{ scale }, { translateY }],
        },
      ]}
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

// =====================================================
// ANIMATED IMAGE BUTTON — MENU AND JOURNAL
// =====================================================

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
      style={[
        style,
        {
          transform: [{ scale }, { translateY }],
        },
      ]}
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
>>>>>>> Stashed changes

// Minigames that are looked up by scene type.
// (voyage and santoNino are handled by the explicit checks in PartRenderer.)
const MINIGAMES = {
  sortingtimeline: TimelineSort,
  bloodtrace: BloodTrace,
  oathtrace: OathTrace,
};

// =====================================================
// SCENE SOUND EFFECTS
// Maps a scene card's title to a key from the SFX table in Audiostore.
// Titles must match exactly (including trailing periods).
// Scenes not listed here simply play no title sound.
// =====================================================

const SCENE_SFX = {
  "Cibabao, Samar": "shipArrival",
  "Formal Claims & Island Hopping": "windyFlag",
  "The Ultimatum in Cebu": "marching",
  "The Sandugo of Manila": "footstepsGround",
  "The Voyage Continues.": "steamboat",
  "Test Your Knowledge!": "pagesFlipping",
  "Chapter Complete.": "churchBell",
};

// =====================================================
// TYPEWRITER
// =====================================================

// Milliseconds per character for each Text Speed option
const SPEED_MS = { Slow: 60, Normal: 30, Fast: 12 };

function useTypewriter(text, msPerChar, resetKey) {
  const [state, setState] = useState({ key: resetKey, count: 0 });
  const length = text ? text.length : 0;

  // If the line changed but state hasn't reset yet, show 0 characters
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

// Renders the FULL text invisibly to reserve the space,
// and puts the typed text on top.
// This stops the box from re-centering/jumping while typing.
function TypedText({ style, full, shown }) {
  return (
    <View>
      <Text style={[style, { opacity: 0 }]}>{full}</Text>
      <Text style={[style, styles.typedOverlay]}>{shown}</Text>
    </View>
  );
}

// =====================================================
// MENU
// =====================================================

function GameplayMenuOverlay({ navigation }) {
  return (
    <View style={styles.menuOverlay}>
      <TouchableOpacity onPress={() => navigation.navigate("Second")}>
        <Image
          source={require("../../assets/icons/Menu_icon.png")}
          style={styles.menuIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Journal")}>
        <Image
          source={require("../../assets/icons/journal_closed.png")}
          style={styles.menuIcon}
        />
      </TouchableOpacity>
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

        return (
          <Image
            key={`${char.name || "character"}-${index}`}
            source={char.source}
            resizeMode="contain"
            style={[
              styles.characterImage,
              isLeft ? styles.characterLeft : styles.characterRight,
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
    route,
  } = props;

  const game = useGameProgress();
<<<<<<< Updated upstream
  const { playMusic } = useAudio();
=======
  const { playMusic, playSfx, stopLoops } = useAudio();
>>>>>>> Stashed changes

  // ===================================================
  // GAMEPLAY / DISPLAY SETTINGS
  // ===================================================

  const settings = useGameplaySettings();
  const display = useDisplaySettings();
  const fontScale = FONT_SCALE[display?.fontSize] ?? 1;

  // Applied to every box image
  const boxImage = {
    opacity: display?.boxOpacity ?? 1,
  };

  // Safe scaling helper
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

  // ===================================================
  // LOAD / RESTORE PART
  // ===================================================

  // If the player restored a save, Saves screen passes startScene.
  // Otherwise fall back to normal progress.
  const startIdx = route?.params?.startScene ?? game.scene;

  const [sceneIdx, setSceneIdx] = useState(startIdx);
  const [picked, setPicked] = useState(null);
  const [quizAnswer, setQuizAnswer] = useState(null);

  // Intro crossfade
  const introProgress = useRef(new Animated.Value(1)).current;
  const [introChanging, setIntroChanging] = useState(false);
  const [introNextIndex, setIntroNextIndex] = useState(null);

  // ===================================================
  // LOAD PART
  // ===================================================

  useEffect(() => {
    game.setChapter(chapterNumber);
    game.setPart(partNumber);
    game.setInGame(true);

    console.log(`loaded ch${chapterNumber} part${partNumber}`);

    return () => {
      game.setInGame(false);
      stopLoops();
    };
  }, []);

  // If the screen is already mounted and a save is restored later,
  // useState's initial value is ignored, so jump to the new scene here.
  const startScene = route?.params?.startScene;

  useEffect(() => {
    if (startScene == null) return;

    setPicked(null);
    setQuizAnswer(null);
    setSceneIdx(startScene);
    game.setScene(startScene);
  }, [startScene]);

  // ===================================================
  // CURRENT SCENE
  // ===================================================

  const hasMoreScenes = sceneIdx < sceneData.length;
  const current = hasMoreScenes ? sceneData[sceneIdx] : null;

<<<<<<< Updated upstream
=======
  // ===================================================
  // JOURNAL UNLOCK SYSTEM
  // ===================================================

  const { unlock } = useJournal();

  useEffect(() => {
    if (current && current.unlock) {
      unlock(current.unlock);
    }
  }, [current, unlock]);

>>>>>>> Stashed changes
  // ===================================================
  // MUSIC
  // ===================================================

  // Finds the most recent track set at or before idx,
  // so restoring a save mid-part still plays the right music.
  // Accepts both `music` and `Music` keys.
  const getMusicFor = (idx) => {
    for (let i = Math.min(idx, sceneData.length - 1); i >= 0; i--) {
      const m = sceneData[i].music ?? sceneData[i].Music;
      if (m) return m;
    }
    return null;
  };

  useEffect(() => {
    const track = getMusicFor(sceneIdx);
    if (track) playMusic(track);
  }, [sceneIdx]);

<<<<<<< Updated upstream
=======
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
  }, [sceneIdx]);

  // ===================================================
  // SCENE SOUND EFFECTS
  // ===================================================

  useEffect(() => {
    if (!current) return;

    if (current.type === "scene") {
      stopLoops(); // end war / oil lamp from the previous scene
      const key = SCENE_SFX[current.title];
      if (key) playSfx(key);
    }

    if (current.sfx) playSfx(current.sfx);

    // "choose" sound when the A/B screen appears
    if (current.type === "choice") playSfx("choose");
  }, [sceneIdx]);

>>>>>>> Stashed changes
  // ===================================================
  // SAVE HELPERS
  // ===================================================

  // Counts how many "scene" title cards exist up to idx,
  // and returns the latest scene's title.
  const getSceneInfo = (idx) => {
    let sceneNumber = 0;
    let sceneTitle = "";

    for (let i = 0; i <= idx && i < sceneData.length; i++) {
      if (sceneData[i].type === "scene") {
        sceneNumber += 1;
        sceneTitle = sceneData[i].title;
      }
    }

    return { sceneNumber, sceneTitle };
  };

  // AUTOSAVE #1:
  // whenever a scene title card appears
  // skips the very last card
  useEffect(() => {
    if (!current || current.type !== "scene") return;
    if (sceneIdx === sceneData.length - 1) return;

    saveCheckpoint({
      chap: chapterNumber,
      part: partNumber,
      sceneIdx,
      ...getSceneInfo(sceneIdx),
    });
  }, [sceneIdx]);

  // AUTOSAVE #2:
  // right after the player makes a decision.
  // Saves at nextScene so restoring resumes AFTER the choice.
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

  // ===================================================
  // NORMAL SCENE CHANGE
  // ===================================================

  const goToIndex = (index) => {
    // Reject undefined / invalid values
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

  // ===================================================
  // INTRO CROSSFADE
  // ===================================================

  const goToNextIntro = () => {
    if (introChanging) {
      return;
    }

    const nextIndex = sceneIdx + 1;

    if (nextIndex < 0 || nextIndex >= sceneData.length) {
      return;
    }

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

  // ===================================================
  // GAMEPLAY SETTINGS
  // TEXT SPEED + AUTO PLAY
  //
  // IMPORTANT:
  // These hooks must stay above every early return.
  // ===================================================

  // Minigames handle their own flow, so they are never typed
  // and never auto-advanced. Any type listed in MINIGAMES
  // (at the top of this file) counts as a minigame.
  const isMinigame = Boolean(current && MINIGAMES[current.type]);

  // Only dialogue, narrator, system messages and
  // choice responses are typed.
  // Scene cards, quizzes, minigames and intro screens show instantly.
  const isTyped =
    current &&
    !isMinigame &&
    current.type !== "scene" &&
    current.type !== "quiz" &&
    !(current.type === "system" && current.intro === true);

  let lineText = null;

  if (isTyped) {
    if (current.type === "choice") {
      lineText =
        picked !== null
          ? current.choices[picked].dialogue
          : null;
    } else {
      lineText = current.text;
    }
  }

  const { shown, done, skip } = useTypewriter(
    lineText,
    SPEED_MS[settings?.textSpeed] ?? 30,
    `${sceneIdx}-${picked}`
  );

  // What "next" means on the current screen
  const next = () => {
    if (!current) return;

    // If a choice has no nextScene,
    // just go to the next index.
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

<<<<<<< Updated upstream
  // First tap finishes the line,
  // second tap moves on.
  const advance = () => (done ? next() : skip());
=======
  const advance = () => {
    if (done) {
      playSfx("dialogueClick");
      next();
    } else {
      skip();
    }
  };
>>>>>>> Stashed changes

  // ===================================================
  // AUTO PLAY
  // ===================================================

  useEffect(() => {
    if (!settings?.autoPlay || !done || !current) return;

<<<<<<< Updated upstream
    // Player must answer quizzes / finish minigames manually
    if (current.type === "quiz" || isMinigame) return;

    // Player must choose before choice response
=======
    if (MANUAL_TYPES.has(current.type)) return;
>>>>>>> Stashed changes
    if (current.type === "choice" && picked === null) return;

    const id = setTimeout(
      next,
      settings.autoDelay * 1000
    );

    return () => clearTimeout(id);
  }, [
    sceneIdx,
    picked,
    done,
    isMinigame,
    settings?.autoPlay,
    settings?.autoDelay,
  ]);

  // ===================================================
  // MINIGAMES
  //
  // This return is AFTER ALL HOOKS above.
  // This avoids the React "Rendered fewer hooks"
  // problem.
  // ===================================================

  const Minigame = current ? MINIGAMES[current.type] : null;

  if (Minigame) {
    return <Minigame onComplete={goNext} />;
  }

  // ===================================================
  // MENU OVERLAY
  // ===================================================

  const withOverlay = (node) => {
    return (
      <>
        {node}
        <GameplayMenuOverlay navigation={navigation} />
      </>
    );
  };

  // ===================================================
  // PART COMPLETE
  // ===================================================

  if (!hasMoreScenes) {
    return withOverlay(
      <View style={styles.container}>
        <Text style={scaled(styles.dialogueText)}>
          Part {partNumber} complete!
        </Text>

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
          <Text style={styles.nextButtonText}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ===================================================
<<<<<<< Updated upstream
=======
  // CHAPTER TITLE INTRO
  // ===================================================

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
            {
              opacity: chapterTitleOpacity,
            },
          ]}
        />

        <AnimatedNextButton onPress={goNext} />
      </ImageBackground>
    );
  }

  // ===================================================
>>>>>>> Stashed changes
  // INTRO SCREENS
  // ===================================================

  if (current.type === "system" && current.intro === true) {
    const nextIntro =
      introNextIndex !== null
        ? sceneData[introNextIndex]
        : null;

    return withOverlay(
      <View style={styles.introScreen}>
        {/* CURRENT INTRO */}
        <ImageBackground
          source={current.background}
          style={styles.introBackground}
          resizeMode="cover"
        >
          <View style={styles.introTextBox}>
            <Text style={scaled(styles.introText)}>
              {current.text}
            </Text>
          </View>
        </ImageBackground>

        {/* NEXT INTRO FADES OVER CURRENT */}
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
                <Text style={scaled(styles.introText)}>
                  {nextIntro.text}
                </Text>
              </View>
            </ImageBackground>
          </Animated.View>
        )}

        {/* TAP ANYWHERE */}
        <TouchableOpacity
          style={styles.introTouchable}
          activeOpacity={1}
          onPress={goToNextIntro}
        />
      </View>
    );
  }

  // ===================================================
  // QUIZ
  // ===================================================

  if (current.type === "quiz") {
    const isAnswered = quizAnswer !== null;
    const isCorrect =
      quizAnswer === current.correctIndex;

    return withOverlay(
      <View
        style={[
          styles.choiceScreen,
          { backgroundColor: "#fffca0" },
        ]}
      >
        <View style={styles.choiceParchmentWrapper}>
          <ImageBackground
            source={require("../../assets/foreground/narration_box.png")}
            style={styles.choiceParchmentBox}
            imageStyle={boxImage}
            resizeMode="stretch"
          >
            <Text style={scaled(styles.choiceQuestion)}>
              {current.question}
            </Text>

            {isAnswered && (
              <Text style={scaled(styles.choicePrompt)}>
                {isCorrect
                  ? "Correct!"
                  : "Not quite..."}
              </Text>
            )}
          </ImageBackground>
        </View>

        {/* QUIZ ANSWERS */}
        <View style={styles.quizButtonsGrid}>
          {current.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.quizImageButton}
              onPress={() => {
                if (!isAnswered) {
                  setQuizAnswer(index);
                  playSfx(index === current.correctIndex ? "correct" : "wrong");
                }
              }}
              activeOpacity={0.85}
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
            </TouchableOpacity>
          ))}
        </View>

        {isAnswered && (
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={goNext}
          >
            <Image
              source={require("../../assets/icons/arrow_next.png")}
              style={styles.arrowImage}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }

  // ===================================================
  // SYSTEM MESSAGE
  // ===================================================

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

        <TouchableOpacity
          style={styles.arrowButton}
          onPress={advance}
        >
          <Image
            source={require("../../assets/icons/arrow_next.png")}
            style={styles.arrowImage}
          />
        </TouchableOpacity>
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
      <View style={styles.systemScreen}>
        {systemContent}
      </View>
    );
  }

  // ===================================================
  // SCENE TITLE
  // ===================================================

  if (current.type === "scene") {
    return withOverlay(
      <ImageBackground
        source={current.background}
        style={styles.sceneScreen}
        resizeMode="cover"
      >
        <View style={styles.sceneDarkOverlay}>
          <View style={styles.sceneTitleBox}>
            <Text style={styles.sceneTitle}>
              {current.title}
            </Text>

            {current.date ? (
              <Text style={styles.sceneDate}>
                {current.date}
              </Text>
            ) : null}
          </View>
        </View>

        <TouchableOpacity
          style={styles.arrowButton}
          onPress={goNext}
          activeOpacity={0.8}
        >
          <Image
            source={require("../../assets/icons/arrow_next.png")}
            style={styles.arrowImage}
          />
        </TouchableOpacity>
      </ImageBackground>
    );
  }

  // ===================================================
  // NARRATOR
  // ===================================================

  if (current.type === "narrator") {
    const narratorContent = (
      <>
        <CharacterLayer
          characters={current.characters}
        />

        <View style={styles.narratorWrapper}>
          <ImageBackground
            source={require("../../assets/foreground/narration_box.png")}
            style={styles.narratorBox}
            imageStyle={boxImage}
            resizeMode="stretch"
          >
            <Text style={scaled(styles.narratorLabel)}>
              Narrator:
            </Text>

            <TypedText
              style={scaled(styles.narratorText)}
              full={lineText}
              shown={shown}
            />
          </ImageBackground>
        </View>

        <TouchableOpacity
          style={styles.arrowButton}
          onPress={advance}
        >
          <Image
            source={require("../../assets/icons/arrow_next.png")}
            style={styles.arrowImage}
          />
        </TouchableOpacity>
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
      <View style={styles.background}>
        {narratorContent}
      </View>
    );
  }

  // ===================================================
  // PLAYER CHOICE
  // ===================================================

  if (current.type === "choice") {
    // -------------------------------------------------
    // QUESTION SCREEN
    // -------------------------------------------------

    if (picked === null) {
      const choiceContent = (
        <>
          <View style={styles.choiceParchmentWrapper}>
            <ImageBackground
              source={require("../../assets/foreground/narration_box.png")}
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

          <View style={styles.choiceButtonsColumn}>
            {current.choices.map((choice, index) => (
              <TouchableOpacity
                key={index}
                style={styles.choiceImageButton}
                onPress={() => {
                  setPicked(index);
                  saveDecision(index);
                }}
                activeOpacity={0.85}
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
              </TouchableOpacity>
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
        <View style={styles.choiceScreen}>
          {choiceContent}
        </View>
      );
    }

    // -------------------------------------------------
    // RESPONSE SCREEN
    // -------------------------------------------------

    const selectedChoice = current.choices[picked];

    const responseContent = (
      <>
        <CharacterLayer
          characters={selectedChoice.characters}
        />

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
              <Text
                style={scaled(styles.dialogueTranslation)}
              >
                {selectedChoice.translation}
              </Text>
            ) : null}
          </ImageBackground>
        </View>

        <TouchableOpacity
          style={styles.arrowButton}
          onPress={advance}
        >
          <Image
            source={require("../../assets/icons/arrow_next.png")}
            style={styles.arrowImage}
          />
        </TouchableOpacity>
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
      <View style={styles.background}>
        {responseContent}
      </View>
    );
  }

  // ===================================================
  // NORMAL DIALOGUE
  // ===================================================

  const dialogueContent = (
    <>
      <CharacterLayer
        characters={current.characters}
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
            <Text
              style={scaled(styles.dialogueTranslation)}
            >
              {current.translation}
            </Text>
          ) : null}
        </ImageBackground>
      </View>

      <TouchableOpacity
        style={styles.arrowButton}
        onPress={advance}
      >
        <Image
          source={require("../../assets/icons/arrow_next.png")}
          style={styles.arrowImage}
        />
      </TouchableOpacity>
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
    <View style={styles.background}>
      {dialogueContent}
    </View>
  );
}

// =====================================================
// SCREEN EXPORTS
// (`...props` includes `route`, so route.params.startScene
// reaches PartRenderer)
// =====================================================

export function Chap1Part1Screen({ navigation, ...props }) {
  return (
    <PartRenderer
      sceneData={Chapter1.part1}
      chapterNumber={1}
      partNumber={1}
      isLastPart={false}
      onPartComplete={() => navigation.navigate("Part2")}
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
      onPartComplete={() => navigation.navigate("Part3")}
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
      onPartComplete={() => navigation.navigate("Part4")}
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
      onPartComplete={() => navigation.navigate("Part5")}
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
      onPartComplete={() => navigation.navigate("Part6")}
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
      onPartComplete={() => navigation.navigate("Part7")}
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
      onPartComplete={() => navigation.navigate("Part8")}
      navigation={navigation}
      {...props}
    />
  );
}

export function Chap1Part8Screen({ navigation, ...props }) {
  return (
    <PartRenderer
      sceneData={Chapter1.part8}
      chapterNumber={1}
      partNumber={8}
      isLastPart={true}
      onChapterComplete={() =>
        navigation.navigate("PartSelect")
      }
      navigation={navigation}
      {...props}
    />
  );
}

// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({
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

  // Typed text sits on top of the invisible full-text spacer
  typedOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
  },

  // ===================================================
  // MENU
  // ===================================================

  menuOverlay: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 100,
    flexDirection: "row",
    gap: 10,
  },

  menuIcon: {
    width: 42,
    height: 42,
    resizeMode: "contain",
  },

  // ===================================================
  // INTRO
  // ===================================================

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
    bottom: 10,
    left: 30,
    right: 30,
    backgroundColor: "rgba(0, 0, 0, 0.78)",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 4,
  },

  introText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 17,
    lineHeight: 24,
  },

  // ===================================================
  // SCENE
  // ===================================================

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

  // ===================================================
  // ARROW
  // ===================================================

  arrowButton: {
    position: "absolute",
    right: 25,
    bottom: 25,
    zIndex: 50,
  },

  arrowImage: {
    width: 55,
    height: 55,
    resizeMode: "contain",
  },

  // ===================================================
  // SYSTEM
  // ===================================================

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

  // ===================================================
  // NARRATOR
  // ===================================================

  narratorWrapper: {
    position: "absolute",
    left: 20,
    right: 20,
    top: "65%",
    transform: [{ translateY: -20 }],
    zIndex: 20,
  },

  narratorBox: {
    width: "100%",
    minHeight: 150,
    justifyContent: "center",
<<<<<<< Updated upstream
    padding: 30,
=======
    paddingTop: 40,
    paddingBottom: 25,
    paddingLeft: 30,
>>>>>>> Stashed changes
  },

  narratorLabel: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    marginLeft: 25,
  },

  narratorText: {
    color: "#000000",
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },

  // ===================================================
  // CHARACTERS
  // ===================================================

  characterLayer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "65%",
    zIndex: 10,
  },

  characterImage: {
    position: "absolute",
    bottom: 0,
    width: "42%",
    height: "100%",
    resizeMode: "contain",
  },

  characterLeft: {
    left: "2%",
  },

  characterRight: {
    right: "2%",
  },

  // ===================================================
  // DIALOGUE
  // ===================================================

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
    paddingTop: 28,
    paddingBottom: 25,
<<<<<<< Updated upstream
    paddingLeft: 30,
    paddingRight: 30,
=======
    paddingLeft: 10,
>>>>>>> Stashed changes
  },

  speakerName: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    marginLeft: 35,
  },

  dialogueText: {
    color: "#000000",
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },

  dialogueTranslation: {
    color: "#555555",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    marginTop: 10,
    fontStyle: "italic",
  },

  // ===================================================
  // CHOICES
  // ===================================================

  choiceScreen: {
    flex: 1,
    backgroundColor: "#000000",
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
    color: "#000000",
    fontSize: 18,
    lineHeight: 25,
    textAlign: "center",
  },

  choicePrompt: {
    color: "#000000",
    fontSize: 16,
    textAlign: "center",
    marginTop: 15,
    fontWeight: "bold",
  },

  choiceButtonsColumn: {
    paddingHorizontal: 20,
    gap: 12,
  },

  choiceImageButton: {
    width: "100%",
  },

  choiceImageButtonBg: {
    width: "100%",
    minHeight: 65,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },

  choiceButtonText: {
    color: "#000000",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },

  // ===================================================
  // QUIZ CHOICES
  // ===================================================

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
    color: "#000000",
    fontSize: 15,
    lineHeight: 20,
    textAlign: "center",
    fontWeight: "bold",
  },

  // ===================================================
  // COMPLETE
  // ===================================================

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
});