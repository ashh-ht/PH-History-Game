import { useEffect, useMemo, useRef, useState } from 'react';
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

// pointers of x and y to determine each stroke
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

// ---------------------------------------------------------------
// TUNING (all in dp, so they stay finger-sized on any phone)
// ---------------------------------------------------------------
const LETTER_ASPECT = 0.68; // letter width / letter height
const LOOKAHEAD = 3; // how many checkpoints a fast finger may skip in one move
const OFF_PATH = 1.6; // how far off the line (x radius) before the stroke resets. Lower = stricter
const START_SLACK = 1.3; // start dot is a bit more forgiving (x radius)
const RESET_ON_LIFT = true; // lifting your finger mid-stroke restarts that stroke
const MIN_RADIUS = 26; // minimum touch tolerance in dp, about half a thumb pad
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

// Distance from point (x, y) to the closest spot on a polyline
function distToPath(pts, x, y) {
  let best = Infinity;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len2 = dx * dx + dy * dy;
    let t = len2 === 0 ? 0 : ((x - a.x) * dx + (y - a.y) * dy) / len2;
    t = Math.max(0, Math.min(1, t));
    const d = Math.hypot(a.x + t * dx - x, a.y + t * dy - y);
    if (d < best) best = d;
  }
  return best;
}

// How many checkpoints come before a given stroke inside letter.points
function strokeBase(letter, strokeIdx) {
  let base = 0;
  for (let i = 0; i < strokeIdx; i++) base += letter.strokePts[i].length;
  return base;
}

// Where does the first stroke of a letter begin? ("bottom-left", "top", ...)
// Used by the instructions screen so the text is right for any word.
function describeStart(char) {
  const p = FONT[char]?.[0]?.[0];
  if (!p) return 'glowing dot';
  const [px, py] = p;
  const v = py < 0.34 ? 'top' : py > 0.66 ? 'bottom' : 'middle';
  const h = px < 0.34 ? 'left' : px > 0.66 ? 'right' : 'center';
  if (v === 'middle' && h === 'center') return 'middle';
  if (v === 'middle') return `${h} side`;
  if (h === 'center') return v;
  return `${v}-${h}`;
}

