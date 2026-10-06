import { ImageBackground, Image, StyleSheet, Text, View } from 'react-native';
import Sound_clicks from '../../Components/Sound_clicks';
import { useGameplaySettings } from './GameplaySetting';


function Option({ label, selected, onPress, disabled }) {
  return (
    <Sound_clicks
      onPress={disabled ? undefined : onPress}
      style={[styles.option, disabled && styles.optionDisabled]}
    >
      <View style={styles.diamond}>
        {selected && <Text style={styles.check}>✓</Text>}
      </View>
      <Text style={styles.optionText}>{label}</Text>
    </Sound_clicks>
  );
}

function GameplayScreen({ navigation }) {
  const {
    textSpeed, setTextSpeed,
    autoPlay, setAutoPlay,
    autoDelay, setAutoDelay,
  } = useGameplaySettings();

  const autoOff = !autoPlay;

  return (
    <ImageBackground source={require('../../assets/Settingbg.png')} style={styles.container}>
      {/* Top-left icons */}
      <View style={styles.topIcon}>
        <Sound_clicks onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/return.png')} style={styles.icon} />
        </Sound_clicks>
        <Sound_clicks onPress={() => navigation.navigate('Journal')}>
          <Image source={require('../../assets/Journal_parts/Journal_page.png')} style={styles.icon} />
        </Sound_clicks>
      </View>

      {/* Panel */}
      <View style={styles.panel}>
        <Text style={styles.title}>Gameplay</Text>

        <View style={styles.columns}>
          {/* Left column: Text Speed */}
          <View style={styles.column}>
            <Text style={styles.heading}>Text Speed</Text>
            {['Slow', 'Normal', 'Fast'].map((speed) => (
              <Option
                key={speed}
                label={speed}
                selected={textSpeed === speed}
                onPress={() => setTextSpeed(speed)}
              />
            ))}
          </View>

          {/* Right column: Auto Play Mode + Plays After */}
          <View style={styles.column}>
            <Text style={styles.heading}>Auto Play Mode</Text>
            <Option label="On" selected={autoPlay} onPress={() => setAutoPlay(true)} />
            <Option label="Off" selected={!autoPlay} onPress={() => setAutoPlay(false)} />

            <View style={styles.divider} />

            <Text style={styles.subheading}>Plays After:</Text>
            {[5, 10, 20].map((sec) => (
              <Option
                key={sec}
                label={`${sec} Seconds`}
                selected={autoDelay === sec}
                disabled={autoOff}
                onPress={() => setAutoDelay(sec)}
              />
            ))}
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  topIcon: { 
    position: 'absolute', 
    top: 12, 
    left: 20, 
    flexDirection: 
    'row', 
    gap: 15 
},

  icon: { 
    width: 40, 
    height: 40 
},

  panel: {
    backgroundColor: '#FFF2CB',
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 24,
    width: '70%',
  },
  title: { 
    fontSize: 22, 
    textAlign: 'center', 
    marginBottom: 12 
},

  columns: { 
    flexDirection: 'row', 
    justifyContent: 'space-around' 
},
  column: { 
    gap: 12
},

  heading: { 
    fontSize: 20, 
    marginBottom: 4 
},
  subheading: { 
    fontSize: 15, 
    marginBottom: 2 
},

  divider: { 
    height: 1, 
    backgroundColor: '#D9B98A', 
    marginVertical: 8 
},

  option: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  optionDisabled: { opacity: 0.4 },
  optionText: { fontSize: 14 },

  diamond: {
    width: 20,
    height: 20,
    backgroundColor: '#C9A46B',
    transform: [{ rotate: '45deg' }],
    alignItems: 'center',
    justifyContent: 'center',
    gap:50,
  },

  check: { 
    color: '#fff', 
    fontSize: 12,
    transform: [{ rotate: '-45deg' }] },
});

export default GameplayScreen;