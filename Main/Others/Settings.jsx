import { useState } from 'react';
import { Pressable, Image, StyleSheet, Text, View } from 'react-native';
import Sound_clicks from '../../Components/Sound_clicks';

function Setting_screen({ navigation }) {
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const settingItems = ['Saves', 'Educational', 'Gameplay', 'About', 'Audio', 'Exit', 'Display'];

  const handlePress = (label) => {
    if (label === 'Audio') {
      navigation.navigate('AudioScreen');
    } else if (label === 'Saves') {
      navigation.navigate('SaveScreen');
    } else if (label === 'Educational') {
      navigation.navigate('Educational');
    } else if (label === 'Gameplay') {
      navigation.navigate('GameplayScreen');
    } else if (label === 'About') {
      navigation.navigate('About');
    } else if (label === 'Display') {
      navigation.navigate('DisplayScreen');
    } else if (label === 'Exit') {
      setShowExitConfirm(true);
    }
  };

  return (
    <View style={[styles.container, styles.overlay]}>
      <View style={styles.topIcon}>
        <Sound_clicks onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/return.png')} style={styles.icon} />
        </Sound_clicks>
        <Sound_clicks onPress={() => navigation.navigate('Journal')}>
          <Image source={require('../../assets/Journal_page.png')} style={styles.icon} />
        </Sound_clicks>
      </View>

      <View style={styles.settingPanel}>
        <View style={styles.grid}>
          {settingItems.map((label) => (
            <Sound_clicks
              key={label}
              style={styles.cyclinderbutton}
              onPress={() => handlePress(label)}
            >
              <Image source={require('../../assets/pillbutton.png')} style={styles.imagepillbutton} />
              <Text style={styles.cylindertexts}>{label}</Text>
            </Sound_clicks>
          ))}
        </View>
      </View>

      {showExitConfirm && (
        <View style={styles.confirmOverlay}>
          <View style={styles.confirmPanel}>
            <Text style={styles.confirmText}>Do you want to exit the game?</Text>

            <View style={styles.confirmButtonsRow}>
              <Sound_clicks
                style={styles.confirmButton}
                onPress={() => setShowExitConfirm(false)}
              >
                <Image
                  source={require('../../assets/pillbutton.png')}
                  style={styles.confirmButtonImage}
                  resizeMode="stretch"
                />
                <Text style={styles.cylindertexts}>No</Text>
              </Sound_clicks>

              <Sound_clicks
                style={styles.confirmButton}
                onPress={() => navigation.navigate('Home')}
              >
                <Image
                  source={require('../../assets/pillbutton.png')}
                  style={styles.confirmButtonImage}
                  resizeMode="stretch"
                />
                <Text style={styles.cylindertexts}>Yes</Text>
              </Sound_clicks>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // add this — the dim layer that lets the game show through
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },
  topIcon: {
    position: 'absolute',
    top: 12,
    left: 20,
    flexDirection: 'row',
    gap: 15
  },
  icon: {
    width: 40,
    height: 40
  },
  settingPanel: {
    backgroundColor: '#FFF2CB',
    borderRadius: 15,
    padding: 30,
    height: 'auto',
    width: '75%',
    alignSelf: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 45
  },
  cyclinderbutton: {
    width: '46%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imagepillbutton: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'space-between'
  },
  cylindertexts: {
    fontSize: 16,
    fontWeight: '500'
  },
  confirmOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
    elevation: 10,
  },
  confirmPanel: {
    backgroundColor: '#FFF2CB',
    borderRadius: 15,
    padding: 30,
    width: '50%',
    alignItems: 'center',
  },
  confirmText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  confirmButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
  },
  confirmButton: {
    width: 110,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
});

export default Setting_screen;