'use client';

import React from 'react';
import { BOOK_DATA } from '@/lib/data';
import { useBookStore } from '@/lib/store';
import { Mail, RotateCcw, BookOpen } from 'lucide-react';
import { Github } from '@/components/ui/Icons';

export default function BackCoverContent() {
  const { closeBook, goToChapter } = useBookStore();

  return (
    <div className="w-full h-full flex flex-col justify-between p-7 sm:p-10 text-[var(--ink)] text-center">
      {/* Haut */}
      <div className="space-y-1">
        <span className="font-sans-ui text-[10px] tracking-widest uppercase text-[var(--gold)] font-bold">
          Quatrième de Couverture
        </span>
        <h3 className="font-editorial text-xl font-bold text-[var(--ink)]">
          {BOOK_DATA.backCover.title}
        </h3>
        <p className="font-editorial italic text-xs text-[var(--ink-soft)]">
          {BOOK_DATA.backCover.author}
        </p>
      </div>

      {/* Résumé éditorial */}
      <div className="my-auto space-y-5 max-w-sm mx-auto">
        <div className="w-8 h-[1px] bg-[var(--gold)] mx-auto opacity-70" />

        <p className="font-editorial italic text-xs sm:text-sm text-[var(--ink)]/90 leading-relaxed">
          &ldquo;{BOOK_DATA.backCover.blurb}&rdquo;
        </p>

        <p className="font-editorial font-bold text-sm text-[var(--gold)]">
          {BOOK_DATA.backCover.closing}
        </p>

        {/* Liens réseaux */}
        <div className="flex justify-center gap-4 pt-2">
          <a
            href={BOOK_DATA.contact.coordinates.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[var(--border)] hover:border-[var(--gold)] font-sans-ui text-xs text-[var(--ink)] transition-colors"
          >
            <Github size={13} /> GitHub
          </a>
          <a
            href={`mailto:${BOOK_DATA.contact.coordinates.email}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[var(--border)] hover:border-[var(--gold)] font-sans-ui text-xs text-[var(--ink)] transition-colors"
          >
            <Mail size={13} /> Email
          </a>
        </div>
      </div>

      {/* Bas de page : Actions & ISBN */}
      <div className="space-y-3 pt-4 border-t border-[var(--border)]">
        <div className="flex justify-center gap-3">
          <button
            onClick={() => goToChapter('cover')}
            className="inline-flex items-center gap-1 font-sans-ui text-xs text-[var(--ink-soft)] hover:text-[var(--gold)] cursor-pointer"
          >
            <RotateCcw size={12} /> Début du livre
          </button>
          <span className="text-[var(--border)]">·</span>
          <button
            onClick={closeBook}
            className="inline-flex items-center gap-1 font-sans-ui text-xs font-semibold text-[var(--gold)] hover:underline cursor-pointer"
          >
            <BookOpen size={12} /> Fermer le livre
          </button>
        </div>

        <div className="text-[10px] font-sans-ui text-[var(--ink-soft)] space-y-0.5">
          <p>{BOOK_DATA.backCover.copyright}</p>
          <p className="font-mono text-[9px] opacity-75">{BOOK_DATA.backCover.isbn}</p>
        </div>
      </div>
    </div>
  );
}
