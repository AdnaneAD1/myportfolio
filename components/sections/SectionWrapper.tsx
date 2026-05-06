'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { useStore } from '@/lib/store';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

interface SectionWrapperProps {
  index: number;
  children: ReactNode;
}

const TRANSITIONS = {
  exitNext: {
    y: '-30%',
    scale: 0.8,
    opacity: 0,
    rotateX: 20,
    duration: 1.1,
    ease: 'power3.inOut',
  },
  exitPrev: {
    y: '30%',
    scale: 0.8,
    opacity: 0,
    rotateX: -20,
    duration: 1.1,
    ease: 'power3.inOut',
  },
  enterNext: {
    from: { y: '100%', scale: 1.2, opacity: 0, rotateX: -25 },
    to: { y: '0%', scale: 1, opacity: 1, rotateX: 0, duration: 1.2, ease: 'power3.out' },
  },
  enterPrev: {
    from: { y: '-100%', scale: 1.2, opacity: 0, rotateX: 25 },
    to: { y: '0%', scale: 1, opacity: 1, rotateX: 0, duration: 1.2, ease: 'power3.out' },
  },
};

export default function SectionWrapper({ index, children }: SectionWrapperProps) {
  const { currentIndex, previousIndex, direction, setTransitioning } = useStore();
  const ref = useRef<HTMLDivElement>(null);

  const isActive = currentIndex === index;
  const wasActive = previousIndex === index;

  useGSAP(() => {
    if (!ref.current) return;

    if (isActive && previousIndex !== index) {
      const config = direction === 'next' ? TRANSITIONS.enterNext : TRANSITIONS.enterPrev;
      gsap.fromTo(ref.current, config.from, {
        ...config.to,
        onComplete: () => setTransitioning(false),
      });
    }

    if (wasActive && currentIndex !== index) {
      const config = direction === 'next' ? TRANSITIONS.exitNext : TRANSITIONS.exitPrev;
      gsap.to(ref.current, {
        ...config,
        onComplete: () => {
          if (ref.current) {
            gsap.set(ref.current, { clearProps: 'transform,opacity' });
            if (currentIndex !== index) {
              gsap.set(ref.current, { display: 'none' });
            }
          }
        },
      });
    } else if (isActive) {
      gsap.set(ref.current, { display: 'block', opacity: 1, y: '0%', scale: 1, rotateX: 0 });
    } else {
      gsap.set(ref.current, { display: 'none' });
    }
  }, { dependencies: [currentIndex, direction, previousIndex], scope: ref });

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        overflow: 'hidden auto',
        willChange: 'transform, opacity',
        transformStyle: 'preserve-3d',
        zIndex: isActive ? 2 : 1,
        background: 'transparent',
        backdropFilter: 'none',
      }}
    >
      {children}
    </div>
  );
}
