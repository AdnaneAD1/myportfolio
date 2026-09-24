'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useBookStore } from '@/lib/store';
import TableShadow from './TableShadow';
import BookCover from './BookCover';
import BookSpine from './BookSpine';
import BookPage from './BookPage';

function CameraAndSceneController() {
  const { isOpen } = useBookStore();
  const mouseRef = useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    // Position cible de caméra selon état ouvert/fermé
    const targetZ = isOpen ? 9.2 : 8.8;
    const targetY = isOpen ? 0.1 : -0.2;
    const targetX = isOpen ? 0 : -0.2;

    // Légère parallaxe subtile avec la souris
    const mouseParallaxX = mouseRef.current.x * 0.25;
    const mouseParallaxY = -mouseRef.current.y * 0.18;

    state.camera.position.x = THREE.MathUtils.damp(
      state.camera.position.x,
      targetX + mouseParallaxX,
      3,
      delta
    );
    state.camera.position.y = THREE.MathUtils.damp(
      state.camera.position.y,
      targetY + mouseParallaxY,
      3,
      delta
    );
    state.camera.position.z = THREE.MathUtils.damp(
      state.camera.position.z,
      targetZ,
      3,
      delta
    );

    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function BookScene() {
  const { isOpen } = useBookStore();

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0, -0.2, 8.8], fov: 38 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Lumières chaudes style lampe de bureau & lumière d'atelier */}
        <ambientLight color="#FFF8EE" intensity={0.9} />

        <directionalLight
          position={[5, 8, 7]}
          intensity={1.6}
          color="#FFE9CA"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={20}
          shadow-camera-near={1}
          shadow-camera-left={-6}
          shadow-camera-right={6}
          shadow-camera-top={6}
          shadow-camera-bottom={-6}
          shadow-bias={-0.0001}
        />

        {/* Réflecteur doux opposé pour déboucher les ombres */}
        <directionalLight
          position={[-5, 3, -2]}
          intensity={0.5}
          color="#D9B876"
        />

        {/* Contrôleur caméra dynamique */}
        <CameraAndSceneController />

        {/* Composants 3D du livre */}
        <group position={[0, 0, 0]}>
          <TableShadow isOpen={isOpen} />
          <BookCover isOpen={isOpen} />
          <BookSpine isOpen={isOpen} />
          <BookPage isOpen={isOpen} />
        </group>
      </Canvas>
    </div>
  );
}
