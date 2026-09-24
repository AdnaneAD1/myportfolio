'use client';

import React from 'react';
import { BOOK_DATA } from '@/lib/data';

interface ChapterAboutProps {
  side?: 'left' | 'right' | 'both';
}

export default function ChapterAbout({ side = 'both' }: ChapterAboutProps) {
  const showLeft = side === 'left' || side === 'both';
  const showRight = side === 'right' || side === 'both';

  return (
    <div className="w-full h-full flex flex-col md:flex-row gap-6 p-6 sm:p-9 text-[var(--ink)] overflow-y-auto">
      {/* Page Gauche : Narration & Origines */}
      {showLeft && (
        <div className="flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[10px] font-sans-ui text-[var(--gold)] uppercase tracking-widest font-semibold">
              <span>{BOOK_DATA.about.chapterNumber}</span>
              <span className="w-4 h-[1px] bg-[var(--gold)]" />
              <span>Genèse</span>
            </div>

            <h2 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)]">
              {BOOK_DATA.about.title}
            </h2>

            <p className="font-editorial italic text-xs text-[var(--ink-soft)]">
              {BOOK_DATA.about.subtitle}
            </p>

            <div className="space-y-3 pt-2 text-xs sm:text-sm leading-relaxed text-[var(--ink)]/90">
              {BOOK_DATA.about.paragraphs.map((p, idx) => (
                <p key={idx} className={idx === 0 ? "drop-cap" : ""}>
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-[var(--border)] text-[10px] font-sans-ui text-[var(--ink-soft)] flex justify-between">
            <span>The Book of Adnane</span>
            <span>Page 3</span>
          </div>
        </div>
      )}

      {/* Séparateur vertical discret en mode double page */}
      {side === 'both' && (
        <div className="hidden md:block w-[1px] bg-[var(--border)] self-stretch opacity-60" />
      )}

      {/* Page Droite : Philosophie, Marginalia & Statistiques */}
      {showRight && (
        <div className="flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="text-[10px] font-sans-ui text-[var(--gold)] uppercase tracking-widest font-semibold">
              Principes Directeurs
            </div>

            {/* Note en marge / Philosophie */}
            <div className="p-4 rounded border-l-3 border-[var(--gold)] bg-[var(--paper-shade)]/60 space-y-2">
              <span className="font-sans-ui text-[10px] text-[var(--gold)] uppercase font-bold tracking-wider block">
                En marge
              </span>
              <blockquote className="font-editorial italic text-sm text-[var(--ink)] leading-snug">
                &ldquo;{BOOK_DATA.about.marginalia.quote}&rdquo;
              </blockquote>
              <p className="font-sans-ui text-[11px] text-[var(--ink-soft)]">
                {BOOK_DATA.about.marginalia.note}
              </p>
            </div>

            {/* Grille de statistiques */}
            <div className="space-y-2 pt-2">
              <span className="font-sans-ui text-[10px] text-[var(--ink-soft)] uppercase tracking-wider block font-bold">
                Repères Chiffrés
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                {BOOK_DATA.about.stats.map((stat, i) => (
                  <div key={i} className="p-3 border border-[var(--border)] rounded bg-[var(--paper)]">
                    <div className="font-editorial text-xl font-bold text-[var(--gold)]">
                      {stat.value}
                    </div>
                    <div className="font-sans-ui text-[10px] text-[var(--ink-soft)] mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-[var(--border)] text-[10px] font-sans-ui text-[var(--ink-soft)] flex justify-between">
            <span>I — À propos</span>
            <span>Page 4</span>
          </div>
        </div>
      )}
    </div>
  );
}
