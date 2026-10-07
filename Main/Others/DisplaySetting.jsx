import { createContext, useContext, useState } from 'react';

const DisplaySettingsContext = createContext(null);

// Multiplier applied to the story text sizes in Compilation.jsx
export const FONT_SCALE = { Small: 0.88, Medium: 1, Large: 1.2 };

//scale of the opacity the minimum
export const MIN_BOX_OPACITY = 0.3;

export function DisplaySettingsProvider({ children }) {
  const [fontSize, setFontSize] = useState('Medium'); // 'Small' | 'Medium' | 'Large'
  const [boxOpacity, setBoxOpacity] = useState(1);    // MIN_BOX_OPACITY .. 1

  return (
    <DisplaySettingsContext.Provider
      value={{ fontSize, setFontSize, boxOpacity, setBoxOpacity }}
    >
      {children}
    </DisplaySettingsContext.Provider>
  );
}

export const useDisplaySettings = () => useContext(DisplaySettingsContext);