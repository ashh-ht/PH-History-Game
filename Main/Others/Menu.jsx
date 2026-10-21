import React, { useState, useCallback } from 'react';
import {
  BackHandler,
  View,
  ImageBackground,
  Image,
  StyleSheet,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Sound_clicks from '../../Components/Sound_clicks';
import { useGameProgress } from '../../GameProgress';
import { getCheckpoints } from '../Others/saveProgress'; 

function MainMenuScreen({ navigation }) {
  const [selectedButton, setSelectedButton] = useState(null);

  useFocusEffect(
    useCallback(() => {
      setSelectedButton(null);
    }, [])
  );

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

  const handleMenuPress = (button) => {
    setSelectedButton(button.id);
    navigation.navigate(button.screen);
  };

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
            onPress={() => handleMenuPress(button)}
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
    left: '3%', // actual left
    top: '37%', // pababa
    alignItems: 'flex-start',

    // Note: keep the spacing even without spreading buttons too far apart.
    gap: 1,
  },

  menuButton: {
    // Note: increase the button size while preserving image proportions.
    width: 260,
    height: 58,
  },
});

export default MainMenuScreen;