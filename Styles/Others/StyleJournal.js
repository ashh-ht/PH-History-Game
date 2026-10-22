import { StyleSheet } from 'react-native';

const TITLE_FONT = undefined;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },

  bookFrame: {
    position: 'absolute',
    left: '2%',
    top: 0,
    width: '93%',
    height: '100%',
  },

  book: {
    width: '100%',
    height: '100%',
  },

// =================================== Journal Tabs ===================================
  tab: {
    position: 'absolute',
    right: '79%',
    zIndex: 10,
  },

  tabClosed: {
    width: '14%',
    aspectRatio: 400 / 300,
  },

  tabOpen: {
    right: '70.5%',
    width: '48%',
    aspectRatio: 850 / 231,
  },

  tabImage: {
    width: '100%',
    height: '100%',
  },

  pageRow: {
    position: 'absolute',
    left: '15%',
    right: '13.6%',
    top: '13.5%',
    bottom: '11%',
    flexDirection: 'row',
    gap: '4%',
  },
  
  spreadRow: {
    position: 'absolute',
    left: '15%',
    right: '13.6%',
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    gap: '4%',
  },
  spreadPage: {
    flex: 1,
    overflow: 'hidden',
  },

  timelineTitle: {
    position: 'absolute',
    top: '9.5%',
    left: '25%',
    width: '50%',
    height: '20%',
    zIndex: 5,
  },

  timelineBox: {
      position: 'absolute',
      left: '15%',
      width: '70%',
      height: '25%',
   },

  timelineBoxBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '12%',
    paddingVertical: '8%',
  },

  timelineBoxText: {
    color: '#2b2118',
    fontWeight: '700',
    fontSize: 12,
    textAlign: 'center',
  },

   timelineBoxImage: {
     position: 'absolute',
     top: 0,
     left: 0,
     width: '100%',
     height: '100%',
   },

  leftPage: {
    flex: 1,
    overflow: 'hidden',
  },
  rightPage: {
    flex: 1,
    flexShrink: 1,
    overflow: 'hidden',
  },
  pageContent: {
    width: '100%',
    padding: 10,
  },
  pageContentCenter: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: 0, 
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
    width: '85%',
    alignSelf: 'center',
    marginBottom: 6,
  },
  listButtonBg: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listButtonText: {
    color: '#3a2e1f',
    fontWeight: '600',
    fontSize: 11,
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

  chapterTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3a2e1f',
    textAlign: 'center',
    marginBottom: 2,
  },
  chapterRange: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#5a4a35',
    textAlign: 'center',
    marginBottom: 12,
  },
  subEntry: {
    marginTop: 6,
    marginLeft: 6,
    paddingLeft: 8,
    borderLeftWidth: 1,
    borderLeftColor: '#b9a98a',
  },
  subEntryDate: {
    fontWeight: '600',
    fontSize: 9,
    color: '#3a2e1f',
    marginBottom: 2,
  },

  profileTitle: {
    position: 'absolute',
    top: '9.5%',
    left: '25%',
    width: '50%',
    height: '20%',
    zIndex: 5,
  },
  profileCard: {
    position: 'absolute',
    width: '100%',
    aspectRatio: 900 / 368,
  },
  profileCardLeft: { left: '5.4%' },
  profileCardRight: { left: '8%' },
  fillAll: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  cardPortraitSlot: {
    position: 'absolute',
    left: '2.99%',
    top: '7.89%',
    width: '34.39%',
    height: '84.22%',
  },

  cardTextSlot: {
    position: 'absolute',
    left: '45%',
    top: '30%',
    width: '50%',
    height: '40%',
    justifyContent: 'center',
  },

  cardName: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#3a2e1f',
    textAlign: 'center',
    marginBottom: 2,
  },
  cardDesc: {
    color: '#4a3a28',
    textAlign: 'center',
  },

  detailFrame: {
    position: 'absolute',
    top: '14.8%',
    left: '24.75%',
    width: '50.5%',
    aspectRatio: 500 / 501,
  },
  detailPortraitSlot: {
    position: 'absolute',
    left: '7.35%',
    top: '7.9%',
    width: '84.58%',
    height: '84.34%',
  },
  detailNameBox: {
    position: 'absolute',
    top: '49%',
    left: '4%',
    right: '4%',
    height: '13%',
    justifyContent: 'center',
  },
  detailName: {
    fontFamily: TITLE_FONT,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#b8997a',
    letterSpacing: 1,
    textShadowColor: '#4a3728',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
  },
  detailInfo: {
    position: 'absolute',
    top: '64.5%',
    left: '4%',
    right: '4%',
    textAlign: 'center',
    color: '#4a3728',
    letterSpacing: 1,
  },
  detailBack: {
    position: 'absolute',
    left: '3%',
    bottom: '9%',
  },
  detailBodyScroll: {
    position: 'absolute',
    top: '14.5%',
    bottom: '9%',
    left: '4%',
    right: '4%',
    overflow: 'hidden',
  },
  detailBodyContent: {
    paddingBottom: 10,
  },
  detailBody: {
    color: '#4a3728',
    letterSpacing: 0.5,
  },

  // ---- Minigame (Remnants) page ----
  Remnancegrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  remnantsTitle: {
    position: 'absolute',
    top: '9.5%',
    left: '25%',
    width: '50%',
    height: '20%',
    zIndex: 5,
  },

  remnantCard: {
    width: '47%',
    marginBottom: 10,
    alignItems: 'center',
  },
  
  remnantCompleteCard: {
    width: '80%',
    aspectRatio: 10.5, 
    marginTop: -30, // negative = moves the box up; make it more negative to go higher
    marginBottom: 10,
    alignItems: 'center',
  },

  remnantBoxWrap: {
    width: '100%',
    aspectRatio: 1,
    position: 'relative',
  },
  remnantBoxImage: {
    width: '100%',
    height: '100%',
  },
  remnantInnerImage: {
    position: 'absolute',
    top: '8%',
    left: '8%',
    width: '84%',
    height: '84%',
    borderRadius: 2,
  },
  remnantLabel: {
    fontSize: 8,
    color: '#3a2e1f',
    marginTop: 3,
    textAlign: 'center',
  },

  // NEW: Separate style for the Complete Remnant text
  remnantCompleteLabel: {
    fontSize: 9, 
    fontWeight: 'bold',
    color: '#3a2e1f',
    marginTop: 3,
    textAlign: 'center',
  },

  remnantViewer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10000,
    padding: 10,
  },
  closeButtonImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  remnantViewerImage: {
    width: '120%',
    height: '100%',
    transform: [{ translateX: -50}],
  },

  glossaryTitle: {
    position: 'absolute',
    top: '9.5%',
    left: '25%',
    width: '50%',
    height: '20%',
    zIndex: 5,
  },
  glossaryBlock: {
    marginBottom: 14,
    alignItems: 'center',
  },
  glossaryTerm: {
    fontWeight: 'bold',
    color: '#8a6a45',
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: 4,
    textShadowColor: '#d9c8a6',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 0,
  },
  glossaryMeaning: {
    color: '#5a4a35',
    textAlign: 'center',
    paddingHorizontal: '4%',
  },
  glossaryDivider: {
    width: '80%',
    aspectRatio: 1920 / 180,
    marginTop: 10,
  },
});

export default styles;