import { ImageBackground, View, Image, StyleSheet } from 'react-native';
import { useGameProgress } from '../../GameProgress';
import Sound_clicks from '../../Components/Sound_clicks';
import { restartEverything } from '../Others/saveProgress';

function NewGameConfirmScreen({ navigation }) {
  const { setChapter, setPart, setScene, setInGame } = useGameProgress();

  const restart = async () => {
    await restartEverything();

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
        <Sound_clicks onPress={restart}>
          <Image
            source={require('../../assets/New Game/Restart.png')}
            style={styles.button}
            resizeMode="contain"
          />
        </Sound_clicks>

        <Sound_clicks onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/New Game/Cancel.png')}
            style={styles.button}
            resizeMode="contain"
          />
        </Sound_clicks>
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