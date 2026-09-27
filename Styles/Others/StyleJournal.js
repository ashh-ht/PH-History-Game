import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  book: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  topBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    top: 9,
    marginBottom: 8,
    paddingHorizontal: '18%',
    gap: 10,
  },

  bookmarkWrapper: {
    alignItems: 'center',
  },
  bookmarkBg: {
    width: 30,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookmarkBgActive: {
    transform: [{ scale: 1.1 }],
  },
  bookmarkIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
    tintColor: '#fff',
  },
  bookmarkLabel: {
    fontSize: 9,
    color: '#3a2e1f',
    marginTop: 2,
    fontWeight: '600',
  },

  pageRow: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: '24%',
    marginTop: '4%',
    marginBottom: '8%',
    gap: '4%',
  },
  leftPage: {
    flex: 1,
  },
  rightPage: {
    flex: 1,
    flexShrink: 1,
  },
  pageContent: {
    width: '100%',
    padding: 10,
  },

  pageTitle: {
    fontSize: 15,
    left: 30,
    fontWeight: 'bold',
    color: '#3a2e1f',
    marginBottom: 6,
  },

  pageIntro: {
    fontSize: 10,
    left: 30,
    color: '#5a4a35',
    marginBottom: 10,
    fontStyle: 'italic',
  },

  placeholderText: {
    fontSize: 9,
    color: '#8a6d3b',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },

  listButtonWrapper: {
    width: '80%',
    alignSelf: 'center',
    marginBottom: 4,
  },
  listButtonBg: {
    paddingVertical: 6,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listButtonText: {
    color: '#3a2e1f',
    fontWeight: '600',
    fontSize: 6,
    textAlign: 'center',
  },

  backLink: {
    color: '#050505',
    marginBottom: 8,
    fontWeight: '600',
    fontSize: 11,
  },

  entryBlock: {
    marginBottom: 10,
  },

  entryDate: {
    fontWeight: 'bold',
    color: '#3a2e1f',
    marginBottom: 3,
    fontSize: 10,
  },

  entryContent: {
    color: '#5a4a35',
    fontSize: 9,
    lineHeight: 14,
  },

  // ---- Character cards ----
  cardWrapper: {
    width: '95%',
    alignSelf: 'center',
    marginBottom: 6,
  },
  cardBg: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
  },
  cardPortrait: {
    width: 38,
    height: 46,
    resizeMode: 'cover',
  },
  cardTextBox: {
    flex: 1,
    marginLeft: 6,
  },
  cardName: {
    fontSize: 8,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#3a2e1f',
    textAlign: 'center',
    marginBottom: 2,
  },
  cardDesc: {
    fontSize: 6,
    color: '#5a4a35',
  },

  // ---- Page arrows ----
  arrow: {
    position: 'absolute',
    top: '45%',
    padding: 6,
  },
  arrowRight: { right: -30 },
  arrowLeft: { left: -30 },
  arrowText: { fontSize: 18, color: '#6b4a2b' },

  // ---- Character detail view part ----
  detailPortrait: {
    width: 70,
    height: 84,
    alignSelf: 'center',
    resizeMode: 'cover',
    marginBottom: 6,
  },
 detailName: {
    fontSize: 12,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#3a2e1f',
    textAlign: 'center',
  },

// minigame part
 Remnancegrid:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "space-between"
  },

  remnantImage:{
    width: '100%',
    aspectRatio: 1,
    borderRadius:4
  },
  remnantCard:{
    width: '47%',
    marginBottom: 10,
    alignItems: 'center',
  }, 

  completeCard:{
    width:'100%'
  },

  remnantPlaceholder:{
     width: '100%',
     aspectRatio: 1,
     backgroundColor: '#c9c1ab',
     borderRadius: 4,
     alignItems: 'center',
     justifyContent: 'center',
  },

  remnantslocked: {
     fontSize: 20,
     fontWeight: 'bold',
     color: '#7a7360',
  },


  remnantLabel: {
      fontSize: 8,
      color: '#3a2e1f',
      marginTop: 3,
      textAlign: 'center',
  },
// -----glossary part -----
glossaryBlock:{

 marginBottom: 10,
    },

 glossaryTerm:{
    fontWeight: 'bold',
    color: '#3a2e1f',
    fontSize: 10,
    marginBottom: 2,
    },

 glossaryMeaning:{
    color: '#5a4a35',
    fontSize: 9,
    lineHeight: 13,
    }
});


export default styles;