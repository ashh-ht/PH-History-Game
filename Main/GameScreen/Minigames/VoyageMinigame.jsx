// This is probably going to be added into the end of our part 1-7...

import React, { useEffect, useRef, useState } from 'react';
import {
    Image,
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from 'react-native';

const GAME_SECONDS = 30;
const TARGET_SUPPLIES = 5;
const START_HULL = 3;

const TICK_MS = 50;
const BASE_SPEED = 3.5;
const MAX_SPEED = 6;

// NOTE: RATE TO AT WHICH NAG SSPAWN. HIGHER NUMBER = SLOWER SPAWN. LOWER NUMBER = FASTER SPAWN.
const ROCK_SPAWN_MS = 2000;
const SUPPLY_SPAWN_MS = 1700;
const WAVE_SPAWN_MS = 2200;

const SHIP_WIDTH = 78;
const SHIP_HEIGHT = 104;

const ROCK_WIDTH = 68;
const ROCK_HEIGHT = 50;

const SUPPLY_WIDTH = 95;
const SUPPLY_HEIGHT = 60;

const WAVE_WIDTH = 120;
const WAVE_HEIGHT = 38;

function VoyageMinigame({ onComplete }) {
    const { width, height } = useWindowDimensions();

    const controlsHeight = 92;
    const playTop = 88;
    const playBottom = height - controlsHeight;

    const [shipX, setShipX] = useState(
        Math.max(0, width / 2 - SHIP_WIDTH / 2)
    );

    const [rocks, setRocks] = useState([]);
    const [supplies, setSupplies] = useState([]);
    const [waves, setWaves] = useState([]);

    const [hull, setHull] = useState(START_HULL);
    const [collected, setCollected] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [gameState, setGameState] = useState('playing');

    // -1 = moving left
    //  0 = not steering
    //  1 = moving right

    const directionRef = useRef(0);


    const [shipDirection, setShipDirection] = useState(0);

    const shipXRef = useRef(shipX);
    const hullRef = useRef(START_HULL);
    const collectedRef = useRef(0);

    const rocksRef = useRef([]);
    const suppliesRef = useRef([]);
    const wavesRef = useRef([]);

    const lastRockSpawnRef = useRef(0);
    const lastSupplySpawnRef = useRef(0);
    const lastWaveSpawnRef = useRef(0);

    const lastSecondRef = useRef(-1);
    const startTimeRef = useRef(Date.now());

    useEffect(() => {
        if (gameState !== 'playing') {
            return;
        }

        startTimeRef.current = Date.now();

        lastRockSpawnRef.current = Date.now();
        lastSupplySpawnRef.current = Date.now();
        lastWaveSpawnRef.current = Date.now();

        lastSecondRef.current = -1;

        const timer = setInterval(() => {
            const now = Date.now();

            const elapsed =
                (now - startTimeRef.current) / 1000;

            const currentSecond = Math.floor(elapsed);

            if (currentSecond !== lastSecondRef.current) {
                lastSecondRef.current = currentSecond;

                setSeconds(
                    Math.min(
                        currentSecond,
                        GAME_SECONDS
                    )
                );
            }

            const speed = Math.min(
                BASE_SPEED + elapsed * 0.12,
                MAX_SPEED
            );

            // =================================================
            // MOVE PLAYER SHIP
            // =================================================

            let nextX =
                shipXRef.current +
                directionRef.current * 7;

            nextX = Math.max(
                8,
                Math.min(
                    width - SHIP_WIDTH - 8,
                    nextX
                )
            );

            shipXRef.current = nextX;
            setShipX(nextX);

            // =================================================
            // MOVE ROCKS
            // =================================================

            let nextRocks = rocksRef.current
                .map((item) => ({
                    ...item,
                    y: item.y + speed * 0.7,
                }))
                .filter(
                    (item) =>
                        item.y <
                        playBottom + ROCK_HEIGHT
                );

            // =================================================
            // MOVE SUPPLIES
            // =================================================

            let nextSupplies = suppliesRef.current
                .map((item) => ({
                    ...item,
                    y: item.y + speed * 0.9,
                }))
                .filter(
                    (item) =>
                        item.y <
                        playBottom + SUPPLY_HEIGHT
                );

            // =================================================
            // MOVE WAVES
            // =================================================

            let nextWaves = wavesRef.current
                .map((item) => ({
                    ...item,
                    y: item.y + speed * 0.55,
                }))
                .filter(
                    (item) =>
                        item.y <
                        playBottom + WAVE_HEIGHT
                );

            // =================================================
            // SPAWN ROCKS
            // =================================================

            if (
                now - lastRockSpawnRef.current >
                ROCK_SPAWN_MS
            ) {
                lastRockSpawnRef.current = now;

                nextRocks.push({
                    id: `rock-${now}-${Math.random()}`,

                    x:
                        10 +
                        Math.random() *
                        Math.max(
                            1,
                            width -
                            ROCK_WIDTH -
                            20
                        ),

                    y:
                        playTop -
                        ROCK_HEIGHT,
                });
            }

            // =================================================
            // SPAWN SUPPLIES
            // =================================================

            if (
                now - lastSupplySpawnRef.current >
                SUPPLY_SPAWN_MS
            ) {
                lastSupplySpawnRef.current = now;

                nextSupplies.push({
                    id: `supply-${now}-${Math.random()}`,

                    x:
                        10 +
                        Math.random() *
                        Math.max(
                            1,
                            width -
                            SUPPLY_WIDTH -
                            20
                        ),

                    y:
                        playTop -
                        SUPPLY_HEIGHT,
                });
            }

            // =================================================
            // SPAWN WAVES
            // =================================================

            if (
                now - lastWaveSpawnRef.current >
                WAVE_SPAWN_MS
            ) {
                lastWaveSpawnRef.current = now;

                nextWaves.push({
                    id: `wave-${now}-${Math.random()}`,

                    x:
                        Math.random() *
                        Math.max(
                            1,
                            width -
                            WAVE_WIDTH
                        ),

                    y:
                        playTop -
                        WAVE_HEIGHT,

                    opacity:
                        0.7 + Math.random() * 0.2,
                });
            }

            // =================================================
            // SHIP COLLISION BOX
            // =================================================


            const shipRect = {
                left:
                    shipXRef.current + 18,

                right:
                    shipXRef.current +
                    SHIP_WIDTH -
                    18,

                top:
                    playBottom -
                    SHIP_HEIGHT -
                    12,

                bottom:
                    playBottom - 12,
            };

            // =================================================
            // ROCK COLLISION
            // =================================================

            let hitRock = false;

            nextRocks = nextRocks.filter((item) => {
                const hit =
                    item.x < shipRect.right &&
                    item.x + ROCK_WIDTH >
                    shipRect.left &&
                    item.y < shipRect.bottom &&
                    item.y + ROCK_HEIGHT >
                    shipRect.top;

                if (hit) {
                    hitRock = true;
                }

                return !hit;
            });

            // =================================================
            // WAVE COLLISION
            // =================================================

            let hitWave = false;

            nextWaves = nextWaves.filter((item) => {
                const hit =
                    item.x < shipRect.right &&
                    item.x + WAVE_WIDTH >
                    shipRect.left &&
                    item.y < shipRect.bottom &&
                    item.y + WAVE_HEIGHT >
                    shipRect.top;

                if (hit) {
                    hitWave = true;
                }


                return !hit;
            });

            // =================================================
            // SUPPLY COLLISION
            // =================================================

            let gotSupply = false;

            nextSupplies = nextSupplies.filter(
                (item) => {
                    const hit =
                        item.x <
                        shipRect.right &&
                        item.x +
                        SUPPLY_WIDTH >
                        shipRect.left &&
                        item.y <
                        shipRect.bottom &&
                        item.y +
                        SUPPLY_HEIGHT >
                        shipRect.top;

                    if (hit) {
                        gotSupply = true;
                    }

                    return !hit;
                }
            );

            // =================================================
            // APPLY DAMAGE
            // =================================================


            if (hitRock || hitWave) {
                const nextHull =
                    hullRef.current - 1;

                hullRef.current = nextHull;
                setHull(nextHull);

                if (nextHull <= 0) {
                    setGameState('lost');
                }
            }

            // =================================================
            // COLLECT SUPPLY
            // =================================================

            if (gotSupply) {
                const nextCollected =
                    collectedRef.current + 1;

                collectedRef.current =
                    nextCollected;

                setCollected(nextCollected);

                if (
                    nextCollected >=
                    TARGET_SUPPLIES
                ) {
                    setGameState('won');
                }
            }

            // =================================================
            // SAVE OBJECT ARRAYS
            // =================================================

            rocksRef.current = nextRocks;
            suppliesRef.current = nextSupplies;
            wavesRef.current = nextWaves;

            setRocks(nextRocks);
            setSupplies(nextSupplies);
            setWaves(nextWaves);

            // =================================================
            // TIME LIMIT
            // =================================================

            if (elapsed >= GAME_SECONDS) {
                setGameState((currentState) =>
                    currentState === 'playing'
                        ? 'lost'
                        : currentState
                );
            }
        }, TICK_MS);

        return () => clearInterval(timer);
    }, [gameState, height, width, playBottom]);

    // =====================================================
    // RESTART
    // =====================================================

    const restart = () => {
        const startX = Math.max(
            0,
            width / 2 - SHIP_WIDTH / 2
        );

        directionRef.current = 0;
        shipXRef.current = startX;

        rocksRef.current = [];
        suppliesRef.current = [];
        wavesRef.current = [];

        lastRockSpawnRef.current = Date.now();
        lastSupplySpawnRef.current = Date.now();
        lastWaveSpawnRef.current = Date.now();

        lastSecondRef.current = -1;
        startTimeRef.current = Date.now();

        hullRef.current = START_HULL;
        collectedRef.current = 0;

        setShipX(startX);

        setRocks([]);
        setSupplies([]);
        setWaves([]);

        setHull(START_HULL);
        setCollected(0);
        setSeconds(0);

        setShipDirection(0);

        setGameState('playing');
    };

    const isWon = gameState === 'won';

    // =====================================================
    // SHIP IMAGE
    // =====================================================


    const shipSource =
        shipDirection === 1
            ? require('../../../assets/Minigames/Part1/Ship Right.png')
            : require('../../../assets/Minigames/Part1/Ship.png');

    return (
        <View style={styles.root}>
            <ImageBackground
                source={require('../../../assets/Minigames/Part1/Part1_Voyage_BG.jpg')}
                resizeMode="cover"
                style={styles.background}
            >
                <View style={styles.darkOverlay} />

                {/* =================================================
                    HUD
                ================================================= */}

                <View style={styles.header}>
                    <Text style={styles.title}>
                        THE VOYAGE CONTINUES
                    </Text>

                    <Text style={styles.subtitle}>
                        The next shore awaits.
                    </Text>

                    <View style={styles.statsRow}>
                        <Text style={styles.stat}>
                            HULL: {hull}/{START_HULL}
                        </Text>

                        <Text style={styles.stat}>
                            SUPPLIES: {collected}/
                            {TARGET_SUPPLIES}
                        </Text>

                        <Text style={styles.stat}>
                            TIME:{' '}
                            {Math.max(
                                0,
                                GAME_SECONDS - seconds
                            )}
                            s
                        </Text>
                    </View>
                </View>

                {/* =================================================
                    WAVES
                ================================================= */}

                {waves.map((item) => (
                    <Image
                        key={item.id}
                        source={require('../../../assets/Minigames/Part1/Waves.png')}
                        style={[
                            styles.wave,
                            {
                                left: item.x,
                                top: item.y,
                                opacity: item.opacity,
                            },
                        ]}
                    />
                ))}

                {/* =================================================
                    ROCKS
                ================================================= */}

                {rocks.map((item) => (
                    <Image
                        key={item.id}
                        source={require('../../../assets/Minigames/Part1/Rock.png')}
                        style={[
                            styles.rock,
                            {
                                left: item.x,
                                top: item.y,
                            },
                        ]}
                    />
                ))}

                {/* =================================================
                    SUPPLIES
                ================================================= */}

                {supplies.map((item) => (
                    <Image
                        key={item.id}
                        source={require('../../../assets/Minigames/Part1/Supply.png')}
                        style={[
                            styles.supply,
                            {
                                left: item.x,
                                top: item.y,
                            },
                        ]}
                    />
                ))}

                {/* =================================================
                    PLAYER SHIP
                ================================================= */}

                <Image
                    source={shipSource}
                    style={[
                        styles.ship,
                        {
                            left: shipX,
                            top:
                                playBottom -
                                SHIP_HEIGHT -
                                12,
                        },
                    ]}
                />

                {/* =================================================
                    INSTRUCTIONS
                ================================================= */}

                <View style={styles.instructions}>
                    <Text style={styles.instructionText}>
                        HOLD ◀ OR ▶ TO STEER
                    </Text>

                    <Text style={styles.smallInstruction}>
                        Collect {TARGET_SUPPLIES} supplies. Avoid rocks and waves.
                    </Text>
                </View>

                {/* =================================================
                    CONTROLS
                ================================================= */}

                {/* =================================================
    CONTROLS
================================================= */}

                <View style={styles.controls}>

                    <Pressable
                        style={styles.controlButton}
                        onPressIn={() => {
                            directionRef.current = -1;
                            setShipDirection(-1);
                        }}
                        onPressOut={() => {
                            directionRef.current = 0;
                        }}
                    >
                        <Text style={styles.controlText}>
                            ◀
                        </Text>
                    </Pressable>

                    <Pressable
                        style={styles.controlButton}
                        onPressIn={() => {
                            directionRef.current = 1;
                            setShipDirection(1);
                        }}
                        onPressOut={() => {
                            directionRef.current = 0;
                        }}
                    >
                        <Text style={styles.controlText}>
                            ▶
                        </Text>
                    </Pressable>

                </View>

                {/* =================================================
                    RESULT SCREEN
                ================================================= */}

                {gameState !== 'playing' && (
                    <View style={styles.resultOverlay}>
                        <View style={styles.resultBox}>
                            <Text style={styles.resultTitle}>
                                {isWon
                                    ? 'VOYAGE COMPLETE!'
                                    : 'THE FLEET COULD NOT CONTINUE'}
                            </Text>

                            <Text style={styles.resultText}>
                                {isWon
                                    ? 'You guided the fleet safely through the voyage.'
                                    : hull <= 0
                                        ? 'The ship was damaged too badly.'
                                        : 'You ran out of time before gathering enough supplies.'}
                            </Text>

                            {isWon ? (
                                <Pressable
                                    style={styles.actionButton}
                                    onPress={onComplete}
                                >
                                    <Text style={styles.actionText}>
                                        CONTINUE
                                    </Text>
                                </Pressable>
                            ) : (
                                <Pressable
                                    style={styles.actionButton}
                                    onPress={restart}
                                >
                                    <Text style={styles.actionText}>
                                        TRY AGAIN
                                    </Text>
                                </Pressable>
                            )}
                        </View>
                    </View>
                )}
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#0b2732',
    },

    background: {
        flex: 1,
    },

    darkOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 20, 30, 0.10)',
    },

    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        paddingTop: 12,
        paddingHorizontal: 14,
        zIndex: 20,
    },

    title: {
        color: '#fff4cf',
        fontSize: 21,
        fontWeight: 'bold',
        textAlign: 'center',
        textShadowColor: '#000',
        textShadowRadius: 4,
    },

    subtitle: {
        color: '#fff',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 3,
        textShadowColor: '#000',
        textShadowRadius: 3,
    },

    statsRow: {
        marginTop: 9,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    stat: {
        color: '#fff',
        fontSize: 11,
        fontWeight: 'bold',
        textShadowColor: '#000',
        textShadowRadius: 3,
    },

    ship: {
        position: 'absolute',
        width: SHIP_WIDTH,
        height: SHIP_HEIGHT,
        resizeMode: 'contain',
        zIndex: 10,
    },

    wave: {
        position: 'absolute',
        width: WAVE_WIDTH,
        height: WAVE_HEIGHT,
        resizeMode: 'contain',
        zIndex: 5,
    },

    rock: {
        position: 'absolute',
        width: ROCK_WIDTH,
        height: ROCK_HEIGHT,
        resizeMode: 'contain',
        zIndex: 8,
    },

    supply: {
        position: 'absolute',
        width: SUPPLY_WIDTH,
        height: SUPPLY_HEIGHT,
        resizeMode: 'contain',
        zIndex: 7,
    },

    instructions: {
        position: 'absolute',
        bottom: 91,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 15,
    },

    instructionText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: 'bold',
        textShadowColor: '#000',
        textShadowRadius: 4,
    },

    smallInstruction: {
        color: '#fff',
        fontSize: 11,
        marginTop: 3,
        textShadowColor: '#000',
        textShadowRadius: 3,
    },

    controls: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        zIndex: 30,
    },

    controlButton: {
        width: 105,
        height: 58,
        borderRadius: 10,
        backgroundColor: 'rgba(25, 25, 25, 0.75)',
        borderWidth: 2,
        borderColor: '#f0d58a',
        alignItems: 'center',
        justifyContent: 'center',
    },

    controlText: {
        color: '#fff4cf',
        fontSize: 28,
        fontWeight: 'bold',
    },

    resultOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.70)',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
    },

    resultBox: {
        width: '84%',
        padding: 24,
        backgroundColor: 'rgba(20, 48, 58, 0.96)',
        borderWidth: 2,
        borderColor: '#d8b86a',
        borderRadius: 14,
        alignItems: 'center',
    },

    resultTitle: {
        color: '#fff4cf',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    resultText: {
        color: '#fff',
        fontSize: 15,
        textAlign: 'center',
        marginTop: 12,
        lineHeight: 22,
    },

    actionButton: {
        marginTop: 20,
        paddingHorizontal: 30,
        paddingVertical: 12,
        backgroundColor: '#000000',
        borderWidth: 1,
        borderColor: '#f0d58a',
        borderRadius: 8,
    },

    actionText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    },
});

export default VoyageMinigame;