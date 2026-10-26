import { useState, useEffect, useRef, useMemo } from 'react';
import { Animated, Easing, ImageBackground, Text, View, Pressable, Image, useWindowDimensions, StyleSheet, PanResponder, Modal } from 'react-native';
import Journal from './Journal.json';
import styles from '../../Styles/Others/StyleJournal';
import { useJournal } from '../../Main/Others/JournalContext'; 
import { REMNANT_DATA } from '../GameScreen/RemnantData';

const TABS = ['Timeline', 'Character Profiles', 'Minigame Collections', 'Glossary'];
const TAB_IMAGES = {
  'Timeline': require('../../assets/Journal_Assets/Timeline_closed.png'),
  'Character Profiles': require('../../assets/Journal_Assets/CharacterProfiles_closed.png'),
  'Minigame Collections': require('../../assets/Journal_Assets/Remnants_closed.png'),
  'Glossary': require('../../assets/Journal_Assets/Glossary_closed.png'),
};
const EXIT_IMAGE = require('../../assets/Journal_Assets/Exit.png');
const CLOSE_BUTTON_IMAGE = require('../../assets/icons/x_button.png');
const CLOSE_BUTTON_PRESSED_IMAGE = require('../../assets/icons/x_buttonpressed.png');

const STAGE_W = 1.15;
const TAB_TOP = 9;
const TAB_STEP = 15;

const TAB_OPEN_IMAGES = {
  'Timeline': require('../../assets/Journal_Assets/Timeline_open.png'),
  'Character Profiles': require('../../assets/Journal_Assets/CharacterProfiles_open.png'),
  'Minigame Collections': require('../../assets/Journal_Assets/Remnants_open.png'),
  'Glossary': require('../../assets/Journal_Assets/Glossary_open.png'),
};

const BOOK_IMAGE = require('../../assets/Journal_Assets/Journal_Book.png');
const FLIP_DURATION = 750;
const FLIP_SHADE = 0.3;

const SWIPE_MIN_DIST = 60;
const SWIPE_MIN_VELOCITY = 0.3;
const SWIPE_CAPTURE_DIST = 20;
const SWIPE_DIRECTION_RATIO = 1.5;

const TIMELINE_TITLE = require('../../assets/Journal_Assets/Timeline_Title.png');
const TIMELINE_BOX = require('../../assets/Journal_Assets/Timeline_box.png');
const BOX_STEP = 18.5;
const LEFT_BOX_TOP = 24;
const RIGHT_BOX_TOP = 24;

const PROFILE_TITLE = require('../../assets/Journal_Assets/Profile_Title.png');
const PROFILE_CARD = require('../../assets/Journal_Assets/Profile_w_Details_Box.png');
const PROFILE_FRAME = require('../../assets/Journal_Assets/Profile_Box.png');
const CARDS_LEFT = 2;
const CARDS_RIGHT = 3;
const PER_SPREAD = CARDS_LEFT + CARDS_RIGHT;
const LEFT_CARD_TOP = 30;
const LEFT_CARD_STEP = 30;
const RIGHT_CARD_TOP = 10.5;
const RIGHT_CARD_STEP = 29.0;

const REMNANTS_TITLE = require('../../assets/Journal_Assets/Remnants_Title.png');
const REMNANTS_BOX_LOCKED = require('../../assets/Journal_Assets/Remnants_Box_locked.png');
const REMNANTS_BOX_UNLOCKED = require('../../assets/Journal_Assets/Remnants_Box_unlocked.png');

const REMNANTS_BOXCOMPLETE_LOCKED = require('../../assets/Journal_Assets/Remnants_BoxComplete_locked.png');
const REMNANTS_BOXCOMPLETE_UNLOCKED = require('../../assets/Journal_Assets/Remnants_BoxComplete_unlocked.png');

const GLOSSARY_TITLE = require('../../assets/Journal_Assets/Glossary_Title.png');

