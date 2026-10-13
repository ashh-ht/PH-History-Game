import { createContext, useContext, useEffect, useRef, useState } from 'react';
import RNExitApp from 'react-native-exit-app';

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

    const bgm = new Sound('somber', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('did not load', error);
        return;
      }
      bgm.setVolume(musicEffectiveVolume);
      bgm.setNumberOfLoops(-1);
      bgm.play();
    });

    bgmRef.current = bgm;

    // clicking sound
    const clicks = new Sound('click', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('did not load', error);
      }
    });
    clickref.current = clicks;

    return () => {
      bgm.stop(() => bgm.release());
      clicks.release();
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

  // stop audio, then restart the whole app
  const Quitapp = () => {
    try {
      bgmRef.current?.stop();
      bgmRef.current?.release();
      clickref.current?.release();
    } catch (e) {
      console.log('audio cleanup error', e);
    }

    bgmRef.current = null;
    clickref.current = null;

    RNExitApp.exitApp();
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
        Playclick,
        Quitapp,
      }}
    >
      {children}
    </Audiostore.Provider>
  );
}

export function useAudio() {
  return useContext(Audiostore);
}