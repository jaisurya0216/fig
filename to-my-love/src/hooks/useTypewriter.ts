import { useEffect, useState } from 'react';

export function useTypewriter(text: string, options: { speed?: number; startDelay?: number; active: boolean }) {
  const { speed = 55, startDelay = 0, active } = options;
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) {
      setDisplayed('');
      setDone(false);
      return;
    }

    let i = 0;
    let interval: ReturnType<typeof setInterval>;

    const start = () => {
      interval = setInterval(() => {
        i += 1;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
    };

    const timeout = setTimeout(start, startDelay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, speed, startDelay, active]);

  return { displayed, done };
}
