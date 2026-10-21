import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import {
    Animated,
    Image,
    PanResponder,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from "react-native";

const CEDULA = require("../../../assets/Minigames/Part1/Part5/Cedula.jpg");
const CEDULA_TORN = require("../../../assets/Minigames/Part1/Part5/Cedula Torn.jpg");

const REQUIRED_TEARS = 5;
const GAME_TIME = 30;
const START_MESSAGE =
    "Swipe across the cédula to tear it. The clock starts on your first swipe.";

const CEDULA_SOURCE = Image.resolveAssetSource(CEDULA);
const CEDULA_RATIO =
    CEDULA_SOURCE?.width && CEDULA_SOURCE?.height
        ? CEDULA_SOURCE.width / CEDULA_SOURCE.height
        : 0.75;

const C = {
    bg: "#F2EAD8",
    bgRaised: "#F8F1E3",
    cream: "#F8F1E3",
    creamLight: "#FFFCF5",
    creamDark: "#E8DDC7",
    beige: "#DED0B0",
    border: "#D2C3A6",
    ink: "#343A35",
    body: "#50574F",
    muted: "#77715F",

    // Muted botanical accents complement the parchment palette.
    gold: "#777C52",
    goldLight: "#A3AD91",
    sage: "#78866D",
    sageLight: "#DDE3D3",
    forest: "#3F5949",

    // Button shape and styling are preserved; only the outline is softened.
    button: "#E4D8C0",
    buttonBorder: "#A8B39A",
    buttonPressed: "#D8CBB2",

    red: "#A85E4B",
    darkPanel: "#F8F1E3",
    white: "#343A35",
    hairline: "#D2C3A6",
};

export default function CedulaMinigame({ onComplete }) {
    const { width, height } = useWindowDimensions();

    const compact = height < 700;
    const narrow = width < 360;
    const horizontalPadding = narrow ? 12 : 16;

    // The minigame now starts directly in gameplay (no intro screen).
    const [screen, setScreen] = useState("playing");
    const [timeLeft, setTimeLeft] = useState(GAME_TIME);
    const [tears, setTears] = useState([]);
    const [slash, setSlash] = useState(null);
    const [message, setMessage] = useState(START_MESSAGE);

    const [paperArea, setPaperArea] = useState({
        width: 0,
        height: 0,
    });
    const [paperSize, setPaperSize] = useState({
        width: 1,
        height: 1,
    });

    const screenRef = useRef("playing");
    const startRef = useRef(null);
    const tearCountRef = useRef(0);
    const finishingRef = useRef(false);
    // null until the player's first swipe; the clock only runs once it is set.
    const deadlineRef = useRef(null);
    const finishTimerRef = useRef(null);

    const shake = useRef(new Animated.Value(0)).current;
    const flash = useRef(new Animated.Value(0)).current;
    const progressAnim = useRef(new Animated.Value(0)).current;

    const changeScreen = (next) => {
        screenRef.current = next;
        setScreen(next);
    };

    const clearFinishTimer = () => {
        if (finishTimerRef.current) {
            clearTimeout(finishTimerRef.current);
            finishTimerRef.current = null;
        }
    };

    useEffect(() => {
        return () => {
            clearFinishTimer();
            deadlineRef.current = null;
        };
    }, []);

    // Preserve the source image's actual aspect ratio and use the largest
    // dimensions available inside the gameplay area.
    const availableWidth = Math.max(
        1,
        Math.min(width - horizontalPadding * 2, 460)
    );

    const fittedPaper = useMemo(() => {
        const areaWidth = paperArea.width || availableWidth;
        const areaHeight =
            paperArea.height || Math.max(1, height * 0.65);

        let fittedWidth = Math.min(availableWidth, areaWidth);
        let fittedHeight = fittedWidth / CEDULA_RATIO;

        if (fittedHeight > areaHeight) {
            fittedHeight = areaHeight;
            fittedWidth = fittedHeight * CEDULA_RATIO;
        }

        return {
            width: Math.max(1, fittedWidth),
            height: Math.max(1, fittedHeight),
        };
    }, [
        availableWidth,
        height,
        paperArea.width,
        paperArea.height,
    ]);

    const handlePaperAreaLayout = (event) => {
        const { width: w, height: h } = event.nativeEvent.layout;

        setPaperArea((previous) =>
            previous.width === w && previous.height === h
                ? previous
                : { width: w, height: h }
        );
    };

    useEffect(() => {
        setPaperSize((previous) =>
            previous.width === fittedPaper.width &&
                previous.height === fittedPaper.height
                ? previous
                : fittedPaper
        );
    }, [fittedPaper]);

    // Deadline-based timer avoids accumulated interval drift.
    // It does nothing until the first swipe sets deadlineRef.
    useEffect(() => {
        if (screen !== "playing") return;

        const tick = () => {
            if (
                screenRef.current !== "playing" ||
                deadlineRef.current == null
            ) {
                return;
            }

            const remainingMs = Math.max(
                0,
                deadlineRef.current - Date.now()
            );

            setTimeLeft(Math.ceil(remainingMs / 1000));

            if (remainingMs <= 0 && !finishingRef.current) {
                clearFinishTimer();
                startRef.current = null;
                setSlash(null);
                deadlineRef.current = null;
                changeScreen("failed");
                setMessage("Time is up. Try again.");
            }
        };

        tick();
        const interval = setInterval(tick, 150);

        return () => clearInterval(interval);
    }, [screen]);

    useEffect(() => {
        Animated.timing(progressAnim, {
            toValue: tears.length / REQUIRED_TEARS,
            duration: 180,
            useNativeDriver: false,
        }).start();
    }, [tears.length, progressAnim]);

    const startGame = () => {
        clearFinishTimer();

        tearCountRef.current = 0;
        finishingRef.current = false;
        startRef.current = null;
        deadlineRef.current = null; // clock starts on the first swipe

        setTears([]);
        setSlash(null);
        setTimeLeft(GAME_TIME);
        setMessage(START_MESSAGE);

        shake.stopAnimation();
        flash.stopAnimation();
        shake.setValue(0);
        flash.setValue(0);
        progressAnim.setValue(0);

        changeScreen("playing");
    };

    const animateTear = useCallback(() => {
        shake.stopAnimation();
        flash.stopAnimation();
        shake.setValue(0);
        flash.setValue(0);

        Animated.parallel([
            Animated.sequence([
                Animated.timing(shake, { toValue: 1, duration: 45, useNativeDriver: true }),
                Animated.timing(shake, { toValue: -1, duration: 55, useNativeDriver: true }),
                Animated.spring(shake, { toValue: 0, speed: 22, bounciness: 5, useNativeDriver: true }),
            ]),
            Animated.sequence([
                Animated.timing(flash, { toValue: 0.18, duration: 65, useNativeDriver: true }),
                Animated.timing(flash, { toValue: 0, duration: 230, useNativeDriver: true }),
            ]),
        ]).start();
    }, [shake, flash]);

    const finishSwipe = useCallback(
        (start, end) => {
            if (
                screenRef.current !== "playing" ||
                finishingRef.current ||
                !start ||
                !end
            ) {
                return;
            }

            const dx = end.x - start.x;
            const dy = end.y - start.y;
            const absX = Math.abs(dx);
            const absY = Math.abs(dy);

            const horizontal = absX > absY * 1.2;
            const vertical = absY > absX * 1.2;

            const longEnough = horizontal
                ? absX >= paperSize.width * 0.22
                : vertical && absY >= paperSize.height * 0.18;

            if ((!horizontal && !vertical) || !longEnough) {
                setSlash(null);
                setMessage("Swipe farther across the paper.");
                startRef.current = null;
                return;
            }

            const clampX = (x) => Math.max(0, Math.min(paperSize.width, x));
            const clampY = (y) => Math.max(0, Math.min(paperSize.height, y));

            const newTear = {
                id: `${Date.now()}-${tearCountRef.current}`,
                x1: clampX(start.x),
                y1: clampY(start.y),
                x2: clampX(end.x),
                y2: clampY(end.y),
            };

            const nextCount = tearCountRef.current + 1;
            tearCountRef.current = nextCount;

            setTears((previous) => [...previous, newTear]);
            setSlash(null);
            startRef.current = null;
            animateTear();

            if (nextCount >= REQUIRED_TEARS) {
                finishingRef.current = true;
                setMessage("The cédula has been torn.");
                clearFinishTimer();

                finishTimerRef.current = setTimeout(() => {
                    if (screenRef.current === "playing") {
                        deadlineRef.current = null;
                        changeScreen("won");
                    }
                    finishTimerRef.current = null;
                }, 450);
            } else {
                setMessage(
                    nextCount === REQUIRED_TEARS - 1
                        ? "One more tear."
                        : `${nextCount} of ${REQUIRED_TEARS} tears completed.`
                );
            }
        },
        [paperSize.width, paperSize.height, animateTear]
    );

    const responder = useMemo(
        () =>
            PanResponder.create({
                onStartShouldSetPanResponder: () =>
                    screenRef.current === "playing" &&
                    !finishingRef.current,

                onMoveShouldSetPanResponder: () =>
                    screenRef.current === "playing" &&
                    !finishingRef.current,

                onStartShouldSetPanResponderCapture: () =>
                    screenRef.current === "playing" &&
                    !finishingRef.current,

                onMoveShouldSetPanResponderCapture: () =>
                    screenRef.current === "playing" &&
                    !finishingRef.current,

                onPanResponderTerminationRequest: () => false,

                onPanResponderGrant: (event) => {
                    if (
                        screenRef.current !== "playing" ||
                        finishingRef.current
                    ) {
                        return;
                    }

                    // First touch starts the 30-second clock.
                    if (deadlineRef.current == null) {
                        deadlineRef.current = Date.now() + GAME_TIME * 1000;
                    }

                    const start = {
                        x: event.nativeEvent.locationX,
                        y: event.nativeEvent.locationY,
                    };

                    startRef.current = start;

                    setSlash({
                        x1: start.x,
                        y1: start.y,
                        x2: start.x,
                        y2: start.y,
                    });
                },

                onPanResponderMove: (_, gesture) => {
                    if (
                        !startRef.current ||
                        screenRef.current !== "playing" ||
                        finishingRef.current
                    ) {
                        return;
                    }

                    const end = {
                        x: startRef.current.x + gesture.dx,
                        y: startRef.current.y + gesture.dy,
                    };

                    setSlash({
                        x1: startRef.current.x,
                        y1: startRef.current.y,
                        x2: end.x,
                        y2: end.y,
                    });
                },

                onPanResponderRelease: (_, gesture) => {
                    if (
                        !startRef.current ||
                        screenRef.current !== "playing" ||
                        finishingRef.current
                    ) {
                        startRef.current = null;
                        setSlash(null);
                        return;
                    }

                    const start = startRef.current;
                    const end = {
                        x: start.x + gesture.dx,
                        y: start.y + gesture.dy,
                    };

                    finishSwipe(start, end);
                },

                onPanResponderTerminate: () => {
                    startRef.current = null;
                    setSlash(null);
                },
            }),
        [finishSwipe]
    );

    const renderSlash = (line, isLive = false) => {
        const dx = line.x2 - line.x1;
        const dy = line.y2 - line.y1;
        const length = Math.sqrt(dx * dx + dy * dy);

        if (length < 1) return null;

        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        const midX = (line.x1 + line.x2) / 2;
        const midY = (line.y1 + line.y2) / 2;

        return (
            <View
                key={line.id || "live-slash"}
                pointerEvents="none"
                style={[
                    styles.slashWrap,
                    {
                        width: length,
                        left: midX - length / 2,
                        top: midY - 2,
                        transform: [{ rotate: `${angle}deg` }],
                    },
                ]}
            >
                <View
                    style={[
                        styles.slashGlow,
                        !isLive && styles.seamGlow,
                    ]}
                />
                <View
                    style={[
                        styles.slashCore,
                        !isLive && styles.seamCore,
                    ]}
                />
                <View style={styles.slashHighlight} />
            </View>
        );
    };

    const renderPaper = () => (
        <Animated.View
            style={[
                styles.paperOuter,
                {
                    width: fittedPaper.width,
                    height: fittedPaper.height,
                    transform: [
                        {
                            translateX: shake.interpolate({
                                inputRange: [-1, 0, 1],
                                outputRange: [-3, 0, 3],
                            }),
                        },
                    ],
                },
            ]}
        >
            <View
                style={styles.paperFrame}
                onLayout={(event) => {
                    const { width: w, height: h } =
                        event.nativeEvent.layout;

                    setPaperSize((previous) =>
                        previous.width === w && previous.height === h
                            ? previous
                            : { width: w, height: h }
                    );
                }}
                {...(
                    screen === "playing" && !finishingRef.current
                        ? responder.panHandlers
                        : {}
                )}
            >
                <Image
                    source={CEDULA}
                    resizeMode="contain"
                    style={styles.paperImage}
                    pointerEvents="none"
                />

                {tears.map((tear) => renderSlash(tear))}

                {slash &&
                    screen === "playing" &&
                    renderSlash(slash, true)}

                <Animated.View
                    pointerEvents="none"
                    style={[styles.flash, { opacity: flash }]}
                />
            </View>
        </Animated.View>
    );

    const Eyebrow = () => (
        <Text style={styles.eyebrow}>THE CRY OF PUGAD LAWIN</Text>
    );

    const ActionButton = ({
        label,
        onPress,
        accessibilityLabel,
        secondary = false,
        symbol = "→",
    }) => (
        <Pressable
            style={({ pressed }) => [
                styles.primaryButton,
                secondary && styles.secondaryButton,
                pressed && styles.buttonPressed,
            ]}
            onPress={onPress}
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabel || label}
        >
            <Text
                style={[
                    styles.primaryButtonText,
                    secondary && styles.secondaryButtonText,
                ]}
            >
                {label}
            </Text>
            <Text
                style={[
                    styles.buttonArrow,
                    secondary && styles.secondaryButtonArrow,
                ]}
            >
                {symbol}
            </Text>
        </Pressable>
    );

    // COMPLETION
    if (screen === "won") {
        return (
            <SafeAreaView style={styles.safeScreen}>
                <ScrollView
                    style={styles.scrollScreen}
                    contentContainerStyle={[
                        styles.completionScreen,
                        { paddingTop: compact ? 8 : 14 },
                    ]}
                    showsVerticalScrollIndicator={false}
                    alwaysBounceVertical={false}
                >
                    <View style={styles.completionHeader}>
                        <View style={styles.chapterLine}>
                            <View style={styles.chapterRule} />
                            <Eyebrow />
                            <View style={styles.chapterRule} />
                        </View>

                        <View style={styles.successSeal}>
                            <Text style={styles.successSealText}>✓</Text>
                        </View>

                        <Text style={styles.completionTitle}>
                            A symbol torn.
                        </Text>

                        <Text style={styles.completionSubtitle}>
                            There is no turning back.
                        </Text>
                    </View>

                    <View style={styles.tornDocumentFeature}>
                        <View style={styles.featureTopline}>
                            <Text style={styles.featureLabel}>
                                THE DOCUMENT, TRANSFORMED
                            </Text>
                            <Text style={styles.featureNumber}>COMPLETE</Text>
                        </View>

                        <View
                            style={[
                                styles.completionImageWrap,
                                { height: compact ? 178 : 220 },
                            ]}
                        >
                            <Image
                                source={CEDULA_TORN}
                                resizeMode="contain"
                                style={styles.completionImage}
                            />
                        </View>

                        <View style={styles.featureCaptionRow}>
                            <View style={styles.captionRule} />
                            <Text style={styles.featureCaption}>
                                FIVE SWIPES · ONE STATEMENT
                            </Text>
                            <View style={styles.captionRule} />
                        </View>
                    </View>

                    <View style={styles.completionCard}>
                        <Text style={styles.sectionLabel}>
                            A DOCUMENT OF COLONIAL RULE
                        </Text>
                        <Text style={styles.completionCardTitle}>
                            More than a piece of paper.
                        </Text>
                        <Text style={styles.cardText}>
                            Under Spanish rule, the cédula served as an
                            identification document and tax certificate.
                            Tearing it became a rejection of colonial
                            authority, and a declaration that freedom was
                            worth fighting for.
                        </Text>
                    </View>

                    <View style={styles.completionAction}>
                        <ActionButton
                            label="CONTINUE"
                            onPress={() => onComplete?.()}
                            accessibilityLabel="Continue to the next part"
                        />
                        <Text style={styles.bottomHint}>
                            THE STORY CONTINUES
                        </Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    // FAILURE
    if (screen === "failed") {
        return (
            <SafeAreaView style={styles.safeScreen}>
                <View style={[styles.screen, styles.failureScreen]}>
                    <View style={styles.failureContent}>
                        <View style={styles.failureSeal}>
                            <Text style={styles.failureSealText}>↻</Text>
                        </View>

                        <View style={styles.chapterLine}>
                            <View style={styles.chapterRule} />
                            <Eyebrow />
                            <View style={styles.chapterRule} />
                        </View>

                        <Text style={styles.completionTitle}>
                            TRY AGAIN
                        </Text>
                        <Text style={styles.completionSubtitle}>
                            You completed {tears.length} of {REQUIRED_TEARS} tears.
                        </Text>

                        <View style={styles.failureCard}>
                            <Text style={styles.sectionLabel}>
                                THE MOMENT IS STILL YOURS
                            </Text>
                            <Text style={styles.failureCardTitle}>
                                Tear it before the crowd moves on.
                            </Text>
                            <Text style={styles.cardText}>
                                Start anywhere on the document. Make five
                                long swipes within 30 seconds.
                            </Text>
                        </View>
                    </View>

                    <ActionButton
                        label="TRY AGAIN"
                        onPress={startGame}
                        symbol="↻"
                    />
                </View>
            </SafeAreaView>
        );
    }

    // GAMEPLAY
    return (
        <SafeAreaView style={styles.safeScreen}>
            <View
                style={[
                    styles.screen,
                    styles.gameScreen,
                    compact && styles.compactGameScreen,
                    { paddingHorizontal: horizontalPadding },
                ]}
            >
                <View style={styles.gameHeader}>
                    <View style={styles.gameHeading}>
                        <Eyebrow />
                        <Text style={styles.gameTitle}>
                            Tear Your Cédula
                        </Text>
                    </View>

                    <View
                        style={[
                            styles.timer,
                            timeLeft <= 10 && styles.timerUrgent,
                        ]}
                        accessibilityLabel={`${timeLeft} seconds remaining`}
                    >
                        <Text style={styles.timerCaption}>TIME LEFT</Text>
                        <Text
                            style={[
                                styles.timerValue,
                                timeLeft <= 10 && styles.timerValueUrgent,
                            ]}
                        >
                            00:{String(timeLeft).padStart(2, "0")}
                        </Text>
                    </View>
                </View>

                <View style={styles.progressArea}>
                    <View style={styles.progressLabels}>
                        <Text style={styles.progressCaption}>
                            TEAR THE PAPER
                        </Text>
                        <Text style={styles.progressCount}>
                            {tears.length}/{REQUIRED_TEARS}
                        </Text>
                    </View>

                    <View
                        style={styles.progressTrack}
                        accessibilityLabel={`${tears.length} of ${REQUIRED_TEARS} tears completed`}
                    >
                        {Array.from({ length: REQUIRED_TEARS }).map(
                            (_, index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles.progressMark,
                                        index < tears.length &&
                                        styles.progressMarkDone,
                                    ]}
                                />
                            )
                        )}
                    </View>

                    <Text style={styles.message} numberOfLines={2}>
                        {message}
                    </Text>
                </View>

                <View
                    style={styles.paperArea}
                    onLayout={handlePaperAreaLayout}
                >
                    {renderPaper()}
                </View>

                <View style={styles.gameHint}>
                    <View style={styles.hintDot} />
                    <Text style={styles.gameHintText}>
                        Swipe across the paper horizontally or vertically
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeScreen: {
        flex: 1,
        backgroundColor: C.bg,
    },

    scrollScreen: {
        flex: 1,
        backgroundColor: C.bg,
    },

    screen: {
        flex: 1,
        backgroundColor: C.bg,
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 5,
    },

    chapterLine: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        marginBottom: 8,
    },

    chapterRule: {
        height: 1,
        flex: 1,
        maxWidth: 42,
        backgroundColor: C.sage,
        opacity: 0.75,
    },

    eyebrow: {
        color: C.muted,
        fontSize: 9,
        fontWeight: "700",
        letterSpacing: 1.7,
        textAlign: "center",
    },

    featureTopline: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 7,
        borderBottomWidth: 1,
        borderBottomColor: C.goldLight,
    },

    featureLabel: {
        color: C.muted,
        fontSize: 8,
        fontWeight: "800",
        letterSpacing: 1.2,
    },

    featureNumber: {
        color: C.muted,
        fontSize: 8,
        fontWeight: "700",
        letterSpacing: 0.7,
    },

    featureCaptionRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 9,
        paddingTop: 7,
        borderTopWidth: 1,
        borderTopColor: C.goldLight,
    },

    captionRule: {
        height: 1,
        flex: 1,
        backgroundColor: C.border,
    },

    featureCaption: {
        color: C.muted,
        fontSize: 8,
        fontWeight: "700",
        letterSpacing: 1,
        textAlign: "center",
    },

    sectionLabel: {
        color: C.forest,
        fontSize: 9,
        fontWeight: "800",
        letterSpacing: 1.2,
        lineHeight: 14,
        marginBottom: 3,
    },

    cardText: {
        color: C.body,
        fontSize: 13,
        lineHeight: 20,
    },

    primaryButton: {
        minHeight: 48,
        backgroundColor: C.button,
        borderWidth: 1,
        borderColor: C.buttonBorder,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 16,
        marginTop: 0,
    },

    primaryButtonText: {
        color: C.ink,
        fontSize: 11,
        fontWeight: "800",
        letterSpacing: 1.3,
    },

    buttonArrow: {
        color: C.ink,
        fontSize: 18,
        fontWeight: "600",
        marginLeft: 10,
    },

    buttonPressed: {
        opacity: 0.86,
        backgroundColor: C.buttonPressed,
        transform: [{ scale: 0.99 }],
    },

    secondaryButton: {
        backgroundColor: "transparent",
        borderColor: C.border,
    },

    secondaryButtonText: {
        color: C.ink,
    },

    secondaryButtonArrow: {
        color: C.ink,
    },

    bottomHint: {
        color: C.muted,
        fontSize: 8,
        fontWeight: "700",
        letterSpacing: 1.4,
        textAlign: "center",
        marginTop: 9,
    },

    gameScreen: {
        paddingTop: 5,
        paddingBottom: 3,
    },

    compactGameScreen: {
        paddingTop: 3,
        paddingBottom: 2,
    },

    gameHeader: {
        flexShrink: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 5,
        gap: 6,
    },

    gameHeading: {
        flex: 1,
        alignItems: "flex-start",
        paddingRight: 2,
    },

    gameTitle: {
        color: C.ink,
        fontSize: 19,
        fontWeight: "800",
        marginTop: 3,
    },

    timer: {
        minWidth: 68,
        alignItems: "center",
        backgroundColor: "transparent",
        borderWidth: 0,
        borderLeftWidth: 1,
        borderColor: C.border,
        borderRadius: 0,
        paddingVertical: 4,
        paddingLeft: 12,
        paddingRight: 2,
    },

    timerUrgent: {
        borderColor: C.red,
        backgroundColor: "transparent",
    },

    timerCaption: {
        color: C.muted,
        fontSize: 8,
        letterSpacing: 1,
        fontWeight: "800",
    },

    timerValue: {
        color: C.ink,
        fontSize: 19,
        fontWeight: "800",
        fontVariant: ["tabular-nums"],
        marginTop: 1,
    },

    timerValueUrgent: {
        color: C.red,
    },

    progressArea: {
        flexShrink: 0,
        marginBottom: 1,
    },

    progressLabels: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4,
    },

    progressCaption: {
        color: C.muted,
        fontSize: 9,
        fontWeight: "800",
        letterSpacing: 1,
    },

    progressCount: {
        color: C.ink,
        fontSize: 11,
        fontWeight: "800",
        fontVariant: ["tabular-nums"],
    },

    progressTrack: {
        flexDirection: "row",
        height: 5,
    },

    progressMark: {
        flex: 1,
        backgroundColor: C.border,
        borderRadius: 1,
        marginHorizontal: 2,
    },

    progressMarkDone: {
        backgroundColor: C.forest,
    },

    message: {
        color: C.body,
        fontSize: 11,
        lineHeight: 16,
        marginTop: 5,
        minHeight: 16,
    },

    paperArea: {
        flex: 1,
        minHeight: 0,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 0,
    },

    paperOuter: {
        alignSelf: "center",
    },

    paperFrame: {
        flex: 1,
        width: "100%",
        overflow: "hidden",
        borderRadius: 2,
        borderWidth: 1,
        borderColor: C.border,
        backgroundColor: C.cream,
        elevation: 3,
        shadowColor: "#776B55",
        shadowOpacity: 0.16,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
    },

    paperImage: {
        ...StyleSheet.absoluteFillObject,
        width: "100%",
        height: "100%",
    },

    slashWrap: {
        position: "absolute",
        height: 5,
        justifyContent: "center",
        zIndex: 10,
    },

    slashGlow: {
        position: "absolute",
        left: -3,
        right: -3,
        height: 10,
        borderRadius: 6,
        backgroundColor: "rgba(215, 203, 176, 0.45)",
    },

    slashCore: {
        position: "absolute",
        left: 0,
        right: 0,
        height: 4,
        borderRadius: 4,
        backgroundColor: C.sage,
    },

    slashHighlight: {
        position: "absolute",
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: "#FFF8E9",
    },

    seamGlow: {
        backgroundColor: "rgba(215, 203, 176, 0.35)",
    },

    seamCore: {
        height: 3,
        backgroundColor: C.goldLight,
    },

    flash: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#FFFCF5",
    },

    gameHint: {
        flexShrink: 0,
        minHeight: 22,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 2,
    },

    hintDot: {
        width: 5,
        height: 5,
        borderRadius: 3,
        backgroundColor: C.sage,
        marginRight: 7,
    },

    gameHintText: {
        color: C.muted,
        fontSize: 10,
        lineHeight: 14,
        textAlign: "center",
    },

    completionScreen: {
        flexGrow: 1,
        paddingHorizontal: 18,
        paddingBottom: 18,
    },

    completionHeader: {
        flexShrink: 0,
        alignItems: "center",
        paddingBottom: 10,
    },

    successSeal: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: C.sage,
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 3,
        marginBottom: 3,
    },

    successSealText: {
        color: C.forest,
        fontSize: 17,
        fontWeight: "700",
    },

    completionTitle: {
        color: C.ink,
        fontSize: 28,
        lineHeight: 36,
        fontWeight: "800",
        letterSpacing: -0.3,
        textAlign: "center",
        marginTop: 5,
        flexShrink: 1,
    },

    completionSubtitle: {
        color: C.body,
        fontSize: 13,
        textAlign: "center",
        lineHeight: 19,
        marginTop: 5,
    },

    tornDocumentFeature: {
        backgroundColor: "transparent",
        borderRadius: 0,
        borderWidth: 0,
        paddingHorizontal: 0,
        paddingTop: 4,
        paddingBottom: 6,
        marginBottom: 12,
    },

    completionImageWrap: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 5,
    },

    completionImage: {
        width: "100%",
        height: "100%",
    },

    completionCard: {
        flexShrink: 0,
        width: "100%",
        backgroundColor: "transparent",
        borderWidth: 0,
        borderTopWidth: 1,
        borderColor: C.goldLight,
        borderRadius: 0,
        paddingHorizontal: 0,
        paddingVertical: 14,
    },

    completionCardTitle: {
        color: C.ink,
        fontSize: 17,
        fontWeight: "900",
        lineHeight: 22,
        marginBottom: 6,
    },

    completionAction: {
        marginTop: 14,
    },

    failureScreen: {
        paddingTop: 10,
        paddingBottom: 8,
    },

    failureContent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 2,
    },

    failureSeal: {
        width: 38,
        height: 38,
        borderRadius: 19,
        borderWidth: 1,
        borderColor: C.border,
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
    },

    failureSealText: {
        color: C.gold,
        fontSize: 25,
        fontWeight: "700",
    },

    failureCard: {
        alignSelf: "stretch",
        marginTop: 16,
        backgroundColor: "transparent",
        borderWidth: 0,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: C.border,
        borderRadius: 0,
        paddingHorizontal: 0,
        paddingVertical: 14,
    },

    failureCardTitle: {
        color: C.ink,
        fontSize: 16,
        fontWeight: "800",
        lineHeight: 21,
        marginBottom: 6,
    },
});