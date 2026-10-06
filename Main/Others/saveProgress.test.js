import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  saveCheckpoint,
  getCheckpoints,
  restoreCheckpoint,
  continueGame,
} from './saveProgress';

// Clear fake storage before each test so tests don't affect each other
beforeEach(async () => {
  await AsyncStorage.clear();
});

test('saveCheckpoint adds a new checkpoint to storage', async () => {
  const checkpoint = await saveCheckpoint('Chapter 1', 1, 'sceneA', 'choiceA');

  // Check the returned checkpoint has the fields we expect
  expect(checkpoint.chap).toBe('Chapter 1');
  expect(checkpoint.decNum).toBe(1);
  expect(checkpoint.scene).toBe('sceneA');
  expect(checkpoint.choice).toBe('choiceA');
  expect(checkpoint.id).toBeDefined();
  expect(checkpoint.timestamp).toBeDefined();

  // Check it's actually retrievable afterward
  const all = await getCheckpoints();
  expect(all.length).toBe(1);
  expect(all[0].scene).toBe('sceneA');
});

test('saveCheckpoint appends multiple checkpoints in order', async () => {
  await saveCheckpoint('Chapter 1', 1, 'sceneA', 'choiceA');
  await saveCheckpoint('Chapter 1', 2, 'sceneB', 'choiceB');

  const all = await getCheckpoints();
  expect(all.length).toBe(2);
  expect(all[0].scene).toBe('sceneA');
  expect(all[1].scene).toBe('sceneB');
});

test('getCheckpoints returns an empty array when nothing is saved', async () => {
  const all = await getCheckpoints();
  expect(all).toEqual([]);
});

test('restoreCheckpoint finds the correct checkpoint by id', async () => {
  const first = await saveCheckpoint('Chapter 1', 1, 'sceneA', 'choiceA');
  await saveCheckpoint('Chapter 1', 2, 'sceneB', 'choiceB');

  const restored = await restoreCheckpoint(first.id);
  expect(restored.scene).toBe('sceneA');
});

test('restoreCheckpoint returns null for an id that does not exist', async () => {
  await saveCheckpoint('Chapter 1', 1, 'sceneA', 'choiceA');

  const restored = await restoreCheckpoint('fake-id-that-does-not-exist');
  expect(restored).toBeNull();
});

test('continueGame returns the most recently saved checkpoint', async () => {
  await saveCheckpoint('Chapter 1', 1, 'sceneA', 'choiceA');
  await saveCheckpoint('Chapter 1', 2, 'sceneB', 'choiceB');
  const latest = await saveCheckpoint('Chapter 2', 1, 'sceneC', 'choiceC');

  const result = await continueGame();
  expect(result.id).toBe(latest.id);
  expect(result.scene).toBe('sceneC');
});

test('continueGame returns null when there are no checkpoints', async () => {
  const result = await continueGame();
  expect(result).toBeNull();
});