import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import {
    View,
    Text,
    Image,
    Pressable,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    ScrollView,
    useWindowDimensions,
    PanResponder,
    Animated,
} from "react-native";

const STARTING_TIME = 45;
const TIME_BONUS = 10;
const WRONG_ANSWER_PENALTY = 2;
const POINTS_PER_CORRECT = 100;
const MAX_ROUND_CHOICES = 4;

const COLORS = {
    // Cream is the main surface; green is reserved for structure and actions.
    background: "#F5EEDF",
    parchment: "#FFF9EC",
    parchmentDeep: "#F2EAD8",
    parchmentShadow: "#E6D8BC",
    panelBorder: "#D2BD8F",

    green: "#34483D",
    greenLight: "#506A58",
    greenSoft: "#E1E9DD",
    greenDeep: "#25382D",

    gold: "#C4A66A",
    goldDark: "#98783D",

    text: "#25312C",
    body: "#50574F",
    muted: "#778178",
    mutedLight: "#A6A89C",

    red: "#B94E3B",
    redSoft: "#F8E5DE",

    white: "#FFFFFF",
};

const CHARACTER_INFO = [
    { id: "rizal", name: "Dr. José Rizal" },
    { id: "bonifacio", name: "Andrés Bonifacio" },
    { id: "mabini", name: "Apolinario Mabini" },
    { id: "franco", name: "Domingo Franco" },
    { id: "dagohoy", name: "Francisco Dagohoy" },
    { id: "legazpi", name: "Miguel López de Legazpi" },
    { id: "dula", name: "Lakan Dula" },
    { id: "sulayman", name: "Rajah Sulayman" },
];