const PORTRAITS = {
  'Rajah Tupas': require('../../assets/Journal_Profiles/Rajah Tupas.png'),
  'Martín de Goiti': require('../../assets/Journal_Profiles/Martin de Goiti.png'),
  'Juan de Salcedo': require('../../assets/Journal_Profiles/Juan de Salcedo.png'),
  'Francisco Dagohoy (Francisco Sendrijas)': require('../../assets/Journal_Profiles/Francisco Dagohoy.png'),
  'Father Gaspar Morales': require('../../assets/Journal_Profiles/Father Gaspar Morales.png'),
  'Captain Manuel Sanz': require('../../assets/Journal_Profiles/Captain Manuel Sanz.png'),
  'Governor-General Mariano Ricafort': require('../../assets/Journal_Profiles/Mariano Ricafort.png'),
  'Dr. José Rizal': require('../../assets/Journal_Profiles/Rizal.png'),
  'Andrés Bonifacio': require('../../assets/Journal_Profiles/Bonifacio.png'),
  'Apolinario Mabini': require('../../assets/Journal_Profiles/Mabini.png'),
  'Deodato Arellano': require('../../assets/Journal_Profiles/Deodato Arellano.png'),
  'Eulogio Despujol': require('../../assets/Journal_Profiles/Eulogio Despujol.png'),
  'Domingo Franco': require('../../assets/Journal_Profiles/Domingo Franco.png'),
  //'Valentin Diaz': require('../../assets/Journal_Profiles/Valentin Diaz.png'),
  'Ladislao Diwa': require('../../assets/Journal_Profiles/Ladislao Diwa.png'),
  'Jose Dizon': require('../../assets/Journal_Profiles/Jose Dizon.png'),
  'Teodoro Plata': require('../../assets/Journal_Profiles/Teodoro Plata.png'),
  "Emilio Jacinto ('Brains of the Katipunan')": require('../../assets/Journal_Profiles/Emilio Jacinto.png'),
  'Gregoria de Jesús': require('../../assets/Journal_Profiles/Gregoria de Jesus.png'),
  "Melchora Aquino ('Tandang Sora')": require('../../assets/Journal_Profiles/Melchora Aquino.png'),
  //'Teodoro Patiño': require('../../assets/Journal_Profiles/Teodoro Patino.png'),
  //'Honoria Patiño': require('../../assets/Journal_Profiles/Honoria Patino.png'),
  //'Sor Teresa de Jesús': require('../../assets/Journal_Profiles/Sor Teresa de Jesus.png'),
  'Father Mariano Gil': require('../../assets/Journal_Profiles/Father Mariano Gil.png'),
  'Mariano Álvarez': require('../../assets/Journal_Profiles/Mariano Alvarez.png'),
  'Emilio Aguinaldo': require('../../assets/Journal_Profiles/Emilio Aguinaldo.png'),
  'Daniel Tirona': require('../../assets/Journal_Profiles/Daniel Tirona.png'),
  "General Artemio Ricarte ('Vibora')": require('../../assets/Journal_Profiles/Artemio Ricarte.png'),
  'General Mariano Noriel': require('../../assets/Journal_Profiles/Mariano Noriel.png'),
  'Mariano Trías': require('../../assets/Journal_Profiles/Mariano Trias.png'),
  'Ambrosio Rianzares Bautista': require('../../assets/Journal_Profiles/Ambrosio Bautista.png'),
  'Admiral George Dewey': require('../../assets/Journal_Profiles/Admiral Dewey.png'),
  'E. Spencer Pratt': require('../../assets/Journal_Profiles/E. Spencer Pratt.png'),
  //'Rounsevelle Wildman': require('../../assets/Journal_Profiles/Rounsevelle Wildman.png'),
  //'U.S. President William McKinley': require('../../assets/Journal_Profiles/William McKinley.png'),
};

function BookmarkTab({ image, openImage, index, active, onPress }) {
  const showOpen = active && openImage;
  return (
    <Pressable
      onPress={onPress}
      style={[styles.tab, showOpen ? styles.tabOpen : styles.tabClosed, { top: `${TAB_TOP + index * TAB_STEP}%` }]}
    >
      <Image source={showOpen ? openImage : image} style={styles.tabImage} resizeMode="contain" />
    </Pressable>
  );
}

