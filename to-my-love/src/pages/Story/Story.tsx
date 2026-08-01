import { motion } from 'framer-motion';
import { Fireflies } from '@components/Intro/Fireflies';
import { Sakura } from '@components/Intro/Sakura';

export function Story() {
  return (
    <section className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-night-gradient px-6 text-center">
      <div className="absolute inset-0 bg-aurora-gradient opacity-40" />
      <Fireflies count={26} />
      <Sakura density="light" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4 }}
        className="relative z-10 max-w-2xl"
      >
        <p className="script-heading mb-4 text-3xl md:text-4xl">Welcome to our story</p>
        <p className="font-body text-base leading-relaxed text-white/70 md:text-lg">
          Every page ahead holds a moment we shared. Turn through them slowly &mdash;
          there&rsquo;s a secret waiting for you at the end.
        </p>
      </motion.div>

      <motion.div
        className="absolute bottom-10 flex flex-col items-center gap-2 text-white/50"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs uppercase tracking-[0.3em]">Scroll</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="currentColor">
          <rect x="1" y="1" width="14" height="22" rx="7" strokeWidth="1.2" />
          <circle cx="8" cy="7" r="1.6" fill="currentColor" />
        </svg>
      </motion.div>
    </section>
  );
}
