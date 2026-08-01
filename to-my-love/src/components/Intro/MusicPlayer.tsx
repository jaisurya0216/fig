import { useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';

const TRACK_SRC = '/music/theme.mp3';

export function MusicPlayer() {
  const howlRef = useRef<Howl | null>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const musicUnlocked = useStore((s) => s.musicUnlocked);
  const setMusicUnlocked = useStore((s) => s.setMusicUnlocked);
  const rafRef = useRef<number>();

  useEffect(() => {
    const howl = new Howl({
      src: [TRACK_SRC],
      loop: true,
      volume,
      html5: true,
      onload: () => setReady(true),
      onloaderror: () => setReady(false),
    });
    howlRef.current = howl;

    return () => {
      howl.unload();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (musicUnlocked && ready && howlRef.current && !playing) {
      howlRef.current.play();
      setPlaying(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [musicUnlocked, ready]);

  useEffect(() => {
    const tick = () => {
      const howl = howlRef.current;
      if (howl && howl.playing()) {
        const dur = howl.duration() || 1;
        setProgress((howl.seek() as number) / dur);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const togglePlay = () => {
    const howl = howlRef.current;
    if (!howl) return;
    setMusicUnlocked(true);
    if (playing) {
      howl.pause();
      setPlaying(false);
    } else {
      howl.play();
      setPlaying(true);
    }
  };

  const toggleMute = () => {
    const howl = howlRef.current;
    if (!howl) return;
    const next = !muted;
    howl.mute(next);
    setMuted(next);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    howlRef.current?.volume(v);
    if (muted && v > 0) {
      setMuted(false);
      howlRef.current?.mute(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className="glass-panel fixed right-4 top-4 z-50 flex items-center gap-3 px-4 py-2 md:right-8 md:top-8"
    >
      <button
        onClick={togglePlay}
        aria-label={playing ? 'Pause music' : 'Play music'}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-sakura-400/20 text-sakura-200 transition hover:bg-sakura-400/40"
      >
        {playing ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <rect x="2" y="1" width="3.5" height="12" rx="1" />
            <rect x="8.5" y="1" width="3.5" height="12" rx="1" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <path d="M2 1.5v11l10-5.5-10-5.5z" />
          </svg>
        )}
      </button>

      <div className="hidden h-1 w-16 overflow-hidden rounded-full bg-white/10 md:block">
        <div
          className="h-full rounded-full bg-gradient-to-r from-sakura-400 to-fairy-purple transition-[width] duration-200"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <button
        onClick={toggleMute}
        aria-label={muted ? 'Unmute' : 'Mute'}
        className="text-sakura-200/80 transition hover:text-sakura-200"
      >
        {muted || volume === 0 ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M11 5 6 9H2v6h4l5 4V5Z" />
            <path d="m17 9 5 6M22 9l-5 6" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M11 5 6 9H2v6h4l5 4V5Z" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 6a9 9 0 0 1 0 12" />
          </svg>
        )}
      </button>

      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={muted ? 0 : volume}
        onChange={handleVolume}
        className="hidden w-14 accent-sakura-400 md:block"
        aria-label="Volume"
      />
    </motion.div>
  );
}
