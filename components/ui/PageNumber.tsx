'use client';

import React from 'react';
import { useBookStore, TOTAL_PAGES, CHAPTERS } from '@/lib/store';

export default function PageNumber() {
  const { currentPage, isOpen } = useBookStore();

  if (!isOpen || currentPage === 0) return null;

  // Trouver le chapitre courant
  const currentChapter = [...CHAPTERS]
    .reverse()
    .find(c => currentPage >= c.page);

  return (
    <div
      aria-live="polite"
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 bg-[var(--paper)]/90 backdrop-blur-xs px-3.5 py-1 rounded-full border border-[var(--border)] shadow-xs flex items-center gap-2 font-sans-ui text-[11px] text-[var(--ink-soft)]"
    >
      <span className="font-semibold text-[var(--ink)]">
        Page {currentPage} <span className="font-normal text-[var(--ink-soft)]">/ {TOTAL_PAGES}</span>
      </span>
      {currentChapter && currentChapter.id !== 'cover' && (
        <>
          <span className="text-[var(--gold)]">·</span>
          <span className="text-[var(--gold)] font-medium">
            {currentChapter.title}
          </span>
        </>
      )}
    </div>
  );
}
