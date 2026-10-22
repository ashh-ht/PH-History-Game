import React, { useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Image,
  Animated,
  ImageBackground,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import useScale from '../../Components/ScreenScaler';
import { useAudio } from '../../Audiostore';

import {
  getCheckpoints,
  restoreCheckpoint,
  clearCheckpoints,
  deleteCheckpoint,
} from "../Others/saveProgress";
import { useGameProgress } from "../../GameProgress";

const BG_PARCHMENT = require('../../assets/Settings_Assets/Saves_Base.png');

const BTN_DELETE_ALL = require('../../assets/Settings_Assets/Saves_DeleteAll.png');
const BTN_DELETE_ALL_C = require('../../assets/Settings_Assets/Saves_DeleteAllClicked.png'); 

const BTN_X_CIRCLE = require('../../assets/Settings_Assets/Saves_DeleteSave.png');
const BTN_X_CIRCLE_C = require('../../assets/Settings_Assets/Saves_DeleteSaveClicked.png');

const PANEL_ASPECT = 1205 / 630;

const timeAgo = (ts) => {
  const mins = Math.floor((Date.now() - ts) / 60000);
  if (mins < 1) return "JUST NOW";
  if (mins < 60) return `${mins} MIN${mins > 1 ? "S" : ""}`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} HR${hrs > 1 ? "S" : ""}`;
  return new Date(ts).toLocaleDateString();
};

function AnimatedSaveCard({ save, onSelect, onDelete, cardH, fontSize }) {
  const { playSfx } = useAudio();
  const scale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const [deletePressed, setDeletePressed] = useState(false);

  const animateCardPress = (isPressed) => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: isPressed ? 0.96 : 1,
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
    <Animated.View style={{ transform: [{ scale }, { translateY }] }}>
      <View style={[styles.saveCard, { height: cardH }]}>
        <Pressable
          style={styles.cardMainInfo}
          onPress={() => {
            playSfx("dialogueClick");
            onSelect(save.id);
          }}
          onPressIn={() => animateCardPress(true)}
          onPressOut={() => animateCardPress(false)}
        >
          <Text style={[styles.cardTitle, { fontSize }]}>
            CHAPTER {save.part} - SCENE {save.sceneNumber || 1}
          </Text>
          <Text style={[styles.cardTime, { fontSize }]}>
            {timeAgo(save.timestamp)}
          </Text>
        </Pressable>

        <TouchableOpacity
          style={styles.cardDeleteBtn}
          onPress={() => {
            playSfx("dialogueClick");
            onDelete(save.id);
          }}
          onPressIn={() => setDeletePressed(true)}
          onPressOut={() => setDeletePressed(false)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Image
            source={deletePressed ? BTN_X_CIRCLE_C : BTN_X_CIRCLE}
            style={{ width: cardH * 0.5, height: cardH * 0.5 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

function AnimatedButton({ normalSource, pressedSource, onPress, containerStyle, imageStyle }) {
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
    <View style={containerStyle}>
      <Animated.View style={{ transform: [{ scale }, { translateY }] }}>
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
            source={pressed ? pressedSource : normalSource}
            style={imageStyle}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

export default function SavesScreen({ navigation }) {
  const game = useGameProgress();
  const [saves, setSaves] = useState([]);
  const [confirm, setConfirm] = useState(null);
  const { s, insets } = useScale();
  const { width: winW, height: winH } = useWindowDimensions();
  const { playSfx } = useAudio();

  const panelH = Math.min(winH * 0.92, 700, (winW * 0.9) / PANEL_ASPECT);
  const panelW = panelH * PANEL_ASPECT;

  const listLeft = panelW * 0.11;
  const listW = panelW * 0.78;
  const listTop = panelH * 0.24;
  const listH = panelH * 0.48;

  const delW = panelW * 0.2;
  const delH = panelH * 0.1;
  const delLeft = (panelW - delW) / 2;
  const delTop = panelH * 0.75;

  const cardH = Math.max(50, panelH * 0.17);
  const cardFont = Math.max(12, panelH * 0.05);

  useFocusEffect(
    useCallback(() => {
      getCheckpoints().then((all) => {
        setSaves([...all].reverse());
      });
    }, [])
  );

  const onSelect = async (id) => {
    const cp = await restoreCheckpoint(id);
    if (!cp) return;

    game.setChapter(cp.chap);
    game.setPart(cp.part);
    game.setScene(cp.sceneIdx);

    navigation.reset({
      index: 0,
      routes: [
        {
          name: `Part${cp.part}`,
          params: { startScene: cp.sceneIdx },
        },
      ],
    });
  };

  const doRestart = async () => {
    setConfirm(null);
    await clearCheckpoints();
    game.setChapter(1);
    game.setPart(1);
    game.setScene(0);
    setSaves([]);
  };

  const doDeleteOne = async (id) => {
    setConfirm(null);
    const updated = await deleteCheckpoint(id);
    if (!updated) return;
    setSaves([...updated].reverse());
  };

  const onConfirmYes = () => {
    if (!confirm) return;
    if (confirm.type === "all") doRestart();
    else doDeleteOne(confirm.id);
  };

  const dynamicStyles = {
    topIconContainer: {
      top: Math.max(insets.top, 12 * s),
      left: Math.max(insets.left, 20 * s),
    },
    topIconImage: {
      width: 40 * s,
      height: 40 * s,
    },
  };

  return (
    <View style={styles.screenOverlay}>
      <AnimatedButton
        normalSource={require('../../assets/icons/x_button.png')}
        pressedSource={require('../../assets/icons/x_buttonpressed.png')}
        onPress={() => navigation.goBack()}
        containerStyle={[styles.absolute, dynamicStyles.topIconContainer]}
        imageStyle={dynamicStyles.topIconImage}
      />

      <View style={{ width: panelW, height: panelH }}>
        <ImageBackground
          source={BG_PARCHMENT}
          style={{ width: panelW, height: panelH }}
          resizeMode="stretch"
        >
          <View
            style={[
              styles.absolute,
              { left: listLeft, top: listTop, width: listW, height: listH }
            ]}
          >
            <ScrollView
              style={styles.scrollList}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={true}
              indicatorStyle="black"
            >
              {saves.length === 0 && (
                <Text style={[styles.emptyText, { fontSize: cardFont }]}>
                  No saves yet.{"\n"}Your journey autosaves as you play.
                </Text>
              )}

              {saves.map((save) => (
                <AnimatedSaveCard
                  key={save.id}
                  save={save}
                  cardH={cardH}
                  fontSize={cardFont}
                  onSelect={onSelect}
                  onDelete={(id) => setConfirm({ type: "one", id })}
                />
              ))}
            </ScrollView>
          </View>

          {saves.length > 0 && (
            <AnimatedButton
              normalSource={BTN_DELETE_ALL}
              pressedSource={BTN_DELETE_ALL_C}
              onPress={() => setConfirm({ type: "all" })}
              containerStyle={[
                styles.absolute,
                { left: delLeft, top: delTop, width: delW, height: delH }
              ]}
              imageStyle={styles.deleteAllImage}
            />
          )}
        </ImageBackground>
      </View>

      <Modal
        visible={confirm !== null}
        transparent
        animationType="fade"
        statusBarTranslucent
        supportedOrientations={["landscape", "portrait"]}
        onRequestClose={() => setConfirm(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.confirmBox}>
            <Text style={styles.confirmTitle}>Are you sure?</Text>
            <Text style={styles.confirmText}>
              {confirm?.type === "one"
                ? "This will delete this save."
                : "This will erase all your saves and progress."}
            </Text>

            <View style={styles.confirmButtons}>
              <TouchableOpacity
                style={[styles.confirmBtn, styles.noBtn]}
                onPress={() => setConfirm(null)}
              >
                <Text style={styles.noText}>No</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.confirmBtn, styles.yesBtn]}
                onPress={onConfirmYes}
              >
                <Text style={styles.yesText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Styles ... (keep the same as before)
const styles = StyleSheet.create({
  screenOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    justifyContent: "center",
    alignItems: "center",
  },
  topIconContainer: {
    zIndex: 10,
    flexDirection: "row",
  },
  absolute: {
    position: 'absolute',
  },
  scrollList: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 10,
    gap: 12,
  },
  emptyText: {
    textAlign: "center",
    fontFamily: 'serif',
    color: '#7A5C48',
    marginTop: 20,
    lineHeight: 28,
  },
  saveCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#A87C5E",
    borderColor: "#5A4A32",
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  cardMainInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 15,
  },
  cardTitle: {
    fontFamily: 'serif',
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  cardTime: {
    fontFamily: 'serif',
    color: "#FFFFFF",
  },
  cardDeleteBtn: {
    justifyContent: "center",
    alignItems: "center",
  },
  deleteAllImage: {
    width: "100%",
    height: "100%",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  confirmBox: {
    width: "50%",
    maxWidth: 400,
    backgroundColor: "#F4E4C8",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#A87C5E",
    paddingVertical: 30,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  confirmTitle: {
    fontSize: 24,
    fontFamily: 'serif',
    color: "#5A4A32",
    fontWeight: "bold",
    marginBottom: 10,
  },
  confirmText: {
    fontSize: 16,
    fontFamily: 'serif',
    color: "#5A4A32",
    textAlign: "center",
    marginBottom: 25,
  },
  confirmButtons: {
    flexDirection: "row",
    gap: 20,
  },
  confirmBtn: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderWidth: 2,
    borderColor: "#5A4A32",
  },
  noBtn: {
    backgroundColor: "#A87C5E",
  },
  noText: {
    color: "#FFFFFF",
    fontFamily: 'serif',
    fontWeight: "bold",
    fontSize: 18,
  },
  yesBtn: {
    backgroundColor: "#A74C39",
  },
  yesText: {
    color: "#FFFFFF",
    fontFamily: 'serif',
    fontWeight: "bold",
    fontSize: 18,
  },
});