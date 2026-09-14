import { Pressable } from "react-native";
import { useAudio } from "../Audiostore";

// for sound clicks 
function Sound_clicks({onPress, children , style}) {
    const {Playclick} =useAudio();


    const handlePress = () =>{
        Playclick();
        if(onPress)
            onPress();
    };

    return(

        <Pressable onPress={handlePress} style={style}

        >
            {children}
        </Pressable>
    )
}

export default Sound_clicks;