// One big letter at a time, so the thumb has room and the finger doesn't hide the whole word.
function buildLayout(word, width, height) {
  const chars = word.toUpperCase().split('');

  let letterH = Math.min(height * 0.42, (width * 0.78) / LETTER_ASPECT);
  let letterW = letterH * LETTER_ASPECT;

  const strokeW = Math.max(letterW * 0.2, 16);
  const pad = strokeW * 1.6; // extra touchable space around the letter
  const step = Math.max(letterH / 14, 8);

  const letters = [];
  chars.forEach((c) => {
    if (c === ' ') return;
    const shape = FONT[c];
    if (!shape) {
      console.warn(`WordTrace: no shape for letter "${c}", skipping it`);
      return;
    }
    const strokes = shape.map((poly) =>
      poly.map(([px, py]) => ({ x: pad + px * letterW, y: pad + py * letterH })),
    );
    const strokePts = strokes.map((poly) => sample(poly, step));
    const points = strokePts.flat();
    letters.push({ char: c, strokes, strokePts, points });
  });

  return {
    chars,
    letters,
    strokeW,
    radius: Math.max(strokeW * 1.1, MIN_RADIUS),
    canvasW: letterW + pad * 2,
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
  paused = false, // set by PartRenderer when the pause panel is open
  onPhaseChange, // tells PartRenderer: "intro" | "playing" | "result"
  onComplete,
}) {
  // ALL hooks stay at the top, before any "if ... return"
  const { s } = useScale();
  const { width, height } = useWindowDimensions();
  const landscape = width > height;
  const styles = useMemo(() => makeStyles(s), [s]);
  const layout = useMemo(() => buildLayout(word, width, height), [word, width, height]);

  const [started, setStarted] = useState(false); // false = instructions screen
  const [idx, setIdx] = useState(0); // which letter is being traced
  const [hits, setHits] = useState([]); // checkpoints already covered on this letter
  const [trail, setTrail] = useState([]); // the finger's path on this stroke

  // The finger handler lives outside React's render cycle, so it reads these refs
  const layoutRef = useRef(layout);
  layoutRef.current = layout;
  const pausedRef = useRef(false);
  pausedRef.current = paused;
  const idxRef = useRef(0);
  const hitsRef = useRef(new Set());
  const trailRef = useRef([]);
  const progRef = useRef({ stroke: 0, next: 0 }); // next = next checkpoint to hit in the current stroke

  const pan = useRef(null);
  if (!pan.current) {
    // wipe the stroke the player is currently on (finished strokes stay)
    const resetStroke = () => {
      const letter = layoutRef.current.letters[idxRef.current];
      if (!letter) return;
      const prog = progRef.current;
      const base = strokeBase(letter, prog.stroke);
      const count = letter.strokePts[prog.stroke]?.length ?? 0;
      for (let k = 0; k < count; k++) hitsRef.current.delete(base + k);
      prog.next = 0;
      trailRef.current = [];
      setHits([...hitsRef.current]);
      setTrail([]);
    };

    const touch = (e, start) => {
      if (pausedRef.current) return; // paused: ignore the finger

      const x = e.nativeEvent.locationX;
      const y = e.nativeEvent.locationY;
      const { letters, radius } = layoutRef.current;
      const i = idxRef.current;
      const letter = letters[i];
      if (!letter) return;

      const prog = progRef.current;
      const pts = letter.strokePts[prog.stroke];
      const base = strokeBase(letter, prog.stroke);
      const d = (p) => Math.hypot(p.x - x, p.y - y);

      if (start) trailRef.current = [];

      // 1) drifted off the line? wipe this stroke (only if they had made progress)
      if (distToPath(pts, x, y) > radius * OFF_PATH) {
        if (prog.next > 0) resetStroke();
        return;
      }

      // 2) a stroke has to begin at its start dot
      if (prog.next === 0 && d(pts[0]) > radius * START_SLACK) return;

      trailRef.current.push({ x, y });

      // 3) only the next few checkpoints can be hit, in order
      let reached = -1;
      const last = Math.min(prog.next + LOOKAHEAD, pts.length - 1);
      for (let k = prog.next; k <= last; k++) {
        if (d(pts[k]) <= radius) reached = k;
      }
      if (reached >= 0) {
        for (let k = prog.next; k <= reached; k++) hitsRef.current.add(base + k);
        prog.next = reached + 1;
      }

      // 4) stroke done -> next stroke, all strokes done -> next letter
      if (prog.next >= pts.length) {
        prog.stroke += 1;
        prog.next = 0;
        trailRef.current = [];
      }
      if (prog.stroke >= letter.strokePts.length) {
        idxRef.current = i + 1;
        progRef.current = { stroke: 0, next: 0 };
        hitsRef.current = new Set();
        trailRef.current = [];
        setIdx(i + 1);
        setHits([]);
        setTrail([]);
        return;
      }

      setHits([...hitsRef.current]);
      setTrail([...trailRef.current]);
    };

    const lift = () => {
      if (RESET_ON_LIFT && progRef.current.next > 0) resetStroke();
      else {
        trailRef.current = [];
        setTrail([]);
      }
    };

    pan.current = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: (e) => touch(e, true),
      onPanResponderMove: (e) => touch(e, false),
      onPanResponderRelease: lift,
      onPanResponderTerminate: lift,
    });
  }

  const total = layout.letters.length;
  const finished = idx >= total;
  const current = layout.letters[idx];
  const activeStroke = progRef.current.stroke;

  // Tell the parent which screen we're on, so it only shows the
  // pause button while the player is actually tracing.
  useEffect(() => {
    if (!onPhaseChange) return;
    if (!started) onPhaseChange('intro');
    else if (finished) onPhaseChange('result');
    else onPhaseChange('playing');
  }, [started, finished, onPhaseChange]);

  const handleDone = () => {
    if (onComplete) onComplete({ word });
  };

  // ---------------------------------------------------------------
  // INSTRUCTIONS SCREEN (shown before tracing begins)
  // ---------------------------------------------------------------
  if (!started) {
    const first = layout.letters[0];
    const startPt = first?.strokes[0][0];
    const previewScale = 0.55;

    return (
      <Screen style={styles.screen}>
        <View style={[styles.content, landscape && styles.introRow]}>
          {/* mini preview of the first letter with its start dot circled */}
          {first && startPt ? (
            <Svg
              width={layout.canvasW * previewScale}
              height={layout.canvasH * previewScale}
              viewBox={`0 0 ${layout.canvasW} ${layout.canvasH}`}
            >
              {first.strokes.map((poly, si) => (
                <Path
                  key={`p${si}`}
                  d={toPath(poly)}
                  stroke={si === 0 ? GUIDE_STRONG : GUIDE_FAINT}
                  strokeWidth={layout.strokeW}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              ))}
              <Circle
                cx={startPt.x}
                cy={startPt.y}
                r={layout.strokeW * 1.0}
                stroke="#FFF2CB"
                strokeWidth={layout.strokeW * 0.15}
                fill="none"
              />
              <Circle
                cx={startPt.x}
                cy={startPt.y}
                r={layout.strokeW * 0.6}
                fill="#FFF2CB"
              />
            </Svg>
          ) : null}

          <View style={styles.introCol}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.ruleText}>
              • Start at the glowing dot on the {first ? describeStart(first.char) : 'letter'} of
              the first letter ({first?.char}).
            </Text>
            <Text style={styles.ruleText}>• Drag your finger along the line, in order.</Text>
            <Text style={styles.ruleText}>
              • Don't lift your finger, or that stroke restarts.
            </Text>
            <Text style={styles.ruleText}>
              • Letters with more than one stroke start a new glowing dot.
            </Text>

            <View style={styles.buttonsRow}>
              <Sound_clicks style={styles.button} onPress={() => setStarted(true)}>
                <Text style={styles.buttonText}>Begin Tracing</Text>
              </Sound_clicks>
            </View>
          </View>
        </View>
      </Screen>
    );
  }

  // small preview of the whole word on top (done / current / upcoming)
  let letterCounter = -1;
  const preview = layout.chars.map((c, ci) => {
    if (c === ' ') return <View key={ci} style={styles.previewGap} />;
    letterCounter += 1;
    const li = letterCounter;
    const state = li < idx ? styles.previewDone : li === idx ? styles.previewNow : styles.previewNext;
    return (
      <Text key={ci} style={[styles.previewLetter, state, li < idx && { color: inkColor }]}>
        {c}
      </Text>
    );
  });

  return (
    <Screen style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.hint}>{finished ? doneText : hint}</Text>

        <View style={styles.previewRow}>{preview}</View>

        {/* The touch area. The drawing inside ignores touches so the finger position stays accurate. */}
        <View
          style={{ width: layout.canvasW, height: layout.canvasH }}
          {...pan.current.panHandlers}
        >
          <View pointerEvents="none">
            <Svg width={layout.canvasW} height={layout.canvasH}>
              {/* guide for the current letter (or all solid ink when finished) */}
              {(finished ? layout.letters.slice(-1) : current ? [current] : []).map((letter) =>
                letter.strokes.map((poly, si) => (
                  <Path
                    key={`g${si}`}
                    d={toPath(poly)}
                    stroke={finished ? inkColor : si < activeStroke ? inkColor : si === activeStroke ? GUIDE_STRONG : GUIDE_FAINT}
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

              {/* start dot for the stroke you're on right now */}
              {current && current.strokes[activeStroke] && (
                <Circle
                  cx={current.strokes[activeStroke][0].x}
                  cy={current.strokes[activeStroke][0].y}
                  r={layout.strokeW * 0.6}
                  fill="#FFF2CB"
                />
              )}

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
          {finished && (
            <Sound_clicks style={styles.button} onPress={handleDone}>
              <Text style={styles.buttonText}>Continue</Text>
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
      hint="Start at the glowing dot and trace without lifting your finger."
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
      hint="Start at the glowing dot and trace without lifting your finger."
      doneText="The oath is taken."
      inkColor="#1f1d1c"
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
      top: 10,
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
      marginBottom: 8 * s,
    },
    previewRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 6 * s,
    },
    previewLetter: {
      fontSize: 18 * s,
      fontWeight: '700',
      marginHorizontal: 2 * s,
    },
    previewDone: { opacity: 1 },
    previewNow: { color: '#FFF2CB' },
    previewNext: { color: 'rgba(255, 242, 203, 0.3)' },
    previewGap: { width: 12 * s },
    progress: {
      fontSize: 13 * s,
      color: 'rgba(255, 242, 203, 0.7)',
      marginTop: 4 * s,
    },
    buttonsRow: {
      marginTop: 8 * s,
      minHeight: 48 * s,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      backgroundColor: '#6b4f2a',
      borderRadius: 8 * s,
      paddingVertical: 12 * s,
      paddingHorizontal: 32 * s,
      alignItems: 'center',
      justifyContent: 'center',
      bottom: 10,
    },
    buttonText: {
      fontSize: 15 * s,
      fontWeight: '600',
      color: '#FFF2CB',
    },

    // instructions screen
    introRow: {
      flexDirection: 'row',
      gap: 24 * s,
    },
    introCol: {
      flexShrink: 1,
      maxWidth: 380 * s,
      alignItems: 'center',
    },
    ruleText: {
      fontSize: 14 * s,
      lineHeight: 21 * s,
      color: 'rgba(255, 242, 203, 0.9)',
      alignSelf: 'flex-start',
      marginTop: 2 * s,
    },
  });

export default WordTrace;