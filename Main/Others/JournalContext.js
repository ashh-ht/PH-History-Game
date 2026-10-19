import React, { createContext, useState, useEffect, useContext, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@journal_unlocks';

// Default value so a missing Provider logs a warning instead of crashing
const JournalContext = createContext({
  unlockedIds: new Set(),
  unlock: () => console.warn('[JournalContext] unlock called, but Provider is missing!'),
  resetUnlocks: () => console.warn('[JournalContext] resetUnlocks called, but Provider is missing!'),
});

export const JournalProvider = ({ children }) => {
  const [unlockedIds, setUnlockedIds] = useState(() => new Set());
  const [loaded, setLoaded] = useState(false);

  // Load saved IDs once on startup
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved && !cancelled) {
          const savedArray = JSON.parse(saved);
          // Merge, in case something unlocked while we were still loading
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

  // Save whenever the set changes. Waits for the initial load so saved progress
  // is never overwritten by an empty/partial set.
  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([...unlockedIds])).catch((e) =>
      console.error('[JournalContext] Failed to save journal progress', e)
    );
  }, [unlockedIds, loaded]);

  // Add new unlocks.
  // useCallback keeps this function's identity stable, and returning `prev` when nothing
  // is new means React skips the re-render. Without both, any component that calls
  // unlock() from a useEffect([unlock]) re-triggers itself forever.
  const unlock = useCallback((ids) => {
    if (!ids || ids.length === 0) return;

    setUnlockedIds((prev) => {
      if (ids.every((id) => prev.has(id))) return prev; // nothing new -> same reference
      const next = new Set(prev);
      ids.forEach((id) => next.add(id));
      return next;
    });
  }, []);

  // Optional: call this from your New Game screen if a new game should start with an empty Journal
  const resetUnlocks = useCallback(() => setUnlockedIds(new Set()), []);

  const value = useMemo(
    () => ({ unlockedIds, unlock, resetUnlocks }),
    [unlockedIds, unlock, resetUnlocks]
  );

  return <JournalContext.Provider value={value}>{children}</JournalContext.Provider>;
};

export const useJournal = () => useContext(JournalContext);