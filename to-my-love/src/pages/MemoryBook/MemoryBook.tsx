import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { memories } from '@/utils/memories';
import { useStore } from '@/store/useStore';

export function MemoryBook() {
  const [pageIndex, setPageIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const markMemoryViewed = useStore((s) => s.markMemoryViewed);
  const setTotalMemories = useStore((s) => s.setTotalMemories);

  useEffect(() => {
    setTotalMemories(memories.length);
  }, [setTotalMemories]);

  useEffect(() => {
    markMemoryViewed(memories[pageIndex].id);
  }, [pageIndex, markMemoryViewed]);

  const goNext = () => {
    if (pageIndex < memories.length - 1) {
      setDirection(1);
      setPageIndex((p) => p + 1);
    }
  };

  const goPrev = () => {
    if (pageIndex > 0) {
      setDirection(-1);
      setPageIndex((p) => p - 1);
    }
  };

  const memory = memories[pageIndex];

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-night-gradient px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="script-heading mb-10 text-center text-3xl md:text-4xl"
      >
        Our Memory Book
      </motion.h2>

      <div
        className="relative w-full max-w-xl"
        style={{ perspective: '1600px' }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={memory.id}
            custom={direction}
            initial={{ rotateY: direction === 1 ? 90 : -90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: direction === 1 ? -90 : 90, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformStyle: 'preserve-3d', transformOrigin: direction === 1 ? 'left' : 'right' }}
            className="glass-panel origin-center px-8 py-10 shadow-glowMd md:px-14 md:py-14"
          >
            <span className="mb-3 block text-xs uppercase tracking-[0.3em] text-sakura-300/80">
              {memory.date}
            </span>

            <h3 className="mb-5 font-display text-2xl text-moon-100 md:text-3xl">{memory.title}</h3>

            <div className="mb-6 flex h-48 w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 md:h-64">
              {memory.image ? (
                <img src={memory.image} alt={memory.title} className="h-full w-full rounded-xl object-cover" />
              ) : (
                <span className="text-sm text-white/30">photo goes here</span>
              )}
            </div>

            <p className="font-body text-base italic leading-relaxed text-white/80 md:text-lg">
              &ldquo;{memory.message}&rdquo;
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex items-center gap-6">
        <button
          onClick={goPrev}
          disabled={pageIndex === 0}
          className="glass-panel px-5 py-2 text-sm text-white/70 transition hover:text-sakura-200 disabled:opacity-30"
        >
          &larr; Prev
        </button>
        <span className="text-xs text-white/40">
          {pageIndex + 1} / {memories.length}
        </span>
        <button
          onClick={goNext}
          disabled={pageIndex === memories.length - 1}
          className="glass-panel px-5 py-2 text-sm text-white/70 transition hover:text-sakura-200 disabled:opacity-30"
        >
          Next &rarr;
        </button>
      </div>
    </section>
  );
}
