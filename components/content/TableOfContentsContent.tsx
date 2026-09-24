'use client';

import React from 'react';
import { BOOK_DATA } from '@/lib/data';
import { useBookStore } from '@/lib/store';
import { Bookmark } from 'lucide-react';

export default function TableOfContentsContent() {
  const { goToChapter } = useBookStore();

  return (
    <div className="w-full h-full flex flex-col justify-between p-7 sm:p-10 text-[var(--ink)]">
      {/* Haut de page */}
      <div className="flex justify-between items-center text-[10px] font-sans-ui text-[var(--ink-soft)] uppercase tracking-widest border-b border-[var(--border)] pb-3">
        <span>The Book of Adnane</span>
        <span>Table des Matières</span>
      </div>

      {/* Sommaire central */}
      <div className="my-auto space-y-6 max-w-md mx-auto w-full">
        <div className="text-center space-y-1 mb-6">
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)]">
            {BOOK_DATA.toc.title}
          </h2>
          <p className="font-editorial italic text-xs text-[var(--ink-soft)]">
            {BOOK_DATA.toc.subtitle}
          </p>
        </div>

        <ul className="space-y-4 font-body">
          {BOOK_DATA.toc.chapters.map((chap) => (
            <li key={chap.id}>
              <button
                onClick={() => goToChapter(chap.id)}
                className="w-full flex items-baseline justify-between group text-left cursor-pointer hover:text-[var(--gold)] transition-colors py-0.5"
                aria-label={`Aller au chapitre ${chap.title}, page ${chap.page}`}
              >
                <div className="flex items-baseline gap-2">
                  <span className="font-editorial font-bold text-xs text-[var(--gold)] w-6">
                    {chap.num}.
                  </span>
                  <span className="font-editorial font-medium text-sm sm:text-base text-[var(--ink)] group-hover:text-[var(--gold)] transition-colors">
                    {chap.title}
                  </span>
                </div>

                <div className="flex-1 border-b border-dotted border-[var(--ink-soft)]/40 mx-2 mb-1 opacity-60 group-hover:border-[var(--gold)] group-hover:opacity-100 transition-all" />

                <span className="font-sans-ui text-xs font-semibold text-[var(--ink-soft)] group-hover:text-[var(--gold)] transition-colors">
                  {chap.page}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Bas de page */}
      <div className="flex justify-between items-center pt-4 border-t border-[var(--border)] text-xs text-[var(--ink-soft)] font-sans-ui">
        <span>Page 2</span>
        <span className="flex items-center gap-1 text-[11px] text-[var(--gold)]">
          <Bookmark size={12} /> Cliquez sur un chapitre
        </span>
      </div>
    </div>
  );
}
