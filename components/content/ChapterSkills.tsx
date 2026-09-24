'use client';

import React from 'react';
import { BOOK_DATA } from '@/lib/data';

interface ChapterSkillsProps {
  side?: 'left' | 'right' | 'both';
}

export default function ChapterSkills({ side = 'both' }: ChapterSkillsProps) {
  const showLeft = side === 'left' || side === 'both';
  const showRight = side === 'right' || side === 'both';

  const leftShelves = BOOK_DATA.skills.shelves.slice(0, 2);
  const rightShelves = BOOK_DATA.skills.shelves.slice(2);

  return (
    <div className="w-full h-full flex flex-col md:flex-row gap-6 p-6 sm:p-9 text-[var(--ink)] overflow-y-auto">
      {/* Page Gauche : Arsenal Backend & Frontend */}
      {showLeft && (
        <div className="flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[10px] font-sans-ui text-[var(--gold)] uppercase tracking-widest font-semibold">
              <span>{BOOK_DATA.skills.chapterNumber}</span>
              <span className="w-4 h-[1px] bg-[var(--gold)]" />
              <span>L&apos;Arsenal</span>
            </div>

            <div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)]">
                {BOOK_DATA.skills.title}
              </h2>
              <p className="font-editorial italic text-xs text-[var(--ink-soft)] mt-0.5">
                {BOOK_DATA.skills.subtitle}
              </p>
            </div>

            <p className="font-body text-xs leading-relaxed text-[var(--ink-soft)]">
              {BOOK_DATA.skills.intro}
            </p>

            <div className="space-y-4 pt-1">
              {leftShelves.map((shelf, idx) => (
                <div key={idx} className="p-3.5 border border-[var(--border)] rounded bg-[var(--paper-shade)]/30 space-y-2">
                  <h3 className="font-editorial text-sm sm:text-base font-bold text-[var(--ink)]">
                    {shelf.category}
                  </h3>
                  <p className="font-sans-ui text-[11px] text-[var(--ink-soft)] leading-snug">
                    {shelf.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {shelf.tools.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className={`font-sans-ui text-[11px] px-2 py-0.5 rounded border ${
                          tool.level === 'expert'
                            ? 'border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--ink)] font-semibold'
                            : 'border-[var(--border)] bg-[var(--paper)] text-[var(--ink-soft)]'
                        }`}
                      >
                        {tool.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-[var(--border)] text-[10px] font-sans-ui text-[var(--ink-soft)] flex justify-between">
            <span>The Book of Adnane</span>
            <span>Page 5</span>
          </div>
        </div>
      )}

      {/* Séparateur */}
      {side === 'both' && (
        <div className="hidden md:block w-[1px] bg-[var(--border)] self-stretch opacity-60" />
      )}

      {/* Page Droite : Bases de données, DevOps & IA */}
      {showRight && (
        <div className="flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-3.5">
            <div className="text-[10px] font-sans-ui text-[var(--gold)] uppercase tracking-widest font-semibold">
              Persistance, Infrastructure & IA
            </div>

            <div className="space-y-3.5">
              {rightShelves.map((shelf, idx) => (
                <div key={idx} className="p-3 border border-[var(--border)] rounded bg-[var(--paper-shade)]/30 space-y-1.5">
                  <h3 className="font-editorial text-sm font-bold text-[var(--ink)]">
                    {shelf.category}
                  </h3>
                  <p className="font-sans-ui text-[10px] text-[var(--ink-soft)] leading-snug">
                    {shelf.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {shelf.tools.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className={`font-sans-ui text-[10px] px-2 py-0.5 rounded border ${
                          tool.level === 'expert'
                            ? 'border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--ink)] font-semibold'
                            : 'border-[var(--border)] bg-[var(--paper)] text-[var(--ink-soft)]'
                        }`}
                      >
                        {tool.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-[var(--border)] text-[10px] font-sans-ui text-[var(--ink-soft)] flex justify-between">
            <span>II — Compétences</span>
            <span>Page 6</span>
          </div>
        </div>
      )}
    </div>
  );
}