function PaperFace({ rect, rowRect, bookSize, style, children }) {
  return (
    <Animated.View style={[{ position: 'absolute', left: 0, top: 0, width: rect.width, height: rect.height, overflow: 'hidden' }, style]}>
      {bookSize.w > 0 && (
        <Image
          source={BOOK_IMAGE}
          resizeMode="contain"
          style={{
            position: 'absolute',
            left: -(rowRect.x + rect.x),
            top: -(rowRect.y + rect.y),
            width: bookSize.w,
            height: bookSize.h,
          }}
        />
      )}
      {children}
    </Animated.View>
  );
}

function PagedSpread({ page, totalPages, onPageChange, renderLeft, renderRight, bookSize }) {
  const progress = useRef(new Animated.Value(0)).current;
  const [flip, setFlip] = useState(null);
  const [rowRect, setRowRect] = useState(null);
  const [leftRect, setLeftRect] = useState(null);
  const [rightRect, setRightRect] = useState(null);

  useEffect(() => () => progress.stopAnimation(), [progress]);

  const startFlip = (dir) => {
    if (flip) return;
    const to = dir === 'next' ? page + 1 : page - 1;
    if (to < 0 || to >= totalPages) return;

    if (!rowRect || !leftRect || !rightRect) {
      onPageChange(to);
      return;
    }

    progress.setValue(0);
    setFlip({ from: page, to, dir });
    Animated.timing(progress, {
      toValue: 1,
      duration: FLIP_DURATION,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (!finished) return;
      onPageChange(to);
      setFlip(null);
    });
  };

  const startFlipRef = useRef(startFlip);
  startFlipRef.current = startFlip;

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onMoveShouldSetPanResponderCapture: (_, gs) => {
          if (flip) return false;
          return (
            Math.abs(gs.dx) > SWIPE_CAPTURE_DIST &&
            Math.abs(gs.dx) > Math.abs(gs.dy) * SWIPE_DIRECTION_RATIO
          );
        },
        onPanResponderRelease: (_, gs) => {
          if (gs.dx < -SWIPE_MIN_DIST || gs.vx < -SWIPE_MIN_VELOCITY) {
            startFlipRef.current('next');
          } else if (gs.dx > SWIPE_MIN_DIST || gs.vx > SWIPE_MIN_VELOCITY) {
            startFlipRef.current('prev');
          }
        },
      }),
    [flip]
  );

  const shownLeft = flip ? (flip.dir === 'next' ? flip.from : flip.to) : page;
  const shownRight = flip ? (flip.dir === 'next' ? flip.to : flip.from) : page;

  const renderLeaf = () => {
    const isNext = flip.dir === 'next';
    const src = isNext ? rightRect : leftRect;
    const dst = isNext ? leftRect : rightRect;
    const W = src.width;
    const H = src.height;
    const gap = rightRect.x - (leftRect.x + leftRect.width);

    const frontNode = isNext ? renderRight(flip.from) : renderLeft(flip.from);
    const backNode = isNext ? renderLeft(flip.to) : renderRight(flip.to);

    const rotate = progress.interpolate({ inputRange: [0, 1], outputRange: ['0deg', isNext ? '-180deg' : '180deg'] });
    const shift = progress.interpolate({ inputRange: [0, 1], outputRange: [0, isNext ? -gap : gap] });
    const frontOpacity = progress.interpolate({ inputRange: [0, 0.499, 0.5, 1], outputRange: [1, 1, 0, 0] });
    const backOpacity = progress.interpolate({ inputRange: [0, 0.499, 0.5, 1], outputRange: [0, 0, 1, 1] });
    const shade = progress.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, FLIP_SHADE, 0] });

    const pivot = isNext
      ? [{ translateX: -W / 2 }, { rotateY: rotate }, { translateX: W / 2 }]
      : [{ translateX: W / 2 }, { rotateY: rotate }, { translateX: -W / 2 }];

    return (
      <Animated.View
        pointerEvents="none"
        style={{
          position: 'absolute',
          left: src.x,
          top: src.y,
          width: W,
          height: H,
          transform: [{ perspective: W * 4 }, { translateX: shift }, ...pivot],
        }}
      >
        <PaperFace rect={src} rowRect={rowRect} bookSize={bookSize} style={{ opacity: frontOpacity }}>
          {frontNode}
        </PaperFace>
        <PaperFace rect={dst} rowRect={rowRect} bookSize={bookSize} style={{ opacity: backOpacity, transform: [{ rotateY: '180deg' }] }}>
          {backNode}
        </PaperFace>
        <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, { backgroundColor: '#000', opacity: shade }]} />
      </Animated.View>
    );
  };

  return (
    <View
      style={styles.spreadRow}
      onLayout={(e) => setRowRect(e.nativeEvent.layout)}
      {...panResponder.panHandlers}
    >
      <View style={styles.spreadPage} pointerEvents={flip ? 'none' : 'box-none'} onLayout={(e) => setLeftRect(e.nativeEvent.layout)}>
        {renderLeft(shownLeft)}
      </View>
      <View style={styles.spreadPage} pointerEvents={flip ? 'none' : 'box-none'} onLayout={(e) => setRightRect(e.nativeEvent.layout)}>
        {renderRight(shownRight)}
      </View>

      {flip && rowRect && leftRect && rightRect && renderLeaf()}

      {!flip && page > 0 && (
        <Pressable
          onPress={() => startFlip('prev')}
          hitSlop={12}
          style={{ position: 'absolute', left: '4%', bottom: '3%', zIndex: 30 }}
        >
          <Text style={{ fontSize: 34, color: '#5A4A32', fontWeight: 'bold' }}>‹</Text>
        </Pressable>
      )}
      {!flip && page < totalPages - 1 && (
        <Pressable
          onPress={() => startFlip('next')}
          hitSlop={12}
          style={{ position: 'absolute', right: '4%', bottom: '3%', zIndex: 30 }}
        >
          <Text style={{ fontSize: 34, color: '#5A4A32', fontWeight: 'bold' }}>›</Text>
        </Pressable>
      )}
    </View>
  );
}

