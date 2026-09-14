import { View, Pressable, Image, ImageBackground, Animated } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import Sound_clicks from '../Components/Sound_clicks.jsx';
import Style from './StyleStartup.jsx';

export default function App({ navigation }) {
  const [screen, setScreen] = useState('Intro');

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen('Done');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (screen === 'Done') {
    return <Disclaimer navigation={navigation} />;
  }

  return (
    <View style={Style.blackScreen}>
    </View>
  );
}

function Disclaimer({ navigation }) {
  const [screen, setScreen] = useState('Intro');

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen('Done');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (screen === 'Done') {
    return <Logo navigation={navigation} />;
  }

  return (
    <ImageBackground
      source={require('../assets/Disclaimer.png')}
      style={Style.background}
      resizeMode="cover"
    >
    </ImageBackground>
  );
}

function Logo({ navigation }) {
  const [screen, setScreen] = useState('Intro');
  const scale = useRef(new Animated.Value(0)).current;
  const fade = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 10,
      tension: 80,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(fade, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start(() => {
        setScreen('Done');
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (screen === 'Done') {
    return <StartGame navigation={navigation} />;
  }

  return (
    <View style={Style.blackScreen}>
      <Animated.Image
        source={require('../assets/LoadingLogo.png')}
        style={[Style.logobg, { opacity: fade, transform: [{ scale }] }]}
      />
    </View>
  );
}

function StartGame({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/StartupScreen.png')}
      style={Style.background}
      resizeMode="cover"
    >
      <Sound_clicks 
      onPress={() => navigation.navigate('Home')}>
        <Image source={require('../assets/StartupButton.png')} style={Style.button} />
      </Sound_clicks>
    </ImageBackground>
  );
}