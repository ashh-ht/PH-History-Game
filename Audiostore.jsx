import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { AppState, BackHandler } from 'react-native';
import Sound from 'react-native-sound';

const Audiostore = createContext(null);


const SFX = {
  // UI
  click1: { file: 'click1' },
  click2: { file: 'click2' },
  dialogueClick: { file: 'dialogue_click' },
  storyClick: { file: 'story_click' },
  pageFlipTab: { file: 'page_flip' },
  choose: { file: 'choose' },
  wrong: { file: 'wrong_answer' },
  correct: { file: 'correct_answer' },
  // story
  shipArrival: { file: 'ship_arrival' },
  sandThud: { file: 'sand_thud' },
  footstepsSand: { file: 'footsteps_sand' },
  footstepsGround: { file: 'footsteps_ground' },
  footstepsPavement: { file: 'footsteps_pavement' },
  marching: { file: 'marching' },
  running: { file: 'running' },
  hiking: { file: 'hiking' },
  hammer: { file: 'hammer' },
  construction: { file: 'construction' },
  courtroom: { file: 'courtroom' },
  churchBell: { file: 'church_bell' },
  stampPapers: { file: 'stamp_papers' },
  newspaper: { file: 'newspaper' },
  pagesFlipping: { file: 'pages_flipping' },
  singlePageFlip: { file: 'single_page_flip' },
  paperRip: { file: 'paper_rip' },
  quillWriting: { file: 'quill_writing' },
  cannonFire: { file: 'cannon_fire' },
  tar: { file: 'bar', loop: true },
  shoots: { file: 'shot' },
  chairSit: { file: 'chair_sit' },
  groundThud: { file: 'ground_thud' },
  windyFlag: { file: 'windy_flag' },
  doorOpen: { file: 'door_open' },
  oilLamp: { file: 'oil_lamp', loop: true },
  steamboat: { file: 'steamboat' },
  doorKnock: { file: 'door_knock' },
};

