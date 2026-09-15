import { ImageBackground, View, Image, StyleSheet } from 'react-native';
import Sound_clicks from '../../Components/Sound_clicks';

function chapterselectionScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../../assets/chapselection/Chapters_bg.png')}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.list}>
        <Sound_clicks onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../../assets/return.png')} style={styles.backIcon} />
        </Sound_clicks>

        <Sound_clicks onPress={() => navigation.navigate('PartSelect')}>
          <Image source={require('../../assets/chapselection/Chapter1_btn.png')} style={styles.button} />
        </Sound_clicks>

        <Image source={require('../../assets/chapselection/Chapter2_btn.png')} style={styles.button} />
        <Image source={require('../../assets/chapselection/Chapter3_btn.png')} style={styles.button} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  list: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 },
  backButton: { position: 'absolute', top: 1, left: 5, width: 40, height: 30, zIndex: 10 },
  button: { top: 80, width: 360, height: 50, resizeMode: 'contain' },
});

export default chapterselectionScreen;