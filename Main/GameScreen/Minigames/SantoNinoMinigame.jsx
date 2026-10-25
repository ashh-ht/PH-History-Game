import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

const GRID_SIZE = 3;
const PIECE_COUNT = GRID_SIZE * GRID_SIZE;

// Set to true if you want the little ✓ badge on placed pieces
const SHOW_CHECKMARKS = false;

const PIECES = [
  require('../../../assets/Minigames/Part1/piece-r1-c1.png'),
  require('../../../assets/Minigames/Part1/piece-r1-c2.png'),
  require('../../../assets/Minigames/Part1/piece-r1-c3.png'),
  require('../../../assets/Minigames/Part1/piece-r2-c1.png'),
  require('../../../assets/Minigames/Part1/piece-r2-c2.png'),
  require('../../../assets/Minigames/Part1/piece-r2-c3.png'),
  require('../../../assets/Minigames/Part1/piece-r3-c1.png'),
  require('../../../assets/Minigames/Part1/piece-r3-c2.png'),
  require('../../../assets/Minigames/Part1/piece-r3-c3.png'),
];

const COMPLETE_IMAGE = require('../../../assets/Minigames/Part1/Santo Nino.png');

const DISCOVERY_BACKGROUND = require('../../../Background Images/Part 1/nipa hut interior santo nino discovery.png');

/*
 * Real width / height of ONE piece PNG.
 * Every piece is 1/3 of the full image in both directions,
 * so this is also the aspect ratio of the whole puzzle.
 */
const pieceSource = Image.resolveAssetSource(PIECES[0]);
const PIECE_ASPECT =
  pieceSource && pieceSource.width && pieceSource.height
    ? pieceSource.width / pieceSource.height
    : 1;

// Full shuffle used at the start (never starts already solved)
function shuffle(array) {
  const shuffled = [...array];

  do {
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
  } while (shuffled.every((value, index) => value === index));

  return shuffled;
}

// Shuffles any list of values and makes sure the order really changes
// (needs at least 2 values).
function shuffleDifferent(values) {
  const original = [...values];
  const shuffled = [...values];

  do {
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
  } while (shuffled.every((value, index) => value === original[index]));

  return shuffled;
}

