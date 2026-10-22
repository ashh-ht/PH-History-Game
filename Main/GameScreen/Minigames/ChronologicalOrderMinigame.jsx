import React, {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    StatusBar,
    useWindowDimensions,
} from "react-native";

const START_SECONDS = 45;
const BONUS_SECONDS = 10;
const TICK_MS = 200;
const CARD_GAP = 6;

const EVENT_LIBRARY = {
    legazpi: {
        id: "legazpi",
        date: "1565",
        sortDate: 1565,
        text: "Miguel López de Legazpi establishes a permanent Spanish settlement in Cebu.",
    },
    dagohoy: {
        id: "dagohoy",
        date: "1744",
        sortDate: 1744,
        text: "Francisco Dagohoy's rebellion begins in Bohol.",
    },
    liga: {
        id: "liga",
        date: "July 3, 1892",
        sortDate: 18920703,
        text: "José Rizal helps establish La Liga Filipina.",
    },
    katipunan: {
        id: "katipunan",
        date: "July 7, 1892",
        sortDate: 18920707,
        text: "Andrés Bonifacio and fellow patriots establish the Katipunan.",
    },
    pugadLawin: {
        id: "pugadLawin",
        date: "Commonly dated August 23, 1896",
        sortDate: 18960823,
        text: "The Cry of Pugad Lawin marks an open break with Spanish colonial rule.",
    },
    rizalExecution: {
        id: "rizalExecution",
        date: "December 30, 1896",
        sortDate: 18961230,
        text: "José Rizal is executed at Bagumbayan.",
    },
};

const ROUNDS = [
    {
        title: "The Roots of Resistance",
        subtitle: "Arrange the events from earliest to latest.",
        eventIds: ["legazpi", "dagohoy", "liga", "katipunan"],
    },
    {
        title: "The Road to Revolution",
        subtitle: "Place these milestones in chronological order.",
        eventIds: [
            "dagohoy",
            "liga",
            "katipunan",
            "pugadLawin",
            "rizalExecution",
        ],
    },
    {
        title: "The Revolution Unfolds",
        subtitle: "Arrange all six milestones.",
        eventIds: [
            "legazpi",
            "dagohoy",
            "liga",
            "katipunan",
            "pugadLawin",
            "rizalExecution",
        ],
    },
];

const shuffle = (items) => {
    const result = [...items];

    for (let i = result.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }

    if (
        result.length > 1 &&
        result.every((item, index) => item.id === items[index].id)
    ) {
        [result[0], result[1]] = [result[1], result[0]];
    }

    return result;
};

const moveItem = (items, fromIndex, toIndex) => {
    if (
        fromIndex < 0 ||
        fromIndex >= items.length ||
        toIndex < 0 ||
        toIndex >= items.length ||
        fromIndex === toIndex
    ) {
        return items;
    }

    const result = [...items];
    const [item] = result.splice(fromIndex, 1);
    result.splice(toIndex, 0, item);

    return result;
};

const getCorrectOrder = (eventIds) =>
    eventIds
        .map((id) => EVENT_LIBRARY[id])
        .filter(Boolean)
        .sort((a, b) => a.sortDate - b.sortDate);

