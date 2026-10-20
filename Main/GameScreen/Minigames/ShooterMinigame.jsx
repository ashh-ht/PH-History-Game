import React, {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import {
    Animated,
    Image,
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from "react-native";

const ASSETS = {
    background: require("../../../assets/Minigames/Part1/Part2/Bohol Fields.png"),
    heartRed: require("../../../assets/Minigames/Part1/Part2/Heart Red.png"),
    heartBlack: require("../../../assets/Minigames/Part1/Part2/Heart Black.png"),
    soldierMoving: require("../../../assets/Minigames/Part1/Part2/Soldier Moving.png"),
    soldierPointing: require("../../../assets/Minigames/Part1/Part2/Soldier Pointing.png"),
    gun: require("../../../assets/Minigames/Part1/Part2/Gun.png"),
    gunFired: require("../../../assets/Minigames/Part1/Part2/Gun fired.png"),
    planks: require("../../../assets/Minigames/Part1/Part2/Wooden Planks.jpg"),
};

const MAX_HEALTH = 3;
const TOTAL_WAVES = 5;
const KILLS_PER_WAVE = 5;
const ROUND_SECONDS = 60;
const ENEMY_SIZE = 76;

export default function ShooterMinigame({
    onComplete,
    variant = "bohol",
}) {
    const { height, width } = useWindowDimensions();
    const playHeight = Math.max(420, height);

    const [phase, setPhase] = useState("ready");
    const [enemies, setEnemies] = useState([]);
    const [health, setHealth] = useState(MAX_HEALTH);
    const [wave, setWave] = useState(1);
    const [killsInWave, setKillsInWave] = useState(0);
    const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
    const [gunFiring, setGunFiring] = useState(false);
    const [message, setMessage] = useState("");

    const phaseRef = useRef("ready");
    const enemiesRef = useRef([]);
    const healthRef = useRef(MAX_HEALTH);
    const waveRef = useRef(1);
    const killsRef = useRef(0);
    const timeRef = useRef(ROUND_SECONDS);
    const nextIdRef = useRef(1);
    const spawnAccumulatorRef = useRef(0);
    const lastTickRef = useRef(0);

    const fireTimeoutRef = useRef(null);
    const messageTimeoutRef = useRef(null);

    const clearTransientTimers = useCallback(() => {
        if (fireTimeoutRef.current) {
            clearTimeout(fireTimeoutRef.current);
            fireTimeoutRef.current = null;
        }

        if (messageTimeoutRef.current) {
            clearTimeout(messageTimeoutRef.current);
            messageTimeoutRef.current = null;
        }
    }, []);

    useEffect(() => {
        return () => clearTransientTimers();
    }, [clearTransientTimers]);

    const showMessage = useCallback((text) => {
        setMessage(text);

        if (messageTimeoutRef.current) {
            clearTimeout(messageTimeoutRef.current);
        }

        messageTimeoutRef.current = setTimeout(() => {
            setMessage("");
            messageTimeoutRef.current = null;
        }, 1000);
    }, []);

    const finish = useCallback((result) => {
        if (phaseRef.current !== "playing") return;

        phaseRef.current = result;
        setPhase(result);
        enemiesRef.current = [];
        setEnemies([]);
    }, []);

    const startGame = useCallback(() => {
        clearTransientTimers();

        enemiesRef.current = [];
        setEnemies([]);

        healthRef.current = MAX_HEALTH;
        setHealth(MAX_HEALTH);

        waveRef.current = 1;
        setWave(1);

        killsRef.current = 0;
        setKillsInWave(0);

        timeRef.current = ROUND_SECONDS;
        setTimeLeft(ROUND_SECONDS);

        spawnAccumulatorRef.current = 0;
        lastTickRef.current = Date.now();
        nextIdRef.current = 1;

        setGunFiring(false);
        setMessage("");

        phaseRef.current = "playing";
        setPhase("playing");
    }, [clearTransientTimers]);

    const damagePlayer = useCallback(() => {
        if (phaseRef.current !== "playing") return;

        const nextHealth = Math.max(0, healthRef.current - 1);

        healthRef.current = nextHealth;
        setHealth(nextHealth);

        if (nextHealth > 0) {
            showMessage("AN ENEMY GOT THROUGH!");
        } else {
            finish("lost");
        }
    }, [finish, showMessage]);

    const flashGun = useCallback(() => {
        setGunFiring(true);

        if (fireTimeoutRef.current) {
            clearTimeout(fireTimeoutRef.current);
        }

        fireTimeoutRef.current = setTimeout(() => {
            setGunFiring(false);
            fireTimeoutRef.current = null;
        }, 180);
    }, []);

    const shootEnemy = useCallback(
        (enemyId) => {
            if (phaseRef.current !== "playing") return;

            const currentEnemies = enemiesRef.current;
            const target = currentEnemies.find(
                (enemy) => enemy.id === enemyId
            );

            if (!target) return;

            // Stop the entrance animation before removing the enemy.
            target.animation.stop();

            const remaining = currentEnemies.filter(
                (enemy) => enemy.id !== enemyId
            );

            enemiesRef.current = remaining;
            setEnemies(remaining);
            flashGun();

            const nextKills = killsRef.current + 1;

            if (nextKills >= KILLS_PER_WAVE) {
                if (waveRef.current >= TOTAL_WAVES) {
                    killsRef.current = nextKills;
                    finish("won");
                    return;
                }

                killsRef.current = 0;
                setKillsInWave(0);

                const nextWave = waveRef.current + 1;
                waveRef.current = nextWave;
                setWave(nextWave);

                spawnAccumulatorRef.current = 0;
                showMessage(`WAVE ${nextWave}`);
            } else {
                killsRef.current = nextKills;
                setKillsInWave(nextKills);
            }
        },
        [finish, flashGun, showMessage]
    );

    useEffect(() => {
        if (phase !== "playing") return undefined;

        const interval = setInterval(() => {
            if (phaseRef.current !== "playing") return;

            const now = Date.now();
            const elapsed = Math.min(
                0.2,
                Math.max(
                    0,
                    (now - (lastTickRef.current || now)) / 1000
                )
            );

            lastTickRef.current = now;

            const nextTime = Math.max(
                0,
                timeRef.current - elapsed
            );

            timeRef.current = nextTime;
            setTimeLeft(nextTime);

            if (nextTime <= 0) {
                finish("lost");
                return;
            }

            spawnAccumulatorRef.current += elapsed;

            const spawnEvery = Math.max(
                0.8,
                1.4 - (waveRef.current - 1) * 0.1
            );

            if (spawnAccumulatorRef.current >= spawnEvery) {
                spawnAccumulatorRef.current = 0;

                const entrance = Math.random();
                let x;
                let y;
                let side;
                let scale;

                if (entrance < 0.4) {
                    // Pop out from the left side.
                    x = 7 + Math.random() * 10;
                    y = playHeight * (0.36 + Math.random() * 0.2);
                    side = "left";
                    scale = 1.08;
                } else if (entrance < 0.8) {
                    // Pop out from the right side.
                    x = 83 + Math.random() * 9;
                    y = playHeight * (0.36 + Math.random() * 0.2);
                    side = "right";
                    scale = 1.08;
                } else {
                    // Appear farther ahead in the field.
                    x = 27 + Math.random() * 46;
                    y = playHeight * (0.34 + Math.random() * 0.19);
                    side = "front";
                    scale = 1.2;
                }

                const animation = new Animated.Value(0);

                const newEnemy = {
                    id: nextIdRef.current++,
                    x,
                    y,
                    side,
                    scale,
                    age: 0,
                    animation,
                    pointing: Math.random() > 0.5,
                };

                const updatedEnemies = [
                    ...enemiesRef.current,
                    newEnemy,
                ];

                enemiesRef.current = updatedEnemies;
                setEnemies(updatedEnemies);

                // A quick pop-in, not a falling animation.
                Animated.spring(animation, {
                    toValue: 1,
                    speed: 22,
                    bounciness: 8,
                    useNativeDriver: true,
                }).start();
            }

            // Enemies remain in place, then breach if ignored.
            const remainingEnemies = [];
            let breached = 0;

            enemiesRef.current.forEach((enemy) => {
                const updatedEnemy = {
                    ...enemy,
                    age: enemy.age + elapsed,
                };

                if (updatedEnemy.age >= 4.5) {
                    enemy.animation.stop();
                    breached += 1;
                } else {
                    remainingEnemies.push(updatedEnemy);
                }
            });

            enemiesRef.current = remainingEnemies;
            setEnemies(remainingEnemies);

            for (let i = 0; i < breached; i += 1) {
                if (phaseRef.current !== "playing") break;
                damagePlayer();
            }
        }, 50);

        return () => clearInterval(interval);
    }, [phase, playHeight, damagePlayer, finish]);

    const title =
        variant === "katipunan"
            ? "HOLD THE LINE"
            : "BOHOL DEFENSE";

    const totalKills =
        (wave - 1) * KILLS_PER_WAVE + killsInWave;

    return (
        <ImageBackground
            source={ASSETS.background}
            resizeMode="cover"
            style={styles.background}
        >
            <View pointerEvents="none" style={styles.shade} />

            {/* Compact mission HUD */}
            <View style={styles.hud}>
                <View style={styles.hudTop}>
                    <View style={styles.titleWrap}>
                        <Text style={styles.gameTitle}>
                            {title}
                        </Text>
                        <Text style={styles.subtitle}>
                            WAVE {wave} / {TOTAL_WAVES}
                        </Text>
                    </View>

                    <View style={styles.timerBox}>
                        <Text style={styles.hudLabel}>TIME</Text>
                        <Text style={styles.timerText}>
                            {Math.ceil(timeLeft)}s
                        </Text>
                    </View>
                </View>

                <View style={styles.hudBottom}>
                    <View style={styles.healthRow}>
                        {Array.from({ length: MAX_HEALTH }).map(
                            (_, index) => (
                                <Image
                                    key={`heart-${index}`}
                                    source={
                                        index < health
                                            ? ASSETS.heartRed
                                            : ASSETS.heartBlack
                                    }
                                    resizeMode="contain"
                                    style={styles.heart}
                                />
                            )
                        )}
                    </View>

                    <Text style={styles.progressText}>
                        STOPPED {totalKills}/
                        {TOTAL_WAVES * KILLS_PER_WAVE}
                    </Text>
                </View>
            </View>

            {/* Soldiers pop in from the sides or front */}
            {enemies.map((enemy) => {
                const rotate =
                    enemy.side === "left"
                        ? "12deg"
                        : enemy.side === "right"
                            ? "-12deg"
                            : "0deg";

                const translateX = enemy.animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [
                        enemy.side === "left"
                            ? -width * 0.18
                            : enemy.side === "right"
                                ? width * 0.18
                                : 0,
                        0,
                    ],
                });

                const translateY = enemy.animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [18, 0],
                });

                const animatedScale = enemy.animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.35, enemy.scale],
                });

                return (
                    <Pressable
                        key={enemy.id}
                        accessibilityRole="button"
                        accessibilityLabel="Shoot enemy soldier"
                        onPress={() => shootEnemy(enemy.id)}
                        style={[
                            styles.enemyTarget,
                            {
                                left: `${enemy.x}%`,
                                top: enemy.y,
                            },
                        ]}
                    >
                        <Animated.View
                            style={{
                                width: "100%",
                                height: "100%",
                                alignItems: "center",
                                justifyContent: "center",
                                opacity: enemy.animation,
                                transform: [
                                    { translateX },
                                    { translateY },
                                    { scale: animatedScale },
                                    { rotate },
                                ],
                            }}
                        >
                            <Image
                                source={
                                    enemy.pointing
                                        ? ASSETS.soldierPointing
                                        : ASSETS.soldierMoving
                                }
                                resizeMode="contain"
                                style={styles.enemyImage}
                            />
                        </Animated.View>
                    </Pressable>
                );
            })}

            {/* Centered notifications */}
            {!!message && phase === "playing" && (
                <View
                    pointerEvents="none"
                    style={styles.messageOverlay}
                >
                    <View style={styles.messageCard}>
                        <Text style={styles.messageText}>
                            {message}
                        </Text>
                    </View>
                </View>
            )}

            {/* Wooden foreground */}
            <ImageBackground
                source={ASSETS.planks}
                resizeMode="stretch"
                pointerEvents="none"
                style={styles.planks}
            />

            {/* Larger foreground gun */}
            <Pressable
                accessibilityRole="button"
                accessibilityLabel="Fire gun"
                onPress={() => {
                    if (phaseRef.current !== "playing") return;
                    flashGun();
                }}
                style={styles.gunButton}
            >
                <Image
                    source={
                        gunFiring ? ASSETS.gunFired : ASSETS.gun
                    }
                    resizeMode="contain"
                    style={styles.gun}
                />
            </Pressable>

            {/* Start, victory, and defeat screens */}
            {phase !== "playing" && (
                <View style={styles.overlay}>
                    <View style={styles.dialog}>
                        <Text style={styles.dialogTitle}>
                            {phase === "ready"
                                ? "DEFEND THE STRONGHOLD"
                                : phase === "won"
                                    ? "VICTORY!"
                                    : "MISSION FAILED"}
                        </Text>

                        <Text style={styles.dialogBody}>
                            {phase === "ready"
                                ? "Tap enemy soldiers as they appear from the sides and field. Stop 5 enemies in each of 5 waves. You have 3 hearts and 60 seconds."
                                : phase === "won"
                                    ? "You held the line and defended the mountain stronghold!"
                                    : "The enemy broke through or time ran out. Regroup and try again."}
                        </Text>

                        {phase === "ready" ? (
                            <Pressable
                                onPress={startGame}
                                style={styles.primaryButton}
                            >
                                <Text style={styles.buttonText}>
                                    START MISSION
                                </Text>
                            </Pressable>
                        ) : phase === "won" ? (
                            <Pressable
                                onPress={() => onComplete?.()}
                                style={styles.primaryButton}
                            >
                                <Text style={styles.buttonText}>
                                    CONTINUE STORY
                                </Text>
                            </Pressable>
                        ) : (
                            <Pressable
                                onPress={startGame}
                                style={styles.primaryButton}
                            >
                                <Text style={styles.buttonText}>
                                    TRY AGAIN
                                </Text>
                            </Pressable>
                        )}
                    </View>
                </View>
            )}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
        minHeight: 420,
        overflow: "hidden",
    },

    shade: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(13, 22, 13, 0.12)",
    },

    hud: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 5,
        paddingTop: 12,
        paddingHorizontal: 16,
        paddingBottom: 10,
        backgroundColor: "rgba(15, 24, 16, 0.72)",
        borderBottomWidth: 1,
        borderBottomColor: "rgba(199, 166, 106, 0.8)",
    },

    hudTop: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    titleWrap: {
        flex: 1,
        paddingRight: 12,
    },

    gameTitle: {
        color: "#f5e7c5",
        fontSize: 16,
        fontWeight: "900",
        letterSpacing: 1.5,
    },

    subtitle: {
        color: "#e6c98c",
        fontSize: 11,
        fontWeight: "800",
        marginTop: 3,
    },

    timerBox: {
        minWidth: 64,
        alignItems: "center",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 8,
        backgroundColor: "#432c1b",
        borderWidth: 1,
        borderColor: "#d6b779",
    },

    hudLabel: {
        color: "#e9d8b0",
        fontSize: 9,
        fontWeight: "800",
    },

    timerText: {
        color: "#fff3d4",
        fontSize: 20,
        fontWeight: "900",
    },

    hudBottom: {
        marginTop: 7,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    healthRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    heart: {
        width: 24,
        height: 24,
        marginRight: 4,
    },

    progressText: {
        color: "#fff0d0",
        fontSize: 10,
        fontWeight: "800",
        textAlign: "right",
        flexShrink: 1,
    },

    enemyTarget: {
        position: "absolute",
        width: ENEMY_SIZE,
        height: ENEMY_SIZE * 1.4,
        marginLeft: -ENEMY_SIZE / 2,
        zIndex: 3,
        alignItems: "center",
        justifyContent: "center",
    },

    enemyImage: {
        width: "100%",
        height: "100%",
    },

    messageOverlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 8,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },

    messageCard: {
        backgroundColor: "rgba(32, 24, 14, 0.94)",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#d6b779",
        maxWidth: "90%",
    },

    messageText: {
        color: "#fff0d0",
        fontWeight: "900",
        fontSize: 15,
        textAlign: "center",
    },

    planks: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 76,
        zIndex: 2,
    },

    gunButton: {
        position: "absolute",
        zIndex: 4,
        bottom: 34,
        right: 2,
        width: 185,
        height: 160,
        alignItems: "center",
        justifyContent: "center",
    },

    gun: {
        width: "100%",
        height: "100%",
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 20,
        alignItems: "center",
        justifyContent: "center",
        padding: 18,
        backgroundColor: "rgba(8, 13, 8, 0.72)",
    },

    dialog: {
        width: "92%",
        maxWidth: 540,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: "#c8a76a",
        backgroundColor: "#263322",
        padding: 22,
        alignItems: "center",
    },

    dialogTitle: {
        color: "#f5e7c5",
        fontSize: 23,
        fontWeight: "900",
        textAlign: "center",
        letterSpacing: 0.5,
    },

    dialogBody: {
        color: "#f1e7d0",
        fontSize: 15,
        lineHeight: 22,
        textAlign: "center",
        marginTop: 12,
        marginBottom: 20,
    },

    primaryButton: {
        backgroundColor: "#b8863b",
        borderColor: "#f0d59a",
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 22,
        minWidth: 190,
        alignItems: "center",
    },

    buttonText: {
        color: "#20190f",
        fontSize: 14,
        fontWeight: "900",
        letterSpacing: 0.7,
    },
});