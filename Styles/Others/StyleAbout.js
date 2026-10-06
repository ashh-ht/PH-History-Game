import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  topIcon: {
    position: 'absolute',
    top: 12,
    left: 20,
    flexDirection: 'row',
    gap: 15,
  },

  icon: {
    width: 40,
    height: 40,
  },

  panel: {
    backgroundColor: '#FFF2CB',
    borderRadius: 15,
    paddingVertical: 30,
    paddingHorizontal: 40,
    width: '75%',
    alignSelf: 'center',
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    marginBottom: 22,
  },

  titleRule: {
    width: 60,
    height: 1,
    backgroundColor: '#B89B5E',
  },

  title: {
    fontSize: 22,
    fontFamily: 'serif',
    color: '#5A4A32',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },

  rowCenter: {
    alignItems: 'center',
    marginBottom: 10,
  },

  pillButton: {
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  pillImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },

  pillText: {
    fontSize: 18,
    fontFamily: 'serif',
    color: '#3a2e1f',
  },

  backButton: {
    position: 'absolute',
    left: 14,
    bottom: 10,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  backArrow: {
    fontSize: 28,
    color: '#8A7A9A',
  },

  // ---- Credits / About Team overlays ----
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
    elevation: 10,
  },

  overlayPanel: {
    backgroundColor: '#FFF2CB',
    borderRadius: 15,
    padding: 24,
    width: '70%',
    maxHeight: '70%',
    alignItems: 'center',
    overflow:'hiddden'
  },

  overlayTitle: {
    fontSize: 20,
    fontFamily: 'serif',
    color: '#3a2e1f',
    marginBottom: 14,
  },

  overlayBody: {
    fontSize: 14,
    color: '#5a4a35',
    lineHeight: 22,
    textAlign: 'center',
  },

  overlayClose: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#3a2e1f',
    borderRadius: 8,
  },

  overlayCloseText: {
    fontSize: 14,
    color: '#3a2e1f',
    fontWeight: '600',
  },
  creditsScroll: {
  maxHeight: 220, // tune to taste
  width: '100%',
},
});

export default styles;