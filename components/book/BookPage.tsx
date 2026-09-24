'use client';

import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useBookStore } from '@/lib/store';

interface BookPageProps {
  isOpen: boolean;
}

export default function BookPage({ isOpen }: BookPageProps) {
  const { isTurning, direction, setTurning, currentPage } = useBookStore();
  const pagePivotRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const currentAngle = useRef(0);
  const isAnimating = useRef(false);

  // Détection du début d'animation de tournage
  React.useEffect(() => {
    if (isTurning && pagePivotRef.current) {
      isAnimating.current = true;
      // Si direction forward : part de 0 vers -PI. Si backward : part de -PI vers 0.
      if (direction === 'forward') {
        currentAngle.current = 0;
      } else {
        currentAngle.current = -Math.PI;
      }
    }
  }, [isTurning, direction, currentPage]);

  useFrame((_, delta) => {
    if (!isAnimating.current || !pagePivotRef.current || !meshRef.current) {
      if (pagePivotRef.current) {
        pagePivotRef.current.rotation.y = 0;
      }
      return;
    }

    const targetAngle = direction === 'forward' ? -Math.PI : 0;
    
    // Vitesse fluide de rotation
    currentAngle.current = THREE.MathUtils.damp(
      currentAngle.current,
      targetAngle,
      5.5,
      delta
    );

    pagePivotRef.current.rotation.y = currentAngle.current;

    // Simulation de courbure (page curl) : la page s'incurve au milieu du tournage
    const progress = Math.abs(currentAngle.current / Math.PI); // 0 -> 1
    const curl = Math.sin(progress * Math.PI) * 0.22;
    meshRef.current.rotation.z = (direction === 'forward' ? -curl : curl) * 0.5;

    // Fin d'animation quand l'angle est presque atteint
    if (Math.abs(currentAngle.current - targetAngle) < 0.02) {
      pagePivotRef.current.rotation.y = targetAngle;
      meshRef.current.rotation.z = 0;
      isAnimating.current = false;
      setTurning(false);
    }
  });

  if (!isOpen) return null;

  return (
    <group ref={pagePivotRef} position={[0, 0, 0.02]}>
      {/* Mesh de la page volante articulée autour du centre (x=0) */}
      <mesh
        ref={meshRef}
        position={[2.1, 0, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[4.2, 5.6, 0.015]} />
        <meshStandardMaterial
          color="#FAF5E8"
          roughness={0.8}
          metalness={0.02}
        />
      </mesh>
    </group>
  );
}
