import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import {
  getCheckpoints,
  restoreCheckpoint,
  restartEverything,
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


export default function SavesScreen({ navigation }) {
  const game = useGameProgress();
  const [saves, setSaves] = useState([]);
  const [confirmVisible, setConfirmVisible] = useState(false);

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

  // Actually deletes everything
  const doRestart = async () => {
    setConfirmVisible(false); // close the overlay first

    const ok = await restartEverything();
    if (!ok) return; // nothing erased

    // reset the once that are on going too
    game.setChapter(1);
    game.setPart(1);
    game.setScene(0);

    setSaves([]); // list empties right away
  };

  // Opens the "Are you sure?" overlay
  const confirmRestart = () => setConfirmVisible(true);

  return (
    <View style={styles.screen}>
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
            <TouchableOpacity
              key={s.id}
              style={styles.card}
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
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>↩</Text>
          </TouchableOpacity>

          {saves.length > 0 && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={confirmRestart}
            >
              <Text style={styles.deleteText}>Delete All</Text>
            </TouchableOpacity>
          )}
        </View>

      </View>


      {/* "ARE YOU SURE?" OVERLAY */}
      <Modal
        visible={confirmVisible}
        transparent
        animationType="fade"
        statusBarTranslucent
        supportedOrientations={["landscape", "portrait"]}
        onRequestClose={() => setConfirmVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.confirmBox}>
            <Text style={styles.confirmTitle}>Are you sure?</Text>
            <Text style={styles.confirmText}>
              This will erase all your saves and progress.
            </Text>

            <View style={styles.confirmButtons}>
              <TouchableOpacity
                style={[styles.confirmBtn, styles.noBtn]}
                onPress={() => setConfirmVisible(false)}
              >
                <Text style={styles.noText}>No</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.confirmBtn, styles.yesBtn]}
                onPress={doRestart}
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
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 10,
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

  deleteButton: {
    backgroundColor: "#B5543C",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },

  deleteText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
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
    backgroundColor: "#C8A96E" 
  },
  
  noText: { 
    color: "#000000", 
    fontWeight: "bold", 
    fontSize: 15 
  },

  yesBtn: { 
    backgroundColor: "#B5543C" 

  },
  yesText: { 
    color: "#FFFFFF", 
    fontWeight: "bold", 
    fontSize: 15 },
});