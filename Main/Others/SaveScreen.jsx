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
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import {
  getCheckpoints,
  restoreCheckpoint,
  restartEverything,
  deleteCheckpoint,
} from "../Others/saveProgress";
import { useGameProgress } from "../../GameProgress";


// "5 mins ago", "2 hrs ago", or a date for older saves
const timeAgo = (ts) => {
  const mins = Math.floor((Date.now() - ts) / 60000);

  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min${mins > 1 ? "s" : ""} ago`;

  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr${hrs > 1 ? "s" : ""} ago`;

  return new Date(ts).toLocaleDateString();
};


// Spring image button
function SpringImageButton({ onPress, image, pressedImage }) {
  const scale = useRef(new Animated.Value(1)).current;
  const [pressed, setPressed] = useState(false);

  const handlePressIn = () => {
    setPressed(true);
    Animated.spring(scale, {
      toValue: 0.9,
      useNativeDriver: true,
      speed: 20,
      bounciness: 10,
    }).start();
  };

  const handlePressOut = () => {
    setPressed(false);
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 10,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <Image
          source={pressed ? pressedImage : image}
          style={styles.icon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </Animated.View>
  );
}


export default function SavesScreen({ navigation }) {
  const game = useGameProgress();
  const [saves, setSaves] = useState([]);

  // null = closed | { type: "all" } | { type: "one", id }
  const [confirm, setConfirm] = useState(null);

  // Reload every time the screen is opened
  useFocusEffect(
    useCallback(() => {
      getCheckpoints().then((all) => {
        setSaves([...all].reverse()); // newest first
      });
    }, [])
  );

  const onSelect = async (id) => {
    const cp = await restoreCheckpoint(id);
    if (!cp) return;

    game.setChapter(cp.chap);
    game.setPart(cp.part);
    game.setScene(cp.sceneIdx);

    //route of the chapters
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

  // Delete everything
  const doRestart = async () => {
    setConfirm(null); // close the overlay first

    const ok = await restartEverything();
    if (!ok) return; // nothing erased

    // reset the ones that are ongoing too
    game.setChapter(1);
    game.setPart(1);
    game.setScene(0);

    setSaves([]); // list empties right away
  };

  // Delete a single save
  const doDeleteOne = async (id) => {
    setConfirm(null);

    const updated = await deleteCheckpoint(id);
    if (!updated) return; // failed, keep list as is

    setSaves([...updated].reverse()); // newest first
  };

  // "Yes" button in the overlay
  const onConfirmYes = () => {
    if (!confirm) return;
    if (confirm.type === "all") doRestart();
    else doDeleteOne(confirm.id);
  };

  return (
    <View style={styles.screen}>

      <View
        style={{
          position: "absolute",
          top: 12,
          left: 20,
          flexDirection: "row",
          gap: 15,
          zIndex: 1,
        }}
      >
        <SpringImageButton
          onPress={() => navigation.goBack()}
          image={require('../../assets/icons/x_button.png')}
          pressedImage={require('../../assets/icons/x_buttonpressed.png')}
        />

        <SpringImageButton
          onPress={() => navigation.navigate("Journal")}
          image={require('../../assets/icons/journal_button.png')}
          pressedImage={require('../../assets/icons/journal_buttonpressed.png')}
        />
      </View>

      <View style={styles.panel}>

        <Text style={styles.heading}>Saves</Text>

        <ScrollView
          style={styles.list}
          contentContainerStyle={{ paddingBottom: 10 }}
          showsVerticalScrollIndicator={false}
        >
          {saves.length === 0 && (
            <Text style={styles.empty}>
              No saves yet. Your journey autosaves as you play.
            </Text>
          )}

          {saves.map((s) => (
            <View key={s.id} style={styles.card}>
              <TouchableOpacity
                style={styles.cardMain}
                onPress={() => onSelect(s.id)}
                activeOpacity={0.8}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>
                    Chapter {s.chap}: Part {s.part} - Scene {s.sceneNumber}
                    {s.decNum ? `  (Decision ${s.decNum})` : ""}
                  </Text>
                  <Text style={styles.cardSub}>{s.sceneTitle}</Text>
                </View>

                <Text style={styles.cardTime}>{timeAgo(s.timestamp)}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cardDelete}
                onPress={() => setConfirm({ type: "one", id: s.id })}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text style={styles.cardDeleteText}>✕</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          {saves.length > 0 && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => setConfirm({ type: "all" })}
            >
              <Text style={styles.deleteText}>Delete All</Text>
            </TouchableOpacity>
          )}
        </View>

      </View>


      {/* "ARE YOU SURE?" OVERLAY */}
      <Modal
        visible={confirm !== null}
        transparent
        animationType="fade"
        statusBarTranslucent
        supportedOrientations={["landscape", "portrait"]}
        onRequestClose={() => setConfirm(null)}
      >
        <View style={styles.overlay}>
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


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#8EC9DE",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  panel: {
    width: "90%",
    maxHeight: "90%",
    backgroundColor: "#FFF0C9",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#C8A96E",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },

  heading: {
    fontSize: 24,
    textAlign: "center",
    color: "#5A4A2F",
    marginBottom: 10,
  },

  list: {
    flexGrow: 0,
  },

  empty: {
    textAlign: "center",
    color: "#5A4A2F",
    marginVertical: 20,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#C8A96E",
    borderRadius: 6,
    marginBottom: 10,
  },

  cardMain: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingLeft: 14,
  },

  cardDelete: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  cardDeleteText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#B5543C",
  },

  cardTitle: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#000000",
  },

  cardSub: {
    fontSize: 12,
    color: "#000000",
    marginTop: 2,
  },

  cardTime: {
    fontSize: 14,
    color: "#000000",
    marginLeft: 10,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },

  backButton: {
    alignSelf: "flex-start",
    padding: 6,
  },

  backText: {
    fontSize: 30,
    color: "#7A5C48",
  },

  icon: {
    width: 40,
    height: 40,
  },

  deleteButton: {
    backgroundColor: "#B5543C",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },

  deleteText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14
  },


  // ===================================================
  // CONFIRM OVERLAY
  // ===================================================

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    justifyContent: "center",
    alignItems: "center",
  },

  confirmBox: {
    width: "60%",
    backgroundColor: "#FFF0C9",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#C8A96E",
    paddingVertical: 20,
    paddingHorizontal: 24,
    alignItems: "center",
  },

  confirmTitle: {
    fontSize: 22,
    color: "#5A4A2F",
    marginBottom: 6,
  },

  confirmText: {
    fontSize: 14,
    color: "#5A4A2F",
    textAlign: "center",
    marginBottom: 16,
  },

  confirmButtons: {
    flexDirection: "row",
    gap: 14,
  },

  confirmBtn: {
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 28,
  },

  noBtn: {
    backgroundColor: "#C8A96E",
  },

  noText: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 15,
  },

  yesBtn: {
    backgroundColor: "#B5543C",
  },

  yesText: {
    color: "#FFFFFF",
    fontWeight: "bold",
<<<<<<< HEAD
    fontSize: 15,
=======
    fontSize: 15
>>>>>>> origin/maui-90-percent
  },
});