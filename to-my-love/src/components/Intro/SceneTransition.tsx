import { motion, AnimatePresence } from 'framer-motion';
import { Sakura } from './Sakura';

interface SceneTransitionProps {
  active: boolean;
}

export function SceneTransition({ active }: SceneTransitionProps) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Sakura density="heavy" />

          <motion.div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,4,12,0.6)_70%)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.6 }}
          />

          <motion.div
            className="absolute inset-0 bg-night-950"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
