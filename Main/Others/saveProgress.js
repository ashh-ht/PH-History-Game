import AsyncStorage from "@react-native-async-storage/async-storage";

const SAVE_KEY = "saveHistory";
const UNLOCK_KEY = "highestPart";
const MAX_SAVES = 50;


async function markPartReached(part) {
  try {
    const stored = parseInt(await AsyncStorage.getItem(UNLOCK_KEY), 10) || 1;
    if (part > stored) {
      await AsyncStorage.setItem(UNLOCK_KEY, String(part));
    }
  } catch (error) {
    console.error("error marking part reached", error);
  }
}


async function saveCheckpoint(data) {
  try {
    const checkpoint = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      decNum: null,
      choice: null,
      ...data,
    };


    await markPartReached(checkpoint.part);

    const existingData = await AsyncStorage.getItem(SAVE_KEY);
    const saves = existingData ? JSON.parse(existingData) : [];


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

    return null;
  }
}


async function getCheckpoints() {
  try {
    const existingData = await AsyncStorage.getItem(SAVE_KEY);
    return existingData ? JSON.parse(existingData) : [];
  } catch (error) {
    console.error("error getting checkpoints", error);

    return []; 
  }
}



async function getUnlockedPart() {
  try {
    const stored = parseInt(await AsyncStorage.getItem(UNLOCK_KEY), 10) || 1;
    const all = await getCheckpoints();
    const fromSaves = all.reduce((max, c) => Math.max(max, c.part || 1), 1);
    return Math.max(stored, fromSaves);
  } catch (error) {
    console.error("error getting unlocked part", error);
    return 1;
  }
}



async function restoreCheckpoint(id) {
  try {
    const all = await getCheckpoints();
    const found = all.find((checkpoint) => checkpoint.id === id);

    if (!found) {
      console.warn("no checkpoint found with id:", id); 
      return null;
    }
    return found;
  } catch (error) {
    console.error("error restoring checkpoint", error);
  
    return null;
  }
}



async function deleteCheckpoint(id) {
  try {
    const all = await getCheckpoints();
    const updated = all.filter((checkpoint) => checkpoint.id !== id);

    await AsyncStorage.setItem(SAVE_KEY, JSON.stringify(updated));
    return updated; 
  } catch (error) {
    console.error("error deleting checkpoint", error);
    return null;
  }
}



async function continueGame() {
  try {
    const all = await getCheckpoints();

    if (all.length === 0) {
      console.warn("No saved checkpoints found."); 
      return null;
    }

    return all[all.length - 1]; 
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
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    console.error("Error clearing AsyncStorage:", error);
    return false;
  }
}

async function restartProgress() {
  try {
    await Promise.all([
      AsyncStorage.removeItem(SAVE_KEY),
      AsyncStorage.removeItem(UNLOCK_KEY),
    ]);
    return true;
  } catch (error) {
    console.error("Error reset progress:", error);
    return false;
  }
}
export {
  saveCheckpoint,
  getCheckpoints,
  restoreCheckpoint,
  continueGame,
  restartEverything,
  clearCheckpoints,
  deleteCheckpoint,
  markPartReached,
  getUnlockedPart,
  restartProgress
};