import { BackHandler, View, ImageBackground, Pressable, Image, StyleSheet } from 'react-native';
import Sound_clicks from '../Components/Sound_clicks';

function MainMenuScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/mainmenu/Menu_bg.png')}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.btnList}>
        <Sound_clicks 
        onPress={() => navigation.navigate('NewGameConfirm')}>
        <Image source={require('../assets/mainmenu/Menu_NewGame.png')}style={styles.button} 
          />
        </Sound_clicks>

        <Sound_clicks 
        onPress={() => navigation.navigate('ChapterSelect')}>
          <Image source={require('../assets/mainmenu/Menu_Continue.png')} style={styles.button} />
        </Sound_clicks>

        <Sound_clicks 
        onPress={() => navigation.navigate('Second')}>
          <Image source={require('../assets/mainmenu/Menu_Settings.png')} style={styles.button} />
        </Sound_clicks>

        <Sound_clicks
        onPress={() => BackHandler.exitApp()}>
          <Image source={require('../assets/mainmenu/Menu_Exit.png')} style={styles.button} />
        </Sound_clicks>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { 
    flex: 1 
    
  },
  btnList: { 
    flex: 1, 
    justifyContent: 'center', 
    top: '21%',
    alignItems: 'center', 
    gap: 14 
},
  button: { 
    width: 200, 
    height: 40, 
    resizeMode:'contain'
},
});

export default MainMenuScreen;