// A card is just text + two arrow buttons. There is NO gesture handler on the
// card, so the list scrolls normally no matter where the finger starts.
function TimelineCard({
    event,
    index,
    total,
    justMoved,
    disabled,
    onMove,
    compact,
}) {
    const canUp = !disabled && index > 0;
    const canDown = !disabled && index < total - 1;

    return (
        <View
            style={[
                styles.eventCard,
                compact && styles.eventCardCompact,
                justMoved && styles.eventCardMoved,
                disabled && styles.eventCardDisabled,
            ]}
        >
            <View
                style={[
                    styles.positionBadge,
                    compact && styles.positionBadgeCompact,
                    justMoved && styles.positionBadgeMoved,
                ]}
            >
                <Text style={styles.positionNumber}>
                    {String(index + 1).padStart(2, "0")}
                </Text>
            </View>

            <View style={styles.cardTextContainer}>
                <Text
                    style={[
                        styles.eventText,
                        compact && styles.eventTextCompact,
                    ]}
                >
                    {event.text}
                </Text>
            </View>

            <View style={styles.arrowRow}>
                <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityLabel={`Move up. Currently position ${index + 1} of ${total}. ${event.text}`}
                    activeOpacity={0.6}
                    disabled={!canUp}
                    onPress={() => onMove(index, -1)}
                    hitSlop={{ top: 4, bottom: 4, left: 2, right: 2 }}
                    style={[styles.arrowButton, !canUp && styles.arrowButtonOff]}
                >
                    <Text style={[styles.arrowText, !canUp && styles.arrowTextOff]}>
                        ▲
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityLabel={`Move down. Currently position ${index + 1} of ${total}. ${event.text}`}
                    activeOpacity={0.6}
                    disabled={!canDown}
                    onPress={() => onMove(index, 1)}
                    hitSlop={{ top: 4, bottom: 4, left: 2, right: 2 }}
                    style={[styles.arrowButton, !canDown && styles.arrowButtonOff]}
                >
                    <Text style={[styles.arrowText, !canDown && styles.arrowTextOff]}>
                        ▼
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default function ChronologicalOrderMinigame({
    onComplete,
}) {
    const { width, height } = useWindowDimensions();

    // Small cards and tighter spacing on narrow or short devices.
    const compact = width <= 390 || height <= 740;

    const [screen, setScreen] = useState("start");
    const [roundIndex, setRoundIndex] = useState(0);
    const [orderedEvents, setOrderedEvents] = useState([]);
    const [lastMovedId, setLastMovedId] = useState(null);
    const [remainingMs, setRemainingMs] = useState(
        START_SECONDS * 1000
    );
    const [score, setScore] = useState(0);
    const [roundsCompleted, setRoundsCompleted] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [feedbackType, setFeedbackType] = useState("");
    const [roundPoints, setRoundPoints] = useState(0);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);

    const timerRef = useRef(null);
    const deadlineRef = useRef(null);
    const phaseRef = useRef("start");
    const roundIndexRef = useRef(0);
    const orderedEventsRef = useRef([]);
    const remainingMsRef = useRef(START_SECONDS * 1000);
    const scoreRef = useRef(0);
    const roundsCompletedRef = useRef(0);
    const roundScoredRef = useRef(false);
    const startTimeRef = useRef(null);
    const onCompleteRef = useRef(onComplete);

    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    const stopTimer = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const setOrder = useCallback((events) => {
        orderedEventsRef.current = events;
        setOrderedEvents(events);
    }, []);

    const finishGameOver = useCallback(() => {
        if (phaseRef.current !== "active") return;

        phaseRef.current = "gameover";
        stopTimer();
        deadlineRef.current = null;
        remainingMsRef.current = 0;

        setRemainingMs(0);
        setLastMovedId(null);
        setFeedback("");
        setScreen("gameover");
    }, [stopTimer]);

    const startTimer = useCallback((initialMs) => {
        stopTimer();

        const now = Date.now();

        deadlineRef.current = now + initialMs;
        remainingMsRef.current = initialMs;
        setRemainingMs(initialMs);

        timerRef.current = setInterval(() => {
            if (
                phaseRef.current !== "active" ||
                deadlineRef.current == null
            ) {
                return;
            }

            const ms = Math.max(
                0,
                deadlineRef.current - Date.now()
            );

            remainingMsRef.current = ms;
            setRemainingMs(ms);

            if (ms <= 0) {
                phaseRef.current = "gameover";
                stopTimer();
                deadlineRef.current = null;
                remainingMsRef.current = 0;

                setRemainingMs(0);
                setLastMovedId(null);
                setFeedback("");
                setScreen("gameover");
            }
        }, TICK_MS);
    }, [stopTimer]);

    useEffect(() => () => stopTimer(), [stopTimer]);

    const loadRound = useCallback((index) => {
        const round = ROUNDS[index];

        const events = round.eventIds
            .map((id) => EVENT_LIBRARY[id])
            .filter(Boolean);

        setOrder(shuffle(events));
        setLastMovedId(null);
        setFeedback("");
        setFeedbackType("");
        roundScoredRef.current = false;
    }, [setOrder]);

    const startGame = useCallback(() => {
        stopTimer();

        phaseRef.current = "active";
        roundIndexRef.current = 0;
        scoreRef.current = 0;
        roundsCompletedRef.current = 0;
        roundScoredRef.current = false;
        startTimeRef.current = Date.now();

        setRoundIndex(0);
        setScore(0);
        setRoundsCompleted(0);
        setRoundPoints(0);
        setElapsedSeconds(0);
        setLastMovedId(null);
        setFeedback("");
        setFeedbackType("");
        setScreen("active");

        loadRound(0);
        startTimer(START_SECONDS * 1000);
    }, [loadRound, startTimer, stopTimer]);

    // Move one card up (-1) or down (+1). The card keeps a gold outline
    // afterwards so you can see where it landed.
    const moveCard = useCallback((index, direction) => {
        if (phaseRef.current !== "active") return;
        if (roundScoredRef.current) return;

        const events = orderedEventsRef.current;
        const target = index + direction;

        if (target < 0 || target >= events.length) return;

        const movedId = events[index].id;

        setOrder(moveItem(events, index, target));
        setLastMovedId(movedId);
        setFeedback("");
        setFeedbackType("");
    }, [setOrder]);

    const submitAnswer = useCallback(() => {
        if (phaseRef.current !== "active") return;
        if (roundScoredRef.current) return;

        const now = Date.now();

        const liveRemaining = deadlineRef.current == null
            ? 0
            : Math.max(0, deadlineRef.current - now);

        if (liveRemaining <= 0) {
            finishGameOver();
            return;
        }

        const correctOrder = getCorrectOrder(
            ROUNDS[roundIndexRef.current].eventIds
        );

        const currentOrder = orderedEventsRef.current;

        const isCorrect =
            currentOrder.length === correctOrder.length &&
            currentOrder.every(
                (event, index) => event.id === correctOrder[index]?.id
            );

        if (!isCorrect) {
            setFeedback("Not quite. Check the sequence and try again.");
            setFeedbackType("error");
            return;
        }

        roundScoredRef.current = true;

        const secondsLeft = Math.ceil(liveRemaining / 1000);
        const earned = 100 + secondsLeft * 2;

        scoreRef.current += earned;
        roundsCompletedRef.current += 1;

        setScore(scoreRef.current);
        setRoundsCompleted(roundsCompletedRef.current);
        setRoundPoints(earned);
        setLastMovedId(null);
        setFeedback(
            `Correct order! +${earned} points and +${BONUS_SECONDS} seconds.`
        );
        setFeedbackType("success");

        // Reset the timer to 45 seconds after each correct round.
        const nextRemaining = START_SECONDS * 1000;

        deadlineRef.current = now + nextRemaining;
        remainingMsRef.current = nextRemaining;
        setRemainingMs(nextRemaining);

        if (roundIndexRef.current === ROUNDS.length - 1) {
            phaseRef.current = "victory";
            stopTimer();
            deadlineRef.current = null;

            setElapsedSeconds(
                Math.max(
                    0,
                    Math.floor((now - startTimeRef.current) / 1000)
                )
            );

            setScreen("victory");
            return;
        }

        setScreen("roundComplete");
    }, [finishGameOver, stopTimer]);

    const continueToNextRound = useCallback(() => {
        if (phaseRef.current !== "active") return;
        if (!roundScoredRef.current) return;

        const nextIndex = roundIndexRef.current + 1;

        if (nextIndex >= ROUNDS.length) return;

        roundIndexRef.current = nextIndex;
        setRoundIndex(nextIndex);
        loadRound(nextIndex);
        setScreen("active");
    }, [loadRound]);

    const retry = useCallback(() => {
        startGame();
    }, [startGame]);

    const seconds = Math.ceil(remainingMs / 1000);
    const lowTime = seconds <= 10;

    const progress = screen === "victory"
        ? 1
        : Math.max(
            0,
            Math.min(
                1,
                remainingMs /
                (START_SECONDS * 1000 +
                    2 * BONUS_SECONDS * 1000)
            )
        );

    const renderButton = (
        label,
        onPress,
        primary = false,
        disabled = false
    ) => (
        <TouchableOpacity
            accessibilityRole="button"
            activeOpacity={0.82}
            disabled={disabled}
            onPress={onPress}
            style={[
                styles.button,
                primary
                    ? styles.primaryButton
                    : styles.secondaryButton,
                disabled && styles.buttonDisabled,
            ]}
        >
            <Text
                style={[
                    styles.buttonText,
                    primary
                        ? styles.primaryButtonText
                        : styles.secondaryButtonText,
                    disabled && styles.buttonTextDisabled,
                ]}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="#171d1c"
            />

            <View style={styles.flex}>
                {(screen === "active" || screen === "roundComplete") ? (
                    <View style={styles.activeHeader}>
                        <Text style={styles.activeTitle}>TIMELINE</Text>

                        <View
                            style={[
                                styles.timerPill,
                                lowTime && styles.timerPillLow,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.timerValue,
                                    lowTime && styles.timerTextLow,
                                ]}
                            >
                                {seconds}s
                            </Text>
                        </View>

                        <View style={styles.activeScore}>
                            <Text style={styles.activeScoreLabel}>SCORE</Text>
                            <Text style={styles.activeScoreValue}>
                                {score}
                            </Text>
                        </View>
                    </View>
                ) : (
                    <View style={styles.introHeader}>
                        <Text style={styles.eyebrow}>
                            CHAPTER 06 · THE REVOLUTION
                        </Text>
                        <Text style={styles.title}>
                            The Timeline Trail
                        </Text>
                    </View>
                )}

                {screen === "start" ? (
                    <ScrollView
                        contentContainerStyle={styles.startScroll}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.panel}>
                            <View style={styles.seal}>
                                <Text style={styles.sealText}>T</Text>
                            </View>

                            <Text style={styles.panelTitle}>
                                Put history in order
                            </Text>

                            <Text style={styles.bodyText}>
                                Arrange milestones in Philippine history
                                from earliest to latest.
                            </Text>

                            <View style={styles.ruleBox}>
                                <Text style={styles.ruleTitle}>THE RULES</Text>
                                <Text style={styles.ruleText}>
                                    • Start with 45 seconds.
                                </Text>
                                <Text style={styles.ruleText}>
                                    • Tap ▲ or ▼ on a card to move it one
                                    step. Scroll the list normally.
                                </Text>
                                <Text style={styles.ruleText}>
                                    • Submit the sequence when ready.
                                </Text>
                                <Text style={styles.ruleText}>
                                    • Correct rounds earn points and add
                                    10 seconds.
                                </Text>
                            </View>

                            {renderButton(
                                "BEGIN TIMELINE",
                                startGame,
                                true
                            )}
                        </View>
                    </ScrollView>
                ) : null}

                {screen === "active" ? (
                    <View style={styles.gameArea}>
                        <View style={styles.roundBar}>
                            <Text style={styles.roundMeta}>
                                ROUND {roundIndex + 1}/{ROUNDS.length}
                            </Text>

                            <View style={styles.roundProgress}>
                                {ROUNDS.map((round, index) => (
                                    <View
                                        key={round.title}
                                        style={[
                                            styles.progressDot,
                                            index < roundsCompleted &&
                                            styles.progressDotDone,
                                            index === roundIndex &&
                                            styles.progressDotCurrent,
                                        ]}
                                    />
                                ))}
                            </View>
                        </View>

                        <View style={styles.timelineLabels}>
                            <View style={styles.timelineEndpoint}>
                                <Text style={styles.endpointArrow}>↑</Text>
                                <Text style={styles.endpointTitle}>
                                    EARLIEST
                                </Text>
                            </View>

                            <View style={styles.timelineEndpoint}>
                                <Text style={styles.endpointTitle}>
                                    LATEST
                                </Text>
                                <Text style={styles.endpointArrow}>↓</Text>
                            </View>
                        </View>

                        <ScrollView
                            style={styles.cardsScroll}
                            contentContainerStyle={styles.cardsContent}
                            showsVerticalScrollIndicator
                            keyboardShouldPersistTaps="handled"
                        >
                            {orderedEvents.map((event, index) => (
                                <TimelineCard
                                    key={event.id}
                                    event={event}
                                    index={index}
                                    total={orderedEvents.length}
                                    justMoved={lastMovedId === event.id}
                                    disabled={roundScoredRef.current}
                                    compact={compact}
                                    onMove={moveCard}
                                />
                            ))}
                        </ScrollView>

                        <View style={styles.bottomArea}>
                            <Text
                                numberOfLines={2}
                                style={[
                                    styles.feedback,
                                    feedbackType === "success" &&
                                    styles.successText,
                                    feedbackType === "error" &&
                                    styles.errorText,
                                    feedbackType === "neutral" &&
                                    styles.neutralText,
                                ]}
                            >
                                {feedback || " "}
                            </Text>

                            <TouchableOpacity
                                accessibilityRole="button"
                                activeOpacity={0.82}
                                onPress={submitAnswer}
                                style={styles.submitButton}
                            >
                                <Text style={styles.submitButtonText}>
                                    SUBMIT ORDER
                                </Text>
                            </TouchableOpacity>

                            <View style={styles.timerTrack}>
                                <View
                                    style={[
                                        styles.timerFill,
                                        lowTime && styles.timerFillLow,
                                        { width: `${progress * 100}%` },
                                    ]}
                                />
                            </View>
                        </View>
                    </View>
                ) : null}

                {screen === "roundComplete" ? (
                    <ScrollView
                        contentContainerStyle={styles.resultScroll}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.panel}>
                            <Text style={styles.resultKicker}>
                                ROUND COMPLETE
                            </Text>
                            <Text style={styles.panelTitle}>
                                History in order.
                            </Text>
                            <Text style={styles.bodyText}>
                                You placed every event in the correct
                                chronological order.
                            </Text>

                            <View style={styles.resultCount}>
                                <Text style={styles.resultNumber}>
                                    +{roundPoints}
                                </Text>
                                <Text style={styles.resultCaption}>
                                    POINTS EARNED
                                </Text>
                            </View>

                            <Text style={styles.bodyText}>
                                Total score: {score}
                            </Text>

                            {renderButton(
                                "NEXT ROUND",
                                continueToNextRound,
                                true
                            )}
                        </View>
                    </ScrollView>
                ) : null}

                {screen === "gameover" ? (
                    <ScrollView
                        contentContainerStyle={styles.resultScroll}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.panel}>
                            <Text style={styles.resultKicker}>
                                TIME EXPIRED
                            </Text>
                            <Text style={styles.panelTitle}>
                                The timeline remains unfinished.
                            </Text>
                            <Text style={styles.bodyText}>
                                You completed {roundsCompleted} of{" "}
                                {ROUNDS.length} rounds.
                            </Text>

                            <View style={styles.resultCount}>
                                <Text style={styles.resultNumber}>
                                    {score}
                                </Text>
                                <Text style={styles.resultCaption}>
                                    TOTAL POINTS
                                </Text>
                            </View>

                            {renderButton("TRY AGAIN", retry, true)}
                        </View>
                    </ScrollView>
                ) : null}

                {screen === "victory" ? (
                    <ScrollView
                        contentContainerStyle={styles.resultScroll}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.panel}>
                            <Text style={styles.resultKicker}>
                                TIMELINE COMPLETE
                            </Text>
                            <Text style={styles.panelTitle}>
                                The past falls into place.
                            </Text>
                            <Text style={styles.bodyText}>
                                You successfully arranged all three
                                historical timelines, from early colonial
                                history to the Revolution.
                            </Text>

                            <View style={styles.resultCount}>
                                <Text style={styles.resultNumber}>
                                    {score}
                                </Text>
                                <Text style={styles.resultCaption}>
                                    TOTAL POINTS
                                </Text>
                            </View>

                            <Text style={styles.timeSummary}>
                                Completion time: {elapsedSeconds} seconds
                            </Text>

                            {renderButton("PLAY AGAIN", retry, true)}

                            {typeof onCompleteRef.current === "function"
                                ? renderButton(
                                    "CONTINUE STORY",
                                    () => onCompleteRef.current(),
                                    false
                                )
                                : null}
                        </View>
                    </ScrollView>
                ) : null}

                {screen !== "active" &&
                    screen !== "roundComplete" ? (
                    <Text style={styles.brandFooter}>
                        PHILIPPINE HISTORY · CHRONOLOGICAL CHALLENGE
                    </Text>
                ) : null}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#171d1c",
    },
    flex: {
        flex: 1,
        minHeight: 0,
    },

    // Intro header is shown only outside active gameplay.
    introHeader: {
        paddingHorizontal: 16,
        paddingTop: 5,
        paddingBottom: 5,
    },
    eyebrow: {
        color: "#c4a66a",
        fontSize: 10,
        letterSpacing: 1.2,
        fontWeight: "800",
    },
    title: {
        color: "#f4eddd",
        fontSize: 23,
        lineHeight: 27,
        fontWeight: "800",
        marginTop: 2,
    },

    // Compact active header.
    activeHeader: {
        height: 38,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        gap: 10,
    },
    activeTitle: {
        flex: 1,
        color: "#f4eddd",
        fontSize: 13,
        fontWeight: "900",
        letterSpacing: 1.1,
    },
    timerPill: {
        minWidth: 48,
        height: 29,
        paddingHorizontal: 7,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#c4a66a",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#242d29",
    },
    timerPillLow: {
        borderColor: "#e07a61",
        backgroundColor: "#3a2522",
    },
    timerValue: {
        color: "#fff3d4",
        fontSize: 15,
        fontWeight: "900",
        fontVariant: ["tabular-nums"],
    },
    timerTextLow: {
        color: "#ff9b82",
    },
    activeScore: {
        minWidth: 42,
        alignItems: "flex-end",
        justifyContent: "center",
    },
    activeScoreLabel: {
        color: "#c4a66a",
        fontSize: 7,
        fontWeight: "900",
        letterSpacing: 0.7,
    },
    activeScoreValue: {
        color: "#fff3d4",
        fontSize: 13,
        lineHeight: 16,
        fontWeight: "900",
    },

    // Intro screen.
    startScroll: {
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: 14,
        paddingVertical: 8,
    },
    panel: {
        backgroundColor: "#f2ead8",
        borderRadius: 17,
        borderWidth: 1,
        borderColor: "#d2bd8f",
        padding: 17,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.18,
        shadowRadius: 9,
        elevation: 4,
    },
    seal: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#b79b61",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginBottom: 9,
    },
    sealText: {
        color: "#8c6e37",
        fontSize: 20,
        fontWeight: "900",
    },
    panelTitle: {
        color: "#25312c",
        fontSize: 21,
        lineHeight: 26,
        fontWeight: "800",
        textAlign: "center",
        marginBottom: 8,
    },
    bodyText: {
        color: "#50574f",
        fontSize: 14,
        lineHeight: 20,
        textAlign: "center",
    },
    ruleBox: {
        backgroundColor: "#e7ddc6",
        borderRadius: 11,
        padding: 12,
        marginTop: 15,
        marginBottom: 11,
    },
    ruleTitle: {
        color: "#8a6b35",
        fontSize: 10,
        fontWeight: "900",
        letterSpacing: 1.4,
        marginBottom: 6,
    },
    ruleText: {
        color: "#465047",
        fontSize: 12,
        lineHeight: 18,
        marginBottom: 2,
    },

    // Shared buttons for intro and result screens.
    button: {
        minHeight: 44,
        borderRadius: 10,
        paddingHorizontal: 13,
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 8,
    },
    primaryButton: {
        backgroundColor: "#34483d",
        borderWidth: 1,
        borderColor: "#506a58",
    },
    secondaryButton: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#879080",
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    buttonText: {
        fontSize: 12,
        fontWeight: "900",
        letterSpacing: 0.8,
        textAlign: "center",
    },
    primaryButtonText: {
        color: "#fff4db",
    },
    secondaryButtonText: {
        color: "#34483d",
    },
    buttonTextDisabled: {
        opacity: 0.7,
    },

    // Gameplay.
    gameArea: {
        flex: 1,
        minHeight: 0,
        paddingHorizontal: 9,
        paddingBottom: 2,
    },
    roundBar: {
        height: 23,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 2,
    },
    roundMeta: {
        color: "#c4a66a",
        fontSize: 9,
        fontWeight: "900",
        letterSpacing: 0.8,
    },
    roundProgress: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    progressDot: {
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: "#3b4540",
    },
    progressDotDone: {
        backgroundColor: "#c4a66a",
    },
    progressDotCurrent: {
        width: 9,
        height: 9,
        borderRadius: 5,
        backgroundColor: "#f2ead8",
        borderWidth: 2,
        borderColor: "#c4a66a",
    },

    timelineLabels: {
        height: 32,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#242d29",
        borderWidth: 1,
        borderColor: "#3c4a40",
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 5,
    },
    timelineEndpoint: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    endpointArrow: {
        color: "#d9bd7e",
        fontSize: 17,
        lineHeight: 20,
        fontWeight: "900",
    },
    endpointTitle: {
        color: "#e7d9bb",
        fontSize: 9,
        fontWeight: "900",
        letterSpacing: 0.6,
    },

    // Scroll only the cards, never the header or submit controls.
    cardsScroll: {
        flex: 1,
        minHeight: 0,
    },
    cardsContent: {
        paddingBottom: 6,
    },
    eventCard: {
        minHeight: 64,
        marginBottom: CARD_GAP,
        borderRadius: 10,
        backgroundColor: "#f2ead8",
        borderWidth: 2,
        borderColor: "#d2bd8f",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 8,
        paddingRight: 6,
        paddingVertical: 6,
        gap: 8,
    },
    eventCardCompact: {
        minHeight: 58,
        gap: 6,
    },
    eventCardMoved: {
        borderColor: "#c4a66a",
        backgroundColor: "#fff4d8",
    },
    eventCardDisabled: {
        opacity: 0.92,
    },
    positionBadge: {
        width: 31,
        height: 33,
        borderRadius: 7,
        backgroundColor: "#ded0b0",
        borderWidth: 1,
        borderColor: "#c5b58f",
        justifyContent: "center",
        alignItems: "center",
    },
    positionBadgeCompact: {
        width: 29,
        height: 30,
    },
    positionBadgeMoved: {
        backgroundColor: "#d6c28e",
        borderColor: "#a88a4d",
    },
    positionNumber: {
        color: "#34483d",
        fontSize: 12,
        fontWeight: "900",
    },
    cardTextContainer: {
        flex: 1,
        minWidth: 0,
        justifyContent: "center",
    },
    eventText: {
        color: "#303a32",
        fontSize: 12,
        lineHeight: 16,
        fontWeight: "700",
        flexShrink: 1,
    },
    eventTextCompact: {
        fontSize: 11,
        lineHeight: 14,
    },

    // Big, thumb-sized arrow buttons.
    arrowRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    arrowButton: {
        width: 40,
        height: 44,
        borderRadius: 9,
        backgroundColor: "#34483d",
        borderWidth: 1,
        borderColor: "#506a58",
        alignItems: "center",
        justifyContent: "center",
    },
    arrowButtonOff: {
        backgroundColor: "#e0d6bd",
        borderColor: "#d2c5a3",
    },
    arrowText: {
        color: "#fff4db",
        fontSize: 16,
        fontWeight: "900",
    },
    arrowTextOff: {
        color: "#b7ab8c",
    },

    // Fixed controls at the bottom of gameplay.
    bottomArea: {
        flexShrink: 0,
        paddingTop: 2,
        paddingBottom: 1,
    },
    feedback: {
        minHeight: 15,
        fontSize: 10,
        lineHeight: 14,
        fontWeight: "700",
        textAlign: "center",
        paddingHorizontal: 3,
    },
    successText: {
        color: "#a9d6ac",
    },
    errorText: {
        color: "#ff9b82",
    },
    neutralText: {
        color: "#e7d9bb",
    },
    submitButton: {
        minHeight: 46,
        borderRadius: 10,
        backgroundColor: "#34483d",
        borderWidth: 1,
        borderColor: "#506a58",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 12,
        marginTop: 2,
    },
    submitButtonText: {
        color: "#fff4db",
        fontSize: 12,
        fontWeight: "900",
        letterSpacing: 1,
    },
    timerTrack: {
        height: 3,
        borderRadius: 3,
        backgroundColor: "#39433d",
        overflow: "hidden",
        marginTop: 5,
    },
    timerFill: {
        height: "100%",
        backgroundColor: "#c4a66a",
        borderRadius: 3,
    },
    timerFillLow: {
        backgroundColor: "#e07a61",
    },

    // Results.
    resultScroll: {
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: 14,
        paddingVertical: 8,
    },
    resultKicker: {
        color: "#98783d",
        fontSize: 10,
        fontWeight: "900",
        letterSpacing: 1.5,
        textAlign: "center",
        marginBottom: 8,
    },
    resultCount: {
        alignItems: "center",
        marginVertical: 15,
        padding: 15,
        backgroundColor: "#e7ddc6",
        borderRadius: 11,
    },
    resultNumber: {
        color: "#34483d",
        fontSize: 30,
        fontWeight: "900",
    },
    resultCaption: {
        color: "#8a6b35",
        fontSize: 9,
        fontWeight: "900",
        letterSpacing: 1.2,
        marginTop: 4,
    },
    timeSummary: {
        color: "#50574f",
        textAlign: "center",
        fontSize: 12,
        marginBottom: 6,
    },
    brandFooter: {
        color: "#778178",
        fontSize: 8,
        letterSpacing: 0.7,
        textAlign: "center",
        paddingHorizontal: 6,
        paddingTop: 3,
        paddingBottom: 3,
    },
});