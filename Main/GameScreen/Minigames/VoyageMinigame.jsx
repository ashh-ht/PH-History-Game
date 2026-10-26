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
import MinigameOverlay from '../../../Components/Minigameoverlay';

const GAME_SECONDS = 60;
const TARGET_SUPPLIES = 10;
const START_HULL = 5;

const TICK_MS = 50;

const STEER_SPEED = 7;

const BASE_SPEED = 6;
const MAX_SPEED = 14;

const ROCK_SPAWN_MS = 3000;
const SUPPLY_SPAWN_MS = 1900;
const WAVE_SPAWN_MS = 2200;

const SHIP_WIDTH = 130;
const SHIP_HEIGHT = 120;

const ROCK_WIDTH = 50;
const ROCK_HEIGHT = 50;

const SUPPLY_WIDTH = 65;
const SUPPLY_HEIGHT = 60;

const WAVE_WIDTH = 90;
const WAVE_HEIGHT = 68;

const ROCK_IMAGES = [
    require('../../../assets/Minigames/Part1/Rock.png'),
    require('../../../assets/Minigames/Part1/Rock2.png'),
    require('../../../assets/Minigames/Part1/Rock3.png'),
];

const WAVE_IMAGES = [
    require('../../../assets/Minigames/Part1/Waves.png'),
    require('../../../assets/Minigames/Part1/Waves2.png'),
];

const SHIP_Y_OFFSET = 30;

const HIT_LEFT = 0.15;
const HIT_RIGHT = 0.15;
const HIT_TOP = 0.58;
const HIT_BOTTOM = 0.06;

const PICK_LEFT = 0.05;
const PICK_RIGHT = 0.05;
const PICK_TOP = 0.25;
const PICK_BOTTOM = 0.05;

const ROCK_HIT = { x: 0.15, top: 0.2, bottom: 0.1 };
const WAVE_HIT = { x: 0.15, top: 0.3, bottom: 0.3 };
const SUPPLY_HIT = { x: 0.1, top: 0.1, bottom: 0.1 };

const DEBUG_HITBOX = false;

const makeRect = (x, y, w, h, trimLeft, trimRight, trimTop, trimBottom) => ({
    left: x + w * trimLeft,
    right: x + w * (1 - trimRight),
    top: y + h * trimTop,
    bottom: y + h * (1 - trimBottom),
});

const objectRect = (item, w, h, hit) =>
    makeRect(item.x, item.y, w, h, hit.x, hit.x, hit.top, hit.bottom);

const overlaps = (a, b) =>
    a.left < b.right &&
    a.right > b.left &&
    a.top < b.bottom &&
    a.bottom > b.top;

