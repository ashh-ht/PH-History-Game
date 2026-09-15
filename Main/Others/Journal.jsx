import { useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, View, Pressable, Image } from 'react-native';
import Journal from './Journal.json';

const TABS = ['Timeline', 'Character Profiles', 'Minigame Collections', 'Glossary'];
const TABICONS = {
  'Timeline': require('../../assets/timeline.png'),
  'Character Profiles': require('../../assets/profile.png'),
  'Minigame Collections': require('../../assets/minigame.png'),
  'Glossary': require('../../assets/dictionary.png'),
};
const CLOSEICON = require('../../assets/returnarrow.png');

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

function BookmarkTab({ icon, label, active, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.bookmarkWrapper}>
      <View style={[styles.bookmarkTop, active && styles.bookmarkTopActive]}>
        <Image source={icon} style={styles.bookmarkIcon} />
      </View>
      <View style={styles.bookmarkNotch}>
        <View style={[styles.bookmarkNotchLeft, active && styles.bookmarkNotchLeftActive]} />
        <View style={[styles.bookmarkNotchRight, active && styles.bookmarkNotchRightActive]} />
      </View>
      {active && label && <Text style={styles.bookmarkLabel}>{label}</Text>}
    </Pressable>
  );
}

function Journalbook({ navigation }) {
  const [activeTab, setActiveTab] = useState('Timeline');
  const [selectedEntry, setSelectedEntry] = useState(null);

  const timelineSection = Journal.find((s) => s.title === 'Timeline');

  const groupedTimeline = {};
  timelineSection?.content.forEach((entry) => {
    const key = `Ch. ${entry.chapter} - Part ${entry.part}`;
    if (!groupedTimeline[key]) groupedTimeline[key] = [];
    groupedTimeline[key].push(entry);
  });

  const allKeys = Object.keys(groupedTimeline);
  const [leftKeys, rightKeys] = splitInHalf(allKeys);

  const selectedEntries = selectedEntry ? groupedTimeline[selectedEntry] : [];
  const [leftEntries, rightEntries] = splitInHalf(selectedEntries);

  return (
    <ImageBackground source={require('../../assets/Settingbg.png')} style={styles.container}>
      <ImageBackground
        source={require('../../assets/Journal_Book.png')}
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
              onPress={() => { setActiveTab(tab); setSelectedEntry(null); }}
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
              {leftKeys.map((key, i) => (
                <Pressable key={key} style={styles.listButton} onPress={() => setSelectedEntry(key)}>
                  <Text style={styles.listButtonText}>
                    {toRoman(i + 1)}. {getDateLabel(groupedTimeline[key])}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>

            <ScrollView style={styles.rightPage} contentContainerStyle={styles.pageContent}>
              {rightKeys.map((key, i) => (
                <Pressable key={key} style={styles.listButton} onPress={() => setSelectedEntry(key)}>
                  <Text style={styles.listButtonText}>
                    {toRoman(i + 1 + leftKeys.length)}. {getDateLabel(groupedTimeline[key])}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
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

        {/* ---- CHARACTER PROFILES ---- */}
        {activeTab === 'Character Profiles' && (
          <View style={styles.pageRow}>
            <ScrollView style={styles.leftPage} contentContainerStyle={styles.pageContent}>
              <Text style={styles.pageTitle}>Character Profiles</Text>
              <Text style={styles.pageIntro}>
                Every important character you encountered will be displayed here. Find them all!
              </Text>
            </ScrollView>
            <ScrollView style={styles.rightPage} contentContainerStyle={styles.pageContent}>
              <Text style={styles.placeholderText}>More entries coming soon...</Text>
            </ScrollView>
          </View>
        )}

        {/* ---- Minigame Collections ---- */}
        {activeTab === 'Minigame Collections' && (
          <View style={styles.pageRow}>
            <ScrollView style={styles.leftPage} contentContainerStyle={styles.pageContent}>
              <Text style={styles.pageTitle}>Minigame Collections</Text>
              <Text style={styles.pageIntro}>
                Every minigame you finish adds a piece of the puzzle. Collect them all to reveal
                the full painting.
              </Text>
            </ScrollView>
            <ScrollView style={styles.rightPage} contentContainerStyle={styles.pageContent}>
              <Text style={styles.placeholderText}>More entries coming soon...</Text>
            </ScrollView>
          </View>
        )}

        {/* ---- Glossary ---- */}
        {activeTab === 'Glossary' && (
          <View style={styles.pageRow}>
            <ScrollView style={styles.leftPage} contentContainerStyle={styles.pageContent}>
              <Text style={styles.pageTitle}>Glossary</Text>
              <Text style={styles.pageIntro}>
                Important terms that you have encountered will be added here. Tap to see what
                they mean.
              </Text>
            </ScrollView>
            <ScrollView style={styles.rightPage} contentContainerStyle={styles.pageContent}>
              <Text style={styles.placeholderText}>More entries coming soon...</Text>
            </ScrollView>
          </View>
        )}
      </ImageBackground>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  book: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    top: 9,
    marginBottom: 8,
    paddingHorizontal: '18%',
    gap:70
  },

  bookmarkWrapper: {
    alignItems: 'center',
  },
  bookmarkTop: {
    width: 44,
    height: 40,
    backgroundColor: '#5a4a35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookmarkTopActive: {
    backgroundColor: '#7a5a2f',
  },
  bookmarkNotch: {
    flexDirection: 'row',
    width: 44,
  },
  bookmarkNotchLeft: {
    width: 0,
    height: 0,
    borderLeftWidth: 22,
    borderLeftColor: 'transparent',
    borderTopWidth: 10,
    borderTopColor: '#5a4a35',
  },
  bookmarkNotchLeftActive: {
    borderTopColor: '#7a5a2f',
  },
  bookmarkNotchRight: {
    width: 0,
    height: 0,
    borderRightWidth: 22,
    borderRightColor: 'transparent',
    borderTopWidth: 10,
    borderTopColor: '#5a4a35',
  },
  bookmarkNotchRightActive: {
    borderTopColor: '#7a5a2f',
  },
  bookmarkIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  bookmarkLabel: {
    fontSize: 9,
    color: '#3a2e1f',
    marginTop: 2,
    fontWeight: '600',
  },

  pageRow: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: '16%',
    marginTop: '2%',
    marginBottom: '8%',
    gap: '3%',
  },
  leftPage: {
    flex: 1,
  },
  rightPage: {
    flex: 1,
  },
  pageContent: {
    padding: 10,
  },

  pageTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#3a2e1f',
    marginBottom: 6,
  },

  pageIntro: {
    fontSize: 10,
    color: '#5a4a35',
    marginBottom: 10,
    fontStyle: 'italic',
  },

  placeholderText: {
    fontSize: 10,
    color: '#8a6d3b',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },

  listButton: {
    backgroundColor: '#fff8e6',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 8,
    alignItems: 'center',
    marginBottom: 6,
  },
  listButtonText: {
    color: '#3a2e1f',
    fontWeight: '600',
    fontSize: 11,
  },

  backLink: {
    color: '#050505',
    marginBottom: 8,
    fontWeight: '600',
    fontSize: 11,
  },

  entryBlock: {
    marginBottom: 10,
  },

  entryDate: {
    fontWeight: 'bold',
    color: '#3a2e1f',
    marginBottom: 3,
    fontSize: 11,
  },

  entryContent: {
    color: '#5a4a35',
    fontSize: 10,
    lineHeight: 14,
  },
});

export default Journalbook;