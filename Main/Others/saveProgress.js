import AsyncStorage from "@react-native-async-storage/async-storage";

const SAVE_KEY = "saveHistory";
const UNLOCK_KEY = "highestPart";
const MAX_SAVES = 50;


// REMEMBER THE FURTHEST PART REACHED (never goes down)
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

    // unlock the part this checkpoint belongs to
    await markPartReached(checkpoint.part);

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


// HIGHEST UNLOCKED PART (1-based)
// Also checks existing saves so earlier progress isn't lost
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


// DELETE ONE CHECKPOINT
// When to call: player taps the ✕ on a specific save
async function deleteCheckpoint(id) {
  try {
    const all = await getCheckpoints();
    const updated = all.filter((checkpoint) => checkpoint.id !== id);

    await AsyncStorage.setItem(SAVE_KEY, JSON.stringify(updated));
    return updated; // return the new list (oldest - newest)
  } catch (error) {
    console.error("error deleting checkpoint", error);
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

export {
  saveCheckpoint,
  getCheckpoints,
  restoreCheckpoint,
  continueGame,
  clearCheckpoints,
};