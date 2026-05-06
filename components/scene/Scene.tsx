'use client';

import dynamic from 'next/dynamic';

const SceneCanvas = dynamic(() => import('./SceneCanvas'), {
  ssr: false,
  loading: () => null,
});

export default function Scene() {
  return <SceneCanvas />;
}
