import { useState, useEffect, useRef, useMemo } from 'react';
import { Animated, Easing, ImageBackground, ScrollView, Text, View, Pressable, Image, useWindowDimensions, StyleSheet } from 'react-native';
import Journal from './Journal.json';
import styles from '../../Styles/Others/StyleJournal';
import { useJournal } from '../../Main/Others/JournalContext'; // IMPORT THE CONTEXT

// ==================================== IMAGES OF TABS ====================================
const TABS = ['Timeline', 'Character Profiles', 'Minigame Collections', 'Glossary'];
const TAB_IMAGES = {
  'Timeline': require('../../assets/Journal_Assets/Timeline_closed.png'),
  'Character Profiles': require('../../assets/Journal_Assets/CharacterProfiles_closed.png'),
  'Minigame Collections': require('../../assets/Journal_Assets/Remnants_closed.png'),
  'Glossary': require('../../assets/Journal_Assets/Glossary_closed.png'),
};
const EXIT_IMAGE = require('../../assets/Journal_Assets/Exit.png');

const STAGE_W = 1.15;
const TAB_TOP = 5;
const TAB_STEP = 15;

const TAB_OPEN_IMAGES = {
  'Timeline': require('../../assets/Journal_Assets/Timeline_open.png'),
  'Character Profiles': require('../../assets/Journal_Assets/CharacterProfiles_open.png'),
  'Minigame Collections': require('../../assets/Journal_Assets/Remnants_open.png'),
  'Glossary': require('../../assets/Journal_Assets/Glossary_open.png'),
};

// ==================================== PAGE FLIP SETTINGS ====================================
const BOOK_IMAGE = require('../../assets/Journal_Assets/Journal_Book.png');
const FLIP_DURATION = 750;
const FLIP_SHADE = 0.3;

// ==================================== LAMAN NG TABS SECTION ====================================
const TIMELINE_TITLE = require('../../assets/Journal_Assets/Timeline_Title.png');
const TIMELINE_BOX = require('../../assets/Journal_Assets/Timeline_box.png');
const BOX_STEP = 16.5;
const LEFT_BOX_TOP = 22;
const RIGHT_BOX_TOP = 22;

const PROFILE_TITLE = require('../../assets/Journal_Assets/Profile_Title.png');
const PROFILE_CARD = require('../../assets/Journal_Assets/Profile_w_Details_Box.png');
const PROFILE_FRAME = require('../../assets/Journal_Assets/Profile_Box.png');
const CARDS_LEFT = 2;
const CARDS_RIGHT = 3;
const PER_SPREAD = CARDS_LEFT + CARDS_RIGHT;
const LEFT_CARD_TOP = 30;
const LEFT_CARD_STEP = 25;
const RIGHT_CARD_TOP = 13.5;
const RIGHT_CARD_STEP = 26.0;

const REMNANTS_TITLE = require('../../assets/Journal_Assets/Remnants_Title.png');
const REMNANTS_BOX_LOCKED = require('../../assets/Journal_Assets/Remnants_Box_locked.png');
const REMNANTS_BOX_UNLOCKED = require('../../assets/Journal_Assets/Remnants_Box_unlocked.png');

const GLOSSARY_TITLE = require('../../assets/Journal_Assets/Glossary_Title.png');
const GLOSSARY_DIVIDER = require('../../assets/Journal_Assets/Glossary_Line.png');

const PORTRAITS = {
  'Andrés Bonifacio': require('../../Character Images/Temporary Placeholders/Bonifacio.png'),
  'Dr. José Rizal': require('../../Character Images/Temporary Placeholders/Rizal.png'),
  'Apolinario Mabini': require('../../Character Images/Temporary Placeholders/Mabini.png'),
};

// ==================================== REMNANT DATA (Hardcoded) ====================================
// We keep the images here, but the unlock state will be dynamic
const REMNANTS_DATA = [
  { id: 1, image: require('../../assets/Journal_Assets/Remnants_Box_unlocked.png') },
  { id: 2, image: require('../../assets/Journal_Assets/Remnants_Box_locked.png') },
  { id: 3, image: null }, { id: 4, image: null }, { id: 5, image: null },
  { id: 6, image: null }, { id: 7, image: null }, { id: 8, image: null }, { id: 9, image: null },
];


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

// ==================================== PAGE FLIP ====================================
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
    <View style={styles.spreadRow} pointerEvents="box-none" onLayout={(e) => setRowRect(e.nativeEvent.layout)}>
      <View style={styles.spreadPage} pointerEvents={flip ? 'none' : 'box-none'} onLayout={(e) => setLeftRect(e.nativeEvent.layout)}>
        {renderLeft(shownLeft)}
      </View>
      <View style={styles.spreadPage} pointerEvents={flip ? 'none' : 'box-none'} onLayout={(e) => setRightRect(e.nativeEvent.layout)}>
        {renderRight(shownRight)}
      </View>

      {!flip && page > 0 && (
        <Pressable style={[styles.sideArrow, styles.sideArrowLeft]} onPress={() => startFlip('prev')}>
          <Text style={styles.arrowText}>◀</Text>
        </Pressable>
      )}
      {!flip && page < totalPages - 1 && (
        <Pressable style={[styles.sideArrow, styles.sideArrowRight]} onPress={() => startFlip('next')}>
          <Text style={styles.arrowText}>▶</Text>
        </Pressable>
      )}

      {flip && rowRect && leftRect && rightRect && renderLeaf()}
    </View>
  );
}

