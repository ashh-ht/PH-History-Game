import { useRef } from 'react';
import {
  Animated,
  ImageBackground,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import { useGameProgress } from '../../GameProgress';
import Sound_clicks from '../../Components/Sound_clicks';
import { clearCheckpoints } from './saveProgress'; // 1. Added missing import

// Note: spring animation for le buttons.
function AnimatedButton({ onPress, image }) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.spring(scale, {
        toValue: 0.94,
        speed: 35,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        speed: 25,
        bounciness: 7,
        useNativeDriver: true,
      }),
    ]).start();

    onPress();
  };

  return (
    <Sound_clicks onPress={handlePress}>
      <Animated.View
        style={{
          transform: [{ scale }],
        }}
      >
        <Image
          source={image}
          style={styles.button}
          resizeMode="contain"
        />
      </Animated.View>
    </Sound_clicks>
  );
}

function NewGameConfirmScreen({ navigation }) {
  const { setChapter, setPart, setScene, setInGame } = useGameProgress();

  const restart = async () => {
    await clearCheckpoints(); // 2. Changed from restartEverything to clearCheckpoints

    setChapter(1);
    setPart(1);
    setScene(0);
    setInGame(false);

    navigation.reset({
      index: 0,
      routes: [{ name: 'Part1', params: {startScene:0} }],
    });
  };

  return (
    <ImageBackground
      source={require('../../Background Images/Intro/Restart Journey.png')}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.list}>
        <AnimatedButton
          image={require('../../assets/New Game/Restart.png')}
          onPress={restart} // 3. Changed to call the restart function
        />

        <AnimatedButton
          image={require('../../assets/New Game/Cancel.png')}
          onPress={() => navigation.goBack()}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 45,
    paddingTop: 115,
  },

  button: {
    width: 245,
    height: 85,
  },
});

export default NewGameConfirmScreen;