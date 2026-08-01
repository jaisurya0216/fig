import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface SakuraProps {
  count?: number;
  density?: 'light' | 'medium' | 'heavy';
}

function Petal({ delay, duration, left, size, drift }: { delay: number; duration: number; left: number; size: number; drift: number }) {
  return (
    <motion.div
      className="pointer-events-none absolute top-[-5%]"
      style={{ left: `${left}%` }}
      initial={{ y: '-10vh', x: 0, opacity: 0, rotate: 0 }}
      animate={{
        y: '110vh',
        x: [0, drift, -drift * 0.6, drift * 0.3, 0],
        opacity: [0, 1, 1, 0.8, 0],
        rotate: [0, 180, 360, 540],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
        x: { duration, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <path
          d="M16 2C20 8 28 12 28 18C28 24 22 28 16 30C10 28 4 24 4 18C4 12 12 8 16 2Z"
          fill="url(#petalGradient)"
          opacity="0.85"
        />
        <defs>
          <linearGradient id="petalGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffd1e6" />
            <stop offset="100%" stopColor="#f766ab" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

export function Sakura({ count, density = 'medium' }: SakuraProps) {
  const resolvedCount = count ?? { light: 10, medium: 20, heavy: 34 }[density];

  const petals = useMemo(
    () =>
      Array.from({ length: resolvedCount }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 12 + Math.random() * 16,
        duration: 9 + Math.random() * 8,
        delay: Math.random() * 10,
        drift: 40 + Math.random() * 60,
      })),
    [resolvedCount]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((p) => (
        <Petal key={p.id} left={p.left} size={p.size} duration={p.duration} delay={p.delay} drift={p.drift} />
      ))}
    </div>
  );
}
