import { useState } from 'react';
import { ImageBackground, ScrollView, View, Image, StyleSheet } from 'react-native';
import { useGameProgress } from '../../GameProgress';
import Sound_clicks from '../../Components/Sound_clicks';

const PART_ROUTES = ['Part1', 'Part2', 'Part3', 'Part4', 'Part5', 'Part6', 'Part7', 'Part8'];

const PLAY_IMAGES = [
  require('../../../assets/chap1/Part1_btn_play.png'),
  require('../../../assets/chap1/Part2_btn_play.png'),
  require('../../../assets/chap1/Part3_btn_play.png'),
  require('../../../assets/chap1/Part4_btn_play.png'),
  require('../../../assets/chap1/Part5_btn_play.png'),
  require('../../../assets/chap1/Part6_btn_play.png'),
  require('../../../assets/chap1/Part7_btn_play.png'),
  require('../../../assets/chap1/Part8_btn_play.png'),
];

const LOCK_IMAGES = [
  require('../../../assets/chap1/Part1_btn_lock.png'),
  require('../../../assets/chap1/Part2_btn_lock.png'),
  require('../../../assets/chap1/Part3_btn_lock.png'),
  require('../../../assets/chap1/Part4_btn_lock.png'),
  require('../../../assets/chap1/Part5_btn_lock.png'),
  require('../../../assets/chap1/Part6_btn_lock.png'),
  require('../../../assets/chap1/Part7_btn_lock.png'),
  require('../../../assets/chap1/Part8_btn_lock.png'),
];

const BUTTON_HEIGHT = 60;
const BUTTON_GAP = 12;
const VISIBLE_COUNT = 4;
const VIEWPORT_HEIGHT = BUTTON_HEIGHT * VISIBLE_COUNT + BUTTON_GAP * (VISIBLE_COUNT - 1);

function chapter1selection({ navigation }) {
  const { part } = useGameProgress();
  const [showBackBtn, setShowBackBtn] = useState(true);

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    setShowBackBtn(scrollY < 50);
  };

  return (
    <ImageBackground
      source={require('../../../assets/Parts_bg.png')}
      resizeMode="cover"
      style={styles.background}
    >
      {showBackBtn && (
        <Sound_clicks style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/return.png')} style={styles.backIcon} />
        </Sound_clicks>
      )}

      <View style={styles.banner} />

      <ScrollView
        style={styles.viewport}
        contentContainerStyle={styles.list}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {PLAY_IMAGES.map((image, i) => (
          <Sound_clicks
            key={i}
            onPress={() => {
              if (i < part) navigation.navigate(PART_ROUTES[i]);
            }}
          >
            <Image source={i < part ? image : LOCK_IMAGES[i]} style={styles.button} />
          </Sound_clicks>
        ))}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
      flex: 1
  },

  backButton: {
      position: 'absolute',
      top: 12,
      left: 20,
      zIndex: 10
      },

  backIcon: {
      width: 40,
      height: 40
      },

  banner: {
      height: 180
      },

  viewport: {
      maxHeight: VIEWPORT_HEIGHT,
      alignSelf: 'center'
      },

 list: { alignItems: 'center',
     gap: BUTTON_GAP
     },

  button: {
      width: 360,
      height: BUTTON_HEIGHT,
      resizeMode: 'contain'
      },
});

export default chapter1selection;