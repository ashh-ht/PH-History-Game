import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Animated,
  StyleSheet,
} from "react-native";

// =====================================================
// Pause + Settings buttons for minigames (top right),
// plus the "PAUSED" panel.
//
// Lives in the Components folder at the project root,
// so the asset paths go 1 folder up.
// =====================================================

const IMG = {
  menu: require("../assets/icons/menu_button.png"),
  menuPressed: require("../assets/icons/menu_buttonpressed.png"),
  button: require("../assets/buttons/choice_button.png"),
};

const BUTTON_INK = "#371f10"; // same as the quiz buttons

// Same spring press feel as the story buttons
function usePressAnim() {
  const scale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const animate = (isPressed, amount = 0.9) => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: isPressed ? amount : 1,
        speed: 20,
        bounciness: 10,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: isPressed ? 3 : 0,
        speed: 20,
        bounciness: 8,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return { scale, translateY, animate };
}

// Pause button drawn in code (two bars) so no new image is needed.
function PauseButton({ onPress }) {
  const { scale, translateY, animate } = usePressAnim();

  return (
    <Animated.View
      style={[styles.iconButton, { transform: [{ scale }, { translateY }] }]}
    >
      <TouchableOpacity
        activeOpacity={1}
        accessibilityRole="button"
        accessibilityLabel="Pause"
        onPressIn={() => animate(true)}
        onPressOut={() => animate(false)}
        onPress={onPress}
        style={styles.pauseCircle}
      >
        <View style={styles.pauseBar} />
        <View style={styles.pauseBar} />
      </TouchableOpacity>
    </Animated.View>
  );
}

// Settings button uses the same artwork as the story menu button.
function SettingsButton({ onPress }) {
  const [pressed, setPressed] = useState(false);
  const { scale, translateY, animate } = usePressAnim();

  return (
    <Animated.View
      style={[styles.iconButton, { transform: [{ scale }, { translateY }] }]}
    >
      <TouchableOpacity
        activeOpacity={1}
        accessibilityRole="button"
        accessibilityLabel="Settings"
        onPressIn={() => {
          setPressed(true);
          animate(true);
        }}
        onPressOut={() => {
          setPressed(false);
          animate(false);
        }}
        onPress={onPress}
      >
        <Image
          source={pressed ? IMG.menuPressed : IMG.menu}
          style={styles.settingsImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </Animated.View>
  );
}

function PanelButton({ label, onPress, secondary }) {
  const { scale, translateY, animate } = usePressAnim();

  return (
    <Animated.View
      style={[
        styles.panelButtonWrap,
        secondary && styles.panelButtonSecondary,
        { transform: [{ scale }, { translateY }] },
      ]}
    >
      <TouchableOpacity
        activeOpacity={1}
        accessibilityRole="button"
        onPressIn={() => animate(true, 0.94)}
        onPressOut={() => animate(false)}
        onPress={onPress}
      >
        <ImageBackground
          source={IMG.button}
          style={styles.panelButtonBg}
          resizeMode="stretch"
        >
          <Text style={styles.panelButtonText}>{label}</Text>
        </ImageBackground>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function MinigameOverlay({
  paused,
  hidePause,
  hideSettings,
  top = 20,
  right = 20,
  onPause,
  onResume,
  onSettings,
}) {
  return (
    <>
      {/* TOP-RIGHT BUTTONS */}
      <View style={[styles.bar, { top, right }]}>
        {!hidePause && <PauseButton onPress={onPause} />}
        {!hideSettings && <SettingsButton onPress={onSettings} />}
      </View>

      {/* PAUSE PANEL (blocks the game underneath while open) */}
      {paused ? (
        <View style={styles.pauseOverlay}>
          <View style={styles.pauseBox}>
            <Text style={styles.pauseTitle}>PAUSED</Text>
            <Text style={styles.pauseText}>
              The clock is stopped. Take your time.
            </Text>

            <PanelButton label="Resume" onPress={onResume} />
            <PanelButton label="Settings" onPress={onSettings} secondary />
          </View>
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  // Same spot as the story screens' menu / journal buttons
  bar: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 100,
    elevation: 100,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  iconButton: {
    width: 42,
    height: 42,
  },

  settingsImage: {
    width: "100%",
    height: "100%",
  },

  pauseCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#6b4a24",
    borderWidth: 2,
    borderColor: "#352313",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },

  pauseBar: {
    width: 5,
    height: 17,
    borderRadius: 2,
    backgroundColor: "#fff4db",
  },

  pauseOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 200,
    elevation: 200,
  },

  // Same colors as the Remnant reward popup
  pauseBox: {
    backgroundColor: "#F4E4C8",
    borderWidth: 2,
    borderColor: "#A87C5E",
    borderRadius: 15,
    paddingVertical: 22,
    paddingHorizontal: 26,
    width: "50%",
    minWidth: 260,
    maxWidth: 400,
    alignItems: "center",
  },

  pauseTitle: {
    fontSize: 24,
    fontFamily: "serif",
    fontWeight: "bold",
    color: "#5A4A32",
    textAlign: "center",
  },

  pauseText: {
    fontSize: 14,
    fontFamily: "serif",
    color: "#5A4A32",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 10,
  },

  panelButtonWrap: {
    width: "85%",
    maxWidth: 300,
    marginTop: 8,
  },

  panelButtonSecondary: {
    opacity: 0.85,
  },

  panelButtonBg: {
    width: "100%",
    minHeight: 52,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  panelButtonText: {
    color: BUTTON_INK,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});