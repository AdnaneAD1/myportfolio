'use client';

import React from 'react';
import { BOOK_DATA } from '@/lib/data';
import { useBookStore } from '@/lib/store';
import { ChevronRight } from 'lucide-react';

export default function TitlePageContent() {
  const { nextPage } = useBookStore();

  return (
    <div className="w-full h-full flex flex-col justify-between p-7 sm:p-10 text-[var(--ink)]">
      {/* Haut de page */}
      <div className="flex justify-between items-center text-[10px] font-sans-ui text-[var(--ink-soft)] uppercase tracking-widest border-b border-[var(--border)] pb-3">
        <span>The Book of Adnane</span>
        <span>Page de Garde</span>
      </div>

      {/* Centre : Citation et déclaration */}
      <div className="my-auto space-y-6 max-w-sm mx-auto text-center">
        <div className="w-8 h-8 mx-auto rounded-full border border-[var(--border-gold)] flex items-center justify-center text-[var(--gold)] text-xs font-editorial font-bold">
          §
        </div>

        <blockquote className="font-editorial italic text-lg sm:text-xl leading-relaxed text-[var(--ink)]">
          &ldquo;{BOOK_DATA.titlePage.quote}&rdquo;
        </blockquote>

        <div className="w-12 h-[1px] bg-[var(--gold)] mx-auto opacity-70" />

        <div className="space-y-1">
          <p className="font-editorial font-bold text-sm text-[var(--ink)]">
            {BOOK_DATA.titlePage.author}
          </p>
          <p className="font-sans-ui text-xs text-[var(--ink-soft)]">
            {BOOK_DATA.titlePage.role}
          </p>
          <p className="font-sans-ui text-[11px] text-[var(--gold)]">
            {BOOK_DATA.titlePage.location}
          </p>
        </div>
      </div>

      {/* Bas de page : Navigation vers le sommaire */}
      <div className="flex justify-between items-center pt-4 border-t border-[var(--border)]">
        <span className="font-sans-ui text-xs text-[var(--ink-soft)]">Page 1</span>
        <button
          onClick={nextPage}
          className="inline-flex items-center gap-1 font-sans-ui text-xs font-semibold text-[var(--gold)] hover:text-[var(--gold-light)] cursor-pointer"
          aria-label="Aller au sommaire"
        >
          <span>Consulter le sommaire</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
