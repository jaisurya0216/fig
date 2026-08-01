import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarScene } from '@components/Intro/StarScene';
import { Sakura } from '@components/Intro/Sakura';
import { StoryButton } from '@components/Intro/StoryButton';
import { SceneTransition } from '@components/Intro/SceneTransition';
import { useTypewriter } from '@/hooks/useTypewriter';
import { useStore } from '@/store/useStore';

type Phase = 'black' | 'line1' | 'line2' | 'nameForm' | 'reveal' | 'flying';

interface LandingProps {
  onEnterStory: () => void;
}

export function Landing({ onEnterStory }: LandingProps) {
  const [phase, setPhase] = useState<Phase>('black');
  const setMusicUnlocked = useStore((s) => s.setMusicUnlocked);

  const line1 = useTypewriter('Some people wish upon stars...', {
    active: phase === 'line1',
    speed: 55,
  });
  const line2 = useTypewriter('I found mine.', {
    active: phase === 'line2',
    speed: 65,
  });

  useEffect(() => {
    const t = setTimeout(() => setPhase('line1'), 1800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase === 'line1' && line1.done) {
      const t = setTimeout(() => setPhase('line2'), 1200);
      return () => clearTimeout(t);
    }
  }, [phase, line1.done]);

  useEffect(() => {
    if (phase === 'line2' && line2.done) {
      const t = setTimeout(() => setPhase('nameForm'), 1400);
      return () => clearTimeout(t);
    }
  }, [phase, line2.done]);

  useEffect(() => {
    if (phase === 'nameForm') {
      const t = setTimeout(() => setPhase('reveal'), 2600);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const handleEnter = useCallback(() => {
    setMusicUnlocked(true);
    setPhase('flying');
    const t = setTimeout(() => onEnterStory(), 3200);
    return () => clearTimeout(t);
  }, [onEnterStory, setMusicUnlocked]);

  const showText = phase === 'line1' || phase === 'line2';
  const showReveal = phase === 'reveal' || phase === 'flying';

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-night-950">
      <StarScene
        stage={
          phase === 'nameForm'
            ? 'nameForm'
            : phase === 'reveal' || phase === 'flying'
              ? 'reveal'
              : 'dark'
        }
        flying={phase === 'flying'}
      />

      {showReveal && <Sakura density="light" />}

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <AnimatePresence mode="wait">
          {showText && (
            <motion.p
              key={phase}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="glow-text font-display text-2xl italic text-moon-100 md:text-4xl"
            >
              {phase === 'line1' ? line1.displayed : line2.displayed}
              <span className="animate-pulse">|</span>
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showReveal && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.4 }}
              className="mt-40 flex flex-col items-center md:mt-56"
            >
              <p className="script-heading text-xl leading-relaxed md:text-2xl">
                In every lifetime...
                <br />
                In every universe...
                <br />
                I&rsquo;d still find you.
              </p>

              <div className="pointer-events-auto">
                <StoryButton onClick={handleEnter} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SceneTransition active={phase === 'flying'} />
    </div>
  );
}
