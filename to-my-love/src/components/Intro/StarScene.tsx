import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { Stars } from './Stars';
import { ShootingStars } from './ShootingStars';
import { Moon } from './Moon';
import { Nebula } from './Nebula';
import { StarNameFormation } from './StarNameFormation';

export type IntroStage = 'dark' | 'typing1' | 'typing2' | 'nameForm' | 'reveal';

interface CameraRigProps {
  flying: boolean;
}

function CameraRig({ flying }: CameraRigProps) {
  const targetZ = useRef(6);

  useFrame((state, delta) => {
    targetZ.current = flying ? -40 : 6;
    state.camera.position.z = THREE.MathUtils.damp(
      state.camera.position.z,
      targetZ.current,
      flying ? 0.9 : 1.4,
      delta
    );
    state.camera.position.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.3;
    state.camera.position.y = Math.cos(state.clock.elapsedTime * 0.06) * 0.2;
    state.camera.lookAt(0, 0, flying ? -50 : 0);

    if (flying) {
      (state.camera as THREE.PerspectiveCamera).fov = THREE.MathUtils.damp(
        (state.camera as THREE.PerspectiveCamera).fov,
        95,
        0.6,
        delta
      );
      (state.camera as THREE.PerspectiveCamera).updateProjectionMatrix();
    }
  });

  return null;
}

interface StarSceneProps {
  stage: IntroStage;
  flying: boolean;
}

export function StarScene({ stage, flying }: StarSceneProps) {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55, near: 0.1, far: 200 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.8]}
      >
        <color attach="background" args={['#05040c']} />
        <ambientLight intensity={0.15} />

        <Suspense fallback={null}>
          <Nebula />
          <Stars count={stage === 'dark' ? 60 : 4000} />
          <ShootingStars count={4} />
          <Moon position={[8, 5, -14]} scale={stage === 'reveal' ? 1.15 : 0.9} />
          <StarNameFormation
            text="Figgy"
            active={stage === 'nameForm' || stage === 'reveal'}
            color="#ffd1e6"
          />
        </Suspense>

        <CameraRig flying={flying} />

        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.9}
            luminanceThreshold={0.15}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.15} darkness={0.9} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
