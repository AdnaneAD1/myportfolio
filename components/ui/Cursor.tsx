'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function Cursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Smooth springs for the outer ring
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const outerX = useSpring(0, springConfig);
  const outerY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      outerX.set(e.clientX);
      outerY.set(e.clientY);
    };

    const handleHover = () => setIsHovered(true);
    const handleUnhover = () => setIsHovered(false);

    window.addEventListener('mousemove', handleMouseMove);

    const interactiveElements = document.querySelectorAll('a, button, .proj-card, .skill-group, .ac, .stat-item, .cl');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleUnhover);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleUnhover);
      });
    };
  }, [outerX, outerY]);

  return (
    <>
      {/* Main Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[var(--cyan)] rounded-full pointer-events-none z-[9999]"
        animate={{
          x: mousePos.x - 4,
          y: mousePos.y - 4,
          scale: isHovered ? 1.75 : 1,
        }}
        transition={{ type: 'tween', ease: 'linear' as any, duration: 0 }}
      />
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-[30px] h-[30px] border border-[rgba(6,182,212,0.35)] rounded-full pointer-events-none z-[9998]"
        style={{
          x: outerX,
          y: outerY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 44 : 30,
          height: isHovered ? 44 : 30,
          borderColor: isHovered ? 'rgba(245,158,11,0.5)' : 'rgba(6,182,212,0.35)',
        }}
      />
    </>
  );
}
