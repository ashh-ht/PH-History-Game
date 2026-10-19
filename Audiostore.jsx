import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';
import RNExitApp from 'react-native-exit-app';
import Sound from 'react-native-sound';

const Audiostore = createContext(null);

export function AudioProvider({ children }) {
  const [masterVolume, setMasterVolume] = useState(0.8);
  const [musicVolume, setMusicVolume] = useState(0.8);
  const [soundVolume, setSoundVolume] = useState(0.8);

  const bgmRef = useRef(null);
  const clickref = useRef(null);
  const currentTrackRef = useRef(null); // name of the track that SHOULD be playing
  const appPausedRef = useRef(false);   // true while app is in background
  const heldByGameRef = useRef(false);  // true while a minigame holds the music

  const musicEffectiveVolume = masterVolume * musicVolume;
  const soundEffectiveVolume = masterVolume * soundVolume;

  // Always-current volume so async load callbacks never use a stale value
  const volumeRef = useRef(musicEffectiveVolume);
  volumeRef.current = musicEffectiveVolume;

  // Each playMusic call gets an id. A load callback only counts if its id is
  // still the latest, so double-mounts / fast scene changes can't leave stray tracks.
  const loadIdRef = useRef(0);

  // Switch background music. Same track = do nothing (no restart).
  // Names are lowercased because Android raw resources must be lowercase.
  const playMusic = (rawName) => {
    if (!rawName) return;
    const name = String(rawName).toLowerCase();
    if (currentTrackRef.current === name) return;

    const prevName = currentTrackRef.current;
    currentTrackRef.current = name;
    const myId = ++loadIdRef.current;
    console.log('[audio] loading', name);

    const track = new Sound(name, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        // file missing / wrong name: keep the old song going
        console.log('[audio] DID NOT LOAD', name, error);
        if (loadIdRef.current === myId) currentTrackRef.current = prevName;
        return;
      }

      // a newer request replaced this one while it was loading
      if (loadIdRef.current !== myId) {
        track.release();
        return;
      }

      // swap: stop the old track only now that the new one is ready
      const old = bgmRef.current;
      if (old) old.stop(() => old.release());

      track.setVolume(volumeRef.current);
      track.setNumberOfLoops(-1);
      bgmRef.current = track;

      if (!appPausedRef.current && !heldByGameRef.current) {
        track.play((ok) => {
          if (!ok) console.log('[audio] playback failed', name);
        });
        console.log('[audio] playing', name);
      }
    });
  };

  useEffect(() => {
    Sound.setCategory('Playback');
    playMusic('somber'); // default / menu music

    const clicks = new Sound('click', Sound.MAIN_BUNDLE, (error) => {
      if (error) console.log('did not load', error);
    });
      clickref.current= clicks;


    return () => {
      loadIdRef.current += 1; // cancel any pending load
      const bgm = bgmRef.current;
      bgmRef.current = null;
      currentTrackRef.current = null;
      if (bgm) bgm.stop(() => bgm.release());
      clicks.release();
    };
  }, []);

  useEffect(() => {
    bgmRef.current?.setVolume(musicEffectiveVolume);
  }, [masterVolume, musicVolume]);

  // Pause when app goes to background, resume when it comes back
  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        appPausedRef.current = false;
        if (!heldByGameRef.current) bgmRef.current?.play();
      } else {
        appPausedRef.current = true;
        bgmRef.current?.pause();
      }
    });
    return () => sub.remove();
  }, []);

  const Playclick = () => {
    if (clickref.current) {
      clickref.current.setVolume(soundEffectiveVolume);
      clickref.current.stop();
      clickref.current.play();
    }
  };

  // Silence the music while a minigame is on screen
  const pauseMusic = () => {
    heldByGameRef.current = true;
    bgmRef.current?.pause();
  };

  const resumeMusic = () => {
    heldByGameRef.current = false;
    if (!appPausedRef.current) bgmRef.current?.play();
  };

  // stop audio, then close the app
  const Quitapp = () => {
    try {
      bgmRef.current?.stop();
      bgmRef.current?.release();
      clickref.current?.release();
    } catch (e) {
      console.log('audio cleanup error', e);
    }

    loadIdRef.current += 1;
    bgmRef.current = null;
    clickref.current = null;
    currentTrackRef.current = null;

    RNExitApp.exitApp();
  };

  return (
    <Audiostore.Provider
      value={{
        masterVolume,
        musicVolume,
        soundVolume,
        changeMasterVolume: setMasterVolume,
        changeMusicVolume: setMusicVolume,
        changeSoundVolume: setSoundVolume,
        Playclick,
        Quitapp,
        pauseMusic,
        resumeMusic,
        playMusic,
      }}
    >
      {children}
    </Audiostore.Provider>
  );
}

export function useAudio() {
  return useContext(Audiostore);
} 