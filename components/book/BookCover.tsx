'use client';

import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useBookStore } from '@/lib/store';

interface BookCoverProps {
  isOpen: boolean;
}

export default function BookCover({ isOpen }: BookCoverProps) {
  const { openBook } = useBookStore();
  const frontHingeRef = useRef<THREE.Group>(null);
  const backCoverRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (!frontHingeRef.current) return;

    // Angle d'ouverture : 0 (fermé) à -165 degrés (-2.88 rad) quand ouvert
    const targetAngle = isOpen ? -Math.PI * 0.95 : 0;
    
    // Animation d'ouverture fluide avec lerp
    frontHingeRef.current.rotation.y = THREE.MathUtils.damp(
      frontHingeRef.current.rotation.y,
      targetAngle,
      4,
      delta
    );

    // Légère respiration invitant au clic quand le livre est fermé
    if (!isOpen && frontHingeRef.current) {
      const breathing = Math.sin(state.clock.elapsedTime * 2) * 0.015;
      const hoverLift = hovered ? 0.05 : 0;
      frontHingeRef.current.position.z = THREE.MathUtils.damp(
        frontHingeRef.current.position.z,
        0.2 + breathing + hoverLift,
        6,
        delta
      );
    } else {
      frontHingeRef.current.position.z = THREE.MathUtils.damp(
        frontHingeRef.current.position.z,
        0.05,
        4,
        delta
      );
    }
  });

  return (
    <group>
      {/* 4e de Couverture (Plateau arrière fixe) */}
      <mesh
        ref={backCoverRef}
        position={[isOpen ? -2.2 : 0, 0, -0.22]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[4.4, 5.8, 0.08]} />
        <meshStandardMaterial
          color="#EFE4D0"
          roughness={0.65}
          metalness={0.05}
        />
      </mesh>

      {/* Bloc tranche de pages intérieures (Paper block) */}
      <mesh position={[isOpen ? 2.15 : 0, 0, -0.08]} castShadow receiveShadow>
        <boxGeometry args={[4.2, 5.6, 0.2]} />
        <meshStandardMaterial
          color="#FAF3E6"
          roughness={0.85}
        />
      </mesh>

      {/* Pivot de la Couverture avant (Hinge sur le bord gauche) */}
      <group
        ref={frontHingeRef}
        position={[-2.2, 0, 0.2]}
        onPointerOver={() => !isOpen && setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => !isOpen && openBook()}
      >
        {/* Plaque de couverture avant décalée pour pivoter autour de la tranche */}
        <mesh position={[2.2, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[4.4, 5.8, 0.08]} />
          <meshStandardMaterial
            color={hovered && !isOpen ? "#FDF7EC" : "#FBF6EC"}
            roughness={0.55}
            metalness={0.08}
          />
        </mesh>

        {/* Liseré ornemental doré sur la couverture */}
        <mesh position={[2.2, 0, 0.045]}>
          <planeGeometry args={[4.1, 5.5]} />
          <meshStandardMaterial
            color="#B8863E"
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>
      </group>
    </group>
  );
}
