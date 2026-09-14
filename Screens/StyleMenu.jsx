import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  background: {
    width: '100%',
    aspectRatio: 1062 / 826
  },
  btnList: {
    justifyContent: 'center',
    alignItems: 'center',
    top: '10%',
    gap: 15,
  },
  button: {
    width: 175,
    height: 35,
    resizeMode: 'contain',
  },

  NewGameList: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    gap: 25,
  },
  NGbutton: {
    width: 170,
    height: 40,
    resizeMode: 'contain',
  },

  ChptList: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 190,
    marginRight: 10,
    gap: 10,
  },
  Chptbutton:{
    width: 375,
    height: 50,
    resizeMode: 'contain',
    //backgroundColor: 'rgba(255,0,0,0.3)',
  },

  PartList: {
    flex: 1,
    width: 400,
    marginTop: 190,
    marginRight: 10,
    alignSelf: 'center',
  },

  PartListContent: {
    alignItems: 'center',
    paddingBottom: 20,
    gap: 8,
  },
});