function splitByLength(entries, headerWeight = 0) {
  const weight = (e) => e.content.length + (e['sub-content'] ?? []).reduce((n, x) => n + x.content.length + 30, 0) + 40;
  const total = entries.reduce((n, e) => n + weight(e), headerWeight);
  let left = headerWeight;
  let best = 1;
  let bestDiff = Infinity;
  for (let i = 1; i <= entries.length; i++) {
    left += weight(entries[i - 1]);
    const diff = Math.abs(left - (total - left));
    if (diff < bestDiff) { bestDiff = diff; best = i; }
  }
  return [entries.slice(0, best), entries.slice(best)];
}

function toRoman(num) {
  const romans = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII'];
  return romans[num - 1] || num;
}

function getDateLabel(entries) {
  if (entries.length === 1) return entries[0].date;
  const dates = entries.map((e) => e.date);
  return `${dates[0]} - ${dates[dates.length - 1]}`;
}

function TimelineBox({ text, side, slot, onPress }) {
  const top = (side === 'left' ? LEFT_BOX_TOP : RIGHT_BOX_TOP) + slot * BOX_STEP;
  return (
    <Pressable onPress={onPress} android_disableSound style={[styles.timelineBox, { top: `${top}%` }]}>
      <Image source={TIMELINE_BOX} style={styles.timelineBoxImage} resizeMode="stretch" />
      <View style={styles.timelineBoxBg} pointerEvents="none">
        <Text style={styles.timelineBoxText} numberOfLines={2} adjustsFontSizeToFit>{text}</Text>
      </View>
    </Pressable>
  );
}

function TimelineEntry({ entry }) {
  return (
    <View style={styles.entryBlock}>
      <Text style={styles.entryDate}>{entry.date}</Text>
      <Text style={styles.entryContent}>{entry.content}</Text>
      {entry['sub-content']?.map((sub, i) => (
        <View key={i} style={styles.subEntry}>
          <Text style={styles.subEntryDate}>{sub.date}</Text>
          <Text style={styles.entryContent}>{sub.content}</Text>
        </View>
      ))}
    </View>
  );
}

function GlossaryEntry({ term, meaning, unit }) {
  return (
    <View style={styles.glossaryBlock}>
      <Text style={[styles.glossaryTerm, { fontSize: Math.max(9, 34 * unit) }]} numberOfLines={2} adjustsFontSizeToFit>
        {term.toUpperCase()}
      </Text>
      <Text style={[styles.glossaryMeaning, { fontSize: Math.max(8, 22 * unit), lineHeight: Math.max(12, 30 * unit) }]}>
        {meaning}
      </Text>
    </View>
  );
}