// ==================================== TIMELINE STUFF ====================================
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

// ==================================== REMNANT STUFF ====================================
function RemnantCard({ id, unlocked, image, onPress }) {
  return (
    <Pressable style={styles.remnantCard} onPress={unlocked ? onPress : undefined} disabled={!unlocked}>
      <View style={styles.remnantBoxWrap}>
        <Image source={unlocked ? REMNANTS_BOX_UNLOCKED : REMNANTS_BOX_LOCKED} style={styles.remnantBoxImage} resizeMode="contain" />
        {unlocked && image && <Image source={image} style={styles.remnantInnerImage} resizeMode="cover" />}
      </View>
      <Text style={styles.remnantLabel}>Remnant #{id}</Text>
    </Pressable>
  );
}

function CompleteCard({ unlocked, onPress }) {
  return (
    <Pressable style={styles.remnantCard} onPress={unlocked ? onPress : undefined} disabled={!unlocked}>
      <View style={styles.remnantBoxWrap}>
        <Image source={unlocked ? REMNANTS_BOX_UNLOCKED : REMNANTS_BOX_LOCKED} style={styles.remnantBoxImage} resizeMode="contain" />
        {unlocked && <Image source={require('../../assets/Journal_Assets/Remnants_Box_locked.png')} style={styles.remnantInnerImage} resizeMode="cover" />}
      </View>
      <Text style={styles.remnantLabel}>Complete</Text>
    </Pressable>
  );
}

// ==================================== GLOSSARY STUFF ====================================
function GlossaryEntry({ term, meaning, unit }) {
  return (
    <View style={styles.glossaryBlock}>
      <Text style={[styles.glossaryTerm, { fontSize: Math.max(9, 34 * unit) }]} numberOfLines={2} adjustsFontSizeToFit>
        {term.toUpperCase()}
      </Text>
      <Text style={[styles.glossaryMeaning, { fontSize: Math.max(8, 22 * unit), lineHeight: Math.max(12, 30 * unit) }]}>
        {meaning}
      </Text>
      <Image source={GLOSSARY_DIVIDER} style={styles.glossaryDivider} resizeMode="contain" />
    </View>
  );
}

