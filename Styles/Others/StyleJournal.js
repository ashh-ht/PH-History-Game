import { StyleSheet } from 'react-native';

// Display font for character names on the detail page. Set this to your font's name once it's loaded
// (e.g. 'YourFont'); undefined uses the device default.
const TITLE_FONT = undefined;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ADDED: dark layer over the screen underneath. Raise/lower the last number (0 to 1) to taste.
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },

  // ADDED: the 16:9 book frame inside the stage. Pages, title and boxes are placed in % of this frame.
  // left = 0.14/1.07, width = 1/1.07 (the stage is 1.07 frames wide, with 0.14 of a frame of room on the left for the open tab)
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
    aspectRatio: 400 / 300, //OG size - 400x288
  },

  tabOpen: {
    right: '70.5%',
    width: '48%',
    aspectRatio: 850 / 231, //OG size - 850x231
  },

  tabImage: {
    width: '100%',
    height: '100%',
  },

  // CHANGED: placed by % of the canvas so it sits inside the book's pages.
  // Tune left/right/top/bottom by eye. 'gap' should cover the spine.
  pageRow: {
    position: 'absolute',
    left: '15%',
    right: '13.6%',
    top: '13.5%',
    bottom: '11%',
    flexDirection: 'row',
    gap: '4%',
  },
  // ---- Full-height two-page layout (used by the Timeline list and the Profile pages) ----
  // ADDED: covers the whole canvas height so child positions can be written in % of the canvas.
  // Same left/right/gap as pageRow, so the two pages line up with the book.
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


  sideArrow: {
    position: 'absolute',
    top: '45%',
    padding: 2,
  },

  sideArrowLeft: { left: '-3%' },

  sideArrowRight: { right: '-3%' },

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
  // ADDED: only used on the timeline list so other pages stay as they were
  pageContentCenter: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: 0, // CHANGED: no more ribbon hanging onto the page, so no extra room needed
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

  // CHANGED: bigger buttons and text
  listButtonWrapper: {
    width: '85%',
    alignSelf: 'center',
    marginBottom: 6, // CHANGED: was 10, so 6 buttons still fit after the extra top padding
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

  // ---- Timeline detail page ----
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
  // sub-entries are indented with a thin line down the left
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

  // ---- Character Profiles: list page ----
  profileTitle: {
    position: 'absolute',
    top: '9.5%',
    left: '25%',
    width: '50%',
    height: '20%',
    zIndex: 5,
  },
  // card = Profile_w_Details_Box.png (900x368). Width/left are % of the page; top is set in the JSX.
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
  // where the dark photo square / the paper sit inside the card image (measured from the art), in % of the card
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

  // ---- Page arrows ----
  // CHANGED: tabs now use the left side, so arrows sit at the bottom corners of the pages
  arrow: {
    position: 'absolute',
    bottom: '-9%',
    padding: 2,
  },
  arrowRight: { right: 0 },
  arrowLeft: { left: 0 },
  arrowText: { fontSize: 22, color: '#6b4a2b' },

  // ---- Character Profiles: detail page ----
  // frame = Profile_Box.png (500x501), centered on the left page
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

  // Remnants title sits on the left page, same placement pattern as Timeline/Profile titles
  remnantsTitle: {
    position: 'absolute',
    top: '9.5%',
    left: '25%',
    width: '50%',
    height: '20%',
    zIndex: 5,
  },

  // wrapper holds the box image (locked or unlocked) + the inner remnant image
  remnantCard: {
    width: '47%',
    marginBottom: 10,
    alignItems: 'center',
  },
  remnantBoxWrap: {
    width: '100%',
    aspectRatio: 1, // matches Remnants_Box_*.png (torn paper crop)
    position: 'relative',
  },
  remnantBoxImage: {
    width: '100%',
    height: '100%',
  },
  // remnant content sits inside the paper area of the box image
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

  // ---- Full-screen remnant viewer (tap an unlocked remnant) ----
  remnantViewer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  remnantViewerImage: {
    width: '85%',
    height: '85%',
  },

  // ---- Glossary page ----
  // Same title placement as the other sections, so it lines up with Timeline / Profile / Remnants.
  glossaryTitle: {
    position: 'absolute',
    top: '9.5%',
    left: '25%',
    width: '50%',
    height: '20%',
    zIndex: 5,
  },
  // one term block: fancy uppercase term, plain meaning below, then a decorative divider
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
  // decorative swirly divider between entries
  glossaryDivider: {
    width: '80%',
    aspectRatio: 1920 / 180,
    marginTop: 10,
  },
});

export default styles;