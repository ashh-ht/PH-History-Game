import { ImageBackground, Pressable, Image, StyleSheet, Text, View } from "react-native";
import Sound_clicks from '../Components/Sound_clicks';
function Setting_screen({ navigation }) {
  const settingItems = [
    'Saves', 'Educational', 'Gameplay', 'About', 'Audio', 'Exit', 'Display'
  ];

  const handlePress = (label) => {
    if (label === 'Audio') {
      navigation.navigate('AudioScreen');
    } else if (label === 'Exit') {
      navigation.goBack();
    }
  };



  return (
    <ImageBackground
      source={require('../assets/Settingbg.png')}
      style={styles.container}
    >
      <View style={styles.topIcon}>
        <Sound_clicks 
        onPress={() => navigation.goBack()}>
          <Image source={require('../assets/return.png')} style={styles.icon} />
        </Sound_clicks>
        <Sound_clicks onPress={() => navigation.navigate('Journal')}>
          <Image source={require('../assets/Journal_page.png')} style={styles.icon} />
        </Sound_clicks>
      </View>

      {/* for panel board  */}
      <View style={styles.settingPanel}>
        <View style={styles.grid}>
          {settingItems.map((label) => (
            <Sound_clicks
              key={label}
              style={styles.cyclinderbutton}
              onPress={() => handlePress(label)}
            >
              <Image
                source={require('../assets/pillbutton.png')}
                style={styles.imagepillbutton}
              />
              <Text style={styles.cylindertexts}>{label}</Text>
            </Sound_clicks>
          ))}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  topIcon: {
    position: 'absolute',
    top: 12,
    left: 20,
    flexDirection: 'row',
    gap: 15,
  },
  icon: {
    width: 40,
    height: 40,
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
    gap: 45,
  },
  cyclinderbutton: {
    width: '46%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagepillbutton: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'space-between',
  },
  cylindertexts: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Setting_screen;