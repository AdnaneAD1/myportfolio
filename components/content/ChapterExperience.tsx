'use client';

import React from 'react';
import { BOOK_DATA, ExperienceItem } from '@/lib/data';

interface ChapterExperienceProps {
  spreadIndex?: number; // 0 for pages 13-14, 1 for pages 15-16
  side?: 'left' | 'right' | 'both';
}

function ExperienceEntry({ item }: { item: ExperienceItem }) {
  return (
    <div className="space-y-1.5 p-3.5 border border-[var(--border)] rounded bg-[var(--paper)]">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
        <h4 className="font-editorial text-sm sm:text-base font-bold text-[var(--ink)]">
          {item.role} <span className="font-normal text-[var(--ink-soft)] text-xs">chez {item.company}</span>
        </h4>
        <span className="font-sans-ui text-[11px] font-semibold text-[var(--gold)]">
          {item.period}
        </span>
      </div>

      <span className="inline-block text-[10px] font-sans-ui px-2 py-0.5 rounded bg-[var(--paper-shade)] text-[var(--ink-soft)]">
        {item.type}
      </span>

      <p className="text-xs text-[var(--ink)]/90 leading-relaxed pt-1">
        {item.narrative}
      </p>

      <ul className="space-y-1 pt-1 text-[11px] text-[var(--ink-soft)] font-sans-ui list-disc list-inside">
        {item.highlights.slice(0, 2).map((h, i) => (
          <li key={i}>{h}</li>
        ))}
      </ul>
    </div>
  );
}

export default function ChapterExperience({ spreadIndex = 0, side = 'both' }: ChapterExperienceProps) {
  const allTimeline = BOOK_DATA.experience.timeline;
  
  // Spread 0: ZeroInvestissement & Freelance
  // Spread 1: SELEOGERAUBENIN, Diha's & LAGORAGROUP
  const leftItem = spreadIndex === 0 ? allTimeline[0] : allTimeline[2];
  const rightItem = spreadIndex === 0 ? allTimeline[1] : (allTimeline[3] || allTimeline[4]);
  const extraRightItem = spreadIndex === 1 ? allTimeline[4] : null;

  const showLeft = side === 'left' || side === 'both';
  const showRight = side === 'right' || side === 'both';

  const basePageNum = 13 + spreadIndex * 2;

  return (
    <div className="w-full h-full flex flex-col md:flex-row gap-6 p-6 sm:p-9 text-[var(--ink)] overflow-y-auto">
      {/* Page Gauche */}
      {showLeft && (
        <div className="flex-1 flex flex-col justify-between space-y-3">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[10px] font-sans-ui text-[var(--gold)] uppercase tracking-widest font-semibold">
              <span>{BOOK_DATA.experience.chapterNumber}</span>
              <span className="w-4 h-[1px] bg-[var(--gold)]" />
              <span>Chroniques</span>
            </div>

            {spreadIndex === 0 && (
              <div>
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)]">
                  {BOOK_DATA.experience.title}
                </h2>
                <p className="font-editorial italic text-xs text-[var(--ink-soft)] mt-0.5">
                  {BOOK_DATA.experience.subtitle}
                </p>
                <p className="font-body text-xs text-[var(--ink-soft)] leading-relaxed mt-2">
                  {BOOK_DATA.experience.intro}
                </p>
              </div>
            )}

            {leftItem && <ExperienceEntry item={leftItem} />}
          </div>

          <div className="pt-2 border-t border-[var(--border)] text-[10px] font-sans-ui text-[var(--ink-soft)] flex justify-between">
            <span>The Book of Adnane</span>
            <span>Page {basePageNum}</span>
          </div>
        </div>
      )}

      {/* Séparateur */}
      {side === 'both' && (
        <div className="hidden md:block w-[1px] bg-[var(--border)] self-stretch opacity-60" />
      )}

      {/* Page Droite */}
      {showRight && (
        <div className="flex-1 flex flex-col justify-between space-y-3">
          <div className="space-y-3">
            <div className="text-[10px] font-sans-ui text-[var(--gold)] uppercase tracking-widest font-semibold">
              Trajectoire & Impact
            </div>

            {rightItem && <ExperienceEntry item={rightItem} />}
            {extraRightItem && <ExperienceEntry item={extraRightItem} />}
          </div>

          <div className="pt-2 border-t border-[var(--border)] text-[10px] font-sans-ui text-[var(--ink-soft)] flex justify-between">
            <span>IV — Expérience</span>
            <span>Page {basePageNum + 1}</span>
          </div>
        </div>
      )}
    </div>
  );
}
