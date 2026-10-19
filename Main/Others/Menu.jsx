import React, { useState, useCallback } from 'react';
import { View, ImageBackground, Image, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Sound_clicks from '../../Components/Sound_clicks';
import { useAudio } from '../../Audiostore';
import { useGameProgress } from '../../GameProgress';
import { getCheckpoints } from '../Others/saveProgress'; 

function MainMenuScreen({ navigation }) {
  const [selectedButton, setSelectedButton] = useState(null);
  const [hasSave, setHasSave] = useState(false);
  const { Quitapp, playMusic } = useAudio();
  const { setChapter, setPart, setScene, setInGame } = useGameProgress();


  useFocusEffect(
    useCallback(() => {
      getCheckpoints().then((all) => setHasSave(all.length > 0));
      playMusic('somber');
    }, [])
  );

  const startFresh = () => {
    setChapter(1);
    setPart(1);
    setScene(0);
    setInGame(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Part1', params: { startScene: 0 } }],
    });
  };

  const menuButtons = [
    {
      id: 'newGame',
      white: require('../../Menu Images/New Game White.png'),
      gold: require('../../Menu Images/New Game Gold.png'),
      onPress: () => (hasSave ? navigation.navigate('NewGameConfirm') : startFresh()),
    },
    // Continue only pops if nakalaro na yung player like the title 
    ...(hasSave
      ? [{
          id: 'continue',
          white: require('../../Menu Images/Continue White.png'),
          gold: require('../../Menu Images/Continue Gold.png'),
          onPress: () => navigation.navigate('PartSelect'),
        }]
      : []),
    {
      id: 'settings',
      white: require('../../Menu Images/Settings White.png'),
      gold: require('../../Menu Images/Settings Gold.png'),
      onPress: () => navigation.navigate('Second'),
    },
  ];

  return (
    <ImageBackground
      source={require('../../Menu Images/Main Menu.png')}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.menuContainer}>
        {menuButtons.map((button) => (
          <Sound_clicks
            key={button.id}
            onPress={() => {
              setSelectedButton(button.id);
              button.onPress();
            }}
          >
            <Image
              source={selectedButton === button.id ? button.gold : button.white}
              style={styles.menuButton}
              resizeMode="contain"
            />
          </Sound_clicks>
        ))}

        <Sound_clicks
          onPress={() => {
            setSelectedButton('exit');
            setTimeout(Quitapp, 150);
          }}
        >
          <Image
            source={require('../../Menu Images/Exit White.png')}
            style={styles.menuButton}
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

  menuContainer: {
    position: 'absolute',
    left: '8%',
    top: '43%',
    alignItems: 'flex-start',
    gap: 14,
  },

  menuButton: {
    width: 200,
    height: 40,
  },
});

export default MainMenuScreen;
