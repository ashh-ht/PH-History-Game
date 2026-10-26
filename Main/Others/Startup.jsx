
import {
  View,
  Image,
  ImageBackground,
  Animated,
  Easing,
  StatusBar,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useEffect, useRef, useState } from 'react';
import Sound_clicks from '../../Components/Sound_clicks';
import Style from '../../Styles/Others/StyleStartup';

export default function App({ navigation }) {
  const [screen, setScreen] = useState('Disclaimer');

  return (
    <View style={styles.root}>
      <StatusBar hidden />

      {screen === 'Disclaimer' && (
        <Disclaimer onComplete={() => setScreen('Intro')} />
      )}

      {screen === 'Intro' && (
        <Intro onComplete={() => setScreen('Startup')} />
      )}

      {screen === 'Startup' && (
        <StartGame navigation={navigation} />
      )}
    </View>
  );
}

function Disclaimer({ onComplete }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const finished = useRef(false);

  useEffect(() => {
    const fadeIn = Animated.timing(opacity, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    });

    fadeIn.start();

    const timer = setTimeout(() => {
      finish();
    }, 7000);

    function finish() {
      if (finished.current) return;
      finished.current = true;
      clearTimeout(timer);

      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start(({ finished: animationFinished }) => {
        if (animationFinished) onComplete();
      });
    }

    skipRef.current = finish;

    return () => {
      clearTimeout(timer);
      fadeIn.stop();
      skipRef.current = null;
    };
  }, [onComplete, opacity]);

  return (
    <Pressable
      style={styles.fullScreen}
      onPress={() => skipRef.current?.()}
    >
      <Animated.View style={[styles.fullScreen, { opacity }]}>
        <ImageBackground
          source={require('../../assets/Disclaimer.png')}
          style={Style.background}
          resizeMode="cover"
          pointerEvents="none"
        />
      </Animated.View>
    </Pressable>
  );
}


