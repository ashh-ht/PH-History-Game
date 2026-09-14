import { StyleSheet } from "react-native";

export default StyleSheet.create({
  //General
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 30,
    backgroundColor: "#171522",
  },

  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#A9A9A9",
    paddingBottom: 0,
  },

  arrowButton: {
    position: "absolute",
    bottom: 15,
    right: 20,
    padding: 5,
    zIndex: 10,
  },

  arrowImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },

  //------------------------------------------------------------------------
  // Beginning screen
  systemScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A9A9A9", //(color: gray) Note of self: placeholder, will swap for bg PNG later
    paddingHorizontal: 20,
  },

  systemParchmentWrapper: {
    width: "90%",
    maxWidth: 700,
    marginBottom: 20,
  },

  systemParchmentBox: {
    paddingHorizontal: 40,
    paddingVertical: 45,
    paddingBottom: 55,
    minHeight: 200,
    justifyContent: "center",
    alignItems: "center",
  },

  systemText: {
    color: "#2b2b2b",
    fontSize: 17,
    lineHeight: 26,
    fontStyle: "italic",
    textAlign: "center",
    letterSpacing: 0.4,
  },

  //------------------------------------------------------------------------
  // Character
  characterBase: {
    position: "absolute",
    bottom: -200,
    width: 800,
    height: 800,
    resizeMode: "contain",
    zIndex: 0,
  },

  characterLeft: {
    left: -20,
  },

  characterRight: {
    right: -20,
  },

  characterCenter: {
    left: "50%",
    marginLeft: -400,
  },

  //------------------------------------------------------------------------
  // Dialogue Box
  dialogueBox: {
    paddingHorizontal: 35,
    paddingVertical: 40,
    paddingBottom: 50,
    borderRadius: 12,
  },

  speakerName: {
    color: "#2b2b2b",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    // marginHorizontal: 60,
  },

  dialogueText: {
    color: "#2b2b2b",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    // marginHorizontal: 60,
  },

  dialogueTranslation: {
    color: "#5a4a2a",
    fontSize: 14,
    lineHeight: 21,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 12,
    paddingTop: 10,
    // marginHorizontal: 60,
  },

  //------------------------------------------------------------------------
  // Narrator
  narratorWrapper: {
    width: "90%",
    maxWidth: 600,
    marginBottom: 0,
    position: "relative",
    zIndex: 2,
  },

  narratorBox: {
    paddingHorizontal: 35,
    paddingVertical: 40,
    paddingBottom: 50,
  },

  narratorLabel: {
    color: "#2b2b2b",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },

  narratorText: {
    color: "#2b2b2b",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },

  //------------------------------------------------------------------------
  // Translation
  translationBox: {
    backgroundColor: "rgba(25, 22, 38, 0.88)",
    marginHorizontal: 25,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#514a68",
  },

  translationLabel: {
    color: "#a9a3b8",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
    textAlign: "center",
    marginBottom: 6,
  },

  translationText: {
    color: "#d5d1dc",
    fontSize: 15,
    lineHeight: 23,
    fontStyle: "italic",
    textAlign: "center",
  },

  //------------------------------------------------------------------------
  // Choices
  choiceScreen: {
    flex: 1,
    backgroundColor: "#A9A9A9", //(color: gray) Note of self: placeholder, will swap for bg PNG later
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 40,
  },

  choiceParchmentWrapper: {
    width: "88%",
    maxWidth: 700,
    marginBottom: 30,
  },

  choiceParchmentBox: {
    paddingHorizontal: 35,
    paddingVertical: 35,
    paddingBottom: 45,
    minHeight: 180,
    justifyContent: "center",
    alignItems: "center",
  },

  choiceQuestion: {
    color: "#2b2b2b",
    fontSize: 17,
    lineHeight: 26,
    textAlign: "center",
    marginBottom: 14,
  },

  choicePrompt: {
    color: "#2b2b2b",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 6,
  },

  choiceButtonsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "92%",
    maxWidth: 800,
    paddingHorizontal: 10,
    gap: 15,
  },

  choiceImageButton: {
    flex: 1,
    maxWidth: 350,
    height: 110,
  },

  choiceImageButtonBg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 20,
  },

  choiceButtonText: {
    color: "#2b2b2b",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 20,
  },

  choiceTranslation: {
    color: "#aaa5b6",
    fontSize: 14,
    lineHeight: 21,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 8,
  },

  //------------------------------------------------------------------------
  // Next Button (Used at the Part Complete screen), might delete in future
  nextButton: {
    backgroundColor: "#C8A96B",
    borderWidth: 1,
    borderColor: "#d8bd6a",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 12,
    marginTop: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },

  nextButtonText: {
    color: "#f8f3df",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});