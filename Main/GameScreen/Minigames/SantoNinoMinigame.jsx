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

function shuffle(array) {
  const shuffled = [...array];

  do {
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [shuffled[i], shuffled[j]] = [
        shuffled[j],
        shuffled[i],
      ];
    }
  } while (
    shuffled.every(
      (value, index) => value === index
    )
  );

  return shuffled;
}

export default function SantoNinoMinigame({
  onComplete,
}) {
  const { width, height } = useWindowDimensions();


  const trayGap = 5;

  
  const boardWidth = Math.min(
    width * 0.54,
    200
  );

  const boardPieceSize =
    boardWidth / GRID_SIZE;

  /*
   * Three columns of pieces.
   */
  const trayPieceSize = Math.min(
    42,
    (width - boardWidth - 38) / 3
  );

  const trayWidth =
    trayPieceSize * 3 +
    trayGap * 2;

  const trayHeight =
    trayPieceSize * 3 +
    trayGap * 2;

  const totalGroupWidth =
    boardWidth +
    14 +
    trayWidth;

  const groupLeft = Math.max(
    5,
    (width - totalGroupWidth) / 2
  );

  const boardLeft = groupLeft;

  const trayLeft =
    boardLeft +
    boardWidth +
    14;


  const boardTop = Math.max(
    105,
    Math.min(
      145,
      (height - boardWidth) / 2 - 65
    )
  );

  const trayTop = boardTop;

  /*
   * =====================================================
   * GAME STATE
   * =====================================================
   */

  const [pieces, setPieces] = useState(() =>
    shuffle(
      Array.from(
        { length: PIECE_COUNT },
        (_, index) => index
      )
    )
  );

  const [locked, setLocked] = useState([]);

  const [gameState, setGameState] =
    useState('playing');

  const lockedRef = useRef(locked);

  useEffect(() => {
    lockedRef.current = locked;
  }, [locked]);

  /*
   * =====================================================
   * ANIMATIONS
   * =====================================================
   */

  const pieceAnimations = useMemo(() => {
    return Array.from(
      { length: PIECE_COUNT },
      () => ({
        x: new Animated.Value(0),
        y: new Animated.Value(0),
        scale: new Animated.Value(1),
      })
    );
  }, []);

  const successScale = useRef(
    new Animated.Value(0.85)
  ).current;

  const successOpacity = useRef(
    new Animated.Value(0)
  ).current;

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
  }, [
    gameState,
    successOpacity,
    successScale,
  ]);

  /*
   * =====================================================
   * SHUFFLE / reset
   * =====================================================
   */

  const resetPuzzle = () => {
    pieceAnimations.forEach(
      (animation) => {
        animation.x.setValue(0);
        animation.y.setValue(0);
        animation.scale.setValue(1);
      }
    );

    successScale.setValue(0.85);
    successOpacity.setValue(0);

    setPieces(
      shuffle(
        Array.from(
          { length: PIECE_COUNT },
          (_, index) => index
        )
      )
    );

    setLocked([]);
    setGameState('playing');
  };

  /*
   * =====================================================
   * RETURN PIECE TO TRAY
   * =====================================================
   */

  const returnPiece = (pieceIndex) => {
    Animated.parallel([
      Animated.spring(
        pieceAnimations[pieceIndex].x,
        {
          toValue: 0,
          friction: 7,
          tension: 80,
          useNativeDriver: true,
        }
      ),

      Animated.spring(
        pieceAnimations[pieceIndex].y,
        {
          toValue: 0,
          friction: 7,
          tension: 80,
          useNativeDriver: true,
        }
      ),

      Animated.spring(
        pieceAnimations[pieceIndex].scale,
        {
          toValue: 1,
          friction: 7,
          tension: 80,
          useNativeDriver: true,
        }
      ),
    ]).start();
  };

  /*
   * =====================================================
   * HANDLE DROP
   * =====================================================
   */

  const handleDrop = (
    pieceIndex,
    gestureX,
    gestureY
  ) => {
    if (
      lockedRef.current.includes(pieceIndex)
    ) {
      return;
    }

    const trayIndex =
      pieces.indexOf(pieceIndex);

    if (trayIndex === -1) {
      return;
    }

    
    const trayRow =
      Math.floor(trayIndex / 3);

    const trayCol =
      trayIndex % 3;

    const originalLeft =
      trayLeft +
      trayCol *
      (trayPieceSize + trayGap);

    const originalTop =
      trayTop +
      trayRow *
      (trayPieceSize + trayGap);

    
    const finalLeft =
      originalLeft + gestureX;

    const finalTop =
      originalTop + gestureY;

    
    const pieceCenterX =
      finalLeft +
      trayPieceSize / 2;

    const pieceCenterY =
      finalTop +
      trayPieceSize / 2;

   
    const relativeX =
      pieceCenterX - boardLeft;

    const relativeY =
      pieceCenterY - boardTop;

    const targetCol =
      Math.floor(
        relativeX / boardPieceSize
      );

    const targetRow =
      Math.floor(
        relativeY / boardPieceSize
      );

    const validTarget =
      targetCol >= 0 &&
      targetCol < GRID_SIZE &&
      targetRow >= 0 &&
      targetRow < GRID_SIZE;

    
    if (!validTarget) {
      returnPiece(pieceIndex);
      return;
    }

    const targetSlot =
      targetRow * GRID_SIZE + targetCol;

   
    const isCorrect =
      pieceIndex === targetSlot;

    const occupied =
      lockedRef.current.includes(
        targetSlot
      );

    if (!isCorrect || occupied) {
      Animated.parallel([
        Animated.spring(
          pieceAnimations[pieceIndex].x,
          {
            toValue: 0,
            friction: 7,
            tension: 80,
            useNativeDriver: true,
          }
        ),

        Animated.spring(
          pieceAnimations[pieceIndex].y,
          {
            toValue: 0,
            friction: 7,
            tension: 80,
            useNativeDriver: true,
          }
        ),

        Animated.sequence([
          Animated.timing(
            pieceAnimations[pieceIndex].scale,
            {
              toValue: 1.07,
              duration: 70,
              useNativeDriver: true,
            }
          ),

          Animated.spring(
            pieceAnimations[pieceIndex].scale,
            {
              toValue: 1,
              friction: 7,
              tension: 80,
              useNativeDriver: true,
            }
          ),
        ]),
      ]).start();

      return;
    }

    /*
     * =================================================
     * Slot
     * =================================================
     */

    const targetLeft =
      boardLeft +
      targetCol * boardPieceSize;

    const targetTop =
      boardTop +
      targetRow * boardPieceSize;

    const requiredScale =
      boardPieceSize / trayPieceSize;

    const scaleOffsetX =
      (trayPieceSize - boardPieceSize) / 2;

    const scaleOffsetY =
      (trayPieceSize - boardPieceSize) / 2;

    const requiredX =
      targetLeft -
      originalLeft -
      scaleOffsetX;

    const requiredY =
      targetTop -
      originalTop -
      scaleOffsetY;

    Animated.parallel([
      Animated.spring(
        pieceAnimations[pieceIndex].x,
        {
          toValue: requiredX,
          friction: 7,
          tension: 80,
          useNativeDriver: true,
        }
      ),

      Animated.spring(
        pieceAnimations[pieceIndex].y,
        {
          toValue: requiredY,
          friction: 7,
          tension: 80,
          useNativeDriver: true,
        }
      ),

      Animated.spring(
        pieceAnimations[pieceIndex].scale,
        {
          toValue: requiredScale,
          friction: 7,
          tension: 80,
          useNativeDriver: true,
        }
      ),
    ]).start(() => {
      setLocked((previous) => {
        if (
          previous.includes(pieceIndex)
        ) {
          return previous;
        }

        return [
          ...previous,
          pieceIndex,
        ];
      });
    });
  };

  /*
   * =====================================================
   * Dragging pieces here responder
   * =====================================================
   */

  const createResponder = (pieceIndex) => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () =>
        !lockedRef.current.includes(
          pieceIndex
        ),

      onMoveShouldSetPanResponder: () =>
        !lockedRef.current.includes(
          pieceIndex
        ),

      onPanResponderGrant: () => {
        if (
          lockedRef.current.includes(
            pieceIndex
          )
        ) {
          return;
        }

        Animated.spring(
          pieceAnimations[pieceIndex].scale,
          {
            toValue: 1.08,
            friction: 7,
            tension: 100,
            useNativeDriver: true,
          }
        ).start();
      },

      onPanResponderMove: (_, gesture) => {
        if (
          lockedRef.current.includes(
            pieceIndex
          )
        ) {
          return;
        }

        pieceAnimations[
          pieceIndex
        ].x.setValue(gesture.dx);

        pieceAnimations[
          pieceIndex
        ].y.setValue(gesture.dy);
      },

      onPanResponderRelease: (_, gesture) => {
        if (
          lockedRef.current.includes(
            pieceIndex
          )
        ) {
          return;
        }

        handleDrop(
          pieceIndex,
          gesture.dx,
          gesture.dy
        );
      },

      onPanResponderTerminate: () => {
        returnPiece(pieceIndex);
      },
    });
  };

  /*
   * =====================================================
   * RENDER area
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
        <Text style={styles.title}>
          Restore the Santo Niño
        </Text>

        <Text style={styles.instruction}>
          Drag the pieces into their correct places.
        </Text>

        <Text style={styles.progress}>
          {locked.length} / {PIECE_COUNT}
        </Text>
      </View>

      {/* ================= BOARD ================= */}

      <View
        style={[
          styles.board,
          {
            width: boardWidth,
            height: boardWidth,
            left: boardLeft,
            top: boardTop,
          },
        ]}
      >
        {Array.from({
          length: PIECE_COUNT,
        }).map((_, index) => {
          const row =
            Math.floor(index / GRID_SIZE);

          const col =
            index % GRID_SIZE;

          return (
            <View
              key={`slot-${index}`}
              style={[
                styles.boardSlot,
                {
                  width: boardPieceSize,
                  height: boardPieceSize,
                  left:
                    col * boardPieceSize,
                  top:
                    row * boardPieceSize,
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
        pointerEvents="box-none"
        style={StyleSheet.absoluteFill}
      >
        {pieces.map(
          (pieceIndex, trayIndex) => {
            const trayRow =
              Math.floor(trayIndex / 3);

            const trayCol =
              trayIndex % 3;

            const left =
              trayLeft +
              trayCol *
              (trayPieceSize + trayGap);

            const top =
              trayTop +
              trayRow *
              (trayPieceSize + trayGap);

            const isLocked =
              locked.includes(pieceIndex);

            const responder =
              createResponder(pieceIndex);

            return (
              <Animated.View
                key={`piece-${pieceIndex}`}
                {...responder.panHandlers}
                style={[
                  styles.piece,
                  {
                    width: trayPieceSize,
                    height: trayPieceSize,
                    left,
                    top,

                    transform: [
                      {
                        translateX:
                          pieceAnimations[
                            pieceIndex
                          ].x,
                      },
                      {
                        translateY:
                          pieceAnimations[
                            pieceIndex
                          ].y,
                      },
                      {
                        scale:
                          pieceAnimations[
                            pieceIndex
                          ].scale,
                      },
                    ],

                    zIndex: isLocked
                      ? 20
                      : 30,
                  },
                ]}
              >
                <Image
                  source={
                    PIECES[pieceIndex]
                  }
                  style={styles.pieceImage}
                  resizeMode="cover"
                />

                {isLocked && (
                  <View
                    style={styles.lockedMark}
                  >
                    <Text
                      style={
                        styles.lockedMarkText
                      }
                    >
                      ✓
                    </Text>
                  </View>
                )}
              </Animated.View>
            );
          }
        )}
      </View>

      {/* ================= PIECES LABEL ================= */}

      <Text
        style={[
          styles.piecesLabel,
          {
            left: trayLeft,
            top:
              trayTop +
              trayHeight +
              7,
            width: trayWidth,
          },
        ]}
      >
        PIECES
      </Text>

      {/* ================= SHUFFLE ================= */}

      <Pressable
        onPress={resetPuzzle}
        style={({ pressed }) => [
          styles.shuffleButton,
          {
            left: trayLeft,
            top:
              trayTop +
              trayHeight +
              25,
            width: trayWidth,
          },
          pressed &&
          styles.buttonPressed,
        ]}
      >
        <Text style={styles.shuffleText}>
          SHUFFLE
        </Text>
      </Pressable>

      {/* ================= SUCCESS ================= */}

      {gameState === 'won' && (
        <Animated.View
          style={[
            styles.resultOverlay,
            {
              opacity: successOpacity,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.resultBox,
              {
                transform: [
                  {
                    scale: successScale,
                  },
                ],
              },
            ]}
          >
            <Text style={styles.resultTitle}>
              The Santo Niño
            </Text>

            <Image
              source={COMPLETE_IMAGE}
              style={styles.completeImage}
              resizeMode="contain"
            />

            <Text style={styles.historyText}>
              The Santo Niño was believed to have
              been left behind by Magellan's
              expedition decades earlier.
            </Text>

            <Pressable
              onPress={onComplete}
              style={({ pressed }) => [
                styles.continueButton,
                pressed &&
                styles.buttonPressed,
              ]}
            >
              <Text style={styles.continueText}>
                CONTINUE
              </Text>
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
    backgroundColor:
      'rgba(0, 0, 0, 0.38)',
  },


  /////////////////////////////////////////////////
  /* ================= HEADER ================= */
  /////////////////////////////////////////////////

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



  /////////////////////////////////////////////////
  /* ================= BOARD ================= */
  /////////////////////////////////////////////////

  board: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#c9a96b',
    backgroundColor:
      'rgba(30, 22, 16, 0.82)',
    zIndex: 5,
  },

  boardSlot: {
    position: 'absolute',
    borderWidth: 0.7,
    borderColor:
      'rgba(225, 205, 160, 0.42)',
    backgroundColor:
      'rgba(255, 255, 255, 0.025)',
  },


  /////////////////////////////////////////////////
  /* ================= TRAY ================= */
  /////////////////////////////////////////////////

  tray: {
    position: 'absolute',
    borderWidth: 1,
    borderColor:
      'rgba(201, 169, 107, 0.65)',
    borderRadius: 5,
    backgroundColor:
      'rgba(35, 26, 18, 0.62)',
    zIndex: 4,
  },


  /////////////////////////////////////////////////
  /* ================= PIECES ================= */
  /////////////////////////////////////////////////

  piece: {
    position: 'absolute',
    borderWidth: 1,
    borderColor:
      'rgba(235, 218, 181, 0.75)',
    backgroundColor: '#211a14',
    overflow: 'hidden',
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
    backgroundColor:
      'rgba(35, 25, 15, 0.78)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  lockedMarkText: {
    color: '#d9bd78',
    fontSize: 10,
    fontWeight: '800',
  },


  /////////////////////////////////////////////////
  /* ================= PIECES LABEL ================= */
  /////////////////////////////////////////////////

  piecesLabel: {
    position: 'absolute',
    color: '#d6bd84',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
    textAlign: 'center',
  },


  /////////////////////////////////////////////////
  /* ================= SHUFFLE ================= */
  /////////////////////////////////////////////////

  shuffleButton: {
    position: 'absolute',
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#bda16a',
    backgroundColor:
      'rgba(25, 19, 14, 0.88)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50,
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


  /////////////////////////////////////////////////
  /* ================= SUCCESS ================= */
  /////////////////////////////////////////////////

  resultOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor:
      'rgba(0, 0, 0, 0.72)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    paddingHorizontal: 20,
  },

  resultBox: {
    width: '88%',
    maxWidth: 340,
    padding: 18,
    borderWidth: 1.5,
    borderColor: '#c9a96b',
    backgroundColor:
      'rgba(37, 29, 21, 0.97)',
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
  },

  continueButton: {
    marginTop: 15,
    minWidth: 125,
    paddingHorizontal: 20,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: '#c9a96b',
    backgroundColor:
      'rgba(20, 15, 11, 0.9)',
    alignItems: 'center',
  },

  continueText: {
    color: '#d8bd82',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
});