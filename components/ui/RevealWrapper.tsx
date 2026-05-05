'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface RevealWrapperProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function RevealWrapper({ children, delay = 0, className = "" }: RevealWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] as any }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
