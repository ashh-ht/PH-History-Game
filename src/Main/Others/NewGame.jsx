import { ImageBackground, View, Pressable, Image, StyleSheet } from 'react-native';
import { useGameProgress } from '../../GameProgress';
import Sound_clicks from '../../Components/Sound_clicks';

function NewGameConfirmScreen({ navigation }) {
  const { setPart } = useGameProgress();

  return (
    <ImageBackground
      source={require('../../../assets/Newgame/NewGame_bg.png')}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.list}>
        <Sound_clicks
          onPress={() => {
            setPart(1);
            navigation.navigate('Home');
          }}
        >
          <Image source={require('../../../assets/Newgame/NewGame_Yes.png')} style={styles.button} />
        </Sound_clicks>

        <Sound_clicks onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/Newgame/NewGame_No.png')} style={styles.button} />
        </Sound_clicks>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: '15%',
    gap: 16
  },

  button: {
    width: 200,
    height: 70,
    top: '20%',
    resizeMode: 'contain' },
});

export default NewGameConfirmScreen;