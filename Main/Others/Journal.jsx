import { useState } from 'react';
import { ImageBackground, ScrollView, Text, View, Pressable, Image } from 'react-native';
import Journal from './Journal.json';
import styles from '../../Styles/Others/StyleJournal';


const TABS = ['Timeline', 'Character Profiles', 'Minigame Collections', 'Glossary'];
const TABICONS = {
  'Timeline': require('../../assets/Journal_parts/timeline.png'),
  'Character Profiles': require('../../assets/Journal_parts/profile.png'),
  'Minigame Collections': require('../../assets/Journal_parts/minigame.png'),
  'Glossary': require('../../assets/Journal_parts/dictionary.png'),
};
const CLOSEICON = require('../../assets/returnarrow.png');
const BOOKMARK_BG = require('../../assets/Journal_parts/bookmark.png');
const LISTBUTTON_BG = require('../../assets/Journal_parts/journal_button.png');


// Character Profiles
const CARD_BG = require('../../assets/Journal_parts/char_holder.png'); // gold-framed card
const PLACEHOLDER = require('../../assets/Journal_parts/char_holder.png'); // known-good fallback

const PORTRAITS = {
  'Andrés Bonifacio': require('../../Character Images/Temporary Placeholders/Bonifacio.png'),
  'Dr. José Rizal': require('../../Character Images/Temporary Placeholders/Rizal.png'),
  'Apolinario Mabini': require('../../Character Images/Temporary Placeholders/Mabini.png'),
};

const CARDS_PER_SIDE = 3;
const PER_SPREAD = CARDS_PER_SIDE * 2; // 6 cards per open book

function splitInHalf(arr) {
  const mid = Math.ceil(arr.length / 2);
  return [arr.slice(0, mid), arr.slice(mid)];
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
//---------------mini game stuff--------------------
//dummy placeholders for minigame
const REMNANTS = [
  { id: 1, unlocked: true,  image: require('../../assets/Journal_parts/Remnant_found.png') },
  { id: 2, unlocked: true,  image: require('../../assets/Journal_parts/remnant.png') },
  { id: 3, unlocked: false },
  { id: 4, unlocked: false },
  { id: 5, unlocked: false },
  { id: 6, unlocked: false },
  { id: 7, unlocked: false },
  { id: 8, unlocked: false },
  { id: 9, unlocked: false },
];
//-------------------------------------------

function BookmarkTab({ icon, label, active, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.bookmarkWrapper}>
      <ImageBackground
        source={BOOKMARK_BG}
        style={[styles.bookmarkBg, active && styles.bookmarkBgActive]}
        resizeMode="contain"
      >
        <Image source={icon} style={styles.bookmarkIcon} />
      </ImageBackground>
      {active && label && <Text style={styles.bookmarkLabel}>{label}</Text>}
    </Pressable>
  );
}

function ListButton({ text, onPress }) {
  return (
    <Pressable style={styles.listButtonWrapper} onPress={onPress}>
      <ImageBackground
        source={LISTBUTTON_BG}
        style={styles.listButtonBg}
        resizeMode="stretch"
      >
        <Text style={styles.listButtonText}>{text}</Text>
      </ImageBackground>
    </Pressable>
  );
}

function GlossaryEntry({term,meaning}){
  return(
    <View style ={styles.glossaryBlock}>
      <Text style ={styles.glossaryTerm}>{term}</Text>
      <Text style ={styles.glossaryMeaning}>{meaning}</Text>
    </View>
  );
}

