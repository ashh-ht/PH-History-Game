import React, { useState } from 'react';
import { BackHandler, View, ImageBackground, Image, StyleSheet } from 'react-native';
import Sound_clicks from '../../Components/Sound_clicks';

function MainMenuScreen({ navigation }) {
  const [selectedButton, setSelectedButton] = useState(null);

  const menuButtons = [
    {
      id: 'newGame',
      white: require('../../Menu Images/New Game White.png'),
      gold: require('../../Menu Images/New Game Gold.png'),
      screen: 'NewGameConfirm',
    },
    {
      id: 'continue',
      white: require('../../Menu Images/Continue White.png'),
      gold: require('../../Menu Images/Continue Gold.png'),
      screen: 'PartSelect',
    },
    {
      id: 'settings',
      white: require('../../Menu Images/Settings White.png'),
      gold: require('../../Menu Images/Settings Gold.png'),
      screen: 'Second',
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
              navigation.navigate(button.screen);
            }}
          >
            <Image
              source={
                selectedButton === button.id
                  ? button.gold
                  : button.white
              }
              style={styles.menuButton}
              resizeMode="contain"
            />
          </Sound_clicks>
        ))}

        <Sound_clicks
          onPress={() => {
            setSelectedButton('exit');
            BackHandler.exitApp();
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
