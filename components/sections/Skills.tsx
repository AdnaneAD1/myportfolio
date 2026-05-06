'use client';

import { SKILLS, UI } from '@/lib/data';
import SectionTag from '../ui/SectionTag';
import RevealWrapper from '../ui/RevealWrapper';
import { useLanguage } from '@/context/LanguageContext';

import SectionWrapper from './SectionWrapper';

export default function Skills() {
  const { lang } = useLanguage();
  const ui = UI[lang].skills;

  return (
    <SectionWrapper index={2}>
      <section id="skills" className="h-screen overflow-y-auto custom-scrollbar">
        <div className="min-h-full flex items-center py-24">
          <div className="max-w-[1100px] mx-auto px-6 md:px-12 w-full">
            <RevealWrapper>
              <SectionTag number={ui.tag} label={ui.label} />
              <h2 
                className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold tracking-[-0.03em] text-[var(--white)] leading-[1.05] mb-12"
                dangerouslySetInnerHTML={{ __html: ui.heading }}
              />
            </RevealWrapper>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[var(--border2)]">
              {SKILLS.map((group, i) => (
                <RevealWrapper key={group[lang].category} delay={0.1 * (i % 3)}>
                  <div className="bg-[var(--bg2)] p-8 h-full relative group overflow-hidden transition-colors hover:bg-[var(--surface)]">
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[var(--blue)] to-[var(--cyan)] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                    
                    <div className="text-[0.58rem] tracking-[0.18em] uppercase text-[var(--cyan)] mb-5">
                      {"//"} {group[lang].category}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((skill) => (
                        <span 
                          key={skill.name}
                          className={`text-[0.68rem] px-3 py-1.5 border transition-colors ${
                            skill.featured 
                            ? 'border-[rgba(59,130,246,0.3)] bg-[rgba(59,130,246,0.06)] text-[var(--white)]' 
                            : 'border-[var(--border2)] text-[var(--gray2)] hover:border-[rgba(59,130,246,0.4)] hover:text-[var(--white)]'
                          }`}
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </RevealWrapper>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
}
