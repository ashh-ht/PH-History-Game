import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
} from "react-native";

const START_SECONDS = 45;
const BONUS_SECONDS = 10;
const TICK_MS = 200;

// Keep puzzle content separate from the screen and validation logic.
const PUZZLES = [
    {
        answer: "DAGOHOY",
        scrambled: ["O", "H", "Y", "A", "G", "O", "D"],
        clue: "The leader who resisted Spanish rule in Bohol.",
        hint: "His rebellion began in 1744.",
    },
    {
        answer: "BOHOL",
        scrambled: ["L", "O", "B", "H", "O"],
        clue: "The island where the long rebellion took place.",
        hint: "It is in the Central Visayas region.",
    },
    {
        answer: "MOUNTAIN",
        scrambled: ["N", "I", "A", "T", "U", "M", "O", "N"],
        clue: "The rugged terrain where Dagohoy's community found refuge.",
        hint: "It is a high area of land.",
    },
    {
        answer: "REBELLION",
        scrambled: ["L", "I", "O", "N", "B", "E", "L", "R"],
        clue: "An organized resistance against an authority.",
        hint: "It describes Dagohoy's long resistance.",
    },
    {
        answer: "PARDON",
        scrambled: ["D", "O", "N", "R", "A", "P"],
        clue: "Forgiveness of an offense; the rebels were granted this when peace was accepted.",
        hint: "It begins with P and has six letters.",
    },
];

const normalizeAnswer = (value) =>
    String(value || "").trim().replace(/\s+/g, "").toUpperCase();

