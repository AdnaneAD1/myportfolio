'use client';

import { Cpu, Layout, LineChart, Server } from 'lucide-react';
import SectionTag from '../ui/SectionTag';
import RevealWrapper from '../ui/RevealWrapper';
import { UI } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';

import SectionWrapper from './SectionWrapper';

export default function About() {
  const { lang } = useLanguage();
  const ui = UI[lang].about;

  const icons = [Layout, Cpu, LineChart, Server];

  return (
    <SectionWrapper index={1}>
      <section id="about" className="h-screen overflow-y-auto custom-scrollbar">
        <div className="min-h-full flex items-center py-24">
          <div className="max-w-[1100px] mx-auto px-6 md:px-12 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
              <RevealWrapper>
                <SectionTag number={ui.tag} label={ui.label} />
                <h2 
                  className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold tracking-[-0.03em] text-[var(--white)] leading-[1.05] mb-6"
                  dangerouslySetInnerHTML={{ __html: ui.heading }}
                />
                <div className="space-y-4">
                  <p className="text-[0.8rem] leading-[1.9] text-[var(--gray2)]" dangerouslySetInnerHTML={{ __html: ui.p1 }} />
                  <p className="text-[0.8rem] leading-[1.9] text-[var(--gray2)]" dangerouslySetInnerHTML={{ __html: ui.p2 }} />
                  <p className="text-[0.8rem] leading-[1.9] text-[var(--gray2)]" dangerouslySetInnerHTML={{ __html: ui.p3 }} />
                </div>
              </RevealWrapper>

              <RevealWrapper delay={0.2}>
                <div className="flex flex-col gap-[1px] bg-[var(--border2)]">
                  {ui.cards.map((card, i) => {
                    const Icon = icons[i];
                    return (
                      <div 
                        key={i}
                        className="bg-[var(--surface)] p-[1.4rem_1.6rem] flex items-center gap-5 transition-colors duration-200 hover:bg-[var(--surface2)] cursor-none"
                      >
                        <div className="w-[38px] h-[38px] flex-shrink-0 border border-[var(--border)] flex items-center justify-center text-[var(--blue)]">
                          <Icon size={18} />
                        </div>
                        <div>
                          <div className="font-display text-[0.85rem] font-bold text-[var(--white)] mb-1">{card.title}</div>
                          <div className="text-[0.65rem] text-[var(--gray2)]">{card.subtitle}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </RevealWrapper>
            </div>
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
}