function CharacterCard({ name, content, side, slot, unit, onPress }) {
  const top = side === 'left' ? LEFT_CARD_TOP + slot * LEFT_CARD_STEP : RIGHT_CARD_TOP + slot * RIGHT_CARD_STEP;
  const portrait = PORTRAITS[name];
  return (
    <Pressable onPress={onPress} style={[styles.profileCard, side === 'left' ? styles.profileCardLeft : styles.profileCardRight, { top: `${top}%` }]}>
      {portrait ? (
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: `${PANEL_CROP * 100}%`,
            overflow: 'hidden',
          }}
        >
          <Image
            source={PROFILE_CARD}
            resizeMode="stretch"
            style={{
              position: 'absolute',
              top: 0,
              height: '100%',
              width: `${100 / (1 - PANEL_CROP)}%`,
              left: `-${(PANEL_CROP / (1 - PANEL_CROP)) * 100}%`,
            }}
          />
        </View>
      ) : (
        <Image source={PROFILE_CARD} style={styles.fillAll} resizeMode="stretch" />
      )}
      {portrait && <Image source={portrait} style={styles.cardPortraitSlot} resizeMode="cover" />}
      <View style={styles.cardTextSlot}>
        <Text style={[styles.cardName, { fontSize: Math.max(8, 28 * unit) }]} numberOfLines={1} adjustsFontSizeToFit>{name}</Text>
        <Text style={[styles.cardDesc, { fontSize: Math.max(7, 20 * unit) }]} numberOfLines={1}>{content}</Text>
      </View>
    </Pressable>
  );
}

function getAppearance(c) {
  const parts = String(c.part ?? '').split(',').map((p) => p.trim()).filter(Boolean);
  const chapter = `Chapter ${c.chapter}`;
  if (parts.length === 0) return chapter;
  return `${chapter} · Part${parts.length > 1 ? 's' : ''} ${parts.join(', ')}`;
}