export default function SantoNinoMinigame({
  onComplete,
  paused = false,
  onPhaseChange,
}) {
  const { width, height } = useWindowDimensions();

  /*
   * =====================================================
   * LAYOUT (board keeps the image's real proportions)
   * =====================================================
   */

  const trayGap = 5;
  const boardTop = 100;

  // Board: as tall as fits, width follows the image aspect ratio
  let boardHeight = Math.min(Math.max(120, height - boardTop - 16), 240);
  let boardWidth = boardHeight * PIECE_ASPECT;

  // Don't let the board eat more than half the screen width
  const maxBoardWidth = width * 0.5;
  if (boardWidth > maxBoardWidth) {
    boardWidth = maxBoardWidth;
    boardHeight = boardWidth / PIECE_ASPECT;
  }

  const boardPieceW = boardWidth / GRID_SIZE;
  const boardPieceH = boardHeight / GRID_SIZE;

  // Tray pieces: same aspect ratio as board pieces (3 columns)
  let trayPieceW = Math.min(42, (width - boardWidth - 40) / 3);

  // Make sure tray + label + shuffle button fit vertically
  const maxTrayHeight = Math.max(90, height - boardTop - 60);
  const maxTrayPieceH = (maxTrayHeight - trayGap * 2) / 3;
  trayPieceW = Math.min(trayPieceW, maxTrayPieceH * PIECE_ASPECT);

  const trayPieceH = trayPieceW / PIECE_ASPECT;

  const trayWidth = trayPieceW * 3 + trayGap * 2;
  const trayHeight = trayPieceH * 3 + trayGap * 2;

  const totalGroupWidth = boardWidth + 14 + trayWidth;
  const groupLeft = Math.max(5, (width - totalGroupWidth) / 2);

  const boardLeft = groupLeft;
  const trayLeft = boardLeft + boardWidth + 14;
  const trayTop = boardTop;

  /*
   * =====================================================
   * GAME STATE
   * =====================================================
   */

  const [pieces, setPieces] = useState(() =>
    shuffle(Array.from({ length: PIECE_COUNT }, (_, index) => index))
  );

  const [locked, setLocked] = useState([]);
  const [gameState, setGameState] = useState('playing');

  // The piece currently being dragged (so it renders on top)
  const [activePiece, setActivePiece] = useState(null);

  const lockedRef = useRef(locked);

  useEffect(() => {
    lockedRef.current = locked;
  }, [locked]);

  // Pieces that are flying into their slot right now (not locked yet).
  // They must not be touched or shuffled while they are on their way.
  const settlingRef = useRef(new Set());

  // Pause support: while paused, nothing can be dragged or shuffled.
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  // Tells the parent which screen we are on ("playing" or "result") so it
  // can show the pause button only while the puzzle is being played.
  useEffect(() => {
    if (!onPhaseChange) return;

    onPhaseChange(gameState === 'won' ? 'result' : 'playing');
  }, [gameState, onPhaseChange]);

  /*
   * =====================================================
   * ANIMATIONS
   * =====================================================
   */

  const pieceAnimations = useMemo(() => {
    return Array.from({ length: PIECE_COUNT }, () => ({
      x: new Animated.Value(0),
      y: new Animated.Value(0),
      scale: new Animated.Value(1),
    }));
  }, []);

  const successScale = useRef(new Animated.Value(0.85)).current;
  const successOpacity = useRef(new Animated.Value(0)).current;

  /*
   * =====================================================
   * CHECK COMPLETION
   * =====================================================
   */

  useEffect(() => {
    if (locked.length !== PIECE_COUNT) {
      return;
    }

    const timer = setTimeout(() => {
      setGameState('won');
    }, 400);

    return () => clearTimeout(timer);
  }, [locked]);

  /*
   * =====================================================
   * SUCCESS ANIMATION
   * =====================================================
   */

  useEffect(() => {
    if (gameState !== 'won') {
      return;
    }

    Animated.parallel([
      Animated.spring(successScale, {
        toValue: 1,
        friction: 7,
        tension: 70,
        useNativeDriver: true,
      }),
      Animated.timing(successOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, [gameState, successOpacity, successScale]);

  /*
   * =====================================================
   * SHUFFLE
   *
   * Only the pieces that are still in the tray get shuffled.
   * Pieces already placed on the board stay exactly where they are,
   * and they keep their original tray slot so their position on the
   * board stays correct.
   * =====================================================
   */

  const shufflePieces = () => {
    if (gameState !== 'playing' || pausedRef.current) return;

    const isFrozen = (pieceIndex) =>
      lockedRef.current.includes(pieceIndex) ||
      settlingRef.current.has(pieceIndex);

    // Tray slots that currently hold a piece that is still free
    const freeSlots = [];
    pieces.forEach((pieceIndex, slot) => {
      if (!isFrozen(pieceIndex)) freeSlots.push(slot);
    });

    // Put every free piece (not a placed one) back to rest in the tray
    pieces.forEach((pieceIndex) => {
      if (isFrozen(pieceIndex)) return;

      const animation = pieceAnimations[pieceIndex];
      animation.x.setValue(0);
      animation.y.setValue(0);
      animation.scale.setValue(1);
    });

    setActivePiece(null);

    // Nothing (or only one piece) left to shuffle
    if (freeSlots.length < 2) return;

    const freePieces = freeSlots.map((slot) => pieces[slot]);
    const reshuffled = shuffleDifferent(freePieces);

    const next = [...pieces];
    freeSlots.forEach((slot, i) => {
      next[slot] = reshuffled[i];
    });

    setPieces(next);
  };

  /*
   * =====================================================
   * RETURN PIECE TO TRAY
   * =====================================================
   */

  const returnPiece = (pieceIndex) => {
    Animated.parallel([
      Animated.spring(pieceAnimations[pieceIndex].x, {
        toValue: 0,
        friction: 7,
        tension: 80,
        useNativeDriver: true,
      }),
      Animated.spring(pieceAnimations[pieceIndex].y, {
        toValue: 0,
        friction: 7,
        tension: 80,
        useNativeDriver: true,
      }),
      Animated.spring(pieceAnimations[pieceIndex].scale, {
        toValue: 1,
        friction: 7,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start();
  };

  /*
   * =====================================================
   * HANDLE DROP
   * =====================================================
   */

  const handleDrop = (pieceIndex, gestureX, gestureY) => {
    if (
      lockedRef.current.includes(pieceIndex) ||
      settlingRef.current.has(pieceIndex)
    ) {
      return;
    }

    const trayIndex = pieces.indexOf(pieceIndex);

    if (trayIndex === -1) {
      return;
    }

    const trayRow = Math.floor(trayIndex / 3);
    const trayCol = trayIndex % 3;

    const originalLeft = trayLeft + trayCol * (trayPieceW + trayGap);
    const originalTop = trayTop + trayRow * (trayPieceH + trayGap);

    const pieceCenterX = originalLeft + gestureX + trayPieceW / 2;
    const pieceCenterY = originalTop + gestureY + trayPieceH / 2;

    const targetCol = Math.floor((pieceCenterX - boardLeft) / boardPieceW);
    const targetRow = Math.floor((pieceCenterY - boardTop) / boardPieceH);

    const validTarget =
      targetCol >= 0 &&
      targetCol < GRID_SIZE &&
      targetRow >= 0 &&
      targetRow < GRID_SIZE;

    if (!validTarget) {
      returnPiece(pieceIndex);
      return;
    }

    const targetSlot = targetRow * GRID_SIZE + targetCol;

    const isCorrect = pieceIndex === targetSlot;
    const occupied =
      lockedRef.current.includes(targetSlot) ||
      settlingRef.current.has(targetSlot);

    if (!isCorrect || occupied) {
      Animated.parallel([
        Animated.spring(pieceAnimations[pieceIndex].x, {
          toValue: 0,
          friction: 7,
          tension: 80,
          useNativeDriver: true,
        }),
        Animated.spring(pieceAnimations[pieceIndex].y, {
          toValue: 0,
          friction: 7,
          tension: 80,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(pieceAnimations[pieceIndex].scale, {
            toValue: 1.07,
            duration: 70,
            useNativeDriver: true,
          }),
          Animated.spring(pieceAnimations[pieceIndex].scale, {
            toValue: 1,
            friction: 7,
            tension: 80,
            useNativeDriver: true,
          }),
        ]),
      ]).start();

      return;
    }

    const targetLeft = boardLeft + targetCol * boardPieceW;
    const targetTop = boardTop + targetRow * boardPieceH;

    const requiredScale = boardPieceW / trayPieceW;

    // scale happens around the piece's center, so compensate
    const scaleOffsetX = (trayPieceW - boardPieceW) / 2;
    const scaleOffsetY = (trayPieceH - boardPieceH) / 2;

    const requiredX = targetLeft - originalLeft - scaleOffsetX;
    const requiredY = targetTop - originalTop - scaleOffsetY;

    // From now on this piece belongs to the board: it can't be shuffled
    // or grabbed again, even before the animation has finished.
    settlingRef.current.add(pieceIndex);

    Animated.parallel([
      Animated.spring(pieceAnimations[pieceIndex].x, {
        toValue: requiredX,
        friction: 7,
        tension: 80,
        useNativeDriver: true,
      }),
      Animated.spring(pieceAnimations[pieceIndex].y, {
        toValue: requiredY,
        friction: 7,
        tension: 80,
        useNativeDriver: true,
      }),
      Animated.spring(pieceAnimations[pieceIndex].scale, {
        toValue: requiredScale,
        friction: 7,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start(() => {
      settlingRef.current.delete(pieceIndex);

      setLocked((previous) => {
        if (previous.includes(pieceIndex)) {
          return previous;
        }

        return [...previous, pieceIndex];
      });
    });
  };

  const handleDropRef = useRef(handleDrop);
  handleDropRef.current = handleDrop;

  const canTouch = (pieceIndex) =>
    !pausedRef.current &&
    !lockedRef.current.includes(pieceIndex) &&
    !settlingRef.current.has(pieceIndex);

  const responders = useMemo(
    () =>
      Array.from({ length: PIECE_COUNT }, (_, pieceIndex) =>
        PanResponder.create({
          onStartShouldSetPanResponder: () => canTouch(pieceIndex),

          onMoveShouldSetPanResponder: () => canTouch(pieceIndex),

          onPanResponderGrant: () => {
            if (!canTouch(pieceIndex)) {
              return;
            }

            setActivePiece(pieceIndex);

            Animated.spring(pieceAnimations[pieceIndex].scale, {
              toValue: 1.08,
              friction: 7,
              tension: 100,
              useNativeDriver: true,
            }).start();
          },

          onPanResponderMove: (_, gesture) => {
            if (!canTouch(pieceIndex)) {
              return;
            }

            pieceAnimations[pieceIndex].x.setValue(gesture.dx);
            pieceAnimations[pieceIndex].y.setValue(gesture.dy);
          },

          onPanResponderRelease: (_, gesture) => {
            setActivePiece(null);

            if (
              lockedRef.current.includes(pieceIndex) ||
              settlingRef.current.has(pieceIndex)
            ) {
              return;
            }

            // Paused mid-drag: just send the piece back to the tray
            if (pausedRef.current) {
              returnPiece(pieceIndex);
              return;
            }

            handleDropRef.current(pieceIndex, gesture.dx, gesture.dy);
          },

          onPanResponderTerminate: () => {
            setActivePiece(null);

            if (
              lockedRef.current.includes(pieceIndex) ||
              settlingRef.current.has(pieceIndex)
            ) {
              return;
            }

            returnPiece(pieceIndex);
          },
        })
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Is there anything left to shuffle? (at least 2 free pieces)
  const freePieceCount = PIECE_COUNT - locked.length;
  const canShuffle = freePieceCount >= 2;

  /*
   * =====================================================
   * RENDER
   * =====================================================
   */

  return (
    <ImageBackground
      source={DISCOVERY_BACKGROUND}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.darkOverlay} />

      {/* ================= HEADER ================= */}

      <View style={styles.header}>
        <Text style={styles.title}>Restore the Santo Niño</Text>

        <Text style={styles.instruction}>
          Drag the pieces into their correct places.
        </Text>

        <Text style={styles.progress}>
          {locked.length} / {PIECE_COUNT}
        </Text>
      </View>

      {/* ================= BOARD FRAME ================= */}

      <View
        style={[
          styles.boardFrame,
          {
            left: boardLeft - 2,
            top: boardTop - 2,
            width: boardWidth + 4,
            height: boardHeight + 4,
          },
        ]}
      />

      {/* ================= BOARD SLOTS ================= */}

      <View
        style={[
          styles.board,
          {
            width: boardWidth,
            height: boardHeight,
            left: boardLeft,
            top: boardTop,
          },
        ]}
      >
        {Array.from({ length: PIECE_COUNT }).map((_, index) => {
          const row = Math.floor(index / GRID_SIZE);
          const col = index % GRID_SIZE;

          return (
            <View
              key={`slot-${index}`}
              style={[
                styles.boardSlot,
                {
                  width: boardPieceW,
                  height: boardPieceH,
                  left: col * boardPieceW,
                  top: row * boardPieceH,
                },
              ]}
            />
          );
        })}
      </View>

      {/* ================= PIECE TRAY ================= */}

      <View
        style={[
          styles.tray,
          {
            left: trayLeft - 6,
            top: trayTop - 6,
            width: trayWidth + 12,
            height: trayHeight + 12,
          },
        ]}
      />

      {/* ================= PIECES ================= */}

      <View
        pointerEvents={paused ? 'none' : 'box-none'}
        style={StyleSheet.absoluteFill}
      >
        {pieces.map((pieceIndex, trayIndex) => {
          const trayRow = Math.floor(trayIndex / 3);
          const trayCol = trayIndex % 3;

          const left = trayLeft + trayCol * (trayPieceW + trayGap);
          const top = trayTop + trayRow * (trayPieceH + trayGap);

          const isLocked = locked.includes(pieceIndex);
          const isActive = activePiece === pieceIndex;

          const responder = responders[pieceIndex];

          return (
            <Animated.View
              key={`piece-${pieceIndex}`}
              {...responder.panHandlers}
              style={[
                styles.piece,
                isLocked && styles.pieceLocked,
                {
                  width: trayPieceW,
                  height: trayPieceH,
                  left,
                  top,

                  transform: [
                    { translateX: pieceAnimations[pieceIndex].x },
                    { translateY: pieceAnimations[pieceIndex].y },
                    { scale: pieceAnimations[pieceIndex].scale },
                  ],

                  // dragged piece on top, locked pieces underneath
                  zIndex: isLocked ? 20 : isActive ? 100 : 30,
                  elevation: isLocked ? 20 : isActive ? 100 : 30,
                },
              ]}
            >
              <Image
                source={PIECES[pieceIndex]}
                style={styles.pieceImage}
                resizeMode="stretch"
              />

              {isLocked && SHOW_CHECKMARKS && (
                <View style={styles.lockedMark}>
                  <Text style={styles.lockedMarkText}>✓</Text>
                </View>
              )}
            </Animated.View>
          );
        })}
      </View>

      {/* ================= PIECES LABEL ================= */}

      <Text
        style={[
          styles.piecesLabel,
          {
            left: trayLeft,
            top: trayTop + trayHeight + 7,
            width: trayWidth,
          },
        ]}
      >
        PIECES
      </Text>

      {/* ================= SHUFFLE ================= */}

      <Pressable
        onPress={shufflePieces}
        disabled={!canShuffle || paused}
        style={({ pressed }) => [
          styles.shuffleButton,
          {
            left: trayLeft,
            top: trayTop + trayHeight + 25,
            width: trayWidth,
          },
          !canShuffle && styles.shuffleDisabled,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.shuffleText}>SHUFFLE</Text>
      </Pressable>

      {/* ================= SUCCESS ================= */}

      {gameState === 'won' && (
        <Animated.View
          style={[styles.resultOverlay, { opacity: successOpacity }]}
        >
          <Animated.View
            style={[
              styles.resultBox,
              { transform: [{ scale: successScale }] },
            ]}
          >
            <Text style={styles.resultTitle}>The Santo Niño</Text>

            <Image
              source={COMPLETE_IMAGE}
              style={styles.completeImage}
              resizeMode="contain"
            />

            <Text style={styles.historyText}>
              The Santo Niño was believed to have been left behind by
              Magellan's expedition decades earlier.
            </Text>

            <Pressable
              onPress={onComplete}
              style={({ pressed }) => [
                styles.continueButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.continueText}>CONTINUE</Text>
            </Pressable>
          </Animated.View>
        </Animated.View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17130f',
  },

  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.38)',
  },

  /* ================= HEADER ================= */

  header: {
    position: 'absolute',
    top: 27,
    left: 18,
    right: 18,
    alignItems: 'center',
    zIndex: 50,
  },

  title: {
    color: '#f0e4c8',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.4,
  },

  instruction: {
    marginTop: 5,
    color: '#e0d5bd',
    fontSize: 11,
    textAlign: 'center',
  },

  progress: {
    marginTop: 5,
    color: '#c9b27a',
    fontSize: 10,
    fontWeight: '600',
  },

  /* ================= BOARD ================= */

  // gold border + dark backing
  boardFrame: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#c9a96b',
    backgroundColor: 'rgba(30, 22, 16, 0.82)',
    zIndex: 5,
  },

  board: {
    position: 'absolute',
    zIndex: 6,
  },

  boardSlot: {
    position: 'absolute',
    borderWidth: 0.7,
    borderColor: 'rgba(225, 205, 160, 0.42)',
    backgroundColor: 'rgba(255, 255, 255, 0.025)',
  },

  /* ================= TRAY ================= */

  tray: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(201, 169, 107, 0.65)',
    borderRadius: 5,
    backgroundColor: 'rgba(35, 26, 18, 0.62)',
    zIndex: 4,
  },

  /* ================= PIECES ================= */

  piece: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(235, 218, 181, 0.75)',
    backgroundColor: '#211a14',
    overflow: 'hidden',
  },

  // this is para magiging part na nang border
  pieceLocked: {
    borderWidth: 0,
    backgroundColor: 'transparent',
  },

  pieceImage: {
    width: '100%',
    height: '100%',
  },

  lockedMark: {
    position: 'absolute',
    right: 2,
    top: 2,
    width: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: 'rgba(35, 25, 15, 0.78)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  lockedMarkText: {
    color: '#d9bd78',
    fontSize: 10,
    fontWeight: '800',
  },

  /* ================= PIECES LABEL ================= */

  piecesLabel: {
    position: 'absolute',
    color: '#d6bd84',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
    textAlign: 'center',
  },

  /* ================= SHUFFLE ================= */

  shuffleButton: {
    position: 'absolute',
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#bda16a',
    backgroundColor: 'rgba(25, 19, 14, 0.88)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50,
  },

  // nothing left to shuffle (0 or 1 piece still in the tray)
  shuffleDisabled: {
    opacity: 0.4,
  },

  shuffleText: {
    color: '#d8bd82',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.8,
  },

  buttonPressed: {
    opacity: 0.65,
  },

  /* ================= SUCCESS ================= */

  resultOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 200,
    paddingHorizontal: 20,
  },

  resultBox: {
    width: '88%',
    maxWidth: 340,
    padding: 18,
    borderWidth: 1.5,
    borderColor: '#c9a96b',
    backgroundColor: 'rgba(37, 29, 21, 0.97)',
    alignItems: 'center',
  },

  resultTitle: {
    color: '#f1e5ca',
    fontSize: 21,
    fontWeight: '700',
    textAlign: 'center',
  },

  completeImage: {
    width: '100%',
    height: 175,
    marginTop: 12,
  },

  historyText: {
    marginTop: 10,
    color: '#ded3bd',
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'center',
    marginHorizontal: 0,
  },

  continueButton: {
    marginTop: 15,
    minWidth: 125,
    paddingHorizontal: 20,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: '#c9a96b',
    backgroundColor: 'rgba(20, 15, 11, 0.9)',
    alignItems: 'center',
  },

  continueText: {
    color: '#d8bd82',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
});