import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { StarNameFormation } from '@components/Intro/StarNameFormation';
import { Stars } from '@components/Intro/Stars';

export function Ending() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });
  const [stage, setStage] = useState<'text' | 'heart' | 'final'>('text');

  useEffect(() => {
    if (!inView) return;
    const t1 = setTimeout(() => setStage('heart'), 3200);
    const t2 = setTimeout(() => setStage('final'), 6200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [inView]);

  return (
    <section ref={ref} className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-night-950">
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 55 }} dpr={[1, 1.6]}>
          <color attach="background" args={['#05040c']} />
          <ambientLight intensity={0.1} />
          <Stars count={inView ? 3000 : 200} />
          <StarNameFormation
            text="I Love You Figgy"
            active={inView && stage === 'text'}
            fontSize={130}
            sampleGap={4}
            scale={0.022}
            color="#ffd1e6"
          />
          <EffectComposer multisampling={0}>
            <Bloom intensity={1} luminanceThreshold={0.1} mipmapBlur />
          </EffectComposer>
        </Canvas>
      </div>

      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage === 'heart' ? 1 : 0, scale: stage === 'heart' ? 1 : 0.7 }}
        transition={{ duration: 1.5 }}
      >
        <svg width="220" height="200" viewBox="0 0 220 200" fill="none">
          <motion.path
            d="M110 190C40 140 10 100 10 62C10 30 34 8 62 8C82 8 100 20 110 40C120 20 138 8 158 8C186 8 210 30 210 62C210 100 180 140 110 190Z"
            stroke="#f766ab"
            strokeWidth="2"
            fill="rgba(247,102,171,0.12)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: stage === 'heart' || stage === 'final' ? 1 : 0 }}
            transition={{ duration: 2 }}
          />
        </svg>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-0 bg-night-950"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage === 'final' ? 1 : 0 }}
        transition={{ duration: 2 }}
      />

      <motion.div
        className="relative z-10 max-w-xl px-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage === 'final' ? 1 : 0 }}
        transition={{ duration: 1.5, delay: 0.6 }}
      >
        <p className="script-heading text-2xl leading-relaxed md:text-3xl">
          No matter where life takes us...
          <br />
          You&rsquo;ll always be my favorite place.
        </p>
      </motion.div>
    </section>
  );
}
