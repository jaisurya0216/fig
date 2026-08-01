import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Nebula is implemented as a few large, softly-colored, semi-transparent
 * sprites drifting slowly — a cheap but effective substitute for a full
 * volumetric shader, keeping this performant on mobile GPUs.
 */
export function Nebula() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      child.position.x += Math.sin(state.clock.elapsedTime * 0.05 + i) * 0.002;
      child.position.y += Math.cos(state.clock.elapsedTime * 0.04 + i) * 0.0015;
    });
  });

  const blobs = [
    { pos: [-14, 4, -25] as [number, number, number], color: '#8a6fd8', size: 18 },
    { pos: [12, -3, -30] as [number, number, number], color: '#f766ab', size: 16 },
    { pos: [0, 8, -28] as [number, number, number], color: '#6b4fb0', size: 20 },
  ];

  return (
    <group ref={groupRef}>
      {blobs.map((b, i) => (
        <mesh key={i} position={b.pos}>
          <planeGeometry args={[b.size, b.size]} />
          <meshBasicMaterial
            color={b.color}
            transparent
            opacity={0.08}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
