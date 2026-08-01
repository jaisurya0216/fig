import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { textToPoints } from '@utils/textToPoints';

interface StarNameFormationProps {
  text: string;
  active: boolean; // when true, stars converge into the text; when false, they scatter
  fontSize?: number;
  sampleGap?: number;
  scale?: number;
  color?: string;
  position?: [number, number, number];
}

export function StarNameFormation({
  text,
  active,
  fontSize = 200,
  sampleGap = 5,
  scale = 0.03,
  color = '#ffffff',
  position = [0, 0, 0],
}: StarNameFormationProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const progressRef = useRef(0);

  const targetPoints = useMemo(
    () => textToPoints(text, { fontSize, sampleGap, scale }),
    [text, fontSize, sampleGap, scale]
  );

  const count = targetPoints.length;

  const { startPositions, endPositions, currentPositions } = useMemo(() => {
    const start = new Float32Array(count * 3);
    const end = new Float32Array(count * 3);
    const current = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // scatter start positions in a wide sphere
      const r = 8 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      start[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      start[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      start[i * 3 + 2] = r * Math.cos(phi);

      end[i * 3] = targetPoints[i][0];
      end[i * 3 + 1] = targetPoints[i][1];
      end[i * 3 + 2] = targetPoints[i][2];

      current[i * 3] = start[i * 3];
      current[i * 3 + 1] = start[i * 3 + 1];
      current[i * 3 + 2] = start[i * 3 + 2];
    }

    return { startPositions: start, endPositions: end, currentPositions: current };
  }, [count, targetPoints]);

  useEffect(() => {
    progressRef.current = active ? 0 : 1;
  }, [active, text]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const target = active ? 1 : 0;
    progressRef.current = THREE.MathUtils.damp(progressRef.current, target, 2.2, delta);

    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const t = progressRef.current;
    const eased = t * t * (3 - 2 * t); // smoothstep

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const wobble = active ? Math.sin(state.clock.elapsedTime * 2 + i) * 0.02 * (1 - eased) : 0;
      currentPositions[idx] = THREE.MathUtils.lerp(startPositions[idx], endPositions[idx], eased) + wobble;
      currentPositions[idx + 1] =
        THREE.MathUtils.lerp(startPositions[idx + 1], endPositions[idx + 1], eased) + wobble;
      currentPositions[idx + 2] = THREE.MathUtils.lerp(startPositions[idx + 2], endPositions[idx + 2], eased);
    }

    posAttr.needsUpdate = true;
  });

  if (count === 0) return null;

  return (
    <points ref={pointsRef} position={position}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[currentPositions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.11}
        color={color}
        transparent
        opacity={0.95}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