export default function DecipherMinigame({ onComplete }) {
    const [screen, setScreen] = useState("start");
    const [puzzleIndex, setPuzzleIndex] = useState(0);
    const [answer, setAnswer] = useState("");
    const [remainingMs, setRemainingMs] = useState(START_SECONDS * 1000);
    const [feedback, setFeedback] = useState("");
    const [feedbackType, setFeedbackType] = useState("");
    const [completed, setCompleted] = useState([]);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);

    const deadlineRef = useRef(null);
    const timerRef = useRef(null);
    const phaseRef = useRef("start");
    const puzzleIndexRef = useRef(0);
    const submittedRef = useRef(false);
    const completedRef = useRef([]);
    const remainingMsRef = useRef(START_SECONDS * 1000);
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

    const finishGameOver = useCallback(() => {
        if (phaseRef.current !== "active") return;
        phaseRef.current = "gameover";
        stopTimer();
        remainingMsRef.current = 0;
        setRemainingMs(0);
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
            if (phaseRef.current !== "active" || deadlineRef.current == null) return;
            const ms = Math.max(0, deadlineRef.current - Date.now());
            remainingMsRef.current = ms;
            setRemainingMs(ms);
            if (ms <= 0) {
                // Set the phase synchronously so no submission can win at the deadline.
                phaseRef.current = "gameover";
                stopTimer();
                setRemainingMs(0);
                remainingMsRef.current = 0;
                setFeedback("");
                setScreen("gameover");
            }
        }, TICK_MS);
    }, [stopTimer]);

    useEffect(() => () => stopTimer(), [stopTimer]);

    const startGame = useCallback(() => {
        stopTimer();
        phaseRef.current = "active";
        puzzleIndexRef.current = 0;
        submittedRef.current = false;
        completedRef.current = [];
        remainingMsRef.current = START_SECONDS * 1000;
        setPuzzleIndex(0);
        setAnswer("");
        setFeedback("");
        setFeedbackType("");
        setCompleted([]);
        setElapsedSeconds(0);
        setScreen("active");
        startTimer(START_SECONDS * 1000);
    }, [startTimer, stopTimer]);

    const submitAnswer = useCallback(() => {
        if (phaseRef.current !== "active" || submittedRef.current) return;

        const now = Date.now();
        const liveRemaining = deadlineRef.current == null
            ? 0
            : Math.max(0, deadlineRef.current - now);

        // Check the actual deadline instead of relying on the next interval tick.
        if (liveRemaining <= 0) {
            finishGameOver();
            return;
        }

        const puzzle = PUZZLES[puzzleIndexRef.current];
        const guess = normalizeAnswer(answer);
        if (!guess) {
            setFeedback("Enter an answer first.");
            setFeedbackType("error");
            return;
        }

        if (guess !== puzzle.answer) {
            setFeedback("Not quite. Try again.");
            setFeedbackType("error");
            return;
        }

        submittedRef.current = true;
        const nextCompleted = [...completedRef.current, puzzleIndexRef.current];
        completedRef.current = nextCompleted;
        setCompleted(nextCompleted);
        setFeedback("Decoded successfully! +10 seconds");
        setFeedbackType("success");

        const nextRemaining = liveRemaining + BONUS_SECONDS * 1000;
        remainingMsRef.current = nextRemaining;
        deadlineRef.current = now + nextRemaining;
        setRemainingMs(nextRemaining);

        if (puzzleIndexRef.current === PUZZLES.length - 1) {
            phaseRef.current = "victory";
            stopTimer();
            const elapsed = Math.max(0, Math.ceil((START_SECONDS * 1000 + 4 * BONUS_SECONDS * 1000 - nextRemaining) / 1000));
            setElapsedSeconds(elapsed);
            setScreen("victory");
            return;
        }

        const nextIndex = puzzleIndexRef.current + 1;
        puzzleIndexRef.current = nextIndex;
        setPuzzleIndex(nextIndex);
        setAnswer("");
        // Allow the next puzzle to be submitted; the single existing timer continues
        // against the updated absolute deadline.
        submittedRef.current = false;
        setFeedback("");
        setFeedbackType("");
    }, [answer, finishGameOver, stopTimer]);

    const retry = useCallback(() => {
        startGame();
    }, [startGame]);

    const seconds = Math.ceil(remainingMs / 1000);
    const progress = screen === "victory" ? 1 : Math.max(0, Math.min(1, remainingMs / (START_SECONDS * 1000 + 4 * BONUS_SECONDS * 1000)));
    const currentPuzzle = PUZZLES[puzzleIndex];
    const lowTime = seconds <= 10;

    const renderButton = (label, onPress, primary = false) => (
        <TouchableOpacity
            accessibilityRole="button"
            activeOpacity={0.82}
            onPress={onPress}
            style={[styles.button, primary ? styles.primaryButton : styles.secondaryButton]}
        >
            <Text style={[styles.buttonText, primary ? styles.primaryButtonText : styles.secondaryButtonText]}>
                {label}
            </Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#171d1c" />
            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.header}>
                        <View>
                            <Text style={styles.eyebrow}>CHAPTER 02 · BOHOL, 1744</Text>
                            <Text style={styles.title}>The Cipher Trail</Text>
                        </View>
                        {screen === "active" ? (
                            <View style={[styles.timerPill, lowTime && styles.timerPillLow]}>
                                <Text style={[styles.timerLabel, lowTime && styles.timerTextLow]}>TIME</Text>
                                <Text style={[styles.timerValue, lowTime && styles.timerTextLow]}>{seconds}s</Text>
                            </View>
                        ) : null}
                    </View>

                    {screen === "start" ? (
                        <View style={styles.panel}>
                            <View style={styles.seal}><Text style={styles.sealText}>C</Text></View>
                            <Text style={styles.panelTitle}>Decode the story</Text>
                            <Text style={styles.bodyText}>
                                Unscramble five words connected to Francisco Dagohoy’s rebellion. Solve each cipher to unlock the next.
                            </Text>
                            <View style={styles.ruleBox}>
                                <Text style={styles.ruleTitle}>THE RULES</Text>
                                <Text style={styles.ruleText}>• Start with 45 seconds.</Text>
                                <Text style={styles.ruleText}>• Every correct answer adds 10 seconds to the time left.</Text>
                                <Text style={styles.ruleText}>• Wrong answers cost no time beyond the running clock.</Text>
                            </View>
                            {renderButton("BEGIN DECIPHERING", startGame, true)}
                        </View>
                    ) : null}

                    {screen === "active" ? (
                        <>
                            <View style={styles.progressHeader}>
                                <Text style={styles.progressText}>CHALLENGE {String(puzzleIndex + 1).padStart(2, "0")} / 05</Text>
                                <Text style={styles.progressText}>{completed.length} DECODED</Text>
                            </View>
                            <View style={styles.progressTrack}>
                                {PUZZLES.map((p, i) => (
                                    <View
                                        key={p.answer}
                                        style={[
                                            styles.progressSegment,
                                            i < completed.length && styles.progressComplete,
                                            i === puzzleIndex && styles.progressCurrent,
                                        ]}
                                    />
                                ))}
                            </View>

                            <View style={styles.panel}>
                                <Text style={styles.challengeKicker}>FIELD NOTE #{puzzleIndex + 1}</Text>
                                <Text style={styles.panelTitle}>Unscramble the word</Text>
                                <Text style={styles.bodyText}>{currentPuzzle.clue}</Text>

                                <View style={styles.letterTray}>
                                    {currentPuzzle.scrambled.map((letter, index) => (
                                        <View key={`${letter}-${index}`} style={styles.letterTile}>
                                            <Text style={styles.letterText}>{letter}</Text>
                                        </View>
                                    ))}
                                </View>
                                <Text style={styles.hintText}>HINT  /  {currentPuzzle.hint}</Text>

                                <Text style={styles.inputLabel}>YOUR DECIPHERED WORD</Text>
                                <TextInput
                                    value={answer}
                                    onChangeText={(value) => {
                                        setAnswer(value);
                                        if (feedbackType === "error") {
                                            setFeedback("");
                                            setFeedbackType("");
                                        }
                                    }}
                                    onSubmitEditing={submitAnswer}
                                    returnKeyType="done"
                                    autoCapitalize="characters"
                                    autoCorrect={false}
                                    editable={screen === "active"}
                                    maxLength={20}
                                    placeholder="Type your answer"
                                    placeholderTextColor="#8b918b"
                                    accessibilityLabel="Deciphered answer"
                                    style={styles.input}
                                />

                                {feedback ? (
                                    <Text style={[styles.feedback, feedbackType === "success" ? styles.successText : styles.errorText]}>
                                        {feedback}
                                    </Text>
                                ) : <View style={styles.feedbackSpacer} />}

                                {renderButton("SUBMIT ANSWER", submitAnswer, true)}
                            </View>

                            <View style={styles.timerTrack}>
                                <View style={[styles.timerFill, lowTime && styles.timerFillLow, { width: `${progress * 100}%` }]} />
                            </View>
                            <Text style={styles.footerNote}>The clock keeps running between challenges.</Text>
                        </>
                    ) : null}

                    {screen === "gameover" ? (
                        <View style={styles.panel}>
                            <Text style={styles.resultKicker}>TIME EXPIRED</Text>
                            <Text style={styles.panelTitle}>The trail goes cold</Text>
                            <Text style={styles.bodyText}>
                                You decoded {completed.length} of 5 words. Restart the trail and try again.
                            </Text>
                            <View style={styles.resultCount}>
                                <Text style={styles.resultNumber}>{completed.length}/5</Text>
                                <Text style={styles.resultCaption}>CHALLENGES SOLVED</Text>
                            </View>
                            {renderButton("TRY AGAIN", retry, true)}
                        </View>
                    ) : null}

                    {screen === "victory" ? (
                        <View style={styles.panel}>
                            <Text style={styles.resultKicker}>CIPHER COMPLETE</Text>
                            <Text style={styles.panelTitle}>The story is preserved.</Text>
                            <Text style={styles.bodyText}>
                                All five words decoded. You followed the trail through Dagohoy’s long resistance and the eventual peace.
                            </Text>
                            <View style={styles.resultCount}>
                                <Text style={styles.resultNumber}>5/5</Text>
                                <Text style={styles.resultCaption}>CHALLENGES SOLVED</Text>
                            </View>
                            <Text style={styles.timeSummary}>Completion time: about {elapsedSeconds} seconds</Text>
                            {renderButton("PLAY AGAIN", retry, true)}
                            {typeof onCompleteRef.current === "function"
                                ? renderButton("CONTINUE STORY", () => onCompleteRef.current(), false)
                                : null}
                        </View>
                    ) : null}

                    <Text style={styles.brandFooter}>DAGOHOY’S REBELLION  ·  1744–1829</Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#171d1c" },
    flex: { flex: 1 },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 18,
        paddingTop: 16,
        paddingBottom: 22,
        maxWidth: 620,
        width: "100%",
        alignSelf: "center",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
        gap: 10,
    },
    eyebrow: { color: "#c4a66a", fontSize: 10, letterSpacing: 1.7, fontWeight: "800" },
    title: { color: "#f4eddd", fontSize: 25, fontWeight: "800", marginTop: 5, letterSpacing: 0.2 },
    timerPill: {
        minWidth: 68,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#c4a66a",
        alignItems: "center",
        backgroundColor: "#242d29",
    },
    timerPillLow: { borderColor: "#e07a61", backgroundColor: "#3a2522" },
    timerLabel: { color: "#c4a66a", fontSize: 9, fontWeight: "800", letterSpacing: 1.5 },
    timerValue: { color: "#fff3d4", fontSize: 21, fontWeight: "900", fontVariant: ["tabular-nums"] },
    timerTextLow: { color: "#ff9b82" },
    panel: {
        backgroundColor: "#f2ead8",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#d2bd8f",
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 5,
    },
    seal: {
        width: 46,
        height: 46,
        borderRadius: 23,
        borderWidth: 1,
        borderColor: "#b79b61",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginBottom: 14,
    },
    sealText: { color: "#8c6e37", fontSize: 23, fontWeight: "900" },
    panelTitle: { color: "#25312c", fontSize: 23, fontWeight: "800", textAlign: "center", marginBottom: 10 },
    bodyText: { color: "#50574f", fontSize: 15, lineHeight: 22, textAlign: "center" },
    ruleBox: { backgroundColor: "#e7ddc6", borderRadius: 12, padding: 14, marginTop: 20, marginBottom: 18 },
    ruleTitle: { color: "#8a6b35", fontSize: 10, fontWeight: "900", letterSpacing: 1.5, marginBottom: 8 },
    ruleText: { color: "#465047", fontSize: 13, lineHeight: 21 },
    button: {
        minHeight: 48,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 13,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },
    primaryButton: { backgroundColor: "#34483d", borderWidth: 1, borderColor: "#506a58" },
    secondaryButton: { backgroundColor: "transparent", borderWidth: 1, borderColor: "#879080" },
    buttonText: { fontSize: 13, fontWeight: "900", letterSpacing: 1 },
    primaryButtonText: { color: "#fff4db" },
    secondaryButtonText: { color: "#34483d" },
    progressHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 9 },
    progressText: { color: "#e7d9bb", fontSize: 10, fontWeight: "800", letterSpacing: 1.1 },
    progressTrack: { flexDirection: "row", gap: 5, marginBottom: 18 },
    progressSegment: { flex: 1, height: 5, borderRadius: 3, backgroundColor: "#3b4540" },
    progressComplete: { backgroundColor: "#c4a66a" },
    progressCurrent: { backgroundColor: "#e7d9bb" },
    challengeKicker: { color: "#98783d", fontSize: 10, fontWeight: "900", letterSpacing: 1.7, textAlign: "center", marginBottom: 8 },
    letterTray: { flexDirection: "row", justifyContent: "center", flexWrap: "wrap", gap: 6, marginTop: 22, marginBottom: 18 },
    letterTile: {
        width: 34,
        height: 43,
        borderRadius: 7,
        backgroundColor: "#ded0b0",
        borderWidth: 1,
        borderColor: "#c5b58f",
        justifyContent: "center",
        alignItems: "center",
    },
    letterText: { color: "#2f3b32", fontSize: 20, fontWeight: "900" },
    hintText: { color: "#77715f", fontSize: 12, lineHeight: 18, textAlign: "center", marginBottom: 20 },
    inputLabel: { color: "#8a6b35", fontSize: 10, fontWeight: "900", letterSpacing: 1.2, marginBottom: 8 },
    input: {
        minHeight: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#c7b78f",
        backgroundColor: "#fffaf0",
        paddingHorizontal: 14,
        color: "#25312c",
        fontSize: 17,
        fontWeight: "700",
        letterSpacing: 1,
    },
    feedback: { minHeight: 20, marginTop: 9, fontSize: 13, fontWeight: "700", textAlign: "center" },
    feedbackSpacer: { height: 29 },
    successText: { color: "#2e7046" },
    errorText: { color: "#b33f32" },
    timerTrack: { height: 4, borderRadius: 3, backgroundColor: "#39433d", overflow: "hidden", marginTop: 18 },
    timerFill: { height: "100%", backgroundColor: "#c4a66a", borderRadius: 3 },
    timerFillLow: { backgroundColor: "#e07a61" },
    footerNote: { color: "#aab1a8", fontSize: 11, textAlign: "center", marginTop: 9 },
    resultKicker: { color: "#98783d", fontSize: 10, fontWeight: "900", letterSpacing: 1.8, textAlign: "center", marginBottom: 10 },
    resultCount: { alignItems: "center", marginVertical: 20, padding: 18, backgroundColor: "#e7ddc6", borderRadius: 12 },
    resultNumber: { color: "#34483d", fontSize: 34, fontWeight: "900" },
    resultCaption: { color: "#8a6b35", fontSize: 10, fontWeight: "900", letterSpacing: 1.5, marginTop: 4 },
    timeSummary: { color: "#50574f", textAlign: "center", fontSize: 13, marginBottom: 8 },
    brandFooter: { color: "#778178", fontSize: 9, letterSpacing: 1.5, textAlign: "center", marginTop: 22 },
});