export function AudioProvider({ children }) {
  const [masterVolume, setMasterVolume] = useState(0.8);
  const [musicVolume, setMusicVolume] = useState(0.4);
  const [soundVolume, setSoundVolume] = useState(0.3);

  const bgmRef = useRef(null);
  const clickref = useRef(null);
  const currentTrackRef = useRef(null); // name of the track that SHOULD be playing
  const appPausedRef = useRef(false);   // true while app is in background
  const heldByGameRef = useRef(false);  // true while a minigame holds the music
  const sfxRef = useRef({});            // sound effects, loaded on first use

  const musicEffectiveVolume = masterVolume * musicVolume;
  const soundEffectiveVolume = masterVolume * soundVolume;

  const bgmDuckedRef = useRef(false);
  const duckTimeoutRef = useRef(null);

  const applyBgmVolume = () => {
    const duckMultiplier = bgmDuckedRef.current ? 0.5 : 1;
    bgmRef.current?.setVolume(musicEffectiveVolume * duckMultiplier);
  };
  // Always-current volumes so async callbacks never use a stale value
  const volumeRef = useRef(musicEffectiveVolume);
  volumeRef.current = musicEffectiveVolume;
  const sfxVolRef = useRef(soundEffectiveVolume);
  sfxVolRef.current = soundEffectiveVolume;

  // Each playMusic call gets an id. A load callback only counts if its id is
  // still the latest, so double-mounts / fast scene changes can't leave stray tracks.
  const loadIdRef = useRef(0);

  // ---------------------------------------------------
  // MUSIC
  // ---------------------------------------------------
  const lastTrackRef = useRef('somber');
  // Switch background music. Same track = do nothing (no restart).
  const playMusic = (rawName) => {
    if (!rawName) return;
    const name = String(rawName).toLowerCase();
    lastTrackRef.current = name;
    if (currentTrackRef.current === name) return;

    const prevName = currentTrackRef.current;
    currentTrackRef.current = name;
    const myId = ++loadIdRef.current;
    console.log('[audio] loading', name);

    const track = new Sound(name, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('[audio] DID NOT LOAD', name, error);
        if (loadIdRef.current === myId) currentTrackRef.current = prevName;
        return;
      }

      if (loadIdRef.current !== myId) {
        track.release();
        return;
      }

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
      if (error) console.log('did not load default click', error);
    });
    clickref.current = clicks;

    return () => {
      loadIdRef.current += 1;
      const bgm = bgmRef.current;
      bgmRef.current = null;
      currentTrackRef.current = null;
      if (bgm) bgm.stop(() => bgm.release());
      clicks.release();
    };
  }, []);

  // FIXED: Dependency array changed to [musicEffectiveVolume]
  useEffect(() => {
    bgmRef.current?.setVolume(musicEffectiveVolume);
  }, [musicEffectiveVolume]);

  // ---------------------------------------------------
  // SOUND EFFECTS (loaded the first time they are used)
  // ---------------------------------------------------

  const playSfx = (key) => {
    const def = SFX[key];
    if (!def) {
      console.log('[sfx] unknown key', key);
      return;
    }

    const fire = (snd) => {
      console.log('[sfx] playing:', key, 'volume:', sfxVolRef.current);

      snd.setVolume(Math.min(sfxVolRef.current * 2, 1));
      snd.stop(() => {
        snd.play((success) => {
          console.log('[sfx] playback result:', key, success);
        });
      });
    };

    const existing = sfxRef.current[key];
    if (existing) {
      if (existing.isLoaded()) fire(existing);
      return;
    }

    const snd = new Sound(def.file, Sound.MAIN_BUNDLE, (err) => {
      if (err) {
        console.log('[sfx] did not load', def.file, err);
        delete sfxRef.current[key];
        return;
      }
      if (def.loop) snd.setNumberOfLoops(-1);
      fire(snd);
    });
    sfxRef.current[key] = snd;
  };

  // Stop every looping effect (war, oil lamp, ...)
  const stopLoops = () => {
    Object.keys(SFX).forEach((key) => {
      if (SFX[key].loop && sfxRef.current[key]) {
        sfxRef.current[key].stop();
      }
    });
  };

  // Free all loaded effects when the provider unmounts
  useEffect(() => {
    return () => {
      Object.values(sfxRef.current).forEach((s) => s.release());
      sfxRef.current = {};
    };
  }, []);

  // ---------------------------------------------------
  // APP IN BACKGROUND / FOREGROUND
  // ---------------------------------------------------

useEffect(() => {
  const sub = AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      appPausedRef.current = false;

      if (!bgmRef.current) {
        // Quitapp (or a failed load) wiped the music, so reload it
        playMusic(lastTrackRef.current || 'somber');
      } else if (!heldByGameRef.current) {
        bgmRef.current.play();
      }

      // click sound was released in Quitapp, so recreate it
      if (!clickref.current) {
        clickref.current = new Sound('click', Sound.MAIN_BUNDLE, (error) => {
          if (error) console.log('did not load default click', error);
        });
      }
    } else {
      appPausedRef.current = true;
      bgmRef.current?.pause();
      stopLoops();
    }
  });
  return () => sub.remove();
}, []);

  // ---------------------------------------------------
  // BUTTON CLICK
  // ---------------------------------------------------

  const Playclick = () => {
    if (clickref.current) {
      clickref.current.setVolume(soundEffectiveVolume * 0.4);
      clickref.current.stop();
      clickref.current.play();
    } else {
      playSfx(Math.random() < 0.5 ? 'click1' : 'click2');
    }
  };

  // ---------------------------------------------------
  // MINIGAME HOLD
  // ---------------------------------------------------

  const pauseMusic = () => {
    heldByGameRef.current = true;
    bgmRef.current?.pause();
  };

  const resumeMusic = () => {
    heldByGameRef.current = false;
    if (!appPausedRef.current) bgmRef.current?.play();
  };

  // ---------------------------------------------------
  // QUIT
  // ---------------------------------------------------

  // Stop audio, then close the app (BackHandler is built in, no extra package)
  const Quitapp = () => {
    try {
      stopLoops();
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
    heldByGameRef.current = false;
    BackHandler.exitApp();
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
        playSfx,
        stopLoops,
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