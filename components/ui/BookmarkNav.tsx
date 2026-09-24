'use client';

import React from 'react';
import { CHAPTERS, useBookStore } from '@/lib/store';
import { Bookmark } from 'lucide-react';

export default function BookmarkNav() {
  const { currentPage, isOpen, goToChapter } = useBookStore();

  if (!isOpen) return null;

  // Filtrer les marque-pages utiles
  const bookTabs = CHAPTERS.filter(c => c.id !== 'cover' && c.id !== 'title' && c.id !== 'back-cover');

  return (
    <aside
      aria-label="Marque-pages des chapitres"
      className="fixed right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-1.5 pointer-events-auto"
    >
      {bookTabs.map((chap) => {
        const isActive = currentPage >= chap.page && (
          chap.id === 'contact'
            ? currentPage <= 18
            : currentPage < (CHAPTERS.find(c => c.page > chap.page)?.page || 18)
        );

        return (
          <button
            key={chap.id}
            onClick={() => goToChapter(chap.id)}
            aria-label={`Aller au chapitre ${chap.title}`}
            aria-current={isActive ? 'page' : undefined}
            className={`flex items-center gap-2 pl-3 pr-2.5 py-1.5 rounded-l-md font-sans-ui text-xs font-semibold tracking-wide transition-all shadow-xs cursor-pointer ${
              isActive
                ? 'bg-[var(--gold)] text-[var(--paper)] translate-x-0 shadow-md'
                : 'bg-[var(--paper-shade)] text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-[var(--paper)] translate-x-2 hover:translate-x-0 border border-r-0 border-[var(--border)]'
            }`}
          >
            <Bookmark size={11} className={isActive ? "fill-current" : ""} />
            <span className="hidden md:inline whitespace-nowrap">
              {chap.badge || chap.title}
            </span>
          </button>
        );
      })}
    </aside>
  );
}
