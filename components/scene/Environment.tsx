'use client';

import { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const count = 800;
  
  // Use state initializer to ensure this only runs once and is considered "safe"
  const [positions] = useState(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return pos;
  });

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#3B82F6"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  );
}

import { useStore } from '@/lib/store';

export default function Environment() {
  const currentIndex = useStore((s) => s.currentIndex);
  const fogRef = useRef<THREE.Fog>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  const colors = [
    '#3B82F6', // Hero (Blue)
    '#06B6D4', // About (Cyan)
    '#6366F1', // Skills (Indigo)
    '#3B82F6', // Projects (Blue)
    '#F59E0B', // Experience (Amber)
    '#3B82F6', // Contact (Blue)
  ];

  useFrame((_, delta) => {
    if (fogRef.current) {
      const targetColor = new THREE.Color(colors[currentIndex]);
      fogRef.current.color.lerp(targetColor, delta * 2);
    }
    if (lightRef.current) {
      const targetColor = new THREE.Color(colors[currentIndex]);
      lightRef.current.color.lerp(targetColor, delta * 2);
    }
  });

  return (
    <>
      <color attach="background" args={['#04080F']} />
      <fog ref={fogRef} attach="fog" args={['#04080F', 5, 25]} />
      
      <ambientLight intensity={0.4} />
      <pointLight ref={lightRef} position={[10, 10, 10]} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} color={colors[currentIndex]} intensity={0.5} />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Particles />
    </>
  );
}