function CharacterCard({ name, content, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.cardWrapper}>
      <ImageBackground source={CARD_BG} style={styles.cardBg} resizeMode="stretch">
        <Image source={PORTRAITS[name] || PLACEHOLDER} style={styles.cardPortrait} />
        <View style={styles.cardTextBox}>
          <Text style={styles.cardName} numberOfLines={2}>{name}</Text>
          <Text style={styles.cardDesc} numberOfLines={3}>{content}</Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

function RemnantCard({ id, unlocked, image }) {
  return (
    <View style={styles.remnantCard}>
      {unlocked ? (
        <Image source={image} style={styles.remnantImage} resizeMode="cover" />
      ) : (
        <View style={styles.remnantPlaceholder}>
          <Text style={styles.remnantslocked}>?</Text>
        </View>
      )}
      <Text style={styles.remnantLabel}>Remnant #{id}</Text>
    </View>
  );
}

function CompleteCard({ unlocked }) {
  return (
    <View style={[styles.remnantCard, styles.completeCard]}>
      {unlocked ? (
        <Image
          source={require('../../assets/Journal_parts/remnant.png')}
          style={styles.remnantImage}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.remnantPlaceholder}>
          <Text style={styles.remnantslocked}>?</Text>
        </View>
      )}
      <Text style={styles.remnantLabel}>Complete</Text>
    </View>
  );
}

