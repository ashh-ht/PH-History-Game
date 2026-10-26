import { StyleSheet } from 'react-native';

const PANEL_ASPECT = 1205 / 630;
const BTN_ASPECT = 2.43;
const EXIT_ASPECT = 4.0;

export default StyleSheet.create({
  screenOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    justifyContent: "center",
    alignItems: "center",
  },
  topIconContainer: {
    position: "absolute",
    zIndex: 10,
    flexDirection: "row",
  },
  topIconImage: {
    width: 40,
    height: 40,
  },

  // The image styles for the buttons
  menuButtonImage: {
    width: "100%",
    height: "100%",
  },
  exitButtonImage: {
    width: "100%",
    height: "100%",
  },

  // Dark layer shown while a button is held down
  pressOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10,
    backgroundColor: "rgba(40, 20, 5, 0.28)",
  },

  // --- Confirmation Overlay ---
  confirmOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
    elevation: 10,
  },
  confirmPanel: {
    backgroundColor: '#F4E4C8',
    borderRadius: 15,
    padding: 30,
    width: '50%',
    maxWidth: 400,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#A87C5E',
  },
  confirmText: {
    fontSize: 24,
    fontFamily: 'serif',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 25,
    color: '#5A4A32',
  },
  confirmButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  confirmButtonNo: {
    backgroundColor: '#A87C5E',
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#5A4A32',
  },
  confirmButtonYes: {
    backgroundColor: '#A74C39',
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#5A4A32',
  },
  confirmBtnText: {
    color: '#FFF',
    fontFamily: 'serif',
    fontWeight: 'bold',
    fontSize: 18,
  },
});