import { motion } from 'framer-motion';
import { Fireflies } from '@components/Intro/Fireflies';
import { Sakura } from '@components/Intro/Sakura';
import { useAllMemoriesViewed } from '@/store/useStore';

export function SecretGarden() {
  const unlocked = useAllMemoriesViewed();

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-night-gradient px-6 py-24 text-center">
      <div className="absolute inset-0 bg-aurora-gradient opacity-30" />

      {!unlocked ? (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative z-10 flex flex-col items-center gap-4"
        >
          <div className="glass-panel flex h-20 w-20 items-center justify-center rounded-full">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f766ab" strokeWidth="1.5">
              <rect x="4" y="10" width="16" height="10" rx="2" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>
          </div>
          <p className="font-display text-xl text-white/60 md:text-2xl">
            The Secret Garden is still asleep
          </p>
          <p className="max-w-sm text-sm text-white/40">
            Read through every memory in our book above to wake it up.
          </p>
        </motion.div>
      ) : (
        <>
          <Fireflies count={30} />
          <Sakura density="heavy" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* stylized sakura tree, built from layered blurred circles rather than an image asset */}
            <div className="relative mb-8 h-52 w-52 md:h-72 md:w-72">
              <div className="absolute bottom-0 left-1/2 h-24 w-4 -translate-x-1/2 rounded-full bg-gradient-to-t from-fairy-deep to-rosegold-500 md:h-32" />
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-sakura-300/70 blur-md animate-floaty"
                  style={{
                    width: 60 + (i % 3) * 20,
                    height: 60 + (i % 3) * 20,
                    left: `${10 + i * 11}%`,
                    top: `${(i % 3) * 15}%`,
                    animationDelay: `${i * 0.4}s`,
                  }}
                />
              ))}
            </div>

            <p className="script-heading mb-4 text-2xl md:text-3xl">A letter, just for you</p>
            <div className="glass-panel max-w-lg px-8 py-8 text-left shadow-glowMd">
              <p className="font-display text-base italic leading-relaxed text-white/85 md:text-lg">
                My dearest Figgy, if you&rsquo;re reading this, it means you stayed &mdash;
                through every page, every memory, all the way here. That&rsquo;s exactly
                how I feel about you: worth staying for, every single time. Thank you
                for being my favorite story.
              </p>
              <p className="mt-6 text-right font-script text-2xl text-sakura-200">Always yours</p>
            </div>
          </motion.div>
        </>
      )}
    </section>
  );
}
