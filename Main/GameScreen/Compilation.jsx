import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ImageBackground, Image } from "react-native";
import { useGameProgress } from "../../GameProgress";
import styles from "../../Styles/GameScreen/StyleCompilation";
import { Chapter1 } from "./StoryScreen/Chapter1";




//Main render engine
function PartRenderer(props) {
  const { sceneData, chapterNumber, partNumber, isLastPart } = props;

  //game.scene = where the player is, from App.jsx, shared sa lahat ng screens
  //sceneIdx = same value lang, but local copy so no lag for taps
  const game = useGameProgress();
  const [sceneIdx, setSceneIdx] = useState(game.scene);
  const [picked, setPicked] = useState(null); // which choice button player picked
  const [quizAnswer, setQuizAnswer] = useState(null);
  useEffect(() => {
    game.setChapter(chapterNumber);
    game.setPart(partNumber);
    game.setInGame(true);
    console.log("loaded ch" + chapterNumber + " part " + partNumber);
    return () => game.setInGame(false);
  }, []);

  const hasMoreScenes = sceneIdx < sceneData.length;
  const current = hasMoreScenes ? sceneData[sceneIdx] : null;

  const goToIndex = (i) => {
    setPicked(null);
    setQuizAnswer(null); 
    setSceneIdx(i);
    game.setScene(i);
  };

  const goNext = () => goToIndex(sceneIdx + 1);

  // skip scene-title type (we removed those from the UI)
  useEffect(() => {
    if (current && current.type === "scene") {
      goToIndex(sceneIdx + 1);
    }
  }, [sceneIdx, current]);

  if (!hasMoreScenes) {
    return (
      <View style={styles.container}>
        <Text style={styles.dialogueText}>Part {partNumber} complete!</Text>
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

  switch (current.type) {
    case "quiz": {
  const isAnswered = quizAnswer !== null;
  const isCorrect = quizAnswer === current.correctIndex;

  return (
    <View style={styles.choiceScreen}>
      <View style={styles.choiceParchmentWrapper}>
        <ImageBackground
          source={require("../../assets/foreground/narration_box.png")}
          style={styles.choiceParchmentBox}
          resizeMode="stretch"
        >
          <Text style={styles.choiceQuestion}>{current.question}</Text>
          {isAnswered && (
            <Text style={styles.choicePrompt}>{isCorrect ? "Correct!" : "Not quite..."}</Text>
          )}
        </ImageBackground>
      </View>

      <View style={styles.choiceButtonsRow}>
        {current.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.choiceImageButton}
            onPress={() => !isAnswered && setQuizAnswer(index)}
            activeOpacity={0.85}
          >
            <ImageBackground
              source={require("../../assets/buttons/choice_button.png")}
              style={styles.choiceImageButtonBg}
              resizeMode="stretch"
            >
              <Text style={styles.choiceButtonText}>{option}</Text>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </View>

      {isAnswered && (
        <TouchableOpacity style={styles.arrowButton} onPress={goNext}>
          <Image source={require("../../assets/icons/arrow_next.png")} style={styles.arrowImage} />
        </TouchableOpacity>
      )}
    </View>
  );
}
    case "system": {
      // To do: swap grey bg for real bg.png soon
      const content = (
        <>
          <View style={styles.systemParchmentWrapper}>
            <ImageBackground
              source={require("../../assets/foreground/narration_box.png")}
              style={styles.systemParchmentBox}
              resizeMode="stretch"
            >
              <Text style={styles.systemText}>{current.text}</Text>
            </ImageBackground>
          </View>
          <TouchableOpacity style={styles.arrowButton} onPress={goNext}>
            <Image source={require("../../assets/icons/arrow_next.png")} style={styles.arrowImage} />
          </TouchableOpacity>
        </>
      );

      if (current.background) {
        return (
          <ImageBackground source={current.background} style={styles.systemScreen} resizeMode="cover">
            {content}
          </ImageBackground>
        );
      }
      return <View style={styles.systemScreen}>{content}</View>;
    }

    // auto-skipped, never actually shows; might be used for auto saving idk
    case "scene":
      return <View style={styles.background} />;

    case "narrator": {
      const content = (
        <>
          {current.characters && current.characters.map((char, index) => (
            <Image
              key={index}
              source={char.source}
              style={[
                styles.characterBase,
                char.position === "left" ? styles.characterLeft :
                char.position === "right" ? styles.characterRight :
                styles.characterCenter
              ]}
            />
          ))}
          <View style={styles.narratorWrapper}>
            <ImageBackground
              source={require("../../assets/foreground/narration_box.png")}
              style={styles.narratorBox}
              resizeMode="stretch"
            >
              <Text style={styles.narratorLabel}>Narrator:</Text>
              <Text style={styles.narratorText}>{current.text}</Text>
            </ImageBackground>
          </View>
          <TouchableOpacity style={styles.arrowButton} onPress={goNext}>
            <Image source={require("../../assets/icons/arrow_next.png")} style={styles.arrowImage} />
          </TouchableOpacity>
        </>
      );

      if (current.background) {
        return (
          <ImageBackground source={current.background} style={styles.background} resizeMode="cover">
            {content}
          </ImageBackground>
        );
      }
      return <View style={styles.background}>{content}</View>;
    }

//-------------------------------------------------------------------------------------------
//Choice

    case "choice": {

      
      //nothing picked yet, show both buttons
      if (picked === null) {
        const content = (
          <>
            <View style={styles.choiceParchmentWrapper}>
              <ImageBackground
                source={require("../../assets/foreground/narration_box.png")}
                style={styles.choiceParchmentBox}
                resizeMode="stretch"
              >
                <Text style={styles.choiceQuestion}>{current.question}</Text>
                <Text style={styles.choicePrompt}>What will you choose?</Text>
              </ImageBackground>
            </View>

            <View style={styles.choiceButtonsRow}>
              {current.choices.map((choice, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.choiceImageButton}
                  onPress={() => setPicked(index)}
                  activeOpacity={0.85}
                >
                  <ImageBackground
                    source={require("../../assets/buttons/choice_button.png")}
                    style={styles.choiceImageButtonBg}
                    resizeMode="stretch"
                  >
                    <Text style={styles.choiceButtonText}>{choice.text}</Text>
                  </ImageBackground>
                </TouchableOpacity>
              ))}
            </View>
          </>
        );

        if (current.background) {
          return (
            <ImageBackground source={current.background} style={styles.choiceScreen} resizeMode="cover">
              {content}
            </ImageBackground>
          );
        }
        return <View style={styles.choiceScreen}>{content}</View>;
      }

      //player picked a choice, show the response
      const responseContent = (
        <>
          <View style={styles.narratorWrapper}>
            <ImageBackground
              source={require("../../assets/foreground/dialogue_box.png")}
              style={styles.dialogueBox}
              resizeMode="stretch"
            >
              <Text style={styles.speakerName}>{current.choices[picked].speaker}</Text>
              <Text style={styles.dialogueText}>{current.choices[picked].dialogue}</Text>
              {current.choices[picked].translation ? (
                <Text style={styles.dialogueTranslation}>
                  {current.choices[picked].translation}
                </Text>
              ) : null}
            </ImageBackground>
          </View>
          <TouchableOpacity style={styles.arrowButton} onPress={() => goToIndex(current.nextScene)}>
            <Image source={require("../../assets/icons/arrow_next.png")} style={styles.arrowImage} />
          </TouchableOpacity>
        </>
      );

      if (current.background) {
        return (
          <ImageBackground source={current.background} style={styles.background} resizeMode="cover">
            {responseContent}
          </ImageBackground>
        );
      }
      return <View style={styles.background}>{responseContent}</View>;
    }

//-------------------------------------------------------------------------------------------
//Dialgoue code
    case "dialogue":
    default: {
      const content = (
        <>
          {current.characters && current.characters.map((char, index) => (
            <Image
              key={index}
              source={char.source}
              style={[
                styles.characterBase,
                char.position === "left" ? styles.characterLeft :
                char.position === "right" ? styles.characterRight :
                styles.characterCenter
              ]}
            />
          ))}
          <View style={styles.narratorWrapper}>
            <ImageBackground
              source={require("../../assets/foreground/dialogue_box.png")}
              style={styles.dialogueBox}
              resizeMode="stretch"
            >
              <Text style={styles.speakerName}>{current.speaker}</Text>
              <Text style={styles.dialogueText}>{current.text}</Text>
              {current.translation ? (
                <Text style={styles.dialogueTranslation}>{current.translation}</Text>
              ) : null}
            </ImageBackground>
          </View>
          <TouchableOpacity style={styles.arrowButton} onPress={goNext}>
            <Image source={require("../../assets/icons/arrow_next.png")} style={styles.arrowImage} />
          </TouchableOpacity>
        </>
      );

      if (current.background) {
        return (
          <ImageBackground source={current.background} style={styles.background} resizeMode="cover">
            {content}
          </ImageBackground>
        );
      }
      return <View style={styles.background}>{content}</View>;
    }
  }
}

//-------------------------------------------------------------------------------------------
//Chapter Part Screens
export function Chap1Part1Screen({ navigation, ...props }) {
  return (
    <PartRenderer
      sceneData={Chapter1.part1}
      chapterNumber={1}
      partNumber={1}
      isLastPart={false}
      onPartComplete={() => navigation.navigate('Part2')}
      onChapterComplete={() => navigation.navigate('ChapterSelect')}
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
      onPartComplete={() => navigation.navigate('Part3')}
      onChapterComplete={() => navigation.navigate('ChapterSelect')}
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
      onPartComplete={() => navigation.navigate('Part4')}
      onChapterComplete={() => navigation.navigate('ChapterSelect')}
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
      onPartComplete={() => navigation.navigate('Part5')}
      onChapterComplete={() => navigation.navigate('ChapterSelect')}
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
      onPartComplete={() => navigation.navigate('Part6')}
      onChapterComplete={() => navigation.navigate('ChapterSelect')}
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
      onPartComplete={() => navigation.navigate('Part7')}
      onChapterComplete={() => navigation.navigate('ChapterSelect')}
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
      onPartComplete={() => navigation.navigate('Part8')}
      onChapterComplete={() => navigation.navigate('ChapterSelect')}
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
      onPartComplete={() => navigation.navigate('ChapterSelect')}
      onChapterComplete={() => navigation.navigate('ChapterSelect')}
      {...props}
    />
  );
}