const skipRef = { current: null };
function Intro({ onComplete }) {
  const teamOpacity = useRef(new Animated.Value(0)).current;
  const teamScale = useRef(new Animated.Value(0.15)).current;
  const teamY = useRef(new Animated.Value(35)).current;
  const teamRotation = useRef(new Animated.Value(0)).current;

  const presentsOpacity = useRef(new Animated.Value(0)).current;
  const presentsScale = useRef(new Animated.Value(0.7)).current;
  const presentsY = useRef(new Animated.Value(18)).current;

  const teamExitScale = useRef(new Animated.Value(1)).current;
  const presentsExitScale = useRef(new Animated.Value(1)).current;
  const groupOpacity = useRef(new Animated.Value(1)).current;

  const pamanaOpacity = useRef(new Animated.Value(0)).current;
  const pamanaScale = useRef(new Animated.Value(0.12)).current;
  const pamanaRotation = useRef(new Animated.Value(-5)).current;
  const logoDarkness = useRef(new Animated.Value(0)).current;
  const whiteOpacity = useRef(new Animated.Value(0)).current;
  const blackOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.sequence([
      Animated.parallel([
        Animated.spring(teamScale, {
          toValue: 1,
          friction: 4,
          tension: 95,
          useNativeDriver: true,
        }),
        Animated.timing(teamOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.spring(teamY, {
          toValue: 0,
          friction: 5,
          tension: 80,
          useNativeDriver: true,
        }),
      ]),

      Animated.delay(450),
      Animated.parallel([
        Animated.spring(presentsScale, {
          toValue: 1,
          friction: 4,
          tension: 85,
          useNativeDriver: true,
        }),
        Animated.timing(presentsOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.spring(presentsY, {
          toValue: 0,
          friction: 6,
          tension: 70,
          useNativeDriver: true,
        }),
      ]),

      Animated.delay(1300),
      Animated.sequence([
        Animated.timing(teamRotation, {
          toValue: 1,
          duration: 65,
          useNativeDriver: true,
        }),
        Animated.timing(teamRotation, {
          toValue: -1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(teamRotation, {
          toValue: 0.7,
          duration: 85,
          useNativeDriver: true,
        }),
        Animated.timing(teamRotation, {
          toValue: -0.35,
          duration: 75,
          useNativeDriver: true,
        }),
        Animated.spring(teamRotation, {
          toValue: 0,
          friction: 5,
          tension: 100,
          useNativeDriver: true,
        }),
      ]),

      Animated.delay(180),
      Animated.parallel([
        Animated.timing(whiteOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(teamExitScale, {
          toValue: 0.12,
          duration: 350,
          easing: Easing.in(Easing.back(1.4)),
          useNativeDriver: true,
        }),
        Animated.timing(presentsExitScale, {
          toValue: 0.12,
          duration: 350,
          easing: Easing.in(Easing.back(1.4)),
          useNativeDriver: true,
        }),
        Animated.timing(groupOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(pamanaScale, {
          toValue: 1,
          friction: 4,
          tension: 70,
          useNativeDriver: true,
        }),
        Animated.timing(pamanaOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(pamanaRotation, {
          toValue: 0,
          friction: 6,
          tension: 75,
          useNativeDriver: true,
        }),
      ]),

      Animated.delay(1000),
      Animated.parallel([
        Animated.timing(pamanaScale, {
          toValue: 12,
          duration: 1500,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        }),

        Animated.sequence([
          Animated.delay(650),
          Animated.timing(logoDarkness, {
            toValue: 0.65,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),

        Animated.sequence([
          Animated.delay(800),
          Animated.timing(blackOpacity, {
            toValue: 1,
            duration: 650,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
      ]),
    ]);

    animation.start(({ finished }) => {
      if (finished) onComplete();
    });

    return () => animation.stop();
  }, [
    onComplete,
    teamOpacity,
    teamScale,
    teamY,
    teamRotation,
    presentsOpacity,
    presentsScale,
    presentsY,
    teamExitScale,
    presentsExitScale,
    groupOpacity,
    pamanaOpacity,
    pamanaScale,
    pamanaRotation,
    logoDarkness,
    whiteOpacity,
    blackOpacity,
  ]);

  const teamTilt = teamRotation.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-7deg', '7deg'],
  });

  const pamanaTilt = pamanaRotation.interpolate({
    inputRange: [-5, 0],
    outputRange: ['-5deg', '0deg'],
  });

  return (
    <View style={styles.introScreen}>
      {/* Team logo */}
      <Animated.View
        style={[
          styles.teamContainer,
          {
            opacity: Animated.multiply(teamOpacity, groupOpacity),
            transform: [
              { translateY: teamY },
              { scale: Animated.multiply(teamScale, teamExitScale) },
              { rotate: teamTilt },
            ],
          },
        ]}
      >
        <Image
          source={require('../../assets/Developmentteam.png')}
          style={styles.teamImage}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Presents — slightly smaller and lower */}
      <Animated.View
        style={[
          styles.presentsContainer,
          {
            opacity: Animated.multiply(presentsOpacity, groupOpacity),
            transform: [
              { translateY: presentsY },
              {
                scale: Animated.multiply(
                  presentsScale,
                  presentsExitScale
                ),
              },
            ],
          },
        ]}
      >
        <Image
          source={require('../../assets/Development_presents.png')}
          style={styles.presentsImage}
          resizeMode="contain"
        />
      </Animated.View>

      {/* White background behind the game logo */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.whiteLogoBackdrop,
          { opacity: whiteOpacity },
        ]}
      />

      {/* Pamana logo, larger than the development logo */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.pamanaContainer,
          {
            opacity: pamanaOpacity,
            transform: [
              { scale: pamanaScale },
              { rotate: pamanaTilt },
            ],
          },
        ]}
      >
        <Image
          source={require('../../assets/Pamanalogo.png')}
          style={styles.pamanaImage}
          resizeMode="contain"
        />

        {/* Darkens with the logo during the zoom */}
        <Animated.View
          style={[
            styles.logoDarkOverlay,
            { opacity: logoDarkness },
          ]}
        />
      </Animated.View>

      {/* Final smooth blackout */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.blackCover,
          { opacity: blackOpacity },
        ]}
      />
    </View>
  );
}

function StartGame({ navigation }) {
  const backgroundOpacity = useRef(new Animated.Value(0)).current;

  const sunOpacity = useRef(new Animated.Value(0)).current;
  const sunScale = useRef(new Animated.Value(0.8)).current;
  const sunY = useRef(new Animated.Value(-24)).current;

  const wordsOpacity = useRef(new Animated.Value(0)).current;
  const wordsScale = useRef(new Animated.Value(0.9)).current;
  const wordsY = useRef(new Animated.Value(20)).current;

  const float = useRef(new Animated.Value(0)).current;
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;

    const intro = Animated.sequence([
      Animated.timing(backgroundOpacity, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.spring(sunScale, {
          toValue: 1,
          friction: 5,
          tension: 55,
          useNativeDriver: true,
        }),
        Animated.spring(sunY, {
          toValue: 0,
          friction: 6,
          tension: 50,
          useNativeDriver: true,
        }),
        Animated.timing(sunOpacity, {
          toValue: 1,
          duration: 450,
          useNativeDriver: true,
        }),
      ]),

      Animated.delay(200),

      Animated.parallel([
        Animated.spring(wordsScale, {
          toValue: 1,
          friction: 6,
          tension: 55,
          useNativeDriver: true,
        }),
        Animated.spring(wordsY, {
          toValue: 0,
          friction: 7,
          tension: 50,
          useNativeDriver: true,
        }),
        Animated.timing(wordsOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]);

    intro.start();
    const floatLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(float, {
          toValue: 1,
          duration: 1800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(float, {
          toValue: 0,
          duration: 1800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    const timer = setTimeout(() => {
      if (mounted.current) floatLoop.start();
    }, 1700);

    return () => {
      mounted.current = false;
      clearTimeout(timer);
      intro.stop();
      floatLoop.stop();
    };
  }, [
    backgroundOpacity,
    sunOpacity,
    sunScale,
    sunY,
    wordsOpacity,
    wordsScale,
    wordsY,
    float,
  ]);

  const floatY = float.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -7],
  });

  return (
    <Animated.View
      style={[styles.startupScreen, { opacity: backgroundOpacity }]}
    >
      <ImageBackground
        source={require('../../assets/PAMANA_Bg.png')}
        style={Style.background}
        resizeMode="cover"
      >
        {/* Sun and words float together as one title group */}
        <Animated.View
          pointerEvents="none"
          style={[
            styles.titleGroup,
            { transform: [{ translateY: floatY }] },
          ]}
        >
          <Animated.Image
            source={require('../../assets/PAMANA_Sun.png')}
            resizeMode="contain"
            style={[
              styles.startupSun,
              {
                opacity: sunOpacity,
                transform: [
                  { translateY: sunY },
                  { scale: sunScale },
                ],
              },
            ]}
          />

          <Animated.Image
            source={require('../../assets/PAMANA_Words.png')}
            resizeMode="contain"
            style={[
              styles.startupWords,
              {
                opacity: wordsOpacity,
                transform: [
                  { translateY: wordsY },
                  { scale: wordsScale },
                ],
              },
            ]}
          />
        </Animated.View>

        {/* Existing button location and behavior are preserved */}
        <AnimatedButtonImage
          image={require('../../assets/StartupButton.png')}
          onPress={() => navigation.navigate('Home')}
        />
      </ImageBackground>
    </Animated.View>
  );
}

function AnimatedButtonImage({ image, onPress }) {
  const scale = useRef(new Animated.Value(1)).current;
  const pressed = useRef(false);

  const handlePress = () => {
    if (pressed.current) return;
    pressed.current = true;

    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.94,
        duration: 90,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        speed: 20,
        bounciness: 7,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        onPress();
      } else {
        pressed.current = false;
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


const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000000',
  },

  fullScreen: {
    flex: 1,
    backgroundColor: '#000000',
  },

  introScreen: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  teamContainer: {
    position: 'absolute',
    width: '76%',
    height: '29%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  teamImage: {
    width: '100%',
    height: '100%',
  },

  presentsContainer: {
    position: 'absolute',
    top: '65%',
    width: '70%',
    height: '12%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  presentsImage: {
    width: '100%',
    height: '100%',
  },

  whiteLogoBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFFFFF',
  },

  pamanaContainer: {
    position: 'absolute',
    width: '96%',
    height: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  pamanaImage: {
    width: '100%',
    height: '100%',
  },

  logoDarkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
  },

  blackCover: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
    zIndex: 10,
  },

  startupScreen: {
    flex: 1,
    backgroundColor: '#000000',
  },

  titleGroup: {
    position: 'absolute',
    top: '8%',
    left: 0,
    right: 0,
    height: '48%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  startupSun: {
    width: '66%',
    height: '52%',
  },

  startupWords: {
    width: '90%',
    height: '48%',
    marginTop: -4,
  },
});
