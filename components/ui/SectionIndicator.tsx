'use client';

import { useStore, SECTIONS } from '@/lib/store';
import { motion } from 'framer-motion';

export default function SectionIndicator() {
  const { currentIndex, goTo } = useStore();

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[200] flex flex-col gap-3 items-center">
      {SECTIONS.map((section, i) => (
        <button
          key={section.id}
          onClick={() => goTo(i)}
          className="group relative flex items-center justify-center p-2 cursor-none"
        >
          {/* Label visible on hover */}
          <span className="absolute right-full mr-4 text-[0.55rem] tracking-[0.2em] text-[var(--gray)] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase">
            {section.label}
          </span>
          
          <motion.div
            animate={{
              width: i === currentIndex ? '24px' : '6px',
              height: '4px',
              background: i === currentIndex ? 'var(--cyan)' : 'var(--border)',
              opacity: i === currentIndex ? 1 : 0.3,
            }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="rounded-full"
          />
        </button>
      ))}
    </div>
  );
}
