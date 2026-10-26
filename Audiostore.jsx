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

const MUSIC_GAIN = 0.5;
const SFX_GAIN = 3;
const CLICK_GAIN = 0.8;

export function AudioProvider({ children }) {
  const [masterVolume, setMasterVolume] = useState(0.8);
  const [musicVolume, setMusicVolume] = useState(0.4);
  const [soundVolume, setSoundVolume] = useState(0.3);

  const bgmRef = useRef(null);
  const clickref = useRef(null);
  const currentTrackRef = useRef(null); 
  const appPausedRef = useRef(false);   
  const heldByGameRef = useRef(false);  
  const sfxRef = useRef({});          

  const musicEffectiveVolume = masterVolume * musicVolume * MUSIC_GAIN;
  const soundEffectiveVolume = masterVolume * soundVolume;

  const bgmDuckedRef = useRef(false);
  const duckTimeoutRef = useRef(null);

  const applyBgmVolume = () => {
    const duckMultiplier = bgmDuckedRef.current ? 0.5 : 1;
    bgmRef.current?.setVolume(musicEffectiveVolume * duckMultiplier);
  };

  const volumeRef = useRef(musicEffectiveVolume);
  volumeRef.current = musicEffectiveVolume;
  const sfxVolRef = useRef(soundEffectiveVolume);
  sfxVolRef.current = soundEffectiveVolume;

  const loadIdRef = useRef(0);


  const lastTrackRef = useRef('somber');

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
    playMusic('somber');

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


  useEffect(() => {
    bgmRef.current?.setVolume(musicEffectiveVolume);
  }, [musicEffectiveVolume]);


  const playSfx = (key) => {
    const def = SFX[key];
    if (!def) {
      console.log('[sfx] unknown key', key);
      return;
    }

    const fire = (snd) => {
      console.log('[sfx] playing:', key, 'volume:', sfxVolRef.current);

      snd.setVolume(Math.min(sfxVolRef.current * SFX_GAIN, 1));
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


  const stopLoops = () => {
    Object.keys(SFX).forEach((key) => {
      if (SFX[key].loop && sfxRef.current[key]) {
        sfxRef.current[key].stop();
      }
    });
  };


  useEffect(() => {
    return () => {
      Object.values(sfxRef.current).forEach((s) => s.release());
      sfxRef.current = {};
    };
  }, []);


useEffect(() => {
  const sub = AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      appPausedRef.current = false;

      if (!bgmRef.current) {

        playMusic(lastTrackRef.current || 'somber');
      } else if (!heldByGameRef.current) {
        bgmRef.current.play();
      }


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


  const Playclick = () => {
    if (clickref.current) {
      clickref.current.setVolume(Math.min(soundEffectiveVolume * CLICK_GAIN, 1));
      clickref.current.stop();
      clickref.current.play();
    } else {
      playSfx(Math.random() < 0.5 ? 'click1' : 'click2');
    }
  };

 
  const pauseMusic = () => {
    heldByGameRef.current = true;
    bgmRef.current?.pause();
  };

  const resumeMusic = () => {
    heldByGameRef.current = false;
    if (!appPausedRef.current) bgmRef.current?.play();
  };

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