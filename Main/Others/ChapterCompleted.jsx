import React, { useEffect, useRef } from "react";
import {
    Animated,
    Easing,
    Image,
    ImageBackground,
    Modal,
    StyleSheet,
    View,
} from "react-native";
import Sound_clicks from "../../Components/Sound_clicks";

const JOURNEY_BACKGROUND = require("../../Background Images/Intro/CONTINUEJOURNEY_BG.png");
const RETURN_BUTTON = require("../../Background Images/Intro/CONTINUEJOURNEY_RETURN.png");
const CONTINUE_BUTTON = require("../../Background Images/Intro/CONTINUEJOURNEY_CONTINUE.png");

// =====================================================
// TUNE THESE
// =====================================================
const BUTTON_WIDTH = 260;
const BUTTON_HEIGHT = 100;
const BUTTON_LIFT = 90;   // distance from the bottom edge (was 30)
const BG_FADE_MS = 500;

// =====================================================
// ANIMATED IMAGE BUTTON
// Static until touched, then the same spring press as your other buttons.
// =====================================================
function JourneyButton({ imageSource, onPress }) {
    const scale = useRef(new Animated.Value(1)).current;
    const translateY = useRef(new Animated.Value(0)).current;

    const animatePress = (isPressed) => {
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
                styles.buttonWrap,
                { transform: [{ translateY }, { scale }] },
            ]}
        >
            <Sound_clicks
                style={styles.buttonTouch}
                onPressIn={() => animatePress(true)}
                onPressOut={() => animatePress(false)}
                onPress={onPress}
            >
                <Image
                    source={imageSource}
                    style={styles.buttonImage}
                    resizeMode="contain"
                />
            </Sound_clicks>
        </Animated.View>
    );
}

// =====================================================
// CONTINUE YOUR JOURNEY SCREEN (drawn in a Modal so nothing can cover it)
// =====================================================
export default function ChapterCompleted({
    showContinue = true,
    onReturnToMenu,
    onContinue,
}) {
    const bgOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const fade = Animated.timing(bgOpacity, {
            toValue: 1,
            duration: BG_FADE_MS,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
        });

        fade.start();

        return () => fade.stop();
    }, [bgOpacity]);

    return (
        <Modal
            visible
            transparent={false}
            animationType="none"
            statusBarTranslucent
            supportedOrientations={["landscape", "landscape-left", "landscape-right", "portrait"]}
            onRequestClose={() => {}}
        >
            <View style={styles.root}>
                <Animated.View
                    style={[StyleSheet.absoluteFill, { opacity: bgOpacity }]}
                >
                    <ImageBackground
                        source={JOURNEY_BACKGROUND}
                        style={styles.background}
                        resizeMode="cover"
                    >
                        <View pointerEvents="none" style={styles.scrimBandLarge} />
                        <View pointerEvents="none" style={styles.scrimBandMedium} />
                        <View pointerEvents="none" style={styles.scrimBandSmall} />

                        <View style={styles.buttonRow}>
                            <JourneyButton
                                imageSource={RETURN_BUTTON}
                                onPress={onReturnToMenu}
                            />

                            {showContinue && (
                                <JourneyButton
                                    imageSource={CONTINUE_BUTTON}
                                    onPress={onContinue}
                                />
                            )}
                        </View>
                    </ImageBackground>
                </Animated.View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#000000",
    },

    background: {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
    },

    scrimBandLarge: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: "60%",
        backgroundColor: "rgba(0, 0, 0, 0.12)",
    },

    scrimBandMedium: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: "40%",
        backgroundColor: "rgba(0, 0, 0, 0.18)",
    },

    scrimBandSmall: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: "22%",
        backgroundColor: "rgba(0, 0, 0, 0.26)",
    },

    buttonRow: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: 24,
        paddingHorizontal: 20,
        paddingBottom: BUTTON_LIFT,
    },

    buttonWrap: {
        width: BUTTON_WIDTH,
        height: BUTTON_HEIGHT,
        shadowColor: "#FFD45C",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.55,
        shadowRadius: 14,
    },

    buttonTouch: {
        width: BUTTON_WIDTH,
        height: BUTTON_HEIGHT,
    },

    buttonImage: {
        width: BUTTON_WIDTH,
        height: BUTTON_HEIGHT,
    },
});