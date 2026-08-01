import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Trail {
  mesh: THREE.Line;
  active: boolean;
  progress: number;
  speed: number;
  start: THREE.Vector3;
  end: THREE.Vector3;
  delay: number;
}

/**
 * Renders a handful of streaking shooting stars at randomized intervals.
 * Each is a short line segment with additive-blended material, animated
 * manually inside useFrame rather than GSAP, since we need per-frame
 * geometry updates for the streak trail (GSAP would just be tweening a
 * scalar we'd re-apply here anyway).
 */
export function ShootingStars({ count = 4 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const trailsRef = useRef<Trail[]>([]);

  useEffect(() => {
    if (!groupRef.current) return;
    const trails: Trail[] = [];

    for (let i = 0; i < count; i++) {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-1.2, 0.6, 0),
      ]);
      const material = new THREE.LineBasicMaterial({
        color: '#fff2d6',
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
      });
      const mesh = new THREE.Line(geometry, material);
      groupRef.current.add(mesh);

      trails.push({
        mesh,
        active: false,
        progress: 0,
        speed: 0.6 + Math.random() * 0.4,
        start: new THREE.Vector3(),
        end: new THREE.Vector3(),
        delay: Math.random() * 12,
      });
    }

    trailsRef.current = trails;

    return () => {
      trails.forEach((t) => {
        t.mesh.geometry.dispose();
        (t.mesh.material as THREE.Material).dispose();
      });
    };
  }, [count]);

  useFrame((_, delta) => {
    trailsRef.current.forEach((t) => {
      if (!t.active) {
        t.delay -= delta;
        if (t.delay <= 0) {
          t.active = true;
          t.progress = 0;
          const startX = -20 - Math.random() * 10;
          const startY = 10 + Math.random() * 8;
          t.start.set(startX, startY, -10 - Math.random() * 10);
          t.end.set(startX + 35, startY - 14, t.start.z);
          t.mesh.position.copy(t.start);
        }
        return;
      }

      t.progress += delta * t.speed;
      const material = t.mesh.material as THREE.LineBasicMaterial;

      if (t.progress >= 1) {
        t.active = false;
        t.delay = 6 + Math.random() * 14;
        material.opacity = 0;
        return;
      }

      t.mesh.position.lerpVectors(t.start, t.end, t.progress);
      material.opacity = Math.sin(t.progress * Math.PI);

      const angle = Math.atan2(t.end.y - t.start.y, t.end.x - t.start.x);
      t.mesh.rotation.z = angle;
    });
  });

  return <group ref={groupRef} />;
}