// ==================================== CHARACTER PROFILE STUFF ====================================
function CharacterCard({ name, content, side, slot, unit, onPress }) {
  const top = side === 'left' ? LEFT_CARD_TOP + slot * LEFT_CARD_STEP : RIGHT_CARD_TOP + slot * RIGHT_CARD_STEP;
  const portrait = PORTRAITS[name];
  return (
    <Pressable onPress={onPress} style={[styles.profileCard, side === 'left' ? styles.profileCardLeft : styles.profileCardRight, { top: `${top}%` }]}>
      <Image source={PROFILE_CARD} style={styles.fillAll} resizeMode="stretch" />
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
  const [selectedRemnant, setSelectedRemnant] = useState(null);
  const [bookSize, setBookSize] = useState({ w: 0, h: 0 });

  // ==================================== FILTERED DATA ====================================

  // 1. Filter Timeline (Only show if the entry's ID is in the Set)
  const filteredTimelineContent = useMemo(() => {
    const timelineData = Journal.find((s) => s.title === 'Timeline')?.content || [];

    return timelineData
      .filter((entry) => unlockedIds.has(entry.id)) // Only keep unlocked entries
      .map((entry) => ({
        ...entry,
        // Filter the sub-content as well
        'sub-content': entry['sub-content']?.filter(sub => unlockedIds.has(sub.id)) || []
      }));
  }, [unlockedIds]);

  // Group the *filtered* timeline
  const groupedTimeline = {};
  filteredTimelineContent.forEach((entry) => {
    const key = `Ch. ${entry.chapter} - Part ${entry.part}`;
    if (!groupedTimeline[key]) groupedTimeline[key] = [];
    groupedTimeline[key].push(entry);
  });

  const allKeys = Object.keys(groupedTimeline);
  const Timeline_per_side = 4;
  const timeline_per_spread = Timeline_per_side * 2;
  const totalTimespread = Math.max(1, Math.ceil(allKeys.length / timeline_per_spread)); // At least 1 page

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

  // 2. Filter Character Profiles (Stitch unlocked tiers together)
  const characters = useMemo(() => {
    const charData = Journal.find((s) => s.title === 'Character Profiles')?.content || [];

    return charData
      .map((char) => {
        // Get only the unlocked tiers for this character
         const tiers = char.tiers ?? [{ id: char.id, content: char.content }];
         const unlockedTiers = tiers.filter((tier) => unlockedIds.has(tier.id));

        return {
          ...char,
          part: String(char.part ?? '').split(',')[0].trim(),
          content: unlockedTiers.map((t) => t.content).join('\n\n')
        };
      })
      .filter((char) => char.content.length > 0); // Hide characters if 0 tiers are unlocked
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

  // 3. Filter Remnants (Dynamic unlock based on IDs)
  // You will need to add "remnant-1", "remnant-2", etc. to your story unlocks.
  const minigameLeft = REMNANTS_DATA.slice(0, 4).map(r => ({
    ...r,
    unlocked: unlockedIds.has(`remnant-${r.id}`)
  }));
  const minigameRight = REMNANTS_DATA.slice(4).map(r => ({
    ...r,
    unlocked: unlockedIds.has(`remnant-${r.id}`)
  }));
  const allRemnantunlocked = REMNANTS_DATA.every(r => unlockedIds.has(`remnant-${r.id}`));

  // 4. Glossary (Untouched)
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
      <ScrollView style={styles.leftPage} contentContainerStyle={styles.pageContent}>
        <View style={{ height: 260 * unit }} />
        {glossaryFor(p)[0].map((g) => <GlossaryEntry key={g.term} term={g.term} meaning={g.meaning} unit={unit} />)}
      </ScrollView>
    </>
  );
  const renderGlossaryRight = (p) => (
    <ScrollView style={styles.rightPage} contentContainerStyle={styles.pageContent}>
      <View style={{ height: 260 * unit }} />
      {glossaryFor(p)[1].map((g) => <GlossaryEntry key={g.term} term={g.term} meaning={g.meaning} unit={unit} />)}
    </ScrollView>
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
            <ScrollView style={styles.leftPage} contentContainerStyle={styles.pageContent}>
              <Pressable onPress={() => setSelectedEntry(null)}><Text style={styles.backLink}>← Back to timeline</Text></Pressable>
              <Text style={styles.chapterTitle}>{chapterTitle}</Text>
              <Text style={styles.chapterRange}>{getDateLabel(selectedEntries)}</Text>
              {leftEntries.map((entry, i) => <TimelineEntry key={i} entry={entry} />)}
            </ScrollView>
            <ScrollView style={styles.rightPage} contentContainerStyle={styles.pageContent}>
              {rightEntries.map((entry, i) => <TimelineEntry key={i} entry={entry} />)}
            </ScrollView>
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
                <Image source={PROFILE_FRAME} style={styles.fillAll} resizeMode="stretch" />
                {PORTRAITS[selectedChar.name] && <Image source={PORTRAITS[selectedChar.name]} style={styles.detailPortraitSlot} resizeMode="cover" />}
              </View>
              <View style={styles.detailNameBox}>
                <Text style={[styles.detailName, { fontSize: Math.max(12, 64 * unit) }]} numberOfLines={2} adjustsFontSizeToFit>{selectedChar.name}</Text>
              </View>
              <Text style={[styles.detailInfo, { fontSize: Math.max(9, 34 * unit) }]}>{getAppearance(selectedChar)}</Text>
              <Pressable style={styles.detailBack} onPress={() => setSelectedChar(null)}><Text style={styles.backLink}>← Back to profiles</Text></Pressable>
            </View>
            <View style={styles.spreadPage} pointerEvents="box-none">
              <ScrollView style={styles.detailBodyScroll} contentContainerStyle={styles.detailBodyContent}>
                <Text style={[styles.detailBody, { fontSize: Math.max(9, 26 * unit), lineHeight: Math.max(13, 38 * unit) }]}>{selectedChar.content}</Text>
              </ScrollView>
            </View>
          </View>
        )}

        {activeTab === 'Minigame Collections' && (
          <View style={styles.spreadRow} pointerEvents="box-none">
            <View style={styles.spreadPage} pointerEvents="box-none">
              <Image source={REMNANTS_TITLE} style={styles.remnantsTitle} resizeMode="contain" />
              <ScrollView style={styles.leftPage} contentContainerStyle={styles.pageContent}>
                <View style={{ height: 260 * unit }} />
                <View style={styles.Remnancegrid}>
                  {minigameLeft.map((r) => <RemnantCard key={r.id} id={r.id} unlocked={r.unlocked} image={r.image} onPress={() => setSelectedRemnant(r.image)} />)}
                </View>
              </ScrollView>
            </View>
            <View style={styles.spreadPage} pointerEvents="box-none">
              <ScrollView style={styles.rightPage} contentContainerStyle={styles.pageContent}>
                <View style={{ height: 260 * unit }} />
                <View style={styles.Remnancegrid}>
                  {minigameRight.map((r) => <RemnantCard key={r.id} id={r.id} unlocked={r.unlocked} image={r.image} onPress={() => setSelectedRemnant(r.image)} />)}
                  <CompleteCard unlocked={allRemnantunlocked} onPress={() => setSelectedRemnant(require('../../assets/Journal_Assets/Remnants_Box_locked.png'))} />
                </View>
              </ScrollView>
            </View>
          </View>
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

        {selectedRemnant && (
          <Pressable style={styles.remnantViewer} onPress={() => setSelectedRemnant(null)}>
            <Image source={selectedRemnant} style={styles.remnantViewerImage} resizeMode="contain" />
          </Pressable>
        )}
      </View>
    </View>
  );
}

export default Journalbook;