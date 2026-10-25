import {
  View,
  Image,
  ImageBackground,
  Animated,
} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import Sound_clicks from '../../Components/Sound_clicks';
import Style from '../../Styles/Others/StyleStartup';

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

  return <View style={Style.blackScreen} />;
}

// Disclaimer function, medyo hinabaan ko since it was too quick back then.
function Disclaimer({ navigation }) {
  const [screen, setScreen] = useState('Intro');

  useEffect(() => {
    // Note: give players more time to read the warning.
    const timer = setTimeout(() => {
      setScreen('Done');
    }, 2000); // from 3 to 8 secs now

    return () => clearTimeout(timer);
  }, []);

  if (screen === 'Done') {
    return <Logo navigation={navigation} />;
  }

  return (
    <ImageBackground
      source={require('../../assets/Disclaimer.png')}
      style={Style.background}
      resizeMode="cover"
    />
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

    // Note: wait 5 seconds before fading out.
    const timer = setTimeout(() => {
      Animated.timing(fade, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          setScreen('Done');
        }
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [fade, scale]);

  if (screen === 'Done') {
    return <StartGame navigation={navigation} />;
  }

  return (
    <View style={Style.blackScreen}>
      <Animated.Image
        source={require('../../assets/LoadingLogo.png')}
        style={[
          Style.logobg,
          {
            opacity: fade,
            transform: [{ scale }],
          },
        ]}
        resizeMode="contain"
      />
    </View>
  );
}

function AnimatedButtonImage({ image, onPress }) {
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
    ]).start(({ finished }) => {
      if (finished) {
        onPress();
      }
    });
  };

  return (
    <Sound_clicks onPress={handlePress}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <Image
          source={image}
          style={Style.button}
          resizeMode="contain"
        />
      </Animated.View>
    </Sound_clicks>
  );
}

function StartGame({ navigation }) {
  return (
    <ImageBackground
      source={require('../../assets/StartupScreen.png')}
      style={Style.background}
      resizeMode="cover"
    >
      <AnimatedButtonImage
        image={require('../../assets/StartupButton.png')}
        onPress={() => navigation.navigate('Home')}
      />
    </ImageBackground>
  );
}

