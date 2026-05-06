'use client';

import { useEffect, useState } from 'react';
import { useStore, SECTIONS } from '@/lib/store';

export default function HUD() {
  const { currentIndex, isTransitioning } = useStore();
  const [time, setTime] = useState('');
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Benin is UTC+1
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Africa/Porto-Novo'
      };
      setTime(new Intl.DateTimeFormat('fr-FR', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] p-6 md:p-12 mix-blend-difference opacity-40">
      {/* Top Right: Time & Location */}
      <div className="absolute top-8 right-8 md:top-12 md:right-12 flex flex-col items-end gap-1">
        <span className="text-[0.65rem] tracking-[0.15em] font-mono text-[var(--white)]">
          {time} <span className="text-[var(--gray)]">LMT</span>
        </span>
        <span className="text-[0.45rem] tracking-[0.1em] font-mono text-[var(--gray2)] uppercase text-right">
          Cotonou, Benin<br />6.3703° N, 2.3912° E
        </span>
      </div>

      {/* Bottom Center: Navigation Matrix */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[0.45rem] tracking-[0.2em] text-[var(--gray)] uppercase font-mono">
          Navigation Matrix
        </span>
        <div className="flex gap-1.5">
          {SECTIONS.map((_, i) => (
            <div 
              key={i}
              className={`h-[2px] transition-all duration-500 ${
                i <= currentIndex ? 'w-4 bg-[var(--blue)]' : 'w-2 bg-[var(--border2)]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Vertical Lines */}
      <div className="absolute left-6 top-1/4 bottom-1/4 w-[1px] bg-gradient-to-b from-transparent via-[var(--border)] to-transparent" />
      <div className="absolute right-6 top-1/4 bottom-1/4 w-[1px] bg-gradient-to-b from-transparent via-[var(--border)] to-transparent" />

      {/* Center scanline (Subtle) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,3px_100%] pointer-events-none" />
    </div>
  );
}
