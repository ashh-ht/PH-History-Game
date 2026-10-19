import { useMemo, useRef , useState } from "react";

import { Animated, ImageBackground , ScrollView , StyleSheet , Text, View } from "react-native";


import Sound_clicks from '../../../Components/Sound_clicks';
import useScale from '../../../Components/ScreenScaler';

const BACKGROUND = require('../../../Background Images/Part 8/Sorting_background.png');


const EVENTS = [
    {
    id: 'sulayman',
    date: '1571-01-01',
    label: '1571',
    title: 'Rajah Sulayman and Lakan Dula resist',
    desc: 'Local rulers stand against the Spanish takeover of Manila.',
  },
  {
    id: 'dagohoy',
    date: '1744-01-01',
    label: '1744',
    title: "Dagohoy's revolt begins",
    desc: 'A long rebellion in Bohol against Spanish rule, one of the longest in the country.',
  },
  {
    id: 'katipunan',
    date: '1892-07-07',
    label: 'July 7, 1892',
    title: 'Katipunan founded',
    desc: 'Bonifacio and others form a secret society to fight for independence.',
  },
  {
    id: 'rizal',
    date: '1896-12-30',
    label: 'Dec 30, 1896',
    title: 'Rizal executed',
    desc: 'His death pushes more Filipinos toward the revolution.',
  },
  {
    id: 'kawit',
    date: '1898-06-12',
    label: 'June 12, 1898',
    title: 'Independence declared at Kawit',
    desc: 'Aguinaldo proclaims the Philippines free and independent.',
  },
];



    
 
function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
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
 
