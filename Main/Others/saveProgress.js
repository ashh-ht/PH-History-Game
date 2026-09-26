import AsyncStorage from '@react-native-async-storage/async-storage';

const SAVE_KEY = 'saveHistory';     //key for storing the whole save history array in AsyncStorage

//create and save checkpoint
//when to call: when a scene loads and every after decision

async function saveCheckpoint(chap, decNum, scene, choice) {
    try {
        const checkpoint = {
            id: Date.now().toString(),
            chap: chap,
            decNum: decNum,
            timestamp: new Date().toLocaleString(),
            scene: scene,
            choice: choice
        }

        const existingData = await AsyncStorage.getItem(SAVE_KEY);
        const existingSaves = existingData ? JSON.parse(existingData) : [];

        existingSaves.push(checkpoint);

        await AsyncStorage.setItem(SAVE_KEY, JSON.stringify(existingSaves));
        return checkpoint;
        
    } catch (error) {
        console.error('error saving checkpoint', error);
        //error msg here (i dont have emulator T_T)
    }
}

//get all checkpoints
//when to call: displaying all save history on settings
async function getCheckpoints() {
    try {
        const existingData = await AsyncStorage.getItem(SAVE_KEY);
        return existingData ? JSON.parse(existingData) : [];
    } catch (error) {
        console.error('error getting checkpoint', error);
        //error msg here (i dont have emulator T_T)
    }
}

//for restoring ng gameplay progress if the player clicks on a specific save history
//when to call: when the user clicks on a specific save history
async function restoreCheckpoint(id){
    try {
        const allChcekpoints = await getCheckpoints();
        const found = allChcekpoints.find((checkpoint) => checkpoint.id === id);

        if (!found) {
            console.warn('no checkpoint found with id:', id);   //pls change dis for the actual error msg
            return null;
        }
        return found;
    } catch (error) {
        console.error('error restoring checkpoint', error);
        //error msg here (i dont have emulator T_T)]
        return null;
    }
}

async function continueGame() {
    try {
        const allCheckpoints = await getCheckpoints();

        if (allCheckpoints.length === 0) {
            console.warn('No saved checkpoints found.');    //paiba ulit
            return null;
        }

        const latest = allCheckpoints[allCheckpoints.length - 1]; //last item in the array is the latest
        return latest;
    } catch (error) {
        console.error('error continuing game', error);
        //error msg here (i dont have emulator T_T)
        return null;
    }
}

export { saveCheckpoint, getCheckpoints, restoreCheckpoint, continueGame };
