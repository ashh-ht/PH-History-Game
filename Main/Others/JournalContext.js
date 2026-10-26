import React, { createContext, useState, useEffect, useContext, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@journal_unlocks';


const JournalContext = createContext({
  unlockedIds: new Set(),
  unlock: () => console.warn('[JournalContext] unlock called, but Provider is missing!'),
  resetUnlocks: () => console.warn('[JournalContext] resetUnlocks called, but Provider is missing!'),
});

export const JournalProvider = ({ children }) => {
  const [unlockedIds, setUnlockedIds] = useState(() => new Set());
  const [loaded, setLoaded] = useState(false);


  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved && !cancelled) {
          const savedArray = JSON.parse(saved);
          setUnlockedIds((prev) => new Set([...prev, ...savedArray]));
        }
      } catch (e) {
        console.error('[JournalContext] Failed to load journal progress', e);
      } finally {
        if (!cancelled) setLoaded(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([...unlockedIds])).catch((e) =>
      console.error('[JournalContext] Failed to save journal progress', e)
    );
  }, [unlockedIds, loaded]);

  const unlock = useCallback((ids) => {
    if (!ids || ids.length === 0) return;

    setUnlockedIds((prev) => {
      if (ids.every((id) => prev.has(id))) return prev;
      const next = new Set(prev);
      ids.forEach((id) => next.add(id));
      return next;
    });
  }, []);

  const resetUnlocks = useCallback(async () => {
    setUnlockedIds(new Set());
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('[JournalContext] Failed to reset journal progress', e);
    }
  }, []);

  const value = useMemo(
    () => ({ unlockedIds, unlock, resetUnlocks }),
    [unlockedIds, unlock, resetUnlocks]
  );

  return <JournalContext.Provider value={value}>{children}</JournalContext.Provider>;
};

export const useJournal = () => useContext(JournalContext);