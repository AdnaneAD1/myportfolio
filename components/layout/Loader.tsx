'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { INFO } from '@/lib/data';

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true);
  const name = INFO.name;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const containerVars: Variants = {
    initial: { opacity: 1 },
    exit: { 
      y: -100, 
      opacity: 0,
      transition: { duration: 0.8, ease: "easeInOut" as any }
    }
  };

  const letterVars: Variants = {
    initial: { y: 20, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { delay: 0.05 * i, duration: 0.5, ease: 'easeOut' as any }
    })
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          variants={containerVars}
          initial="initial"
          exit="exit"
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-[var(--bg)]"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="flex overflow-hidden">
              {name.split('').map((char, i) => (
                <motion.span
                  key={i}
                  variants={letterVars}
                  initial="initial"
                  animate="animate"
                  custom={i}
                  className="font-display text-2xl md:text-4xl font-extrabold tracking-tighter text-[var(--white)] whitespace-pre"
                >
                  {char}
                </motion.span>
              ))}
            </div>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2, ease: "easeInOut" as any }}
              className="h-[1px] w-48 bg-[var(--cyan)] origin-left"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
