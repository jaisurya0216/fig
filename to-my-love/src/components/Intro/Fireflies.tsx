import { useMemo } from 'react';
import { motion } from 'framer-motion';

export function Fireflies({ count = 22 }: { count?: number }) {
  const flies = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 3 + Math.random() * 4,
        duration: 4 + Math.random() * 6,
        delay: Math.random() * 5,
        moveX: (Math.random() - 0.5) * 120,
        moveY: (Math.random() - 0.5) * 120,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {flies.map((f) => (
        <motion.span
          key={f.id}
          className="absolute rounded-full bg-moon-glow"
          style={{
            top: `${f.top}%`,
            left: `${f.left}%`,
            width: f.size,
            height: f.size,
            boxShadow: '0 0 8px 2px rgba(255,233,184,0.9), 0 0 16px 4px rgba(247,102,171,0.5)',
          }}
          animate={{
            x: [0, f.moveX, 0],
            y: [0, f.moveY, 0],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: f.duration,
            delay: f.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