function Journalbook({ navigation }) {
  const [activeTab, setActiveTab] = useState('Timeline');
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [charPage, setCharPage] = useState(0);
  const [selectedChar, setSelectedChar] = useState(null);
  const [glossarypage, setGlossarypPage] = useState(0);
  const [timelinepage, setTimelinePage] = useState(0);
  // ---- Timeline data ----
  const timelineSection = Journal.find((s) => s.title === 'Timeline');

  const groupedTimeline = {};
  timelineSection?.content.forEach((entry) => {
    const key = `Ch. ${entry.chapter} - Part ${entry.part}`;
    if (!groupedTimeline[key]) groupedTimeline[key] = [];
    groupedTimeline[key].push(entry);
  });

  const allKeys = Object.keys(groupedTimeline);

  const Timeline_per_side = 6;
  const timeline_per_spread = Timeline_per_side * 2;
  const totalTimespread = Math.ceil(allKeys.length / timeline_per_spread);

  const timelinespread = allKeys.slice(timelinepage * timeline_per_spread,
    (timelinepage +1) * timeline_per_spread
  );
  const leftkeys = timelinespread.slice(0, Timeline_per_side);
  const rightkeys = timelinespread.slice(Timeline_per_side);

  // ---- Timeline chapter-detail data ----
  const selectedEntries = selectedEntry ? groupedTimeline[selectedEntry] : [];
  const [leftEntries, rightEntries] = splitInHalf(selectedEntries);

  // ---- Character Profiles data ----
  const characters = Journal.find((s) => s.title === 'Character Profiles')?.content ?? [];
  const totalSpreads = Math.ceil(characters.length / PER_SPREAD);

  const spread = characters.slice(charPage * PER_SPREAD, (charPage + 1) * PER_SPREAD);
  const leftChars = spread.slice(0, CARDS_PER_SIDE);
  const rightChars = spread.slice(CARDS_PER_SIDE);


  // ------- Mini games Collection data -----------
  const  minigame_per_side = 3;
  const  [minigameleft,minigameright] =splitInHalf(REMNANTS);
  const allRemnantunlocked = REMNANTS.every((r) => r.unlocked);

  const minigameLeft = REMNANTS.slice(0,6);
  const minigameRight = REMNANTS.slice(6);

  // ---- Glossary data entry
  const glossaryterm = Journal.find((s) => s.title === "Glossary" )?.content ?? [];
  const sortglossary =[...glossaryterm].sort((a,b) => a.term.localeCompare(b.term));

  const Glossary_per_side = 2;
  const glossary_per_spread = Glossary_per_side * 2;
  const toal_glossary_spread = Math.ceil(sortglossary.length / glossary_per_spread);

  const glossary_spread = sortglossary.slice(
    glossarypage * glossary_per_spread,
    (glossarypage + 1) * glossary_per_spread
  );

  const glossaryLeft = glossary_spread.slice(0, Glossary_per_side);
  const glossaryRight =glossary_spread.slice(Glossary_per_side);

/*
const CARDS_PER_SIDE = 3;
const PER_SPREAD = CARDS_PER_SIDE * 2; // 6 cards per open book
*/

  return (
    <ImageBackground source={require('../../assets/Settingbg.png')} style={styles.container}>
      <ImageBackground
        source={require('../../assets/Journal_parts/JounalBook2.png')}
        style={styles.book}
        resizeMode="contain"
      >
        <View style={styles.topBar}>
          <BookmarkTab icon={CLOSEICON} onPress={() => navigation.goBack()} />
          {TABS.map((tab) => (
            <BookmarkTab
              key={tab}
              icon={TABICONS[tab]}
              label={tab}
              active={activeTab === tab}
              onPress={() => {
                setActiveTab(tab);
                setSelectedEntry(null);
                setSelectedChar(null);
                setTimelinePage(0);
                setCharPage(0);
                setGlossarypPage(0);
              }}
            />
          ))}
        </View>

        {/* ---- TIMELINE (list of chapters) ---- */}
        {activeTab === 'Timeline' && !selectedEntry && (
          <View style={styles.pageRow}>
            <ScrollView style={styles.leftPage} contentContainerStyle={styles.pageContent}>
              <Text style={styles.pageTitle}>Timeline</Text>
              <Text style={styles.pageIntro}>
                This is the timeline, where all of your journey events are tracked. Finish all
                chapters to complete your journey!
              </Text>
              {leftkeys.map((key) => {
                const globalIndex = allKeys.indexOf(key);
                return (
                  <ListButton
                    key={key}
                    text={`${toRoman(globalIndex + 1)}. ${getDateLabel(groupedTimeline[key])}`}
                    onPress={() => setSelectedEntry(key)}
                  />
                );
              })}
            </ScrollView>

            <ScrollView style={styles.rightPage} contentContainerStyle={styles.pageContent}>
              {rightkeys.map((key) => {
                const globalIndex = allKeys.indexOf(key);
                return (
                  <ListButton
                    key={key}
                    text={`${toRoman(globalIndex + 1)}. ${getDateLabel(groupedTimeline[key])}`}
                    onPress={() => setSelectedEntry(key)}
                  />
                );
              })}
            </ScrollView>

            {timelinepage > 0 &&(

              <Pressable style = {[styles.arrow, styles.arrowLeft]}
              onPress={() => setTimelinePage(timelinepage -1)}
              >
                <Text style={styles.arrowText}>◀</Text>
              </Pressable>
            )}

            { timelinepage < totalTimespread - 1 && (
              
              <Pressable style = {[styles.arrow, styles.arrowRight]}
              onPress={() => setTimelinePage(timelinepage + 1)}
              >
                <Text style={styles.arrowText}>▶</Text>
              </Pressable>
            )}
            </View>
        )}

        {/* ---- TIMELINE (chapter detail) ---- */}
        {activeTab === 'Timeline' && selectedEntry && (
          <View style={styles.pageRow}>
            <ScrollView style={styles.leftPage} contentContainerStyle={styles.pageContent}>
              <Pressable onPress={() => setSelectedEntry(null)}>
                <Text style={styles.backLink}>← Back to chapters</Text>
              </Pressable>
              <Text style={styles.pageTitle}>{selectedEntry}</Text>
              {leftEntries.map((entry, i) => (
                <View key={i} style={styles.entryBlock}>
                  <Text style={styles.entryDate}>{entry.date}</Text>
                  <Text style={styles.entryContent}>{entry.content}</Text>
                </View>
              ))}
            </ScrollView>

            <ScrollView style={styles.rightPage} contentContainerStyle={styles.pageContent}>
              {rightEntries.map((entry, i) => (
                <View key={i} style={styles.entryBlock}>
                  <Text style={styles.entryDate}>{entry.date}</Text>
                  <Text style={styles.entryContent}>{entry.content}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* ---- CHARACTER PROFILES (card list) ---- */}
        {activeTab === 'Character Profiles' && !selectedChar && (
          <View key ="char-list" style={styles.pageRow}>
            <ScrollView style={styles.leftPage} contentContainerStyle={styles.pageContent}>
              {leftChars.map((c) => (
                <CharacterCard
                  key={c.name}
                  name={c.name}
                  content={c.content}
                  onPress={() => setSelectedChar(c)}
                />
              ))}
            </ScrollView>

            <ScrollView style={styles.rightPage} contentContainerStyle={styles.pageContent}>
              {rightChars.map((c) => (
                <CharacterCard
                  key={c.name}
                  name={c.name}
                  content={c.content}
                  onPress={() => setSelectedChar(c)}
                />
              ))}
            </ScrollView>

            {charPage > 0 && (
              <Pressable
                style={[styles.arrow, styles.arrowLeft]}
                onPress={() => setCharPage(charPage - 1)}
              >
                <Text style={styles.arrowText}>◀</Text>
              </Pressable>
            )}
            {charPage < totalSpreads - 1 && (
              <Pressable
                style={[styles.arrow, styles.arrowRight]}
                onPress={() => setCharPage(charPage + 1)}
              >
                <Text style={styles.arrowText}>▶</Text>
              </Pressable>
            )}
          </View>
        )}

        {/* CHARACTER PROFILES full description */}
        {activeTab === 'Character Profiles' && selectedChar && (
          <View key ="char-detail" style={styles.pageRow}>
            <ScrollView style={styles.leftPage} contentContainerStyle={styles.pageContent}>
              <Pressable onPress={() => setSelectedChar(null)}>
                <Text style={styles.backLink}>← Back to characters</Text>
              </Pressable>
              <Image
                source={PORTRAITS[selectedChar.name] || PLACEHOLDER}
                style={styles.detailPortrait}
              />
              <Text style={styles.detailName}>{selectedChar.name}</Text>
            </ScrollView>

            <ScrollView style={styles.rightPage} contentContainerStyle={styles.pageContent}>
              <Text style={styles.entryContent}>{selectedChar.content}</Text>
            </ScrollView>
          </View>
        )}

        {/* ---- Minigame Collections with Remnants ---- */}
        {activeTab === 'Minigame Collections' && (

          // gets the function and their key for the Minigame part
          <View style={styles.pageRow}>
            <ScrollView style={styles.leftPage} contentContainerStyle={styles.pageContent}>
            <View style ={styles.Remnancegrid}>
              {minigameLeft.map((r) =>(
                <RemnantCard key ={r.id} id ={r.id} unlocked={r.unlocked} image ={r.image}/>
              ))}
            </View>
            </ScrollView>
                
            <ScrollView style={styles.rightPage} contentContainerStyle={styles.pageContent}>
            <View style ={styles.Remnancegrid}>
              {minigameRight.map((r) =>(
                <RemnantCard key ={r.id} id ={r.id} unlocked={r.unlocked} image ={r.image}/>
              ))}
            <CompleteCard unlocked={allRemnantunlocked}/>
            </View>    
            </ScrollView>
          </View>
        )}

        {/* ---- Glossary ---- */}
        {activeTab === 'Glossary' && (
          // this is for taking the contents of the Journal JSON
          <View style={styles.pageRow}>
            <ScrollView style={styles.leftPage} contentContainerStyle={styles.pageContent}>
            {glossaryLeft.map((g) => (

            <GlossaryEntry key={g.term} term={g.term} meaning ={g.meaning} />
            ))}
            </ScrollView>

            <ScrollView style={styles.rightPage} contentContainerStyle={styles.pageContent}>
            {glossaryRight.map((g) => (
            <GlossaryEntry key={g.term} term={g.term} meaning ={g.meaning} />
            ))}
            </ScrollView>

            {/* left page and right page*/}

            {glossarypage > 0 && (
              <Pressable
                style ={[styles.arrow, styles.arrowLeft]}
                onPress={() =>setGlossarypPage(glossarypage -1)}
                >
                  {/* temporary arrow bro just replace this when there is replacable */}
                <Text style={styles.arrowText}>◀</Text>
              </Pressable> 
            )}
            {
              glossarypage < toal_glossary_spread -1 &&(
                <Pressable
                style ={[styles.arrow, styles.arrowRight]}
                onPress={() =>setGlossarypPage(glossarypage + 1)}
                >
                  {/* temporary arrow bro just replace this when there is replacable */}
                <Text style={styles.arrowText}>▶</Text>
              </Pressable> 
              )
            }

          </View>
        )}
      </ImageBackground>
    </ImageBackground>
  );
}

export default Journalbook;