import { useMemo, useRef, useState } from 'react';
import {
  ImageBackground,
  PanResponder,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import Sound_clicks from '../../../Components/Sound_clicks';
import useScale from '../../../Components/ScreenScaler';


const BACKGROUND = require('../../../Background Images/Part 4/tracingplatform.png');

// this pointers of x and y to determine each stroke
const FONT = {
  A: [
    [[0, 1], [0.5, 0], [1, 1]],
    [[0.2, 0.64], [0.8, 0.64]],
  ],
  B: [
    [[0, 0], [0, 1]],
    [[0, 0], [0.7, 0], [0.95, 0.12], [0.95, 0.38], [0.7, 0.5], [0, 0.5]],
    [[0, 0.5], [0.75, 0.5], [1, 0.65], [1, 0.88], [0.75, 1], [0, 1]],
  ],
  G: [
    [[1, 0.18], [0.8, 0.04], [0.5, 0], [0.2, 0.1], [0.02, 0.4], [0, 0.6], [0.2, 0.9], [0.5, 1], [0.85, 0.92], [1, 0.7], [1, 0.55], [0.55, 0.55]],
  ],
  K: [
    [[0, 0], [0, 1]],
    [[1, 0], [0, 0.55], [1, 1]],
  ],
  M: [
    [[0, 1], [0, 0], [0.5, 0.6], [1, 0], [1, 1]],
  ],
  N: [
    [[0, 1], [0, 0], [1, 1], [1, 0]],
  ],
  P: [
    [[0, 1], [0, 0], [0.7, 0], [0.95, 0.15], [0.95, 0.4], [0.7, 0.55], [0, 0.55]],
  ],
  S: [
    [[1, 0.15], [0.8, 0.02], [0.5, 0], [0.2, 0.05], [0.02, 0.25], [0.2, 0.45], [0.5, 0.5], [0.8, 0.55], [1, 0.75], [0.8, 0.97], [0.5, 1], [0.2, 0.98], [0, 0.85]],
  ],
  Y: [
    [[0, 0], [0.5, 0.5], [1, 0]],
    [[0.5, 0.5], [0.5, 1]],
  ],
};

const PASS = 0.88; // how much of a letter must be traced before it counts
const LETTER_ASPECT = 0.68; // letter width / letter height
const GUIDE_FAINT = 'rgba(255, 242, 203, 0.18)';
const GUIDE_STRONG = 'rgba(255, 242, 203, 0.5)';

function toPath(points) {
  return points
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ');
}

// Adds evenly spaced "checkpoints" along a stroke
function sample(points, step) {
  const out = [points[0]];
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    const dist = Math.hypot(b.x - a.x, b.y - a.y);
    const n = Math.max(1, Math.round(dist / step));
    for (let k = 1; k <= n; k++) {
      out.push({ x: a.x + ((b.x - a.x) * k) / n, y: a.y + ((b.y - a.y) * k) / n });
    }
  }
  return out;
}

// Works out where every letter goes, based on the screen size
function buildLayout(word, width, height) {
  const chars = word.toUpperCase().split('');
  const units = chars.reduce((sum, c) => sum + (c === ' ' ? 0.7 : 1.35), 0);

  let letterW = (width * 0.88) / (units + 0.32);
  let letterH = letterW / LETTER_ASPECT;
  const maxH = height * 0.38;
  if (letterH > maxH) {
    letterH = maxH;
    letterW = letterH * LETTER_ASPECT;
  }

  const strokeW = letterW * 0.16;
  const pad = strokeW;
  const step = Math.max(letterH / 14, 6);

  const letters = [];
  let cursor = pad;

  chars.forEach((c) => {
    if (c === ' ') {
      cursor += letterW * 0.7;
      return;
    }
    const shape = FONT[c];
    if (!shape) {
      console.warn(`WordTrace: no shape for letter "${c}", skipping it`);
      cursor += letterW * 1.35;
      return;
    }
    const strokes = shape.map((poly) =>
      poly.map(([px, py]) => ({ x: cursor + px * letterW, y: pad + py * letterH })),
    );
    const strokePts = strokes.map((poly) => sample(poly, step));
    const points = strokePts.flat();
    letters.push({ char: c, strokes, strokePts, points });
    cursor += letterW * 1.35;
  });

  return {
    letters,
    strokeW,
    radius: Math.max(strokeW * 1.2, 14), // how close a finger has to be to a checkpoint
    canvasW: Math.max(cursor - letterW * 0.35 + pad, 10),
    canvasH: letterH + pad * 2,
  };
}

// Draws the background image if you set one, otherwise a plain dark color
function Screen({ style, children }) {
  if (BACKGROUND) {
    return (
      <ImageBackground source={BACKGROUND} style={style} resizeMode="cover">
        {children}
      </ImageBackground>
    );
  }
  return <View style={style}>{children}</View>;
}

