'use client';

import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface BookSpineProps {
  isOpen: boolean;
}

export default function BookSpine({ isOpen }: BookSpineProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const targetX = isOpen ? 0 : -2.35;
    const targetScaleX = isOpen ? 0.35 : 0.45;
    meshRef.current.position.x = THREE.MathUtils.damp(meshRef.current.position.x, targetX, 5, delta);
    meshRef.current.scale.x = THREE.MathUtils.damp(meshRef.current.scale.x, targetScaleX, 5, delta);
  });

  return (
    <mesh ref={meshRef} position={[-2.35, 0, -0.05]} castShadow receiveShadow>
      {/* Cylindre segmenté pour simuler l'arrondi du dos de livre */}
      <cylinderGeometry args={[0.22, 0.22, 5.8, 32, 1, false, -Math.PI / 2, Math.PI]} />
      <meshStandardMaterial
        color="#F0E5D0"
        roughness={0.7}
        metalness={0.1}
      />
    </mesh>
  );
}
