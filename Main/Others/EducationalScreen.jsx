import { useState } from 'react';
import { ImageBackground, ScrollView, Image, StyleSheet, Text, View, Linking, Pressable } from 'react-native';
import Sound_clicks from '../../Components/Sound_clicks';
import styles from '../../Styles/Others/StyleAbout';


const SOURCES = [
  { label: 'Emilio Aguinaldo', url: 'https://www.philippinemasonry.org/emilio-aguinaldo.html' },
  { label: ' Apacible,  Luna and  Arejola', url: 'https://nhcp.https://www.philippinemasonry.org/apacible-luna-and-arejola.html.ph/' },
  { label: 'Founders of the Katipunan', url: 'https://www.philippinemasonry.org/founders-of-the-katipunan.html' },
  { label: 'The 13 Martyrs of Bagumbayan', url: 'https://www.philippinemasonry.org/the-13-martyrs-of-bagumbayan.html' },
  { label: 'First unfurling of the Philippine Flag', url: 'https://www.philippinemasonry.org/first-unfurling-of-the-philippine-flag.html' },
  { label: 'The Katipunan and Masonry', url: 'https://www.philippinemasonry.org/the-katipunan-and-masonry.html' },
  { label: 'History of Masonry in the Philippines 1901-1918.', url: ' https://www.philippinemasonry.org/1901---1918.html' },
  { label: 'History of Masonry in the Philippines 1890-1900', url: 'https://www.philippinemasonry.org/1890---1900.html' },
  { label: 'History of Masonry in the Philippines  1856-1890', url: 'https://www.philippinemasonry.org/1856--1890.html' },
  { label: 'The katipunan ideology', url: 'https://www.philippinemasonry.org/the-katipunan-ideology.html' },
  { label: 'Kartilya ng Katipunan.', url: 'https://www.philippinemasonry.org/kartilya-ng-katipunan.html' },
  { label: 'José Rizal. Philippine Folklife Museum Foundation ', url: 'https://philippinefolklifemuseum.org/collection/jose-rizal/' },
  { label: 'Andres Bonifacio. Philippine Folklife Museum Foundation', url: 'https://philippinefolklifemuseum.org/collection/andres-bonifacio/' },
  { label: 'Revolutionary struggle in the Philippines', url: 'https://doi.org/10.1007/978-1-349-19862-7' },
  { label: 'The Katipunan Movement in CEBU', url: 'https://doi.org/10.32996/jhsss.2020.2.6.21' },
  { label: 'La Liga Filipina.', url: 'https://cids.up.edu.ph/wp-content/uploads/2020/02/Camposano-Article-2019.pdf' },
  { label: 'Dagohoy Rebellion |.', url: 'https://www.ebsco.com/research-starters/history/dagohoy-rebellion' },
];

function openLink(url) {
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      Linking.openURL(url);
    } else {
      console.warn(`Cannot open URL: ${url}`);
    }
  });
}

function educational_screen({ navigation }) {
  const [activeOverlay, setActiveOverlay] = useState(null);

  const handlePress = (label) => {
    if (label === 'Historical') setActiveOverlay('Historical');
    else if (label === 'Sources') setActiveOverlay('Sources');
  };

  const PillButton = ({ label }) => (
    <Sound_clicks style={styles.pillButton} onPress={() => handlePress(label)}>
      <Image
        source={require('../../assets/pillbutton.png')}
        style={styles.pillImage}
        resizeMode="stretch"
      />
      <Text style={styles.pillText}>{label}</Text>
    </Sound_clicks>
  );

  return (
    <ImageBackground source={require('../../assets/Settingbg.png')} style={styles.container}>
      {/* Top-left icons: same as the Settings screen */}
      <View style={styles.topIcon}>
        <Sound_clicks onPress={() => navigation.navigate('Home')}>
          <Image source={require('../../assets/return.png')} style={styles.icon} />
        </Sound_clicks>
        <Sound_clicks onPress={() => navigation.navigate('Journal')}>
          <Image source={require('../../assets/Journal_page.png')} style={styles.icon} />
        </Sound_clicks>
      </View>

      <View style={styles.panel}>
        {/* Title with a rule on each side */}
        <View style={styles.titleRow}>
          <View style={styles.titleRule} />
          <Text style={styles.title}>Educational</Text>
          <View style={styles.titleRule} />
        </View>

        {/* these are the button rows */}
        <View style={styles.row}>
          <PillButton label="Historical" />
          <PillButton label="Sources" />
        </View>

        {/* return arrow */}
        <Sound_clicks style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/returnarrow.png')} style={styles.icon} />
        </Sound_clicks>
      </View>

      {/* overlays */}
      {activeOverlay === 'Historical' && (
        <View style={styles.overlay}>
          <View style={styles.overlayPanel}>
            <Text style={styles.overlayTitle}>Historical Background</Text>
            <ScrollView style={styles.creditsScroll}>
              <Text style={styles.overlayBody}>
                {/* Replace with your real historical summary */}
                This game follows events from the Spanish colonization of the
                Philippines through the revolution and the fight for independence.
              </Text>
            </ScrollView>

            <Sound_clicks style={styles.overlayClose} onPress={() => setActiveOverlay(null)}>
              <Text style={styles.overlayCloseText}>Close</Text>
            </Sound_clicks>
          </View>
        </View>
      )}

      {activeOverlay === 'Sources' && (
        <View style={styles.overlay}>
          <View style={styles.overlayPanel}>
            <Text style={styles.overlayTitle}>Sources</Text>
            <ScrollView style={styles.creditsScroll}>
              {SOURCES.map((source) => (
                <Pressable key={source.url} onPress={() => openLink(source.url)}>
                  <Text style={[styles.overlayBody, sourceLinkStyle]}>
                    {source.label}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>

            <Sound_clicks style={styles.overlayClose} onPress={() => setActiveOverlay(null)}>
              <Text style={styles.overlayCloseText}>Close</Text>
            </Sound_clicks>
          </View>
        </View>
      )}
    </ImageBackground>
  );
}

const sourceLinkStyle = {
  color: '#1a5fb4',
  textDecorationLine: 'underline',
  marginBottom: 12,
};

export default educational_screen;