function WordTrace({
  word,
  title,
  hint,
  doneText = 'Well done.',
  inkColor = '#B3201A',
  onComplete,
}) {
  // ALL hooks stay at the top, before any "if ... return"
  const { s } = useScale();
  const { width, height } = useWindowDimensions();
  const styles = useMemo(() => makeStyles(s), [s]);
  const layout = useMemo(() => buildLayout(word, width, height), [word, width, height]);

  const [idx, setIdx] = useState(0); // which letter is being traced
  const [hits, setHits] = useState([]); // checkpoints already covered on this letter
  const [trail, setTrail] = useState([]); // the finger's path on this letter

  // The finger handler lives outside React's render cycle, so it reads these refs
  const layoutRef = useRef(layout);
  layoutRef.current = layout;
  const idxRef = useRef(0);
  const hitsRef = useRef(new Set());
  const trailRef = useRef([]);

  const pan = useRef(null);
  if (!pan.current) {
    const touch = (e, start) => {
      const x = e.nativeEvent.locationX;
      const y = e.nativeEvent.locationY;
      const { letters, radius } = layoutRef.current;
      const i = idxRef.current;
      const letter = letters[i];
      if (!letter) return;

      if (start) trailRef.current = [];
      trailRef.current.push({ x, y });

      letter.points.forEach((p, k) => {
        if (!hitsRef.current.has(k) && Math.hypot(p.x - x, p.y - y) <= radius) {
          hitsRef.current.add(k);
        }
      });

      if (hitsRef.current.size / letter.points.length >= PASS) {
        // letter finished, move to the next one
        idxRef.current = i + 1;
        hitsRef.current = new Set();
        trailRef.current = [];
        setIdx(i + 1);
        setHits([]);
        setTrail([]);
      } else {
        setHits([...hitsRef.current]);
        setTrail([...trailRef.current]);
      }
    };

    pan.current = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: (e) => touch(e, true),
      onPanResponderMove: (e) => touch(e, false),
    });
  }

  const total = layout.letters.length;
  const finished = idx >= total;
  const current = layout.letters[idx];

  const handleDone = () => {
    if (onComplete) onComplete({ word });
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.hint}>{finished ? doneText : hint}</Text>

        {/* The touch area. The drawing inside ignores touches so the finger position stays accurate. */}
        <View
          style={{ width: layout.canvasW, height: layout.canvasH }}
          {...pan.current.panHandlers}
        >
          <View pointerEvents="none">
            <Svg width={layout.canvasW} height={layout.canvasH}>
              {/* every letter's guide, or solid ink once it's done */}
              {layout.letters.map((letter, li) =>
                letter.strokes.map((poly, si) => (
                  <Path
                    key={`${li}-${si}`}
                    d={toPath(poly)}
                    stroke={li < idx ? inkColor : li === idx ? GUIDE_STRONG : GUIDE_FAINT}
                    strokeWidth={layout.strokeW}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                )),
              )}

              {/* ink appears along the letter as you cover it */}
              {current &&
                hits.map((k) => (
                  <Circle
                    key={`h${k}`}
                    cx={current.points[k].x}
                    cy={current.points[k].y}
                    r={layout.strokeW / 2}
                    fill={inkColor}
                  />
                ))}

              {/* dots showing where each stroke begins */}
              {current &&
                current.strokes.map((poly, si) => (
                  <Circle
                    key={`s${si}`}
                    cx={poly[0].x}
                    cy={poly[0].y}
                    r={layout.strokeW * 0.45}
                    fill="#FFF2CB"
                  />
                ))}

              {/* thin line that follows the finger */}
              {trail.length > 1 && (
                <Path
                  d={toPath(trail)}
                  stroke="rgba(255, 255, 255, 0.4)"
                  strokeWidth={layout.strokeW * 0.25}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              )}
            </Svg>
          </View>
        </View>

        <Text style={styles.progress}>
          {finished ? `${total} of ${total}` : `Letter ${idx + 1} of ${total}`}
        </Text>

        <View style={styles.buttonsRow}>
          {finished ? (
            <Sound_clicks style={styles.button} onPress={handleDone}>
              <Text style={styles.buttonText}>Continue</Text>
            </Sound_clicks>
          ) : (
            <Sound_clicks style={styles.skipButton} onPress={handleDone}>
              <Text style={styles.skipText}>Skip</Text>
            </Sound_clicks>
          )}
        </View>
      </View>
    </Screen>
  );
}

// ---------------------------------------------------------------
// The two Chapter 4 games. Both use the same component with different words.
// ---------------------------------------------------------------
export function BloodTrace(props) {
  return (
    <WordTrace
      word="MAYPAGASA"
      title="Founding Blood Tracing"
      hint="Trace each letter with your finger to seal the name."
      doneText="The name is sealed."
      inkColor="#7c1f1c"
      {...props}
    />
  );
}

export function OathTrace(props) {
  return (
    <WordTrace
      word="ANAK NG BAYAN"
      title="Initiation Oath Tracing"
      hint="Trace the words of the oath, one letter at a time."
      doneText="The oath is taken."
      inkColor="#D9A441"
      {...props}
    />
  );
}

// Every size is "number * s" so it scales on any phone
const makeStyles = (s) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: '#1a1410',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20 * s,
    },
    title: {
      fontSize: 22 * s,
      fontWeight: '700',
      color: '#FFF2CB',
      textAlign: 'center',
      marginBottom: 4 * s,
    },
    hint: {
      fontSize: 14 * s,
      color: 'rgba(255, 242, 203, 0.8)',
      textAlign: 'center',
      marginBottom: 14 * s,
    },
    progress: {
      fontSize: 13 * s,
      color: 'rgba(255, 242, 203, 0.7)',
      marginTop: 10 * s,
    },
    buttonsRow: {
      marginTop: 12 * s,
      minHeight: 44 * s,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      backgroundColor: '#6b4f2a',
      borderRadius: 8 * s,
      paddingVertical: 10 * s,
      paddingHorizontal: 28 * s,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      fontSize: 15 * s,
      fontWeight: '600',
      color: '#FFF2CB',
    },
    skipButton: {
      paddingVertical: 8 * s,
      paddingHorizontal: 20 * s,
    },
    skipText: {
      fontSize: 13 * s,
      color: 'rgba(255, 242, 203, 0.55)',
    },
  });

export default WordTrace;