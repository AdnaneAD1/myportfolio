'use client';

import React from 'react';

interface TableShadowProps {
  isOpen: boolean;
}

export default function TableShadow({ isOpen }: TableShadowProps) {
  return (
    <group position={[0, -2.4, -0.2]}>
      {/* Ombre diffuse principale sous le livre */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[isOpen ? 10.5 : 6.5, 7.5]} />
        <meshBasicMaterial
          color="#3A2814"
          transparent
          opacity={0.16}
          depthWrite={false}
        />
      </mesh>

      {/* Ombre plus sombre et concentrée directement sous la reliure */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[isOpen ? -0.1 : -1.8, 0.01, 0]}>
        <planeGeometry args={[isOpen ? 2.5 : 1.2, 7.2]} />
        <meshBasicMaterial
          color="#1E2A38"
          transparent
          opacity={0.25}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
