import { createContext, useContext, useState } from 'react';

const GameProgressContext = createContext();

export function GameProgressProvider({ children }) {
  const [part, setPart] = useState(0);
  const [chapter, setChapter] = useState(1);
  const [scene, setScene] = useState(0);
  const [inGame, setInGame] = useState(false);

  return (
    <GameProgressContext.Provider
      value={{
        part, setPart,
        chapter, setChapter,
        scene, setScene,
        inGame, setInGame,
      }}
    >
      {children}
    </GameProgressContext.Provider>
  );
}

export function useGameProgress() {
  return useContext(GameProgressContext);
}