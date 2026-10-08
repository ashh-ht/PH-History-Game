import { createContext, use, useContext, useEffect, useRef, useState } from 'react';
import Sound from 'react-native-sound';

const Audiostore = createContext(null);

export function AudioProvider({ children }) {
  const [masterVolume, setMasterVolume] = useState(0.8);
  const [musicVolume, setMusicVolume] = useState(0.8);
  const [soundVolume, setSoundVolume] = useState(0.8);
  const bgmRef = useRef(null);
  const clickref = useRef(null);

  // This is so volume behaves based on both sliders combined.
  const musicEffectiveVolume = masterVolume * musicVolume;
  const soundEffectiveVolume = masterVolume * soundVolume;

  useEffect(() => {
    Sound.setCategory('Playback');

    const bgm = new Sound('bgm', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('did not load', error);
        return;
      }
      bgm.setVolume(musicEffectiveVolume);
      bgm.setNumberOfLoops(-1);
      bgm.play();
    });

    bgmRef.current = bgm;

    //clicking sound
    const clicks = new Sound('click', Sound.MAIN_BUNDLE,(error) =>{
      if (error) {
        console.log('did not load', error);
      }

    });
      clickref.current= clicks;


    return () => {
      bgm.stop(() => bgm.release());
    };
  }, []); // runs once

  useEffect(() => {
    if (bgmRef.current) {
      bgmRef.current.setVolume(musicEffectiveVolume);
    }
  }, [masterVolume, musicVolume]);

  const changeMasterVolume = (value) => setMasterVolume(value);
  const changeMusicVolume = (value) => setMusicVolume(value);
  const changeSoundVolume = (value) => setSoundVolume(value);

  // click function
const Playclick = () => {
  if (clickref.current) {
    clickref.current.setVolume(soundEffectiveVolume);
    clickref.current.stop();
    clickref.current.play();
  }
};

  return (
    <Audiostore.Provider
      value={{
        masterVolume,
        musicVolume,
        soundVolume,
        changeMasterVolume,
        changeMusicVolume,
        changeSoundVolume,
        Playclick
       }}
    >
      {children}
    </Audiostore.Provider>
  );
}

export function useAudio() {
  return useContext(Audiostore);
}