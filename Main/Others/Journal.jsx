import { useState } from 'react';
import { ImageBackground, ScrollView, Text, View, Pressable, Image, useWindowDimensions } from 'react-native';
import Journal from './Journal.json';
import styles from '../../Styles/Others/StyleJournal';

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

    //Adjustments for tabs
    const TAB_TOP = 5;
    const TAB_STEP = 15;

const TAB_OPEN_IMAGES = {
  'Timeline': require('../../assets/Journal_Assets/Timeline_open.png'),
  'Character Profiles': require('../../assets/Journal_Assets/CharacterProfiles_open.png'),
  'Minigame Collections': require('../../assets/Journal_Assets/Remnants_open.png'),
  'Glossary': require('../../assets/Journal_Assets/Glossary_open.png'),
};

// ==================================== LAMAN NG TABS SECTION ====================================
const TIMELINE_TITLE = require('../../assets/Journal_Assets/Timeline_Title.png');
const TIMELINE_BOX = require('../../assets/Journal_Assets/Timeline_box.png');
    //Adjustments stuff for timeline
    const BOX_STEP = 16.5;
    const LEFT_BOX_TOP = 22;
    const RIGHT_BOX_TOP = 22;

// Character Profiles
const PROFILE_TITLE = require('../../assets/Journal_Assets/Profile_Title.png');
const PROFILE_CARD = require('../../assets/Journal_Assets/Profile_w_Details_Box.png');
const PROFILE_FRAME = require('../../assets/Journal_Assets/Profile_Box.png');
    //Adjustments stuff for character profiles
    const CARDS_LEFT = 2;
    const CARDS_RIGHT = 3;
    const PER_SPREAD = CARDS_LEFT + CARDS_RIGHT;
    const LEFT_CARD_TOP = 30;
    const LEFT_CARD_STEP = 25;
    const RIGHT_CARD_TOP = 13.5;
    const RIGHT_CARD_STEP = 26.0;

//Minigame (Remnants)
const REMNANTS_TITLE = require('../../assets/Journal_Assets/Remnants_Title.png');
const REMNANTS_BOX_LOCKED = require('../../assets/Journal_Assets/Remnants_Box_locked.png');
const REMNANTS_BOX_UNLOCKED = require('../../assets/Journal_Assets/Remnants_Box_unlocked.png');

//Glossary
const GLOSSARY_TITLE = require('../../assets/Journal_Assets/Glossary_Title.png');
const GLOSSARY_DIVIDER = require('../../assets/Journal_Assets/Glossary_Line.png');

// ***********************************************************************
// FUTURE PROBLEM KO :D
const PORTRAITS = {
  'Andrés Bonifacio': require('../../Character Images/Temporary Placeholders/Bonifacio.png'),
  'Dr. José Rizal': require('../../Character Images/Temporary Placeholders/Rizal.png'),
  'Apolinario Mabini': require('../../Character Images/Temporary Placeholders/Mabini.png'),
};
// ***********************************************************************




 //Bookmark tab, checks if closed or active
function BookmarkTab({ image, openImage, index, active, onPress }) {
  const showOpen = active && openImage;
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.tab,
        showOpen ? styles.tabOpen : styles.tabClosed,
        { top: `${TAB_TOP + index * TAB_STEP}%` },
      ]}
    >
      <Image source={showOpen ? openImage : image} style={styles.tabImage} resizeMode="contain" />
    </Pressable>
  );
}



