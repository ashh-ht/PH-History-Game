import AsyncStorage from "@react-native-async-storage/async-storage";

const SAVE_KEY = "saveHistory";
const MAX_SAVES = 30;


async function saveCheckpoint(data) {
  try {
    const checkpoint = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      decNum: null,
      choice: null,
      ...data,
    };

    const existingData = await AsyncStorage.getItem(SAVE_KEY);
    const saves = existingData ? JSON.parse(existingData) : [];

    // Skip if identical to the latest save
    const last = saves[saves.length - 1];
    if (
      last &&
      last.chap === checkpoint.chap &&
      last.part === checkpoint.part &&
      last.sceneIdx === checkpoint.sceneIdx &&
      last.decNum === checkpoint.decNum
    ) {
      return last;
    }

    saves.push(checkpoint);

    await AsyncStorage.setItem(
      SAVE_KEY,
      JSON.stringify(saves.slice(-MAX_SAVES))
    );

    return checkpoint;
  } catch (error) {
    console.error("error saving checkpoint", error);
    // error msg here
    return null;
  }
}


// GET ALL CHECKPOINTS (oldest - newest)
// When to call: showing the save history in Settings to Saves
async function getCheckpoints() {
  try {
    const existingData = await AsyncStorage.getItem(SAVE_KEY);
    return existingData ? JSON.parse(existingData) : [];
  } catch (error) {
    console.error("error getting checkpoints", error);
    // error msg here
    return []; // always return an array so .map() never crashes
  }
}

// RESTORE A CHECKPOINT
// When to call: player taps a specific save
async function restoreCheckpoint(id) {
  try {
    const all = await getCheckpoints();
    const found = all.find((checkpoint) => checkpoint.id === id);

    if (!found) {
      console.warn("no checkpoint found with id:", id); // change for the actual error msg
      return null;
    }
    return found;
  } catch (error) {
    console.error("error restoring checkpoint", error);
    // error msg here
    return null;
  }
}


// CONTINUE GAME (latest save)
async function continueGame() {
  try {
    const all = await getCheckpoints();

    if (all.length === 0) {
      console.warn("No saved checkpoints found."); // change for the actual error msg
      return null;
    }

    return all[all.length - 1]; // last item = latest
  } catch (error) {
    console.error("error continuing game", error);
    return null;
  }
}

async function clearCheckpoints() {
  try {
    await AsyncStorage.removeItem(SAVE_KEY);
  } catch (error) {
    console.error("error clearing checkpoints", error);
  }
}

async function restartEverything() {
  try{
    await AsyncStorage.clear();
    return true;
  } catch(error){
        console.error("Error clearing AsyncStorage:", error);
    return false;
  }
}

export {
  saveCheckpoint,
  getCheckpoints,
  restoreCheckpoint,
  continueGame,
  clearCheckpoints,
  restartEverything
};