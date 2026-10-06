import { createContext, useContext, useState } from 'react';

const GameplaySettingsContext = createContext(null);

export function GameplaySettingsProvider({ children }) {
  const [textSpeed, setTextSpeed] = useState('Normal');
  const [autoPlay, setAutoPlay] = useState(false);
  const [autoDelay, setAutoDelay] = useState(10);

  return (
    <GameplaySettingsContext.Provider
      value={{ textSpeed, setTextSpeed, autoPlay, setAutoPlay, autoDelay, setAutoDelay }}
    >
      {children}
    </GameplaySettingsContext.Provider>
  );
}

export const useGameplaySettings = () => useContext(GameplaySettingsContext);