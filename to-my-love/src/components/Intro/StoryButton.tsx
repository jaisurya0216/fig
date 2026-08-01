import { motion } from 'framer-motion';
import { useState } from 'react';

interface StoryButtonProps {
  onClick: () => void;
}

export function StoryButton({ onClick }: StoryButtonProps) {
  const [hovered, setHovered] = useState(false);

  const sparkles = Array.from({ length: 8 }, (_, i) => i);

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className="group relative mt-12 rounded-full px-10 py-4 font-display text-lg tracking-wide text-moon-100 md:text-xl"
      style={{
        background: 'linear-gradient(135deg, rgba(247,102,171,0.25), rgba(138,111,216,0.25))',
        border: '1px solid rgba(255,255,255,0.25)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <motion.span
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: hovered
            ? '0 0 50px rgba(255,182,217,0.8), 0 0 90px rgba(199,148,255,0.5)'
            : '0 0 20px rgba(255,182,217,0.4)',
        }}
        transition={{ duration: 0.4 }}
      />

      {sparkles.map((i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute h-1 w-1 rounded-full bg-sakura-200"
          style={{
            left: `${10 + i * 10}%`,
            top: '50%',
          }}
          animate={
            hovered
              ? {
                  y: [0, -20 - Math.random() * 20],
                  x: [0, (Math.random() - 0.5) * 30],
                  opacity: [0, 1, 0],
                }
              : { opacity: 0 }
          }
          transition={{ duration: 1.2, repeat: hovered ? Infinity : 0, delay: i * 0.08 }}
        />
      ))}

      <span className="relative z-10">Step Into Our Story</span>
    </motion.button>
  );
}
