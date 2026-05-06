'use client';

import { useFrame } from '@react-three/fiber';
import { useMouse } from '@/hooks/useMouse';
import * as THREE from 'three';

export default function CameraRig() {
  const mouse = useMouse();
  
  useFrame((state) => {
    // Smoothly interpolate camera position based on mouse
    state.camera.position.lerp(
      new THREE.Vector3(mouse.current.x * 0.5, mouse.current.y * 0.5, 5),
      0.05
    );
    
    // Look slightly towards the center
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}
