import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { memories } from '@/utils/memories';

export function Gallery() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-night-gradient px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="script-heading mb-14 text-center text-3xl md:text-4xl"
      >
        Our Gallery
      </motion.h2>

      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
        {memories.map((m, i) => (
          <motion.button
            key={m.id}
            onClick={() => setExpanded(m.id)}
            initial={{ opacity: 0, y: 30, rotate: (i % 2 === 0 ? -1 : 1) * (4 + i) }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            whileHover={{
              scale: 1.08,
              rotate: 0,
              boxShadow: '0 20px 60px rgba(247,102,171,0.35)',
            }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="w-40 rotate-2 rounded-sm bg-white/95 p-3 pb-8 text-left shadow-xl md:w-52"
            style={{ rotate: (i % 2 === 0 ? -1 : 1) * (4 + i) }}
          >
            <div className="flex h-32 w-full items-center justify-center bg-night-800/10 md:h-40">
              {m.image ? (
                <img src={m.image} alt={m.title} className="h-full w-full object-cover" />
              ) : (
                <span className="text-xs text-night-800/40">photo</span>
              )}
            </div>
            <p className="mt-3 truncate font-script text-lg text-night-800">{m.title}</p>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpanded(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="glass-panel max-w-md p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const m = memories.find((mm) => mm.id === expanded)!;
                return (
                  <>
                    <div className="mb-4 flex h-56 w-full items-center justify-center rounded-xl bg-white/5">
                      {m.image ? (
                        <img src={m.image} alt={m.title} className="h-full w-full rounded-xl object-cover" />
                      ) : (
                        <span className="text-sm text-white/30">photo goes here</span>
                      )}
                    </div>
                    <h3 className="mb-2 font-display text-xl text-sakura-200">{m.title}</h3>
                    <p className="text-sm italic text-white/70">{m.message}</p>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
