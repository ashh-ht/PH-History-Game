import { useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, View, Pressable, Image } from 'react-native';
import Journal from './Journal.json';

const TABS = ['Timeline', 'Character Profiles', 'Minigame Collections', 'Glossary'];

function Journalbook({ navigation }) {
  const [activeTab, setActiveTab] = useState('Timeline');
  const [selectedEntry, setSelectedEntry] = useState(null);

  const timelineSection = Journal.find((s) => s.title === 'Timeline');
  const charSection = Journal.find((s) => s.title === 'Character Profiles');

  // Group timeline entries by chapter+part, e.g. "Chapter 1, Part 1"
  const groupedTimeline = {};
  timelineSection?.content.forEach((entry) => {
    const key = `Ch. ${entry.chapter} - Part ${entry.part}`;
    if (!groupedTimeline[key]) groupedTimeline[key] = [];
    groupedTimeline[key].push(entry);
  });

const allKeys = Object.keys(groupedTimeline);

// this function acts as to serve as an array like a count on how many number there are and printing the specific roman numeral
function toRoman(num) {
  const romans = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];
  return romans[num - 1] || num;
}

//this is for to create a data entry using map by using dates and also serves a varaible 
function getDateLabel(entries) {
  if (entries.length === 1) return entries[0].date;
  const dates = entries.map(e => e.date);
  return `${dates[0]} - ${dates[dates.length - 1]}`;
}
  return (
    <ImageBackground source={require('../assets/Settingbg.png')} style={styles.container}>
   <ImageBackground
      source={require('../assets/Journal_Book.png')}
      style={styles.book}
      resizeMode="contain"
>

        {/* Top icon bar */}
        <View style={styles.topBar}>
          <Pressable onPress={() => navigation.goBack()}>
            <Text style={styles.iconText}>✕</Text>
          </Pressable>
          {TABS.map((tab) => (
            <Pressable key={tab} onPress={() => { setActiveTab(tab); setSelectedEntry(null); }}>
              <Text style={[styles.tabIcon, activeTab === tab && styles.tabIconActive]}>
                {tab === 'Timeline' ? '🕐' : tab === 'Character Profiles' ? '👤' : tab === 'Minigame Collections' ? '🧩' : '📖'}
              </Text>
            </Pressable>
          ))}
        </View>

        <ScrollView style={styles.pages}>
          {activeTab === 'Timeline' && !selectedEntry && (
            <View>
              <Text style={styles.pageTitle}>Timeline</Text>
              <Text style={styles.pageIntro}>
                This is the timeline, where all of your journey events are tracked. Finish all
                chapters to complete your journey!
              </Text>
<View style={styles.grid}>
  {allKeys.map((key, i) => (
    <Pressable
      key={key}
      style={styles.gridButton}
      onPress={() => setSelectedEntry(key)}
    >
      <Text style={styles.gridButtonText}>
        {toRoman(i + 1)}. {getDateLabel(groupedTimeline[key])}
      </Text>
    </Pressable>
  ))}
</View>
            </View>
          )}

          {activeTab === 'Timeline' && selectedEntry && (
            <View>
              <Pressable onPress={() => setSelectedEntry(null)}>
                <Text style={styles.backLink}>← Back to chapters</Text>
              </Pressable>
              <Text style={styles.pageTitle}>{selectedEntry}</Text>
              {groupedTimeline[selectedEntry].map((entry, i) => (
                <View key={i} style={styles.entryBlock}>
                  <Text style={styles.entryDate}>{entry.date}</Text>
                  <Text style={styles.entryContent}>{entry.content}</Text>
                </View>
              ))}
            </View>
          )}

          {activeTab === 'Character Profiles' && (
            <View>
              <Text style={styles.pageTitle}>Character Profiles</Text>
              <Text style={styles.pageIntro}>
                Every important character you encountered will be displayed here. Find them all!
              </Text>
              {/* charSection data is currently empty placeholders — fill in as your team adds entries */}
            </View>
          )}

          {activeTab === 'Minigame Collections' && (
            <View>
              <Text style={styles.pageTitle}>Minigame Collections</Text>
              <Text style={styles.pageIntro}>
                Every minigame you finish adds a piece of the puzzle. Collect them all to reveal the
                full painting.
              </Text>
            </View>
          )}

          {activeTab === 'Glossary' && (
            <View>
              <Text style={styles.pageTitle}>Glossary</Text>
              <Text style={styles.pageIntro}>
                Important terms that you have encountered will be added here. Tap to see what they
                mean.
              </Text>
            </View>
          )}
        </ScrollView>
          </ImageBackground>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingBottom: 6,
    paddingHorizontal: '20%',
    borderBottomWidth: 1,
    borderBottomColor: '#c9b896',
  },
  iconText: { 
    fontSize: 16, 
    color: '#3a2e1f' 
  },

  tabIcon: { 
    fontSize: 16, 
    opacity: 0.4 
  },
  tabIconActive: { 
    opacity: 1 
  },
  pages: { 
    flex: 1,
    marginHorizontal: '18%',
    marginTop: '4%',
    marginBottom: '8%',
  },
  pageTitle: { 
    fontSize: 16, 
    fontWeight: 'bold',
    color: '#3a2e1f', 
    marginBottom: 6 
  },

  pageIntro: { 
    fontSize: 10, 
    color: '#5a4a35', 
    marginBottom: 10,
    fontStyle: 'italic'
  },

  grid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 6 
  },

  gridButton: {
    width: '47%',
    backgroundColor: '#fff8e6',
    borderWidth: 1,
    borderColor: '#8a6d3b',
    borderRadius: 6,
    paddingVertical: 6,
    alignItems: 'center',
  },
  gridButtonText: { 
    color: '#3a2e1f', 
    fontWeight: '600',
    fontSize: 11,
  },

  backLink: { 
    color: '#8a6d3b', 
    marginBottom: 8, 
    fontWeight: '600',
    fontSize: 11,
  },

  entryBlock: { 
    marginBottom: 10 
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
    lineHeight: 14 
  },
});

export default Journalbook;