function Journalbook({ navigation }) {
  const { unlockedIds } = useJournal();
  const { width: screenW, height: screenH } = useWindowDimensions();

  const frameW = Math.min(screenW / STAGE_W, (screenH * 16) / 9);
  const stageW = frameW * STAGE_W;
  const stageH = (frameW * 9) / 16;
  const unit = frameW / 1920;

  const [activeTab, setActiveTab] = useState('Timeline');
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [charPage, setCharPage] = useState(0);
  const [selectedChar, setSelectedChar] = useState(null);
  const [glossarypage, setGlossarypPage] = useState(0);
  const [timelinepage, setTimelinePage] = useState(0);

  const [remnantpage, setRemnantPage] = useState(0);
  const [selectedRemnant, setSelectedRemnant] = useState(null);
  
  const [bookSize, setBookSize] = useState({ w: 0, h: 0 });

  const filteredTimelineContent = useMemo(() => {
    const timelineData = Journal.find((s) => s.title === 'Timeline')?.content || [];

    return timelineData
      .filter((entry) => unlockedIds.has(entry.id)) 
      .map((entry) => ({
        ...entry,
        'sub-content': entry['sub-content']?.filter(sub => unlockedIds.has(sub.id)) || []
      }));
  }, [unlockedIds]);

  const groupedTimeline = {};
  filteredTimelineContent.forEach((entry) => {
    const key = `Ch. ${entry.chapter} - Part ${entry.part}`;
    if (!groupedTimeline[key]) groupedTimeline[key] = [];
    groupedTimeline[key].push(entry);
  });

  const allKeys = Object.keys(groupedTimeline);
  const Timeline_per_side = 4;
  const timeline_per_spread = Timeline_per_side * 2;
  const totalTimespread = Math.max(1, Math.ceil(allKeys.length / timeline_per_spread));

  const timelineKeysFor = (p) => {
    const s = allKeys.slice(p * timeline_per_spread, (p + 1) * timeline_per_spread);
    return [s.slice(0, Timeline_per_side), s.slice(Timeline_per_side)];
  };
  const timelineLabel = (key) => `${toRoman(allKeys.indexOf(key) + 1)}. ${getDateLabel(groupedTimeline[key])}`;

  const renderTimelineLeft = (p) => (
    <>
      <Image source={TIMELINE_TITLE} style={styles.timelineTitle} resizeMode="contain" />
      {timelineKeysFor(p)[0].map((key, i) => (
        <TimelineBox key={key} side="left" slot={i} text={timelineLabel(key)} onPress={() => setSelectedEntry(key)} />
      ))}
    </>
  );
  const renderTimelineRight = (p) => (
    <>
      {timelineKeysFor(p)[1].map((key, i) => (
        <TimelineBox key={key} side="right" slot={i} text={timelineLabel(key)} onPress={() => setSelectedEntry(key)} />
      ))}
    </>
  );

  const selectedEntries = selectedEntry ? (groupedTimeline[selectedEntry] ?? []) : [];
  const [leftEntries, rightEntries] = splitByLength(selectedEntries, 150);
  const chapterTitle = selectedEntries[0] ? `Chapter ${selectedEntries[0].chapter} · Part ${selectedEntries[0].part}` : '';

  const characters = useMemo(() => {
    const charData = Journal.find((s) => s.title === 'Character Profiles')?.content || [];

    return charData
      .map((char) => {
         const tiers = char.tiers ?? [{ id: char.id, content: char.content }];
         const unlockedTiers = tiers.filter((tier) => unlockedIds.has(tier.id));

        return {
          ...char,
          part: String(char.part ?? '').split(',')[0].trim(),
          content: unlockedTiers.map((t) => t.content).join('\n\n')
        };
      })
      .filter((char) => PORTRAITS[char.name] && char.content.length > 0);
  }, [unlockedIds]);

  const totalSpreads = Math.max(1, Math.ceil(characters.length / PER_SPREAD));
  const charsFor = (p) => {
    const s = characters.slice(p * PER_SPREAD, (p + 1) * PER_SPREAD);
    return [s.slice(0, CARDS_LEFT), s.slice(CARDS_LEFT)];
  };

  const renderCharLeft = (p) => (
    <>
      <Image source={PROFILE_TITLE} style={styles.profileTitle} resizeMode="contain" />
      {charsFor(p)[0].map((c, i) => (
        <CharacterCard key={c.name} name={c.name} content={c.content} side="left" slot={i} unit={unit} onPress={() => setSelectedChar(c)} />
      ))}
    </>
  );
  const renderCharRight = (p) => (
    <>
      {charsFor(p)[1].map((c, i) => (
        <CharacterCard key={c.name} name={c.name} content={c.content} side="right" slot={i} unit={unit} onPress={() => setSelectedChar(c)} />
      ))}
    </>
  );

  const totalRemnantSpreads = 8;

  const renderRemnantPiece = (chapNum, partNum) => {
    const id = `remnant-part${chapNum}-${partNum}`;
    const isUnlocked = unlockedIds.has(id);
    const image = REMNANT_DATA[chapNum]?.pieces[partNum - 1];

    return (
      <Pressable 
        key={id} 
        style={styles.remnantCard} 
        onPress={() => isUnlocked ? setSelectedRemnant(image) : null}
      >
        <View style={styles.remnantBoxWrap}>
          <Image 
            source={isUnlocked ? REMNANTS_BOX_UNLOCKED : REMNANTS_BOX_LOCKED} 
            style={styles.remnantBoxImage} 
            resizeMode="contain" 
          />
          {isUnlocked && (
            <Image 
              source={image} 
              style={styles.remnantInnerImage} 
              resizeMode="contain" 
            />
          )}
        </View>
        <Text style={styles.remnantLabel} numberOfLines={1} adjustsFontSizeToFit>
          Chapter {chapNum} - Part {partNum}
        </Text>
      </Pressable>
    );
  };

  const renderCompleteRemnant = (chapNum) => {
    const isComplete = [1, 2, 3, 4, 5, 6].every(i => unlockedIds.has(`remnant-part${chapNum}-${i}`));
    const completeImage = REMNANT_DATA[chapNum]?.complete;

    return (
      <Pressable 
        style={styles.remnantCompleteCard} 
        onPress={() => isComplete ? setSelectedRemnant(completeImage) : null}
      >
        <View style={styles.remnantBoxWrap}>
          <Image 
            source={isComplete ? REMNANTS_BOXCOMPLETE_UNLOCKED : REMNANTS_BOXCOMPLETE_LOCKED} 
            style={styles.remnantBoxImage} 
            resizeMode="contain" 
          />
          {isComplete && (
            <Image 
              source={completeImage} 
              style={styles.remnantInnerImage} 
              resizeMode="contain" 
            />
          )}
        </View>
        <Text style={styles.remnantCompleteLabel} numberOfLines={1} adjustsFontSizeToFit>
          Chapter {chapNum} - Complete
        </Text>
      </Pressable>
    );
  };

  const renderRemnantLeft = (p) => {
    const chapNum = p + 1; 
    return (
      <>
        <Image source={REMNANTS_TITLE} style={styles.remnantsTitle} resizeMode="contain" />
        <View style={[styles.leftPage, styles.pageContent]}>
          <View style={{ height: 230 * unit }} />
          <View style={styles.Remnancegrid}>
            {[1, 2, 3, 4].map(partNum => renderRemnantPiece(chapNum, partNum))}
          </View>
        </View>
      </>
    );
  };

  const renderRemnantRight = (p) => {
    const chapNum = p + 1;
    return (
      <View style={[styles.rightPage, styles.pageContent]}>
        <View style={{ height: 90 * unit }} />

        <View style={styles.Remnancegrid}>
          {[5, 6].map(partNum => renderRemnantPiece(chapNum, partNum))}
        </View>
        
        <View style={{ alignItems: 'center'}}>
          {renderCompleteRemnant(chapNum)}
        </View>
      </View>
    );
  };

  const glossaryterm = Journal.find((s) => s.title === 'Glossary')?.content ?? [];
  const sortglossary = [...glossaryterm].sort((a, b) => a.term.localeCompare(b.term));
  const Glossary_per_side = 2;
  const glossary_per_spread = Glossary_per_side * 2;
  const toal_glossary_spread = Math.ceil(sortglossary.length / glossary_per_spread);
  const glossaryFor = (p) => {
    const s = sortglossary.slice(p * glossary_per_spread, (p + 1) * glossary_per_spread);
    return [s.slice(0, Glossary_per_side), s.slice(Glossary_per_side)];
  };

  const renderGlossaryLeft = (p) => (
    <>
      <Image source={GLOSSARY_TITLE} style={styles.glossaryTitle} resizeMode="contain" />
      <View style={[styles.leftPage, styles.pageContent]}>
        <View style={{ height: 260 * unit }} />
        {glossaryFor(p)[0].map((g) => <GlossaryEntry key={g.term} term={g.term} meaning={g.meaning} unit={unit} />)}
      </View>
    </>
  );
  const renderGlossaryRight = (p) => (
    <View style={[styles.rightPage, styles.pageContent]}>
      <View style={{ height: 260 * unit }} />
      {glossaryFor(p)[1].map((g) => <GlossaryEntry key={g.term} term={g.term} meaning={g.meaning} unit={unit} />)}
    </View>
  );

  const renderTab = (tab, index) => (
    <BookmarkTab
      key={tab}
      image={TAB_IMAGES[tab]}
      index={index}
      openImage={TAB_OPEN_IMAGES[tab]}
      active={activeTab === tab}
      onPress={() => {
        setActiveTab(tab);
        setSelectedEntry(null);
        setSelectedChar(null);
        setSelectedRemnant(null);
        setTimelinePage(0);
        setCharPage(0);
        setGlossarypPage(0);
        setRemnantPage(0);
      }}
    />
  );

  return (
    <View style={[styles.container, styles.overlay]}>
      <View style={{ width: stageW, height: stageH }}>
        <View
          style={styles.bookFrame}
          onLayout={(e) => setBookSize({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })}
        >
          <ImageBackground
            source={BOOK_IMAGE}
            style={styles.book}
            resizeMode="contain">

            {activeTab === 'Timeline' && !selectedEntry && (
              <PagedSpread
                key="timeline-list"
                page={timelinepage}
                totalPages={totalTimespread}
                onPageChange={setTimelinePage}
                renderLeft={renderTimelineLeft}
                renderRight={renderTimelineRight}
                bookSize={bookSize}
              />
            )}

            {activeTab === 'Timeline' && selectedEntry && (
              <View style={styles.pageRow}>
                <View style={[styles.leftPage, styles.pageContent]}>
                  <Pressable onPress={() => setSelectedEntry(null)}><Text style={styles.backLink}>← Back to timeline</Text></Pressable>
                  <Text style={styles.chapterTitle}>{chapterTitle}</Text>
                  <Text style={styles.chapterRange}>{getDateLabel(selectedEntries)}</Text>
                  {leftEntries.map((entry, i) => <TimelineEntry key={i} entry={entry} />)}
                </View>
                <View style={[styles.rightPage, styles.pageContent]}>
                  {rightEntries.map((entry, i) => <TimelineEntry key={i} entry={entry} />)}
                </View>
              </View>
            )}

            {activeTab === 'Character Profiles' && !selectedChar && (
              <PagedSpread
                key="char-list"
                page={charPage}
                totalPages={totalSpreads}
                onPageChange={setCharPage}
                renderLeft={renderCharLeft}
                renderRight={renderCharRight}
                bookSize={bookSize}
              />
            )}

            {activeTab === 'Character Profiles' && selectedChar && (
              <View key="char-detail" style={styles.spreadRow} pointerEvents="box-none">
                <View style={styles.spreadPage} pointerEvents="box-none">
                  <View style={styles.detailFrame}>
                    {!PORTRAITS[selectedChar.name] && (
                      <Image source={PROFILE_FRAME} style={styles.fillAll} resizeMode="stretch" />
                    )}
                    {PORTRAITS[selectedChar.name] && <Image source={PORTRAITS[selectedChar.name]} style={styles.detailPortraitSlot} resizeMode="cover" />}
                  </View>
                  <View style={styles.detailNameBox}>
                    <Text style={[styles.detailName, { fontSize: Math.max(12, 64 * unit) }]} numberOfLines={2} adjustsFontSizeToFit>{selectedChar.name}</Text>
                  </View>
                  <Text style={[styles.detailInfo, { fontSize: Math.max(9, 34 * unit) }]}>{getAppearance(selectedChar)}</Text>
                  <Pressable style={styles.detailBack} onPress={() => setSelectedChar(null)}><Text style={styles.backLink}>← Back to profiles</Text></Pressable>
                </View>
                <View style={styles.spreadPage} pointerEvents="box-none">
                  <View style={[styles.detailBodyScroll, styles.detailBodyContent]}>
                    <Text style={[styles.detailBody, { fontSize: Math.max(9, 26 * unit), lineHeight: Math.max(13, 38 * unit) }]}>{selectedChar.content}</Text>
                  </View>
                </View>
              </View>
            )}

            {activeTab === 'Minigame Collections' && (
              <PagedSpread
                key="remnants-list"
                page={remnantpage}
                totalPages={totalRemnantSpreads}
                onPageChange={setRemnantPage}
                renderLeft={renderRemnantLeft}
                renderRight={renderRemnantRight}
                bookSize={bookSize}
              />
            )}

            {activeTab === 'Glossary' && (
              <PagedSpread
                key="glossary"
                page={glossarypage}
                totalPages={toal_glossary_spread}
                onPageChange={setGlossarypPage}
                renderLeft={renderGlossaryLeft}
                renderRight={renderGlossaryRight}
                bookSize={bookSize}
              />
            )}
          </ImageBackground>
        </View>

        {TABS.map((tab, i) => renderTab(tab, i))}
        <BookmarkTab image={EXIT_IMAGE} index={TABS.length} onPress={() => navigation.goBack()} />
      </View>

      <Modal
        visible={!!selectedRemnant}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSelectedRemnant(null)}
      >
        <View style={styles.remnantViewer}>
          <Pressable 
            style={styles.closeButton} 
            onPress={() => setSelectedRemnant(null)}
          >
            {({ pressed }) => (
              <Image 
                source={pressed ? CLOSE_BUTTON_PRESSED_IMAGE : CLOSE_BUTTON_IMAGE} 
                style={styles.closeButtonImage} 
                resizeMode="contain" 
              />
            )}
          </Pressable>
          <Image source={selectedRemnant} style={styles.remnantViewerImage} resizeMode="contain" />
        </View>
      </Modal>

    </View>
  );
}

export default Journalbook;