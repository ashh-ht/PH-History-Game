import { useRef, useState } from 'react';
import { ImageBackground, Image, PanResponder, StyleSheet, Text, View } from 'react-native';
import Sound_clicks from '../../Components/Sound_clicks';
import { useDisplaySettings, MIN_BOX_OPACITY } from './DisplaySetting';


function Option({label, selected, onPress}){
    return(

        // THE DIAMOND THINGY
        <Sound_clicks onPress={onPress} style={styles.option}>
          <View style ={styles.diamond}>
            {selected && <Text style= {styles.check}>*</Text>}
          </View>
        <Text style={styles.optionText}>{label}</Text>
        </Sound_clicks>
    );
}

const HANDLE = 26;

// the box function don't touch unless needed
function OpacitySlider({ value, onChange }) {
  const [width, setWidth] = useState(0);
 
  const widthRef = useRef(0);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
 
  const setFromTouch = (locationX) => {
    const usable = widthRef.current - HANDLE;
    if (usable <= 0) return;
    const f = Math.min(1, Math.max(0, (locationX - HANDLE / 2) / usable));
    onChangeRef.current(MIN_BOX_OPACITY + f * (1 - MIN_BOX_OPACITY));
  };
  
 
  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: (e) => setFromTouch(e.nativeEvent.locationX),
      onPanResponderMove: (e) => setFromTouch(e.nativeEvent.locationX),
    })
  ).current;
 
  const fraction = (value - MIN_BOX_OPACITY) / (1 - MIN_BOX_OPACITY);
  const handleLeft = fraction * Math.max(0, width - HANDLE);
 
  return (
    <View
      style={styles.sliderTouchArea}
      onLayout={(e) => {
        widthRef.current = e.nativeEvent.layout.width;
        setWidth(e.nativeEvent.layout.width);
      }}
      {...pan.panHandlers}
    >
      {/* pointerEvents="none" keeps locationX relative to the touch area */}
      <View style={styles.sliderTrack} pointerEvents="none" />
      <View
        style={[styles.sliderFill, { width: handleLeft + HANDLE / 2 }]}
        pointerEvents="none"
      />
      <View style={[styles.handleWrap, { left: handleLeft }]} pointerEvents="none">
        <Text style={styles.percent}>{Math.round(value * 100)}%</Text>
        <View style={styles.handle} />
      </View>
    </View>
  );
}
 
// ---------------------------------------------------
// Screen
// ---------------------------------------------------
function DisplayScreen({ navigation }) {
  const { fontSize, setFontSize, boxOpacity, setBoxOpacity } = useDisplaySettings();
 
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
        <View style={styles.titleRow}>
          <View style={styles.titleLine} />
          <Text style={styles.title}>Display</Text>
          <View style={styles.titleLine} />
        </View>
 
        <View style={styles.body}>
          {/* Left: Font Size */}
          <View style={styles.leftColumn}>
            <Text style={styles.heading}>Font Size</Text>
            {['Small', 'Medium', 'Large'].map((size) => (
              <Option
                key={size}
                label={size}
                selected={fontSize === size}
                onPress={() => setFontSize(size)}
              />
            ))}
          </View>
 
          <View style={styles.verticalDivider} />
 
          {/* Right: Dialogue Box Opacity */}
          <View style={styles.rightColumn}>
            <Text style={styles.heading}>Dialogue Box Opacity</Text>
            <OpacitySlider value={boxOpacity} onChange={setBoxOpacity} />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
 
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center' 
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
 
  panel: {
    backgroundColor: '#FFF2CB',
    borderRadius: 15,
    paddingVertical: 18,
    paddingHorizontal: 24,
    width: '75%',
  },
 
  // title of the screen
  titleRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 12, 
    marginBottom: 14 
  },

  titleLine: { 
    height: 1, 
    width: 70,
     backgroundColor: '#C9A46B' 
    },

  title: { 
    fontSize: 22 
  },
 
  body: { flexDirection: 'row', alignItems: 'stretch' },
 
  leftColumn: {
     gap: 8, 
     paddingRight: 24 
    },

  verticalDivider: {
     width: 1.5, 
     backgroundColor: '#C9A46B'
     },

  rightColumn: { 
    flex: 1, 
    paddingLeft: 24 
  },
 
  heading: { 
    fontSize: 20,
     marginBottom: 6 
    },
 
  // Options
  option: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 10 
  },

  optionText: { 
    fontSize: 14 
  },
  diamond: {
    width: 20,
    height: 20,
    margin:10,
    backgroundColor: '#C9A46B',
    transform: [{ rotate: '45deg' }],
    alignItems: 'center',
    justifyContent: 'center',
  },


  check: { 
    color: '#fff', 
    fontSize: 12, 
    transform: [{ rotate: '-45deg' }] 
  },
 
  // Slider
  sliderTouchArea: { 
    height: 56, 
    justifyContent: 'center', 
    marginTop: 40 
  },

  sliderTrack: {
    position: 'absolute',
    left: HANDLE / 2,
    right: HANDLE / 2,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#E3CFA6',
  },
  
  sliderFill: {
    position: 'absolute',
    left: HANDLE / 2,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#A97F5F',

  },
  handleWrap: { 
    position: 'absolute', 
    alignItems: 'center', 
    width: HANDLE },

  percent: { 
    position: 'absolute', 
    top: -18, 
    fontSize: 11, 
    color: '#6B5A45',
     width: 40, 
     textAlign: 'center' },

  handle: {
    width: HANDLE * 0.7,
    height: HANDLE * 0.7,
    backgroundColor: '#FFF2CB',
    borderWidth: 2,
    borderColor: '#C9A46B',
    transform: [{ rotate: '45deg' }],
  },
});
 
export default DisplayScreen;