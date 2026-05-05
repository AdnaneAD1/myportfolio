'use client';

import { ChevronRight } from 'lucide-react';
import { EXPERIENCES, UI } from '@/lib/data';
import SectionTag from '../ui/SectionTag';
import RevealWrapper from '../ui/RevealWrapper';
import { useLanguage } from '@/context/LanguageContext';

export default function Experience() {
  const { lang } = useLanguage();
  const experiences = EXPERIENCES[lang];
  const ui = UI[lang];

  return (
    <section id="experience" className="bg-[var(--bg)] border-t border-[var(--border2)]">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12 py-24">
        <RevealWrapper>
          <SectionTag number="05" label={ui.nav.xp} />
          <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold tracking-[-0.03em] text-[var(--white)] leading-[1.05] mb-12">
            {lang === 'fr' ? 'Mon ' : 'My '}<em className="italic text-[var(--blue)] not-italic">{lang === 'fr' ? 'parcours' : 'Journey'}</em>
          </h2>
        </RevealWrapper>

        <div className="flex flex-col">
          {experiences.map((exp, i) => (
            <RevealWrapper key={i} delay={0.1 * i}>
              <div className="grid grid-cols-1 md:grid-cols-[180px_1px_1fr] border-b border-[var(--border2)] last:border-none py-9 group">
                <div className="md:pr-8 pt-1 mb-4 md:mb-0">
                  <div className="text-[0.62rem] tracking-[0.1em] text-[var(--gray)] mb-2 uppercase">{exp.period}</div>
                  <div className="font-display text-[0.95rem] font-bold tracking-tight text-[var(--white)] mb-1 uppercase">{exp.company}</div>
                  <div className="text-[0.58rem] tracking-[0.12em] uppercase text-[var(--cyan)]">{exp.type}</div>
                </div>

                <div className="hidden md:block bg-[var(--border2)] w-[1px] relative">
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-[7px] h-[7px] rounded-full border border-[var(--blue)] bg-[var(--bg)] transition-transform duration-300 group-hover:scale-125" />
                </div>

                <div className="md:pl-12">
                  <div className="font-display text-base font-bold tracking-tight text-[var(--white)] mb-4 uppercase">{exp.title}</div>
                  <ul className="space-y-2 list-none">
                    {exp.missions.map((mission, j) => (
                      <li key={j} className="text-[0.75rem] leading-[1.7] text-[var(--gray2)] flex gap-3">
                        <ChevronRight size={14} className="text-[var(--blue)] flex-shrink-0 mt-0.5" />
                        {mission}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
