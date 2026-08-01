import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MoonProps {
  position?: [number, number, number];
  scale?: number;
}

export function Moon({ position = [8, 5, -14], scale = 1 }: MoonProps) {
  const moonRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (moonRef.current) {
      moonRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
    if (haloRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.03;
      haloRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* outer soft halo */}
      <mesh ref={haloRef}>
        <sphereGeometry args={[3.2, 32, 32]} />
        <meshBasicMaterial color="#ffe9b8" transparent opacity={0.08} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.4, 32, 32]} />
        <meshBasicMaterial color="#ffe9b8" transparent opacity={0.12} />
      </mesh>
      {/* moon body */}
      <mesh ref={moonRef}>
        <sphereGeometry args={[1.6, 64, 64]} />
        <meshStandardMaterial
          color="#fff6e0"
          emissive="#ffe9b8"
          emissiveIntensity={0.6}
          roughness={0.9}
          metalness={0}
        />
      </mesh>
      <pointLight color="#ffe9b8" intensity={8} distance={40} decay={2} />
    </group>
  );
}