function TimelineSort({ onComplete, events = EVENTS, count = 5 }) {
  // ALL hooks stay at the top, before any "if ... return"
  const { s } = useScale();
  const styles = useMemo(() => makeStyles(s), [s]);
 
   
   // drop any events that repeat an id
  const unique = events.filter(
    (e, i, arr) => arr.findIndex((x) => x.id === e.id) === i
  );
  const size = Math.min(count, unique.length);
  const [stage, setStage] = useState('intro'); // 'intro' | 'play' | 'done'
  const [round] = useState(() => shuffle(unique).slice(0, size)); // the cards for this play
  const [slots, setSlots] = useState(() => Array(size).fill(null)); // holds event ids
  const [selectedId, setSelectedId] = useState(null);
  const [wrongSlots, setWrongSlots] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const shake = useRef(new Animated.Value(0)).current;
 
  const correctOrder = useMemo(
    () => [...round].sort((a, b) => a.date.localeCompare(b.date)).map((e) => e.id),
    [round],
  );
 
  const byId = (id) => round.find((e) => e.id === id);
  const trayCards = round.filter((e) => !slots.includes(e.id));
  const selectedEvent = selectedId ? byId(selectedId) : null;
  const allPlaced = slots.every(Boolean);
 
  const translateX = shake.interpolate({
    inputRange: [-1, 1],
    outputRange: [-8 * s, 8 * s],
  });
 
  const runShake = () => {
    shake.setValue(0);
    Animated.sequence([
      Animated.timing(shake, { toValue: 1, duration: 60, useNativeDriver: true }),
      Animated.timing(shake, { toValue: -1, duration: 60, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 1, duration: 60, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start();
  };
 
  // Tap a card in the tray: select it (tap again to un-select)
  const handleCardPress = (id) => {
    setWrongSlots([]);
    setSelectedId(id === selectedId ? null : id);
  };
 
  // Tap a slot: place the selected card, or pick up the card that's already there
  const handleSlotPress = (index) => {
    if (stage !== 'play') return;
    setWrongSlots([]);
    const occupant = slots[index];
    const next = [...slots];
 
    if (selectedId) {
      next[index] = selectedId; // an old card in this slot automatically goes back to the tray
      setSlots(next);
      setSelectedId(null);
    } else if (occupant) {
      next[index] = null;
      setSlots(next);
      setSelectedId(occupant); // picked up, so its description shows too
    }
  };
 
  const handleCheck = () => {
    const wrong = slots
      .map((id, i) => (id === correctOrder[i] ? -1 : i))
      .filter((i) => i >= 0);
    setAttempts((a) => a + 1);
 
    if (wrong.length === 0) {
      setSelectedId(null);
      setStage('done');
    } else {
      setWrongSlots(wrong);
      runShake();
    }
  };
 
  const handleContinue = () => {
    if (onComplete) onComplete({ attempts, order: correctOrder });
  };
 
  // ---------- INTRO ----------
  if (stage === 'intro') {
    return (
      <Screen style={styles.screen}>
        <View style={styles.introPanel}>
          <Text style={styles.introTitle}>Past Events</Text>
          <Text style={styles.introText}>
            Put the moments you have lived through in the order they happened.
          </Text>
          <Sound_clicks style={styles.button} onPress={() => setStage('play')}>
            <Text style={styles.buttonText}>Begin</Text>
          </Sound_clicks>
        </View>
      </Screen>
    );
  }
 
  // ---------- PLAY + DONE ----------
  let message = 'Tap an event to read about it, then tap a slot to place it.';
  if (stage === 'done') {
    message = 'Correct! That is how it happened.';
  } else if (selectedEvent) {
    message = selectedEvent.desc;
  } else if (wrongSlots.length > 0) {
    message = 'Not quite. The red slots are out of order. Tap one to pick it up and swap it.';
  }
 
  return (
    <Screen style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleBanner}>
          <Text style={styles.titleText}>Sort the correct timeline based on the event</Text>
        </View>
 
        <Animated.View style={[styles.slotsRow, { transform: [{ translateX }] }]}>
          {slots.map((id, i) => {
            const ev = id ? byId(id) : null;
            const slotStyle = StyleSheet.flatten([
              styles.slot,
              i % 2 === 1 && styles.slotLow,
              ev && styles.slotFilled,
              wrongSlots.includes(i) && styles.slotWrong,
            ]);
            return (
              <Sound_clicks key={i} style={slotStyle} onPress={() => handleSlotPress(i)}>
                {ev ? (
                  <>
                    <Text style={styles.slotText} numberOfLines={3}>{ev.title}</Text>
                    {stage === 'done' && <Text style={styles.slotLabel}>{ev.label}</Text>}
                  </>
                ) : (
                  <Text style={styles.slotNumber}>{i + 1}</Text>
                )}
              </Sound_clicks>
            );
          })}
        </Animated.View>
 
        <View style={styles.tray}>
          {trayCards.map((ev) => (
            <Sound_clicks
              key={ev.id}
              style={StyleSheet.flatten([
                styles.card,
                ev.id === selectedId && styles.cardSelected,
              ])}
              onPress={() => handleCardPress(ev.id)}
            >
              <Text style={styles.cardText} numberOfLines={2}>{ev.title}</Text>
            </Sound_clicks>
          ))}
        </View>
 
        <View style={styles.descBox}>
          <Text style={styles.descText}>{message}</Text>
        </View>
 
        {stage === 'play' && allPlaced && (
          <Sound_clicks style={styles.button} onPress={handleCheck}>
            <Text style={styles.buttonText}>Check order</Text>
          </Sound_clicks>
        )}
        {stage === 'done' && (
          <Sound_clicks style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Continue</Text>
          </Sound_clicks>
        )}
      </ScrollView>
    </Screen>
  );
}
 

const makeStyles = (s) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: '#1a1410',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 14 * s,
      paddingHorizontal: 20 * s,
    },
 
    // intro
    introPanel: {
      width: '60%',
      maxWidth: 700,
      backgroundColor: '#E9D5A1',
      borderRadius: 12 * s,
      borderWidth: 2 * s,
      borderColor: '#6b4f2a',
      padding: 24 * s,
      alignItems: 'center',
    },
    introTitle: {
      fontSize: 24 * s,
      fontWeight: '700',
      color: '#2b1d0e',
      marginBottom: 10 * s,
      textAlign: 'center',
    },
    introText: {
      fontSize: 15 * s,
      color: '#2b1d0e',
      textAlign: 'center',
      marginBottom: 18 * s,
    },
 
    // title banner
    titleBanner: {
      backgroundColor: '#E9D5A1',
      borderRadius: 8 * s,
      borderWidth: 2 * s,
      borderColor: '#6b4f2a',
      paddingVertical: 8 * s,
      paddingHorizontal: 16 * s,
      marginBottom: 14 * s,
      maxWidth: '90%',
    },
    titleText: {
      fontSize: 20 * s,
      fontWeight: '600',
      color: '#2b1d0e',
      textAlign: 'center',
    },
 
    // the zigzag row of slots
    slotsRow: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12 * s,
      paddingBottom: 30 * s, // room for the "low" slots
    },
    slot: {
      width: '18%',
      minHeight: 64 * s,
      backgroundColor: '#d9d9d9',
      borderRadius: 6 * s,
      borderWidth: 2 * s,
      borderColor: '#8a8a8a',
      padding: 6 * s,
      alignItems: 'center',
      justifyContent: 'center',
    },
    slotLow: {
      marginTop: 30 * s,
    },
    slotFilled: {
      backgroundColor: '#F3E2B3',
      borderColor: '#6b4f2a',
    },
    slotWrong: {
      backgroundColor: '#f0b3ac',
      borderColor: '#b3382c',
    },
    slotNumber: {
      fontSize: 20 * s,
      fontWeight: '700',
      color: '#8a8a8a',
    },
    slotText: {
      fontSize: 11 * s,
      fontWeight: '600',
      color: '#2b1d0e',
      textAlign: 'center',
    },
    slotLabel: {
      fontSize: 10 * s,
      color: '#6b4f2a',
      marginTop: 3 * s,
      textAlign: 'center',
    },
 
    // cards waiting to be placed
    tray: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginBottom: 9 * s,
    },
    card: {
      width: 130 * s,
      backgroundColor: '#E9D5A1',
      borderRadius: 6 * s,
      borderWidth: 2 * s,
      borderColor: '#6b4f2a',
      paddingVertical: 8 * s,
      paddingHorizontal: 8 * s,
      margin: 4 * s,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardSelected: {
      backgroundColor: '#f7c95c',
      borderColor: '#a8700f',
    },
    cardText: {
      fontSize: 12 * s,
      fontWeight: '600',
      color: '#2b1d0e',
      textAlign: 'center',
    },
 
    // description of the picked card
    descBox: {
      width: '75%',
      backgroundColor: '#E9D5A1',
      borderRadius: 8 * s,
      borderWidth: 2 * s,
      borderColor: '#6b4f2a',
      paddingVertical: 8 * s,
      paddingHorizontal: 14 * s,
      marginTop: 6 * s,
      marginBottom: 10 * s,
      minHeight: 47 * s,
      justifyContent: 'center',
    },
    descText: {
      fontSize: 20 * s,
      color: '#2b1d0e',
      textAlign: 'center',
    },
 
    // buttons
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
  });


  export default TimelineSort;

