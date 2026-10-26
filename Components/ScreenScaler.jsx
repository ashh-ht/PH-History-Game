import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Base_short_side = 390;

export default function ScreenScaler() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const shortside = Math.min(width, height);


  const s = Math.min(Math.max(shortside / Base_short_side, 0.6), 1.5);

  return { s, width, height, insets };
}