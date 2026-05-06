'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface Props { active: boolean }

export function HeroObject({ active }: Props) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const targetScale = active ? 1 : 0.2;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 3);
    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity += ((active ? 0.25 : 0) - mat.opacity) * delta * 3;
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.3;
  });

  return (
    <group position={[0, 0, -12]}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={meshRef}>
          <torusKnotGeometry args={[1.2, 0.4, 128, 16]} />
          <meshBasicMaterial color="#3B82F6" wireframe transparent opacity={0} />
        </mesh>
      </Float>
    </group>
  );
}

export function AboutObject({ active }: Props) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const targetScale = active ? 1.2 : 0.2;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 3);
    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity += ((active ? 0.3 : 0) - mat.opacity) * delta * 3;
    meshRef.current.rotation.y += delta * 0.5;
  });
  return (
    <group position={[-4, 1, -6]}>
      <Float speed={2}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color="#06B6D4" wireframe transparent opacity={0} />
        </mesh>
      </Float>
    </group>
  );
}

export function SkillsObject({ active }: Props) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const targetScale = active ? 1 : 0.2;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 3);
    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity += ((active ? 0.35 : 0) - mat.opacity) * delta * 3;
    meshRef.current.rotation.z += delta * 0.4;
  });
  return (
    <group position={[4, -1.5, -5]}>
      <Float speed={1.2}>
        <mesh ref={meshRef}>
          <dodecahedronGeometry args={[1.2, 0]} />
          <meshBasicMaterial color="#3B82F6" wireframe transparent opacity={0} />
        </mesh>
      </Float>
    </group>
  );
}

export function ProjectsObject({ active }: Props) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const targetScale = active ? 1.5 : 0.2;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 3);
    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity += ((active ? 0.25 : 0) - mat.opacity) * delta * 3;
    meshRef.current.rotation.x += delta * 0.6;
  });
  return (
    <group position={[-3, -2, -7]}>
      <Float speed={3}>
        <mesh ref={meshRef}>
          <octahedronGeometry args={[1, 2]} />
          <meshBasicMaterial color="#06B6D4" wireframe transparent opacity={0} />
        </mesh>
      </Float>
    </group>
  );
}

export function ExperienceObject({ active }: Props) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const targetScale = active ? 1.3 : 0.2;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 3);
    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity += ((active ? 0.3 : 0) - mat.opacity) * delta * 3;
    meshRef.current.rotation.y += delta * 0.4;
  });
  return (
    <group position={[3.5, 2, -6]}>
      <Float speed={1.8}>
        <mesh ref={meshRef}>
          <tetrahedronGeometry args={[1.5, 0]} />
          <meshBasicMaterial color="#F59E0B" wireframe transparent opacity={0} />
        </mesh>
      </Float>
    </group>
  );
}

export function ContactObject({ active }: Props) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const targetScale = active ? 2 : 0.2;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 3);
    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity += ((active ? 0.2 : 0) - mat.opacity) * delta * 3;
    meshRef.current.rotation.x += delta * 0.1;
  });
  return (
    <group position={[0, 0, -8]}>
      <Float speed={1}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[2, 32, 32]} />
          <meshBasicMaterial color="#3B82F6" wireframe transparent opacity={0} />
        </mesh>
      </Float>
    </group>
  );
}
