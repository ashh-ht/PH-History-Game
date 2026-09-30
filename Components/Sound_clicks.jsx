import { Pressable } from "react-native";
import { useAudio } from "../AudioStore";

function Sound_clicks({ onPress, children, style }) {
  const { Playclick } = useAudio();

  const handlePress = () => {
    Playclick();
    if (onPress) onPress();
  };

  return (
    <Pressable onPress={handlePress} style={style}>
      {children}
    </Pressable>
  );
}

export default Sound_clicks;