function shuffle(items) {
    const result = [...items];

    for (let i = result.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
}

function formatTime(seconds) {
    const safeSeconds = Math.max(0, seconds);
    const minutes = Math.floor(safeSeconds / 60);
    const remainingSeconds = safeSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
        remainingSeconds
    ).padStart(2, "0")}`;
}

export default function CharacterMatchingMinigame({
    characters = [],
    onComplete,
}) {
    const { width, height } = useWindowDimensions();

    const isNarrow = width < 380;
    const isCompact = height < 680;

    const choicesPerRound = useMemo(() => {
        if (isNarrow || isCompact) return 2;
        if (width < 600) return 3;
        return MAX_ROUND_CHOICES;
    }, [width, isNarrow, isCompact]);

    const [gameCharacters, setGameCharacters] = useState([]);
    const [roundStart, setRoundStart] = useState(0);
    const [roundChoiceOrder, setRoundChoiceOrder] = useState([]);

    const [matchedIds, setMatchedIds] = useState([]);
    const [selectedNameId, setSelectedNameId] = useState(null);

    const [timeLeft, setTimeLeft] = useState(STARTING_TIME);
    const [score, setScore] = useState(0);
    const [status, setStatus] = useState("ready");

    const [feedback, setFeedback] = useState(null);
    const [lastCorrectId, setLastCorrectId] = useState(null);
    const [lastWrongId, setLastWrongId] = useState(null);

    const [startedAt, setStartedAt] = useState(null);
    const [finishedAt, setFinishedAt] = useState(null);

    const feedbackTimeout = useRef(null);
    const transitionTimeout = useRef(null);

    const roundLock = useRef(false);
    const matchedRef = useRef([]);
    const scoreRef = useRef(0);
    const finishTimeRef = useRef(null);

    const targetRefs = useRef({});
    const dragValues = useRef({});
    const dragStartedRef = useRef(false);

    const normalizedCharacters = useMemo(() => {
        const supplied = Array.isArray(characters) ? characters : [];
        const byId = new Map(
            supplied.map((character) => [character.id, character])
        );

        return CHARACTER_INFO.map((info) => {
            const provided = byId.get(info.id);

            return {
                ...info,
                ...(provided || {}),
                id: info.id,
                name: info.name,
                image: provided?.image ?? provided?.portrait,
            };
        });
    }, [characters]);

    const validCharacters = useMemo(
        () =>
            normalizedCharacters.filter(
                (character) => character.image != null
            ),
        [normalizedCharacters]
    );

    const currentRound = useMemo(
        () =>
            gameCharacters.slice(
                roundStart,
                roundStart + choicesPerRound
            ),
        [gameCharacters, roundStart, choicesPerRound]
    );

    const currentRoundIds = useMemo(
        () => currentRound.map((character) => character.id),
        [currentRound]
    );

    // The order is stored in state rather than randomly regenerated on
    // every render. Timer ticks therefore cannot reshuffle the choices.
    const roundChoices = useMemo(() => {
        const byId = new Map(
            currentRound.map((character) => [character.id, character])
        );

        return roundChoiceOrder
            .map((id) => byId.get(id))
            .filter(Boolean);
    }, [roundChoiceOrder, currentRound]);

    const matchedSet = useMemo(
        () => new Set(matchedIds),
        [matchedIds]
    );

    const completedCount = matchedIds.length;
    const totalCharacters = gameCharacters.length || 8;
    const progress = totalCharacters
        ? completedCount / totalCharacters
        : 0;

    const clearPendingTimeouts = useCallback(() => {
        if (feedbackTimeout.current) {
            clearTimeout(feedbackTimeout.current);
            feedbackTimeout.current = null;
        }

        if (transitionTimeout.current) {
            clearTimeout(transitionTimeout.current);
            transitionTimeout.current = null;
        }
    }, []);

    useEffect(
        () => () => {
            clearPendingTimeouts();
        },
        [clearPendingTimeouts]
    );

    const finishGame = useCallback((result) => {
        if (finishTimeRef.current !== null) return;

        const now = Date.now();

        finishTimeRef.current = now;
        setFinishedAt(now);
        setSelectedNameId(null);
        roundLock.current = true;
        setStatus(result);
    }, []);

    const startGame = useCallback(() => {
        clearPendingTimeouts();

        const playable = shuffle(
            normalizedCharacters.filter(
                (character) => character.image != null
            )
        );

        setSelectedNameId(null);
        setFeedback(null);
        setLastCorrectId(null);
        setLastWrongId(null);
        setFinishedAt(null);
        finishTimeRef.current = null;
        roundLock.current = false;
        matchedRef.current = [];
        scoreRef.current = 0;
        targetRefs.current = {};

        if (playable.length !== 8) {
            setGameCharacters(playable);
            setStatus("setupError");
            return;
        }

        setGameCharacters(playable);
        setRoundStart(0);
        setRoundChoiceOrder(
            shuffle(playable.slice(0, choicesPerRound)).map(
                (character) => character.id
            )
        );

        setMatchedIds([]);
        setTimeLeft(STARTING_TIME);
        setScore(0);
        setStartedAt(Date.now());
        setStatus("playing");
    }, [
        clearPendingTimeouts,
        normalizedCharacters,
        choicesPerRound,
    ]);

    // One countdown interval is active while a game is in progress.
    useEffect(() => {
        if (status !== "playing") return undefined;

        const interval = setInterval(() => {
            setTimeLeft((previous) => {
                if (previous <= 1) {
                    clearInterval(interval);

                    if (finishTimeRef.current === null) {
                        finishGame("gameover");
                    }

                    return 0;
                }

                return previous - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [status, finishGame]);

    const elapsedSeconds = useMemo(() => {
        if (!startedAt) return 0;

        const endTime = finishedAt ?? Date.now();

        return Math.max(
            0,
            Math.floor((endTime - startedAt) / 1000)
        );
    }, [startedAt, finishedAt]);

    const selectName = useCallback(
        (character) => {
            if (status !== "playing" || roundLock.current) return;
            if (matchedSet.has(character.id)) return;

            setSelectedNameId((previous) =>
                previous === character.id ? null : character.id
            );

            setFeedback(null);
            setLastWrongId(null);
            setLastCorrectId(null);
        },
        [status, matchedSet]
    );

    const selectPortrait = useCallback(
        (target, draggedNameId = null) => {
            if (status !== "playing" || roundLock.current) return;
            if (matchedSet.has(target.id)) return;

            const nameId = draggedNameId || selectedNameId;

            if (!nameId) {
                setFeedback({
                    type: "hint",
                    text: "Choose a name, then tap its portrait or matching box.",
                });
                return;
            }

            if (matchedSet.has(nameId)) {
                setSelectedNameId(null);
                return;
            }

            if (nameId === target.id) {
                const nextMatched = [...matchedRef.current];

                // Prevent double scoring from rapid or repeated touches.
                if (nextMatched.includes(target.id)) return;

                nextMatched.push(target.id);
                matchedRef.current = nextMatched;

                setMatchedIds(nextMatched);
                setSelectedNameId(null);
                setLastCorrectId(target.id);
                setLastWrongId(null);

                const pointsEarned =
                    POINTS_PER_CORRECT + Math.max(0, timeLeft) * 2;

                scoreRef.current += pointsEarned;
                setScore(scoreRef.current);

                setTimeLeft((previous) => previous + TIME_BONUS);

                setFeedback({
                    type: "correct",
                    text: `Correct! +${pointsEarned} points · +${TIME_BONUS}s`,
                });

                if (nextMatched.length === gameCharacters.length) {
                    roundLock.current = true;

                    transitionTimeout.current = setTimeout(() => {
                        finishGame("complete");
                    }, 450);

                    return;
                }

                const roundComplete = currentRoundIds.every((id) =>
                    nextMatched.includes(id)
                );

                if (roundComplete) {
                    roundLock.current = true;

                    transitionTimeout.current = setTimeout(() => {
                        const nextStart =
                            roundStart + choicesPerRound;

                        setRoundStart(nextStart);

                        const nextRound = gameCharacters.slice(
                            nextStart,
                            nextStart + choicesPerRound
                        );

                        setRoundChoiceOrder(
                            shuffle(nextRound).map(
                                (character) => character.id
                            )
                        );

                        setLastCorrectId(null);
                        setLastWrongId(null);
                        setFeedback(null);
                        roundLock.current = false;
                    }, 450);
                } else {
                    feedbackTimeout.current = setTimeout(() => {
                        setFeedback((previous) =>
                            previous?.type === "correct"
                                ? null
                                : previous
                        );
                    }, 1600);
                }

                return;
            }

            // Incorrect matches keep the original penalty and scoring rules.
            setLastWrongId(target.id);
            setLastCorrectId(null);
            setSelectedNameId(null);

            setTimeLeft((previous) =>
                Math.max(0, previous - WRONG_ANSWER_PENALTY)
            );

            setFeedback({
                type: "wrong",
                text: `Not quite. Try another match. −${WRONG_ANSWER_PENALTY}s`,
            });

            if (feedbackTimeout.current) {
                clearTimeout(feedbackTimeout.current);
            }

            feedbackTimeout.current = setTimeout(() => {
                setLastWrongId(null);
                setFeedback((previous) =>
                    previous?.type === "wrong" ? null : previous
                );
            }, 1000);
        },
        [
            status,
            matchedSet,
            selectedNameId,
            timeLeft,
            gameCharacters,
            currentRoundIds,
            roundStart,
            choicesPerRound,
            finishGame,
        ]
    );

    // Measures the visible portrait targets in screen coordinates.
    // This works with native touch gestures on Android and iOS.
    const dropNameOnPortrait = useCallback(
        async (character, screenX, screenY) => {
            if (status !== "playing" || roundLock.current) return;

            const measurements = await Promise.all(
                currentRound.map(
                    (target) =>
                        new Promise((resolve) => {
                            const node = targetRefs.current[target.id];

                            if (
                                !node ||
                                typeof node.measureInWindow !== "function"
                            ) {
                                resolve(null);
                                return;
                            }

                            node.measureInWindow((x, y, w, h) => {
                                resolve({
                                    target,
                                    x,
                                    y,
                                    width: w,
                                    height: h,
                                });
                            });
                        })
                )
            );

            const hit = measurements.find(
                (rect) =>
                    rect &&
                    screenX >= rect.x &&
                    screenX <= rect.x + rect.width &&
                    screenY >= rect.y &&
                    screenY <= rect.y + rect.height
            );

            if (hit) {
                selectPortrait(hit.target, character.id);
            } else {
                // If the drag misses, select the name so the player can
                // finish with a simple tap on the intended portrait.
                selectName(character);
            }
        },
        [status, currentRound, selectPortrait, selectName]
    );

    const getDragValue = (id) => {
        if (!dragValues.current[id]) {
            dragValues.current[id] = new Animated.ValueXY({
                x: 0,
                y: 0,
            });
        }

        return dragValues.current[id];
    };

    const renderHeader = () => (
        <View style={styles.header}>
            <Text style={styles.eyebrow}>PHILIPPINE HISTORY</Text>
            <Text style={styles.title}>Who Am I?</Text>
            <Text style={styles.subtitle}>
                Match each historical figure to the correct name.
            </Text>
        </View>
    );

    const renderProgress = () => (
        <View style={styles.statsPanel}>
            <View style={styles.statCell}>
                <Text style={styles.statLabel}>TIME LEFT</Text>
                <Text
                    style={[
                        styles.statValue,
                        timeLeft <= 10 && styles.dangerText,
                    ]}
                >
                    {formatTime(timeLeft)}
                </Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statCell}>
                <Text style={styles.statLabel}>SCORE</Text>
                <Text style={styles.statValue}>
                    {score.toLocaleString()}
                </Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statCell}>
                <Text style={styles.statLabel}>MATCHED</Text>
                <Text style={styles.statValue}>
                    {completedCount}/{totalCharacters}
                </Text>
            </View>

            <View style={styles.progressTrack}>
                <View
                    style={[
                        styles.progressFill,
                        { width: `${progress * 100}%` },
                    ]}
                />
            </View>
        </View>
    );

    const renderGameBoard = () => (
        <View style={styles.board}>
            <View style={styles.boardHeading}>
                <Text style={styles.sectionTitle}>
                    MATCH THE HISTORICAL FIGURES
                </Text>
                <Text style={styles.instruction}>
                    Drag a name to a portrait, or tap a name and then a portrait.
                </Text>
            </View>

            <View style={styles.matchingColumns}>
                {/* Portraits and their answer targets */}
                <View style={styles.portraitColumn}>
                    {currentRound.map((character, index) => {
                        const isMatched = matchedSet.has(character.id);
                        const isCorrect = lastCorrectId === character.id;
                        const isWrong = lastWrongId === character.id;

                        return (
                            <Pressable
                                key={character.id}
                                ref={(node) => {
                                    if (node) {
                                        targetRefs.current[character.id] = node;
                                    } else {
                                        delete targetRefs.current[character.id];
                                    }
                                }}
                                onPress={() => selectPortrait(character)}
                                disabled={
                                    isMatched || status !== "playing"
                                }
                                accessibilityRole="button"
                                accessibilityLabel={
                                    isMatched
                                        ? `${character.name}, matched`
                                        : `Portrait ${index + 1}, matching target`
                                }
                                style={({ pressed }) => [
                                    styles.portraitRow,
                                    isMatched && styles.portraitRowMatched,
                                    isCorrect && styles.portraitRowCorrect,
                                    isWrong && styles.portraitRowWrong,
                                    pressed &&
                                    !isMatched &&
                                    styles.portraitRowPressed,
                                ]}
                            >
                                <View style={styles.imageFrame}>
                                    <Image
                                        source={character.image}
                                        style={styles.portrait}
                                        resizeMode="cover"
                                        accessibilityLabel={
                                            isMatched
                                                ? character.name
                                                : "Historical portrait"
                                        }
                                    />

                                    {isMatched ? (
                                        <View
                                            pointerEvents="none"
                                            style={styles.matchedOverlay}
                                        />
                                    ) : null}
                                </View>

                                <View
                                    style={[
                                        styles.answerBox,
                                        isMatched &&
                                        styles.answerBoxMatched,
                                        isWrong && styles.answerBoxWrong,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.answerText,
                                            isMatched &&
                                            styles.answerTextMatched,
                                        ]}
                                        numberOfLines={3}
                                        adjustsFontSizeToFit
                                        minimumFontScale={0.78}
                                    >
                                        {isMatched
                                            ? character.name
                                            : "Drop name here"}
                                    </Text>
                                </View>
                            </Pressable>
                        );
                    })}
                </View>

                {/* Available names stay immediately beside the targets */}
                <View style={styles.namesColumn}>
                    <Text style={styles.namesHeading}>AVAILABLE NAMES</Text>

                    {roundChoices.map((character) => {
                        const isMatched = matchedSet.has(character.id);
                        const isSelected =
                            selectedNameId === character.id;

                        const pan = getDragValue(character.id);

                        const panResponder = PanResponder.create({
                            onStartShouldSetPanResponder: () => false,

                            onMoveShouldSetPanResponder: (_, gesture) =>
                                !isMatched &&
                                status === "playing" &&
                                (Math.abs(gesture.dx) > 5 ||
                                    Math.abs(gesture.dy) > 5),

                            onPanResponderGrant: () => {
                                dragStartedRef.current = true;
                                setSelectedNameId(character.id);
                                setFeedback(null);
                            },

                            onPanResponderMove: Animated.event(
                                [null, { dx: pan.x, dy: pan.y }],
                                { useNativeDriver: false }
                            ),

                            onPanResponderRelease: (_, gesture) => {
                                const dropX = gesture.moveX;
                                const dropY = gesture.moveY;

                                dropNameOnPortrait(
                                    character,
                                    dropX,
                                    dropY
                                );

                                Animated.spring(pan, {
                                    toValue: { x: 0, y: 0 },
                                    useNativeDriver: false,
                                    speed: 24,
                                    bounciness: 3,
                                }).start();

                                setTimeout(() => {
                                    dragStartedRef.current = false;
                                }, 80);
                            },

                            onPanResponderTerminate: () => {
                                Animated.spring(pan, {
                                    toValue: { x: 0, y: 0 },
                                    useNativeDriver: false,
                                    speed: 24,
                                    bounciness: 3,
                                }).start();

                                dragStartedRef.current = false;
                            },
                        });

                        return (
                            <Animated.View
                                key={character.id}
                                {...panResponder.panHandlers}
                                style={[
                                    styles.nameOptionWrapper,
                                    {
                                        transform: [
                                            { translateX: pan.x },
                                            { translateY: pan.y },
                                        ],
                                    },
                                    isSelected &&
                                    styles.nameOptionWrapperSelected,
                                    isMatched &&
                                    styles.nameOptionWrapperMatched,
                                ]}
                            >
                                <Pressable
                                    onPress={() => {
                                        if (dragStartedRef.current) return;
                                        selectName(character);
                                    }}
                                    disabled={
                                        isMatched || status !== "playing"
                                    }
                                    accessibilityRole="button"
                                    accessibilityLabel={character.name}
                                    accessibilityState={{
                                        selected: isSelected,
                                        disabled: isMatched,
                                    }}
                                    style={({ pressed }) => [
                                        styles.nameOption,
                                        isSelected &&
                                        styles.nameOptionSelected,
                                        isMatched &&
                                        styles.nameOptionMatched,
                                        pressed &&
                                        !isMatched &&
                                        styles.nameOptionPressed,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.nameText,
                                            isSelected &&
                                            styles.nameTextSelected,
                                            isMatched &&
                                            styles.nameTextMatched,
                                        ]}
                                        numberOfLines={3}
                                        adjustsFontSizeToFit
                                        minimumFontScale={0.78}
                                    >
                                        {isMatched ? "✓  " : ""}
                                        {character.name}
                                    </Text>
                                </Pressable>
                            </Animated.View>
                        );
                    })}
                </View>
            </View>

            {feedback ? (
                <View
                    accessibilityLiveRegion="polite"
                    style={[
                        styles.feedbackBox,
                        feedback.type === "correct" &&
                        styles.feedbackCorrect,
                        feedback.type === "wrong" &&
                        styles.feedbackWrong,
                        feedback.type === "hint" &&
                        styles.feedbackHint,
                    ]}
                >
                    <Text style={styles.feedbackText}>
                        {feedback.text}
                    </Text>
                </View>
            ) : null}
        </View>
    );

    const renderEndScreen = (isComplete) => (
        <View style={styles.endPanel}>
            <Text style={styles.endIcon}>
                {isComplete ? "✦" : "⌛"}
            </Text>

            <Text style={styles.endTitle}>
                {isComplete ? "Well Done!" : "Time’s Up"}
            </Text>

            <Text style={styles.endDescription}>
                {isComplete
                    ? "You identified all eight historical figures."
                    : "Your time has run out. Review your score and try again."}
            </Text>

            <View style={styles.resultStats}>
                <View style={styles.resultStat}>
                    <Text style={styles.resultLabel}>FINAL SCORE</Text>
                    <Text style={styles.resultValue}>
                        {score.toLocaleString()}
                    </Text>
                </View>

                <View style={styles.resultStat}>
                    <Text style={styles.resultLabel}>TIME ELAPSED</Text>
                    <Text style={styles.resultValue}>
                        {formatTime(elapsedSeconds)}
                    </Text>
                </View>

                <View style={styles.resultStat}>
                    <Text style={styles.resultLabel}>MATCHED</Text>
                    <Text style={styles.resultValue}>
                        {completedCount}/8
                    </Text>
                </View>
            </View>

            <Pressable
                style={({ pressed }) => [
                    styles.primaryButton,
                    pressed && styles.primaryButtonPressed,
                ]}
                onPress={startGame}
                accessibilityRole="button"
            >
                <Text style={styles.primaryButtonText}>
                    {isComplete ? "PLAY AGAIN" : "RETRY"}
                </Text>
            </Pressable>

            {isComplete && onComplete ? (
                <Pressable
                    style={({ pressed }) => [
                        styles.secondaryButton,
                        pressed && styles.secondaryButtonPressed,
                    ]}
                    onPress={onComplete}
                    accessibilityRole="button"
                >
                    <Text style={styles.secondaryButtonText}>
                        CONTINUE STORY
                    </Text>
                </Pressable>
            ) : null}
        </View>
    );

    if (status === "ready") {
        return (
            <SafeAreaView style={styles.safeArea}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor={COLORS.background}
                />

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.introScrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.container}>
                        {renderHeader()}

                        <View style={styles.introPanel}>
                            <View style={styles.introAccent} />

                            <Text style={styles.introEyebrow}>
                                YOUR NEXT CHALLENGE
                            </Text>

                            <Text style={styles.introTitle}>
                                Know Your History
                            </Text>

                            <Text style={styles.introText}>
                                Match eight important figures from Philippine
                                history with their portraits.
                            </Text>

                            <View style={styles.rulesList}>
                                <View style={styles.ruleRow}>
                                    <Text style={styles.ruleBullet}>01</Text>
                                    <Text style={styles.ruleText}>
                                        Start with {STARTING_TIME} seconds.
                                    </Text>
                                </View>

                                <View style={styles.ruleRow}>
                                    <Text style={styles.ruleBullet}>02</Text>
                                    <Text style={styles.ruleText}>
                                        Correct matches earn points and add{" "}
                                        {TIME_BONUS} seconds.
                                    </Text>
                                </View>

                                <View style={styles.ruleRow}>
                                    <Text style={styles.ruleBullet}>03</Text>
                                    <Text style={styles.ruleText}>
                                        Wrong matches cost{" "}
                                        {WRONG_ANSWER_PENALTY} seconds.
                                    </Text>
                                </View>
                            </View>

                            {validCharacters.length !== 8 ? (
                                <Text style={styles.setupWarning}>
                                    Portrait setup incomplete:{" "}
                                    {validCharacters.length}/8 images received.
                                    Check the character asset mapping in
                                    compilation.jsx.
                                </Text>
                            ) : null}

                            <Pressable
                                onPress={startGame}
                                style={({ pressed }) => [
                                    styles.primaryButton,
                                    styles.beginButton,
                                    pressed &&
                                    styles.primaryButtonPressed,
                                ]}
                                accessibilityRole="button"
                            >
                                <Text style={styles.primaryButtonText}>
                                    BEGIN CHALLENGE
                                </Text>
                                <Text style={styles.buttonArrow}>→</Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    if (status === "setupError") {
        return (
            <SafeAreaView style={styles.safeArea}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor={COLORS.background}
                />

                <ScrollView
                    contentContainerStyle={styles.introScrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.container}>
                        {renderHeader()}

                        <View style={styles.endPanel}>
                            <Text style={styles.endIcon}>!</Text>
                            <Text style={styles.endTitle}>
                                Portraits Missing
                            </Text>

                            <Text style={styles.endDescription}>
                                This game needs all eight character portraits.
                                Check that each character in compilation.jsx
                                has the correct id and an image property
                                referencing its existing asset.
                            </Text>

                            <Pressable
                                style={styles.primaryButton}
                                onPress={() => setStatus("ready")}
                                accessibilityRole="button"
                            >
                                <Text style={styles.primaryButtonText}>
                                    BACK
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={COLORS.background}
            />

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.gameScrollContent}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled
            >
                <View style={styles.container}>
                    {renderHeader()}

                    {status === "playing" ? (
                        <>
                            {renderProgress()}
                            {renderGameBoard()}
                        </>
                    ) : (
                        renderEndScreen(status === "complete")
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    scrollView: {
        flex: 1,
    },

    introScrollContent: {
        flexGrow: 1,
        paddingBottom: 20,
    },

    gameScrollContent: {
        flexGrow: 1,
        paddingBottom: 18,
    },

    container: {
        width: "100%",
        maxWidth: 620,
        alignSelf: "center",
        paddingHorizontal: 14,
        paddingTop: 12,
        paddingBottom: 10,
    },

    // Header
    header: {
        alignItems: "center",
        marginBottom: 12,
    },

    eyebrow: {
        color: COLORS.goldDark,
        fontSize: 10,
        letterSpacing: 2.2,
        fontWeight: "800",
        marginBottom: 3,
        textAlign: "center",
    },

    title: {
        color: COLORS.green,
        fontSize: 27,
        fontWeight: "900",
        letterSpacing: 0.2,
        textAlign: "center",
    },

    subtitle: {
        color: COLORS.body,
        fontSize: 12,
        lineHeight: 17,
        textAlign: "center",
        marginTop: 3,
        paddingHorizontal: 8,
    },

    // Compact parchment stats card
    statsPanel: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        backgroundColor: COLORS.parchment,
        borderColor: COLORS.panelBorder,
        borderWidth: 1,
        borderRadius: 14,
        paddingHorizontal: 9,
        paddingTop: 9,
        paddingBottom: 11,
        marginBottom: 12,
    },

    statCell: {
        flex: 1,
        minWidth: 60,
        alignItems: "center",
        justifyContent: "center",
    },

    statDivider: {
        height: 27,
        width: 1,
        backgroundColor: COLORS.parchmentShadow,
    },

    statLabel: {
        color: COLORS.muted,
        fontSize: 9,
        fontWeight: "800",
        letterSpacing: 0.8,
    },

    statValue: {
        color: COLORS.green,
        fontSize: 18,
        fontWeight: "900",
        marginTop: 2,
        fontVariant: ["tabular-nums"],
    },

    dangerText: {
        color: COLORS.red,
    },

    progressTrack: {
        height: 5,
        backgroundColor: COLORS.parchmentShadow,
        borderRadius: 5,
        width: "100%",
        marginTop: 9,
        overflow: "hidden",
    },

    progressFill: {
        height: "100%",
        backgroundColor: COLORS.greenLight,
        borderRadius: 5,
    },

    // Game board
    board: {
        backgroundColor: COLORS.parchment,
        borderColor: COLORS.panelBorder,
        borderWidth: 1,
        borderRadius: 18,
        padding: 10,
        shadowColor: "#4B3E27",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 2,
    },

    boardHeading: {
        alignItems: "center",
        marginBottom: 10,
    },

    sectionTitle: {
        color: COLORS.green,
        fontSize: 11,
        fontWeight: "900",
        letterSpacing: 0.8,
        textAlign: "center",
    },

    instruction: {
        color: COLORS.body,
        fontSize: 11,
        lineHeight: 15,
        textAlign: "center",
        marginTop: 4,
        paddingHorizontal: 2,
    },

    matchingColumns: {
        flexDirection: "row",
        alignItems: "stretch",
    },

    portraitColumn: {
        flex: 1,
        minWidth: 0,
        paddingRight: 5,
        paddingTop: 23,
    },

    namesColumn: {
        flex: 1,
        minWidth: 0,
        paddingLeft: 5,
    },

    namesHeading: {
        color: COLORS.goldDark,
        fontSize: 9,
        fontWeight: "900",
        letterSpacing: 0.5,
        textAlign: "center",
        marginBottom: 7,
        minHeight: 16,
        textAlignVertical: "center",
    },

    portraitRow: {
        flexDirection: "row",
        alignItems: "stretch",
        minWidth: 0,
        minHeight: 92,
        padding: 5,
        marginBottom: 7,
        borderRadius: 11,
        borderWidth: 1,
        borderColor: COLORS.panelBorder,
        backgroundColor: COLORS.parchmentDeep,
    },

    portraitRowMatched: {
        borderColor: COLORS.greenLight,
        backgroundColor: COLORS.greenSoft,
    },

    portraitRowCorrect: {
        borderColor: COLORS.greenLight,
        borderWidth: 2,
    },

    portraitRowWrong: {
        borderColor: COLORS.red,
        borderWidth: 2,
    },

    portraitRowPressed: {
        opacity: 0.78,
    },

    imageFrame: {
        width: 52,
        minWidth: 42,
        height: 80,
        borderRadius: 7,
        backgroundColor: COLORS.parchmentShadow,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        alignSelf: "center",
    },

    portrait: {
        width: "100%",
        height: "100%",
    },

    matchedOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(52, 72, 61, 0.48)",
        alignItems: "center",
        justifyContent: "center",
    },

    checkmark: {
        color: COLORS.white,
        fontSize: 27,
        fontWeight: "900",
        textShadowColor: "#26352B",
        textShadowRadius: 4,
    },

    answerBox: {
        flex: 1,
        minWidth: 0,
        minHeight: 80,
        marginLeft: 5,
        paddingVertical: 5,
        paddingHorizontal: 3,
        borderRadius: 7,
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: COLORS.gold,
        backgroundColor: COLORS.parchment,
        justifyContent: "center",
        alignItems: "center",
    },

    answerBoxMatched: {
        backgroundColor: COLORS.greenSoft,
        borderColor: COLORS.greenLight,
        borderStyle: "solid",
    },

    answerBoxWrong: {
        borderColor: COLORS.red,
    },

    answerText: {
        color: COLORS.muted,
        fontSize: 10,
        lineHeight: 13,
        fontWeight: "700",
        textAlign: "center",
    },

    answerTextMatched: {
        color: COLORS.greenDeep,
        fontSize: 10,
        fontWeight: "800",
    },

    // Name chips
    nameOptionWrapper: {
        marginBottom: 7,
        borderRadius: 9,
        zIndex: 1,
    },

    nameOptionWrapperSelected: {
        zIndex: 10,
        elevation: 5,
    },

    nameOptionWrapperMatched: {
        opacity: 0.72,
    },

    nameOption: {
        minHeight: 92,
        paddingVertical: 7,
        paddingHorizontal: 5,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 9,
        borderWidth: 1,
        borderColor: COLORS.panelBorder,
        backgroundColor: COLORS.parchmentDeep,
    },

    nameOptionSelected: {
        backgroundColor: "#E5D5AE",
        borderColor: COLORS.goldDark,
        borderWidth: 2,
    },

    nameOptionMatched: {
        backgroundColor: COLORS.greenSoft,
        borderColor: COLORS.greenLight,
    },

    nameOptionPressed: {
        opacity: 0.78,
    },

    nameText: {
        color: COLORS.text,
        textAlign: "center",
        fontSize: 12,
        lineHeight: 16,
        fontWeight: "800",
    },

    nameTextSelected: {
        color: COLORS.greenDeep,
        fontWeight: "900",
    },

    nameTextMatched: {
        color: COLORS.green,
    },

    // Feedback
    feedbackBox: {
        paddingVertical: 9,
        paddingHorizontal: 10,
        marginTop: 5,
        borderRadius: 9,
        borderWidth: 1,
    },

    feedbackCorrect: {
        backgroundColor: COLORS.greenSoft,
        borderColor: COLORS.greenLight,
    },

    feedbackWrong: {
        backgroundColor: COLORS.redSoft,
        borderColor: COLORS.red,
    },

    feedbackHint: {
        backgroundColor: COLORS.parchmentDeep,
        borderColor: COLORS.panelBorder,
    },

    feedbackText: {
        color: COLORS.text,
        textAlign: "center",
        fontSize: 11,
        lineHeight: 16,
        fontWeight: "700",
    },

    // Intro
    introPanel: {
        width: "100%",
        alignItems: "center",
        backgroundColor: COLORS.parchment,
        borderRadius: 20,
        borderColor: COLORS.panelBorder,
        borderWidth: 1,
        paddingHorizontal: 19,
        paddingTop: 18,
        paddingBottom: 20,
        shadowColor: "#4B3E27",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.09,
        shadowRadius: 8,
        elevation: 3,
    },

    introAccent: {
        width: 44,
        height: 4,
        borderRadius: 4,
        backgroundColor: COLORS.gold,
        marginBottom: 15,
    },

    introEyebrow: {
        color: COLORS.goldDark,
        fontSize: 10,
        letterSpacing: 1.8,
        fontWeight: "900",
        textAlign: "center",
    },

    introTitle: {
        color: COLORS.green,
        fontSize: 23,
        lineHeight: 29,
        fontWeight: "900",
        textAlign: "center",
        marginTop: 5,
    },

    introText: {
        color: COLORS.body,
        fontSize: 13,
        lineHeight: 19,
        textAlign: "center",
        marginTop: 9,
        maxWidth: 340,
    },

    rulesList: {
        width: "100%",
        marginTop: 19,
        marginBottom: 10,
        padding: 12,
        borderRadius: 12,
        backgroundColor: "#EDE2CC",
        borderWidth: 1,
        borderColor: "#E1D0AD",
    },

    ruleRow: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
    },

    ruleBullet: {
        width: 29,
        color: COLORS.goldDark,
        fontSize: 11,
        fontWeight: "900",
    },

    ruleText: {
        flex: 1,
        color: COLORS.text,
        fontSize: 12,
        lineHeight: 17,
    },

    setupWarning: {
        color: COLORS.red,
        fontSize: 12,
        lineHeight: 18,
        textAlign: "center",
        marginTop: 10,
        marginBottom: 4,
    },

    // Buttons
    primaryButton: {
        minHeight: 48,
        minWidth: 190,
        paddingHorizontal: 22,
        paddingVertical: 13,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.green,
        borderWidth: 1,
        borderColor: COLORS.greenLight,
        borderRadius: 12,
        marginTop: 12,
    },

    beginButton: {
        width: "100%",
        flexDirection: "row",
        marginTop: 14,
    },

    primaryButtonPressed: {
        backgroundColor: COLORS.greenDeep,
        transform: [{ scale: 0.985 }],
    },

    primaryButtonText: {
        color: COLORS.parchment,
        fontSize: 12,
        fontWeight: "900",
        letterSpacing: 1,
        textAlign: "center",
    },

    buttonArrow: {
        position: "absolute",
        right: 18,
        color: COLORS.parchment,
        fontSize: 20,
        fontWeight: "700",
    },

    secondaryButton: {
        minHeight: 46,
        minWidth: 190,
        paddingHorizontal: 18,
        paddingVertical: 12,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: COLORS.greenLight,
        backgroundColor: COLORS.parchment,
        borderRadius: 12,
        marginTop: 10,
    },

    secondaryButtonPressed: {
        backgroundColor: COLORS.greenSoft,
    },

    secondaryButtonText: {
        color: COLORS.green,
        fontSize: 11,
        fontWeight: "900",
        letterSpacing: 1,
    },

    // Results
    endPanel: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 18,
        paddingVertical: 24,
        backgroundColor: COLORS.parchment,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.panelBorder,
    },

    endIcon: {
        color: COLORS.goldDark,
        fontSize: 38,
        fontWeight: "800",
        marginBottom: 6,
    },

    endTitle: {
        color: COLORS.green,
        fontSize: 27,
        lineHeight: 34,
        fontWeight: "900",
        textAlign: "center",
    },

    endDescription: {
        color: COLORS.body,
        fontSize: 13,
        lineHeight: 20,
        textAlign: "center",
        maxWidth: 350,
        marginTop: 8,
    },

    resultStats: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: COLORS.parchmentDeep,
        borderColor: COLORS.panelBorder,
        borderWidth: 1,
        borderRadius: 12,
        paddingVertical: 15,
        marginTop: 22,
        marginBottom: 12,
    },

    resultStat: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 3,
    },

    resultLabel: {
        color: COLORS.body,
        fontSize: 9,
        letterSpacing: 0.5,
        fontWeight: "800",
        textAlign: "center",
    },

    resultValue: {
        color: COLORS.green,
        fontSize: 18,
        fontWeight: "900",
        marginTop: 5,
        textAlign: "center",
    },
});