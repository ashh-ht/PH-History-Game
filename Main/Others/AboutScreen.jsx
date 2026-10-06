import { useState } from 'react';
import { ImageBackground,ScrollView, Image, StyleSheet, Text, View } from 'react-native';
import Sound_clicks from '../../Components/Sound_clicks';
import styles from '../../Styles/Others/StyleAbout';

function About_screen({ navigation }) {
  const [activeOverlay, setActiveOverlay] = useState(null); // null | 'Credits' | 'AboutTeam'

  const handlePress = (label) => {
    if (label === 'Credits') setActiveOverlay('Credits');
    else if (label === 'About Team') setActiveOverlay('AboutTeam');
    // References still unhandled — point it at a real screen whenever that's ready
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
          <Image source={require('../../assets/Journal_parts/Journal_page.png')} style={styles.icon} />
        </Sound_clicks>
      </View>

      <View style={styles.panel}>
        {/* Title with a rule on each side */}
        <View style={styles.titleRow}>
          <View style={styles.titleRule} />
          <Text style={styles.title}>About</Text>
          <View style={styles.titleRule} />
        </View>

        {/* these are the button rows */}
        <View style={styles.row}>
          <PillButton label="Credits" />
          <PillButton label="About Team" />
        </View>

        {/* return arrow */}
        <Sound_clicks style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../../assets/returnarrow.png')} style={styles.icon} />
        </Sound_clicks>
      </View>

        {/* overlays  */}
      {activeOverlay === 'Credits' && (
        <View style={styles.overlay}>
          <View style={styles.overlayPanel}>
            <Text style={styles.overlayTitle}>Credits</Text>
            <ScrollView style={styles.creditsScroll}>
                <Text style={styles.overlayBody}>
                <Text style={{ fontWeight: 'bold' }}>Lead Developer</Text> 
                {'\n'}
                Fulgencio, John Hendrick{'\n'}
                {'\n'}
                <Text style={{ fontWeight: 'bold' }}>Game Design</Text>
                {'\n'}
                Sulla, Sylvia Heart{'\n'}
                Arellano, Janell Ashtene R.{'\n'}
                {'\n'}
                <Text style={{ fontWeight: 'bold' }}>Programmer</Text>
                {'\n'}
                Arellano, Janell Ashtene {'\n'}
                Catapang, Maureign Anne Christyanna M.{'\n'}
                Solis, Markuz Andre Merek R.{'\n'}
                Sulla, Sylvia Heart L.{'\n'}
                {'\n'}
                <Text style={{ fontWeight: 'bold' }}>Scriptwriter</Text>
                {'\n'}
                Arellano, Janell Ashtene {'\n'}
                Catapang, Maureign Anne Christyanna M.{'\n'}
                Solis, Markuz Andre Merek R.{'\n'}
                Sulla, Sylvia Heart L.{'\n'}
                {'\n'}
                <Text style={{ fontWeight: 'bold' }}>SFX/BGM</Text>
                {'\n'}
                Solis, Markuz Andre Merek R.{'\n'}
                </Text>


                
            </ScrollView>

            <Sound_clicks style={styles.overlayClose} onPress={() => setActiveOverlay(null)}>
              <Text style={styles.overlayCloseText}>Close</Text>
            </Sound_clicks>
          </View>
        </View>
      )}

      {activeOverlay === 'AboutTeam' && (
        <View style={styles.overlay}>
          <View style={styles.overlayPanel}>
            <Text style={styles.overlayTitle}>About the Team</Text>
            <Text style={styles.overlayBody}>
              We're a Team 67 sikibidi a group of students who are shows interest on creating 
              a Philippine History game that is tied to spanish colonization, The team created
              a novel like game to introduce it to people who are interest on history based games.
            </Text>
            <Sound_clicks style={styles.overlayClose} onPress={() => setActiveOverlay(null)}>
              <Text style={styles.overlayCloseText}>Close</Text>
            </Sound_clicks>
          </View>
        </View>
      )}
    </ImageBackground>
  );
}



export default About_screen;