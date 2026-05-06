'use client';

import { Canvas } from '@react-three/fiber';
import { useStore } from '@/lib/store';
import Environment from './Environment';
import CameraRig from './CameraRig';
import { 
  HeroObject, 
  AboutObject, 
  SkillsObject, 
  ProjectsObject, 
  ExperienceObject, 
  ContactObject 
} from './objects/SectionObjects';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

export default function SceneCanvas() {
  const currentIndex = useStore((s) => s.currentIndex);

  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ 
        antialias: true, 
        alpha: true,
        powerPreference: "high-performance" 
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <Environment />
      <CameraRig />

      <EffectComposer>
        <Bloom 
          luminanceThreshold={0.2} 
          mipmapBlur 
          intensity={1.2} 
          radius={0.4} 
        />
        
        <HeroObject active={currentIndex === 0} />
        <AboutObject active={currentIndex === 1} />
        <SkillsObject active={currentIndex === 2} />
        <ProjectsObject active={currentIndex === 3} />
        <ExperienceObject active={currentIndex === 4} />
        <ContactObject active={currentIndex === 5} />
      </EffectComposer>
    </Canvas>
  );
}