// ==================================== TIMELINE STUFF ====================================
// Timeline entries, used array for separation
function splitByLength(entries, headerWeight = 0) {
  const weight = (e) =>
    e.content.length + (e['sub-content'] ?? []).reduce((n, x) => n + x.content.length + 30, 0) + 40;
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

//Splits array into two, if odd -> first half gets the extra element
function splitInHalf(arr) {
  const mid = Math.ceil(arr.length / 2);
  return [arr.slice(0, mid), arr.slice(mid)];
}

 //Converts num to roman numeral
function toRoman(num) {
  const romans = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII'];
  return romans[num - 1] || num;
}

 //Date label for timeline entries
function getDateLabel(entries) {
  if (entries.length === 1) return entries[0].date;
  const dates = entries.map((e) => e.date);
  return `${dates[0]} - ${dates[dates.length - 1]}`;
}

 //Timeline box list
function TimelineBox({ text, side, slot, onPress }) {
  const top = (side === 'left' ? LEFT_BOX_TOP : RIGHT_BOX_TOP) + slot * BOX_STEP;
  return (
    <Pressable
      onPress={onPress}
      android_disableSound
      style={[styles.timelineBox, { top: `${top}%` }]}
    >
      <Image source={TIMELINE_BOX} style={styles.timelineBoxImage} resizeMode="stretch" />
      <View style={styles.timelineBoxBg} pointerEvents="none">
        <Text style={styles.timelineBoxText} numberOfLines={2} adjustsFontSizeToFit>
          {text}
        </Text>
      </View>
    </Pressable>
  );
}

 //timeline detailed page
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
//incomplete pa
const REMNANTS = [
  { id: 1, unlocked: true,  image: require('../../assets/Journal_Assets/Remnants_Box_unlocked.png') },
  { id: 2, unlocked: true,  image: require('../../assets/Journal_Assets/Remnants_Box_locked.png') },
  { id: 3, unlocked: false },
  { id: 4, unlocked: false },
  { id: 5, unlocked: false },
  { id: 6, unlocked: false },
  { id: 7, unlocked: false },
  { id: 8, unlocked: false },
  { id: 9, unlocked: false },
];


 //remnant box, checks if locked or unlocked, displays remnant image if unlocked
function RemnantCard({ id, unlocked, image, onPress }) {
  return (
    <Pressable
      style={styles.remnantCard}
      onPress={unlocked ? onPress : undefined}
      disabled={!unlocked}
    >
      <View style={styles.remnantBoxWrap}>
        <Image
          source={unlocked ? REMNANTS_BOX_UNLOCKED : REMNANTS_BOX_LOCKED}
          style={styles.remnantBoxImage}
          resizeMode="contain"
        />
        {unlocked && image && (
          <Image source={image} style={styles.remnantInnerImage} resizeMode="cover" />
        )}
      </View>
      <Text style={styles.remnantLabel}>Remnant #{id}</Text>
    </Pressable>
  );
}


 //Remnant unlocked can view close up version of remnant img
function CompleteCard({ unlocked, onPress }) {
  return (
    <Pressable
      style={styles.remnantCard}
      onPress={unlocked ? onPress : undefined}
      disabled={!unlocked}
    >
      <View style={styles.remnantBoxWrap}>
        <Image
          source={unlocked ? REMNANTS_BOX_UNLOCKED : REMNANTS_BOX_LOCKED}
          style={styles.remnantBoxImage}
          resizeMode="contain"
        />
        {unlocked && (
          // Placeholder image for the completed state.
          <Image
            source={require('../../assets/Journal_Assets/Remnants_Box_locked.png')}
            style={styles.remnantInnerImage}
            resizeMode="cover"
          />
        )}
      </View>
      <Text style={styles.remnantLabel}>Complete</Text>
    </Pressable>
  );
}


// ==================================== GLOSSARY STUFF ====================================
// Note: need to fix diviner img not being displayed
function GlossaryEntry({ term, meaning, unit }) {
  return (
    <View style={styles.glossaryBlock}>
      <Text
        style={[styles.glossaryTerm, { fontSize: Math.max(9, 34 * unit) }]}
        numberOfLines={2}
        adjustsFontSizeToFit
      >
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
  const top =
    side === 'left'
      ? LEFT_CARD_TOP + slot * LEFT_CARD_STEP
      : RIGHT_CARD_TOP + slot * RIGHT_CARD_STEP;
  const portrait = PORTRAITS[name];
  return (
    <Pressable
      onPress={onPress}
      style={[styles.profileCard, side === 'left' ? styles.profileCardLeft : styles.profileCardRight, { top: `${top}%` }]}
    >
      <Image source={PROFILE_CARD} style={styles.fillAll} resizeMode="stretch" />
      {portrait && <Image source={portrait} style={styles.cardPortraitSlot} resizeMode="cover" />}
      <View style={styles.cardTextSlot}>
        <Text style={[styles.cardName, { fontSize: Math.max(8, 28 * unit) }]} numberOfLines={1} adjustsFontSizeToFit>
          {name}
        </Text>
        <Text style={[styles.cardDesc, { fontSize: Math.max(7, 20 * unit) }]} numberOfLines={1}>
          {content}
        </Text>
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

  const timelineSection = Journal.find((s) => s.title === 'Timeline');

  const groupedTimeline = {};
  timelineSection?.content.forEach((entry) => {
    const key = `Ch. ${entry.chapter} - Part ${entry.part}`;
    if (!groupedTimeline[key]) groupedTimeline[key] = [];
    groupedTimeline[key].push(entry);
  });

  const allKeys = Object.keys(groupedTimeline);

  // Eight chapter/part boxes are shown per spread (four per page).
  const Timeline_per_side = 4;
  const timeline_per_spread = Timeline_per_side * 2;
  const totalTimespread = Math.ceil(allKeys.length / timeline_per_spread);

  const timelinespread = allKeys.slice(timelinepage * timeline_per_spread,
    (timelinepage + 1) * timeline_per_spread
  );
  const leftkeys = timelinespread.slice(0, Timeline_per_side);
  const rightkeys = timelinespread.slice(Timeline_per_side);

  // ---- Timeline chapter-detail data ----
  const selectedEntries = selectedEntry ? groupedTimeline[selectedEntry] : [];
  const [leftEntries, rightEntries] = splitByLength(selectedEntries, 150);
  const chapterTitle = selectedEntries[0]
    ? `Chapter ${selectedEntries[0].chapter} · Part ${selectedEntries[0].part}`
    : '';

  // ---- Character Profiles data ----
  const characters = Journal.find((s) => s.title === 'Character Profiles')?.content ?? [];
  const totalSpreads = Math.ceil(characters.length / PER_SPREAD);

  const spread = characters.slice(charPage * PER_SPREAD, (charPage + 1) * PER_SPREAD);
  const leftChars = spread.slice(0, CARDS_LEFT);
  const rightChars = spread.slice(CARDS_LEFT);

  // ---- Minigame Collections data ----
  // Four remnants on the left page; the remaining five plus the Complete card
  // on the right page.
  const allRemnantunlocked = REMNANTS.every((r) => r.unlocked);
  const minigameLeft = REMNANTS.slice(0, 4);
  const minigameRight = REMNANTS.slice(4);

  // ---- Glossary data: sorted alphabetically by term ----
  const glossaryterm = Journal.find((s) => s.title === "Glossary")?.content ?? [];
  const sortglossary = [...glossaryterm].sort((a, b) => a.term.localeCompare(b.term));

  const Glossary_per_side = 2;
  const glossary_per_spread = Glossary_per_side * 2;
  const toal_glossary_spread = Math.ceil(sortglossary.length / glossary_per_spread);

  const glossary_spread = sortglossary.slice(
    glossarypage * glossary_per_spread,
    (glossarypage + 1) * glossary_per_spread
  );

  const glossaryLeft = glossary_spread.slice(0, Glossary_per_side);
  const glossaryRight = glossary_spread.slice(Glossary_per_side);

  /**
   * Renders a single bookmark tab. Selecting a tab switches to that section at
   * its first page and clears any currently open detail view.
   */
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
      <View style={styles.bookFrame}>
      <ImageBackground
        source={require('../../assets/Journal_Assets/Journal_Book.png')}
        style={styles.book}
        resizeMode="contain">
        {activeTab === 'Timeline' && !selectedEntry && (
          <View style={styles.spreadRow} pointerEvents="box-none">
            <View style={styles.spreadPage} pointerEvents="box-none">
              <Image source={TIMELINE_TITLE} style={styles.timelineTitle} resizeMode="contain" />
              {leftkeys.map((key, i) => (
                <TimelineBox
                  key={key}
                  side="left"
                  slot={i}
                  text={`${toRoman(allKeys.indexOf(key) + 1)}. ${getDateLabel(groupedTimeline[key])}`}
                  onPress={() => setSelectedEntry(key)} />
              ))}
            </View>

            <View style={styles.spreadPage} pointerEvents="box-none">
              {rightkeys.map((key, i) => (
                <TimelineBox
                  key={key}
                  side="right"
                  slot={i}
                  text={`${toRoman(allKeys.indexOf(key) + 1)}. ${getDateLabel(groupedTimeline[key])}`}
                  onPress={() => setSelectedEntry(key)} />
              ))}
            </View>

            {timelinepage > 0 && (
              <Pressable
                style={[styles.sideArrow, styles.sideArrowLeft]}
                onPress={() => setTimelinePage(timelinepage - 1)}
              >
                <Text style={styles.arrowText}>◀</Text>
              </Pressable>
            )}
            {timelinepage < totalTimespread - 1 && (
              <Pressable
                style={[styles.sideArrow, styles.sideArrowRight]}
                onPress={() => setTimelinePage(timelinepage + 1)}
              >
                <Text style={styles.arrowText}>▶</Text>
              </Pressable>
            )}
          </View>
        )}

        {activeTab === 'Timeline' && selectedEntry && (
          <View style={styles.pageRow}>
            <ScrollView style={styles.leftPage} contentContainerStyle={styles.pageContent}>
              <Pressable onPress={() => setSelectedEntry(null)}>
                <Text style={styles.backLink}>← Back to timeline</Text>
              </Pressable>
              <Text style={styles.chapterTitle}>{chapterTitle}</Text>
              <Text style={styles.chapterRange}>{getDateLabel(selectedEntries)}</Text>
              {leftEntries.map((entry, i) => (
                <TimelineEntry key={i} entry={entry} />
              ))}
            </ScrollView>

            <ScrollView style={styles.rightPage} contentContainerStyle={styles.pageContent}>
              {rightEntries.map((entry, i) => (
                <TimelineEntry key={i} entry={entry} />
              ))}
            </ScrollView>
          </View>
        )}

        {activeTab === 'Character Profiles' && !selectedChar && (
          <View key="char-list" style={styles.spreadRow} pointerEvents="box-none">
            <View style={styles.spreadPage} pointerEvents="box-none">
              <Image source={PROFILE_TITLE} style={styles.profileTitle} resizeMode="contain" />
              {leftChars.map((c, i) => (
                <CharacterCard
                  key={c.name}
                  name={c.name}
                  content={c.content}
                  side="left"
                  slot={i}
                  unit={unit}
                  onPress={() => setSelectedChar(c)}
                />
              ))}
            </View>

            <View style={styles.spreadPage} pointerEvents="box-none">
              {rightChars.map((c, i) => (
                <CharacterCard
                  key={c.name}
                  name={c.name}
                  content={c.content}
                  side="right"
                  slot={i}
                  unit={unit}
                  onPress={() => setSelectedChar(c)}
                />
              ))}
            </View>

            {charPage > 0 && (
              <Pressable
                style={[styles.sideArrow, styles.sideArrowLeft]}
                onPress={() => setCharPage(charPage - 1)}
              >
                <Text style={styles.arrowText}>◀</Text>
              </Pressable>
            )}
            {charPage < totalSpreads - 1 && (
              <Pressable
                style={[styles.sideArrow, styles.sideArrowRight]}
                onPress={() => setCharPage(charPage + 1)}
              >
                <Text style={styles.arrowText}>▶</Text>
              </Pressable>
            )}
          </View>
        )}

        {activeTab === 'Character Profiles' && selectedChar && (
          <View key="char-detail" style={styles.spreadRow} pointerEvents="box-none">
            <View style={styles.spreadPage} pointerEvents="box-none">
              <View style={styles.detailFrame}>
                <Image source={PROFILE_FRAME} style={styles.fillAll} resizeMode="stretch" />
                {PORTRAITS[selectedChar.name] && (
                  <Image
                    source={PORTRAITS[selectedChar.name]}
                    style={styles.detailPortraitSlot}
                    resizeMode="cover"
                  />
                )}
              </View>

              <View style={styles.detailNameBox}>
                <Text
                  style={[styles.detailName, { fontSize: Math.max(12, 64 * unit) }]}
                  numberOfLines={2}
                  adjustsFontSizeToFit
                >
                  {selectedChar.name}
                </Text>
              </View>

              <Text style={[styles.detailInfo, { fontSize: Math.max(9, 34 * unit) }]}>
                {getAppearance(selectedChar)}
              </Text>

              <Pressable style={styles.detailBack} onPress={() => setSelectedChar(null)}>
                <Text style={styles.backLink}>← Back to profiles</Text>
              </Pressable>
            </View>

            <View style={styles.spreadPage} pointerEvents="box-none">
              <ScrollView style={styles.detailBodyScroll} contentContainerStyle={styles.detailBodyContent}>
                <Text
                  style={[styles.detailBody, { fontSize: Math.max(9, 26 * unit), lineHeight: Math.max(13, 38 * unit) }]}
                >
                  {selectedChar.content}
                </Text>
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
                  {minigameLeft.map((r) => (
                    <RemnantCard
                      key={r.id}
                      id={r.id}
                      unlocked={r.unlocked}
                      image={r.image}
                      onPress={() => setSelectedRemnant(r.image)}
                    />
                  ))}
                </View>
              </ScrollView>
            </View>

            <View style={styles.spreadPage} pointerEvents="box-none">
              <ScrollView style={styles.rightPage} contentContainerStyle={styles.pageContent}>
                <View style={{ height: 260 * unit }} />
                <View style={styles.Remnancegrid}>
                  {minigameRight.map((r) => (
                    <RemnantCard
                      key={r.id}
                      id={r.id}
                      unlocked={r.unlocked}
                      image={r.image}
                      onPress={() => setSelectedRemnant(r.image)}
                    />
                  ))}
                  <CompleteCard
                    unlocked={allRemnantunlocked}
                    onPress={() =>
                      setSelectedRemnant(require('../../assets/Journal_Assets/Remnants_Box_locked.png'))
                    }
                  />
                </View>
              </ScrollView>
            </View>
          </View>
        )}

        {activeTab === 'Glossary' && (
          <View style={styles.spreadRow} pointerEvents="box-none">
            <View style={styles.spreadPage} pointerEvents="box-none">
              <Image source={GLOSSARY_TITLE} style={styles.glossaryTitle} resizeMode="contain" />
              <ScrollView style={styles.leftPage} contentContainerStyle={styles.pageContent}>
                <View style={{ height: 260 * unit }} />
                {glossaryLeft.map((g) => (
                  <GlossaryEntry
                    key={g.term}
                    term={g.term}
                    meaning={g.meaning}
                    unit={unit}
                  />
                ))}
              </ScrollView>
            </View>

            <View style={styles.spreadPage} pointerEvents="box-none">
              <ScrollView style={styles.rightPage} contentContainerStyle={styles.pageContent}>
                <View style={{ height: 260 * unit }} />
                {glossaryRight.map((g) => (
                  <GlossaryEntry
                    key={g.term}
                    term={g.term}
                    meaning={g.meaning}
                    unit={unit}
                  />
                ))}
              </ScrollView>
            </View>

            {glossarypage > 0 && (
              <Pressable
                style={[styles.sideArrow, styles.sideArrowLeft]}
                onPress={() => setGlossarypPage(glossarypage - 1)}
              >
                <Text style={styles.arrowText}>◀</Text>
              </Pressable>
            )}
            {glossarypage < toal_glossary_spread - 1 && (
              <Pressable
                style={[styles.sideArrow, styles.sideArrowRight]}
                onPress={() => setGlossarypPage(glossarypage + 1)}
              >
                <Text style={styles.arrowText}>▶</Text>
              </Pressable>
            )}
          </View>
        )}
      </ImageBackground>
      </View>

        {TABS.map((tab, i) => renderTab(tab, i))}
        <BookmarkTab
          image={EXIT_IMAGE}
          index={TABS.length}
          onPress={() => navigation.goBack()}
        />

        {selectedRemnant && (
          <Pressable
            style={styles.remnantViewer}
            onPress={() => setSelectedRemnant(null)}
          >
            <Image
              source={selectedRemnant}
              style={styles.remnantViewerImage}
              resizeMode="contain"
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}

export default Journalbook;