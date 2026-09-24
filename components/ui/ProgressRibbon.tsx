'use client';

import React from 'react';
import { useBookStore, TOTAL_PAGES } from '@/lib/store';

export default function ProgressRibbon() {
  const { currentPage, isOpen } = useBookStore();

  if (!isOpen) return null;

  // Calcul du pourcentage de lecture
  const progressPercent = Math.min(100, Math.round((currentPage / TOTAL_PAGES) * 100));

  return (
    <div
      className="fixed top-0 left-8 sm:left-16 z-40 flex flex-col items-center pointer-events-none"
      title={`Progression : ${progressPercent}%`}
    >
      {/* Ruban textile doré tombant du haut */}
      <div
        style={{
          height: `${Math.max(48, Math.min(130, 40 + progressPercent * 0.9))}px`,
          transition: 'height 0.4s cubic-bezier(0.2, 0, 0, 1)',
        }}
        className="w-4 sm:w-5 bg-[var(--gold)] shadow-md flex flex-col justify-end items-center relative"
      >
        {/* Liseré central textile */}
        <div className="w-[1px] h-full bg-[var(--gold-light)] opacity-70" />

        {/* Pointe en V du ruban de signet */}
        <div className="absolute -bottom-2.5 left-0 w-0 h-0 border-l-[8px] sm:border-l-[10px] border-l-transparent border-r-[8px] sm:border-r-[10px] border-r-transparent border-t-[10px] border-t-[var(--gold)]" />
      </div>
    </div>
  );
}