function VoyageMinigame({ onComplete, onSettings }) {
    const [paused, setPaused] = useState(false);
    const { width, height } = useWindowDimensions();
    const controlsHeight = 110;
    const playTop = 95;
    const playBottom = height - controlsHeight;

    const shipTop = playBottom - SHIP_HEIGHT - 12 + SHIP_Y_OFFSET;

    const [shipX, setShipX] = useState(
        Math.max(0, width / 2 - SHIP_WIDTH / 2)
    );

    const [rocks, setRocks] = useState([]);
    const [supplies, setSupplies] = useState([]);
    const [waves, setWaves] = useState([]);

    const [hull, setHull] = useState(START_HULL);
    const [collected, setCollected] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [gameState, setGameState] = useState('intro');

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

    
    const pausedRef = useRef(paused);
    const pausedAtRef = useRef(null);
    pausedRef.current = paused;

    useEffect(() => {
        if (gameState !== 'playing') return;

        if (paused) {
            if (pausedAtRef.current === null) {
                pausedAtRef.current = Date.now();
            }
            directionRef.current = 0;
            setShipDirection(0);
        } else if (pausedAtRef.current !== null) {
            const pausedFor = Date.now() - pausedAtRef.current;
            startTimeRef.current += pausedFor;
            lastRockSpawnRef.current += pausedFor;
            lastSupplySpawnRef.current += pausedFor;
            lastWaveSpawnRef.current += pausedFor;
            pausedAtRef.current = null;
        }
    }, [paused, gameState]);

    useEffect(() => {
        if (gameState !== 'playing') {
            return;
        }

        startTimeRef.current = Date.now();
        lastRockSpawnRef.current = Date.now();
        lastSupplySpawnRef.current = Date.now();
        lastWaveSpawnRef.current = Date.now();
        lastSecondRef.current = -1;
        pausedAtRef.current = null;

        const timer = setInterval(() => {
            if (pausedRef.current) return;

            const now = Date.now();
            const elapsed = (now - startTimeRef.current) / 1000;
            const currentSecond = Math.floor(elapsed);

            if (currentSecond !== lastSecondRef.current) {
                lastSecondRef.current = currentSecond;
                setSeconds(Math.min(currentSecond, GAME_SECONDS));
            }

            const speed = Math.min(
                BASE_SPEED + (elapsed / GAME_SECONDS) * (MAX_SPEED - BASE_SPEED),
                MAX_SPEED
            );

            let nextX = shipXRef.current + directionRef.current * STEER_SPEED;

            nextX = Math.max(
                8,
                Math.min(width - SHIP_WIDTH - 8, nextX)
            );

            shipXRef.current = nextX;
            setShipX(nextX);

            let nextRocks = rocksRef.current
                .map((item) => ({ ...item, y: item.y + speed * 0.7 }))
                .filter((item) => item.y < playBottom + ROCK_HEIGHT);

            let nextSupplies = suppliesRef.current
                .map((item) => ({ ...item, y: item.y + speed * 0.9 }))
                .filter((item) => item.y < playBottom + SUPPLY_HEIGHT);

            let nextWaves = wavesRef.current
                .map((item) => ({ ...item, y: item.y + speed * 0.55 }))
                .filter((item) => item.y < playBottom + WAVE_HEIGHT);

            if (now - lastRockSpawnRef.current > ROCK_SPAWN_MS) {
                lastRockSpawnRef.current = now;
                nextRocks.push({
                    id: `rock-${now}-${Math.random()}`,
                    x: 10 + Math.random() * Math.max(1, width - ROCK_WIDTH - 20),
                    y: playTop - ROCK_HEIGHT,
                    type: Math.floor(Math.random() * ROCK_IMAGES.length),
                });
            }

            if (now - lastSupplySpawnRef.current > SUPPLY_SPAWN_MS) {
                lastSupplySpawnRef.current = now;
                nextSupplies.push({
                    id: `supply-${now}-${Math.random()}`,
                    x: 10 + Math.random() * Math.max(1, width - SUPPLY_WIDTH - 20),
                    y: playTop - SUPPLY_HEIGHT,
                });
            }

            if (now - lastWaveSpawnRef.current > WAVE_SPAWN_MS) {
                lastWaveSpawnRef.current = now;
                nextWaves.push({
                    id: `wave-${now}-${Math.random()}`,
                    x: Math.random() * Math.max(1, width - WAVE_WIDTH),
                    y: playTop - WAVE_HEIGHT,
                    opacity: 0.7 + Math.random() * 0.2,
                    type: Math.floor(Math.random() * WAVE_IMAGES.length),
                });
            }

            const shipRect = makeRect(
                shipXRef.current, shipTop, SHIP_WIDTH, SHIP_HEIGHT,
                HIT_LEFT, HIT_RIGHT, HIT_TOP, HIT_BOTTOM
            );

            const pickupRect = makeRect(
                shipXRef.current, shipTop, SHIP_WIDTH, SHIP_HEIGHT,
                PICK_LEFT, PICK_RIGHT, PICK_TOP, PICK_BOTTOM
            );

            let hitRock = false;
            nextRocks = nextRocks.filter((item) => {
                const hit = overlaps(shipRect, objectRect(item, ROCK_WIDTH, ROCK_HEIGHT, ROCK_HIT));
                if (hit) hitRock = true;
                return !hit;
            });

            let hitWave = false;
            nextWaves = nextWaves.filter((item) => {
                const hit = overlaps(shipRect, objectRect(item, WAVE_WIDTH, WAVE_HEIGHT, WAVE_HIT));
                if (hit) hitWave = true;
                return !hit;
            });

            let gotSupply = false;
            nextSupplies = nextSupplies.filter((item) => {
                const hit = overlaps(pickupRect, objectRect(item, SUPPLY_WIDTH, SUPPLY_HEIGHT, SUPPLY_HIT));
                if (hit) gotSupply = true;
                return !hit;
            });

            if (hitRock || hitWave) {
                const nextHull = hullRef.current - 1;
                hullRef.current = nextHull;
                setHull(nextHull);

                if (nextHull <= 0) {
                    setGameState('lost');
                }
            }

            if (gotSupply) {
                const nextCollected = collectedRef.current + 1;
                collectedRef.current = nextCollected;
                setCollected(nextCollected);

                if (nextCollected >= TARGET_SUPPLIES) {
                    setGameState('won');
                }
            }

            rocksRef.current = nextRocks;
            suppliesRef.current = nextSupplies;
            wavesRef.current = nextWaves;

            setRocks(nextRocks);
            setSupplies(nextSupplies);
            setWaves(nextWaves);

            if (elapsed >= GAME_SECONDS) {
                setGameState((currentState) =>
                    currentState === 'playing' ? 'lost' : currentState
                );
            }
        }, TICK_MS);

        return () => clearInterval(timer);
    }, [gameState, height, width, playBottom, playTop, shipTop]);

    const restart = () => {
        const startX = Math.max(0, width / 2 - SHIP_WIDTH / 2);
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
        pausedAtRef.current = null;
        setPaused(false);

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

    const shipSource =
        shipDirection === 1
            ? require('../../../assets/Minigames/Part1/Ship Right.png')
            : require('../../../assets/Minigames/Part1/Ship.png');

    const debugBoxes = DEBUG_HITBOX
        ? [
            [
                makeRect(shipX, shipTop, SHIP_WIDTH, SHIP_HEIGHT, HIT_LEFT, HIT_RIGHT, HIT_TOP, HIT_BOTTOM),
                'rgba(255,0,0,0.35)',
            ],
            [
                makeRect(shipX, shipTop, SHIP_WIDTH, SHIP_HEIGHT, PICK_LEFT, PICK_RIGHT, PICK_TOP, PICK_BOTTOM),
                'rgba(0,255,0,0.25)',
            ],
            ...rocks.map((i) => [
                objectRect(i, ROCK_WIDTH, ROCK_HEIGHT, ROCK_HIT),
                'rgba(255,165,0,0.45)',
            ]),
            ...waves.map((i) => [
                objectRect(i, WAVE_WIDTH, WAVE_HEIGHT, WAVE_HIT),
                'rgba(0,120,255,0.45)',
            ]),
            ...supplies.map((i) => [
                objectRect(i, SUPPLY_WIDTH, SUPPLY_HEIGHT, SUPPLY_HIT),
                'rgba(255,255,0,0.45)',
            ]),
        ]
        : [];

    return (
        <View style={styles.root}>
            <ImageBackground
                source={require('../../../assets/Minigames/Part1/VoyageBG.png')}
                resizeMode="cover"
                style={styles.background}
            >
                <View style={styles.darkOverlay} />

                <View style={styles.header}>
                    {/* LEFT: health */}
                    <View style={styles.panel}>
                        <Text style={styles.panelLabel}>Health</Text>
                        <Text style={styles.panelValue}>
                            {hull}/{START_HULL}
                        </Text>
                    </View>

                    {/* LEFT (next to health): supplies */}
                    <View style={styles.panel}>
                        <Text style={styles.panelLabel}>SUPPLIES</Text>
                        <Text style={styles.panelValue}>
                            {collected}/{TARGET_SUPPLIES}
                        </Text>
                    </View>
                </View>

                {/* CENTER: time */}
                <View style={styles.timeWrap} pointerEvents="none">
                    <View style={styles.panel}>
                        <Text style={styles.panelLabel}>TIME</Text>
                        <Text style={styles.panelValue}>
                            {Math.max(0, GAME_SECONDS - seconds)}s
                        </Text>
                    </View>
                </View>

                {/* WAVES */}
                {waves.map((item) => (
                    <Image
                        key={item.id}
                        source={WAVE_IMAGES[item.type]}
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

                {/* ROCKS */}
                {rocks.map((item) => (
                    <Image
                        key={item.id}
                        source={ROCK_IMAGES[item.type]}
                        style={[styles.rock, { left: item.x, top: item.y }]}
                    />
                ))}

                {/* SUPPLIES */}
                {supplies.map((item) => (
                    <Image
                        key={item.id}
                        source={require('../../../assets/Minigames/Part1/Supply.png')}
                        style={[styles.supply, { left: item.x, top: item.y }]}
                    />
                ))}

                {/* PLAYER SHIP */}
                <Image
                    source={shipSource}
                    style={[styles.ship, { left: shipX, top: shipTop }]}
                />

                {debugBoxes.map(([r, color], index) => (
                    <View
                        key={`debug-${index}`}
                        pointerEvents="none"
                        style={{
                            position: 'absolute',
                            left: r.left,
                            top: r.top,
                            width: r.right - r.left,
                            height: r.bottom - r.top,
                            backgroundColor: color,
                            zIndex: 11,
                        }}
                    />
                ))}

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
                        <Text style={styles.controlText}>◀</Text>
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
                        <Text style={styles.controlText}>▶</Text>
                    </Pressable>
                </View>

                {/* =================================================
                    INTRO / INSTRUCTIONS (shown before the game starts)
                ================================================= */}

                {gameState === 'intro' && (
                    <View style={styles.resultOverlay}>
                        <View style={styles.resultBox}>
                            <Text style={styles.resultTitle}>THE VOYAGE CONTINUES</Text>

                            <Text style={styles.resultText}>
                                The next shore awaits. Guide the fleet safely across the sea.
                            </Text>

                            <View style={styles.introList}>
                                <Text style={styles.introItem}>
                                    ● Hold the arrows to steer the ship
                                </Text>
                                <Text style={styles.introItem}>
                                    ● Collect {TARGET_SUPPLIES} supplies
                                </Text>
                                <Text style={styles.introItem}>
                                    ● Avoid rocks and waves. They damage your hull
                                </Text>
                                <Text style={styles.introItem}>
                                    ● You have {GAME_SECONDS} seconds
                                </Text>
                            </View>

                            <Pressable
                                style={styles.actionButton}
                                onPress={() => setGameState('playing')}
                            >
                                <Text style={styles.actionText}>START</Text>
                            </Pressable>
                        </View>
                    </View>
                )}

                {/* =================================================
                    RESULT SCREEN
                ================================================= */}

                {(gameState === 'won' || gameState === 'lost') && (
                    <View style={styles.resultOverlay}>
                        <View style={styles.resultBox}>
                            <Text style={styles.resultTitle}>
                                {isWon ? 'VOYAGE COMPLETE!' : 'THE FLEET COULD NOT CONTINUE'}
                            </Text>

                            <Text style={styles.resultText}>
                                {isWon
                                    ? 'You guided the fleet safely through the voyage.'
                                    : hull <= 0
                                        ? 'The ship was damaged too badly.'
                                        : 'You ran out of time before gathering enough supplies.'}
                            </Text>

                            {isWon ? (
                                <Pressable style={styles.actionButton} onPress={onComplete}>
                                    <Text style={styles.actionText}>CONTINUE</Text>
                                </Pressable>
                            ) : (
                                <Pressable style={styles.actionButton} onPress={restart}>
                                    <Text style={styles.actionText}>TRY AGAIN</Text>
                                </Pressable>
                            )}
                        </View>
                    </View>
                )}

                {gameState === 'playing' && (
                    <MinigameOverlay
                        paused={paused}
                        hideSettings={!onSettings}
                        top={20}
                        right={20}
                        onPause={() => setPaused(true)}
                        onResume={() => setPaused(false)}
                        onSettings={() => {
                            setPaused(true);
                            onSettings?.();
                        }}
                    />
                )}
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#dbb882',
    },
    background: {
        flex: 1,
    },
    darkOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(143, 180, 166, 0.89)',
    },

    header: {
        position: 'absolute',
        top: 12,
        left: 16,
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
        zIndex: 20,
    },

    timeWrap: {
        position: 'absolute',
        top: 12,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 20,
    },

    panel: {
        minWidth: 110,
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignItems: 'center',
        backgroundColor: 'rgba(20, 48, 58, 0.85)',
        borderWidth: 2,
        borderColor: '#d8b86a',
        borderRadius: 10,
    },

    panelLabel: {
        color: '#f0d58a',
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 1,
    },

    panelValue: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 2,
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

    introList: {
        marginTop: 16,
        alignSelf: 'stretch',
    },

    introItem: {
        color: '#fff',
        fontSize: 14,
        lineHeight: 22,
        marginTop: 6,
    },

    controls: {
        position: 'absolute',
        bottom: 28,
        left: 0,
        right: 0,
        paddingHorizontal: 28,
        flexDirection: 'row',
        justifyContent: 'space-between',
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