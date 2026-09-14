import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  background: {
    flex: 1, // Ensures the image expands to fill the screen
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
  },
  blackScreen: {
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
  },
  logobg: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },

  button: {
    marginTop: 250,
    width: 350,
    height: 40,
    resizeMode: 'contain',
  },
});