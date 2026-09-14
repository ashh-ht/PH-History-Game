import { createContext, useContext, useState } from 'react';

const GameProgressContext = createContext();

export function GameProgressProvider({ children }) {
  const [part, setPart] = useState(0);

  return (
    <GameProgressContext.Provider value={{ part, setPart }}>
      {children}
    </GameProgressContext.Provider>
  );
}

export function useGameProgress() {
  return useContext(GameProgressContext);
}