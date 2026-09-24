'use client';

import React from 'react';
import { BOOK_DATA } from '@/lib/data';
import { useBookStore } from '@/lib/store';
import { BookOpen, ArrowUpRight, Mail, MapPin, ExternalLink, Sparkles, ArrowLeft } from 'lucide-react';
import { Github } from '@/components/ui/Icons';

export default function SimpleReadMode() {
  const { setSimpleMode, openBook } = useBookStore();

  const handleReturnTo3D = () => {
    setSimpleMode(false);
    openBook();
  };

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)] font-body selection:bg-[var(--gold-light)]/40 pb-28">
      {/* Sticky Accessible Top Bar */}
      <header className="sticky top-0 z-50 bg-[var(--paper)]/95 backdrop-blur-sm border-b border-[var(--border)] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-[var(--gold)] flex items-center justify-center text-[var(--gold)] font-editorial font-bold text-sm">
            A
          </div>
          <div>
            <h1 className="font-editorial text-base sm:text-lg font-bold leading-tight text-[var(--ink)]">
              The Book of Adnane
            </h1>
            <p className="font-sans-ui text-xs text-[var(--ink-soft)]">
              Mode lecture simple & accessible
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href="#contact"
            className="hidden sm:inline-flex font-sans-ui text-xs font-semibold px-3 py-1.5 rounded border border-[var(--border)] hover:border-[var(--gold)] text-[var(--ink)] transition-colors"
          >
            Me contacter
          </a>
          <button
            onClick={handleReturnTo3D}
            className="inline-flex items-center gap-2 font-sans-ui text-xs sm:text-sm font-semibold px-3.5 py-1.5 sm:px-4 sm:py-2 rounded bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[var(--paper)] transition-all shadow-sm"
            aria-label="Quitter le mode lecture et revenir au livre 3D interactif"
          >
            <BookOpen size={16} aria-hidden="true" />
            <span>Vue Livre 3D</span>
          </button>
        </div>
      </header>

      {/* Nav d'accès rapide aux chapitres */}
      <nav 
        aria-label="Navigation des chapitres" 
        className="bg-[var(--paper-shade)]/60 border-b border-[var(--border)] px-4 sm:px-8 py-2.5 overflow-x-auto"
      >
        <ul className="flex items-center gap-4 sm:gap-6 text-xs font-sans-ui font-medium whitespace-nowrap max-w-4xl mx-auto">
          <li><span className="text-[var(--gold)] uppercase tracking-wider text-[10px] font-bold">Chapitres :</span></li>
          <li><a href="#about" className="hover:text-[var(--gold)] transition-colors">I. À propos</a></li>
          <li><a href="#skills" className="hover:text-[var(--gold)] transition-colors">II. Compétences</a></li>
          <li><a href="#projects" className="hover:text-[var(--gold)] transition-colors">III. Projets</a></li>
          <li><a href="#experience" className="hover:text-[var(--gold)] transition-colors">IV. Expérience</a></li>
          <li><a href="#contact" className="hover:text-[var(--gold)] transition-colors">V. Contact</a></li>
        </ul>
      </nav>

      {/* Corps du document éditorial */}
      <main className="max-w-3xl mx-auto px-5 sm:px-8 pt-12 space-y-20">
        {/* Page de Titre & Couverture */}
        <section className="text-center py-12 border-b border-[var(--border)] space-y-6">
          <div className="inline-block px-3 py-1 rounded-full border border-[var(--border-gold)] text-[var(--gold)] font-sans-ui text-xs uppercase tracking-widest">
            {BOOK_DATA.cover.edition} · {BOOK_DATA.cover.year}
          </div>
          
          <h2 className="font-editorial text-4xl sm:text-6xl font-bold tracking-tight text-[var(--ink)]">
            {BOOK_DATA.cover.title}
          </h2>
          
          <p className="font-editorial italic text-lg sm:text-xl text-[var(--ink-soft)] max-w-lg mx-auto">
            {BOOK_DATA.cover.subtitle}
          </p>

          <div className="w-16 h-[2px] bg-[var(--gold)] mx-auto opacity-70 my-4" />

          <blockquote className="italic text-base sm:text-lg text-[var(--ink)] max-w-xl mx-auto border-l-2 border-[var(--gold)] pl-4 text-left my-8 py-1 bg-[var(--paper-shade)]/40 rounded-r">
            &ldquo;{BOOK_DATA.titlePage.quote}&rdquo;
            <footer className="font-sans-ui not-italic text-xs text-[var(--ink-soft)] mt-2 font-medium">
              — {BOOK_DATA.titlePage.author}, {BOOK_DATA.titlePage.role}
            </footer>
          </blockquote>
        </section>

        {/* Sommaire */}
        <section aria-labelledby="toc-heading" className="bg-[var(--paper-shade)]/40 border border-[var(--border)] p-6 sm:p-8 rounded-lg">
          <h3 id="toc-heading" className="font-editorial text-2xl font-bold text-[var(--ink)] mb-6 pb-2 border-b border-[var(--border)]">
            {BOOK_DATA.toc.title}
          </h3>
          <ul className="space-y-3 font-body text-base">
            {BOOK_DATA.toc.chapters.map(chap => (
              <li key={chap.id} className="flex items-baseline justify-between gap-2">
                <a href={`#${chap.id}`} className="hover:text-[var(--gold)] transition-colors flex-1 flex items-baseline">
                  <span className="font-editorial font-bold text-[var(--gold)] w-8">{chap.num}.</span>
                  <span className="font-medium text-[var(--ink)]">{chap.title}</span>
                  <span className="flex-1 border-b border-dotted border-[var(--ink-soft)]/40 mx-2 mb-1" aria-hidden="true" />
                </a>
                <span className="font-sans-ui text-xs text-[var(--ink-soft)]">p. {chap.page}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Chapitre I — À propos */}
        <section id="about" aria-labelledby="about-heading" className="space-y-6 pt-6">
          <div className="flex items-center gap-3 text-xs font-sans-ui text-[var(--gold)] uppercase tracking-widest font-semibold">
            <span>{BOOK_DATA.about.chapterNumber}</span>
            <span className="w-6 h-[1px] bg-[var(--gold)]" />
            <span>Genèse</span>
          </div>

          <h3 id="about-heading" className="font-editorial text-3xl sm:text-4xl font-bold text-[var(--ink)]">
            {BOOK_DATA.about.title}
          </h3>
          <p className="italic text-base text-[var(--ink-soft)]">
            {BOOK_DATA.about.subtitle}
          </p>

          <div className="space-y-4 text-base sm:text-lg leading-relaxed text-[var(--ink)]/90 pt-2">
            {BOOK_DATA.about.paragraphs.map((p, idx) => (
              <p key={idx} className={idx === 0 ? "drop-cap" : ""}>
                {p}
              </p>
            ))}
          </div>

          {/* Citation en marge */}
          <div className="p-4 sm:p-5 rounded-md border-l-4 border-[var(--gold)] bg-[var(--paper-shade)] my-6">
            <p className="font-editorial italic text-base sm:text-lg text-[var(--ink)]">
              &ldquo;{BOOK_DATA.about.marginalia.quote}&rdquo;
            </p>
            <p className="font-sans-ui text-xs text-[var(--ink-soft)] mt-2">
              {BOOK_DATA.about.marginalia.note}
            </p>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            {BOOK_DATA.about.stats.map((s, idx) => (
              <div key={idx} className="p-4 border border-[var(--border)] rounded bg-[var(--paper)] text-center">
                <div className="font-editorial text-2xl sm:text-3xl font-bold text-[var(--gold)]">{s.value}</div>
                <div className="font-sans-ui text-xs text-[var(--ink-soft)] mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Chapitre II — Compétences */}
        <section id="skills" aria-labelledby="skills-heading" className="space-y-8 pt-8 border-t border-[var(--border)]">
          <div className="flex items-center gap-3 text-xs font-sans-ui text-[var(--gold)] uppercase tracking-widest font-semibold">
            <span>{BOOK_DATA.skills.chapterNumber}</span>
            <span className="w-6 h-[1px] bg-[var(--gold)]" />
            <span>L&apos;Arsenal</span>
          </div>

          <div>
            <h3 id="skills-heading" className="font-editorial text-3xl sm:text-4xl font-bold text-[var(--ink)]">
              {BOOK_DATA.skills.title}
            </h3>
            <p className="italic text-base text-[var(--ink-soft)] mt-1">
              {BOOK_DATA.skills.subtitle}
            </p>
          </div>

          <p className="text-base text-[var(--ink)] leading-relaxed">
            {BOOK_DATA.skills.intro}
          </p>

          <div className="space-y-6">
            {BOOK_DATA.skills.shelves.map((shelf, idx) => (
              <div key={idx} className="p-5 border border-[var(--border)] rounded-lg bg-[var(--paper-shade)]/30 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h4 className="font-editorial text-xl font-bold text-[var(--ink)]">
                    {shelf.category}
                  </h4>
                </div>
                <p className="font-sans-ui text-xs sm:text-sm text-[var(--ink-soft)]">
                  {shelf.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {shelf.tools.map((tool, tIdx) => (
                    <span 
                      key={tIdx} 
                      className={`font-sans-ui text-xs px-2.5 py-1 rounded border ${
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
        </section>

        {/* Chapitre III — Projets */}
        <section id="projects" aria-labelledby="projects-heading" className="space-y-10 pt-8 border-t border-[var(--border)]">
          <div className="flex items-center gap-3 text-xs font-sans-ui text-[var(--gold)] uppercase tracking-widest font-semibold">
            <span>{BOOK_DATA.projects.chapterNumber}</span>
            <span className="w-6 h-[1px] bg-[var(--gold)]" />
            <span>Les Œuvres</span>
          </div>

          <div>
            <h3 id="projects-heading" className="font-editorial text-3xl sm:text-4xl font-bold text-[var(--ink)]">
              {BOOK_DATA.projects.title}
            </h3>
            <p className="italic text-base text-[var(--ink-soft)] mt-1">
              {BOOK_DATA.projects.subtitle}
            </p>
          </div>

          <div className="space-y-10">
            {BOOK_DATA.projects.items.map((proj) => (
              <article key={proj.id} className="p-6 sm:p-7 border border-[var(--border)] rounded-lg bg-[var(--paper)] shadow-sm space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="font-editorial text-xs font-bold text-[var(--gold)]">
                      Étude n°{proj.num} · {proj.year}
                    </span>
                    <h4 className="font-editorial text-2xl font-bold text-[var(--ink)] mt-0.5">
                      {proj.title}
                    </h4>
                    <p className="font-sans-ui text-xs text-[var(--ink-soft)]">
                      {proj.subtitle}
                    </p>
                  </div>
                  <span className="inline-block px-2.5 py-1 rounded bg-[var(--sage)]/15 text-[var(--sage)] font-sans-ui text-xs font-bold">
                    {proj.badge}
                  </span>
                </div>

                <div className="space-y-2 text-sm sm:text-base leading-relaxed">
                  <p><strong className="font-sans-ui text-xs uppercase tracking-wider text-[var(--ink-soft)] block">Le défi :</strong> {proj.problem}</p>
                  <p><strong className="font-sans-ui text-xs uppercase tracking-wider text-[var(--ink-soft)] block">La solution bâtie :</strong> {proj.solution}</p>
                  {proj.impact && (
                    <p className="p-2.5 bg-[var(--gold)]/10 border-l-2 border-[var(--gold)] text-xs sm:text-sm font-sans-ui text-[var(--ink)] font-medium">
                      <strong>Impact :</strong> {proj.impact}
                    </p>
                  )}
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)]">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.stack.map((tech, i) => (
                      <span key={i} className="font-sans-ui text-[11px] px-2 py-0.5 rounded bg-[var(--paper-shade)] text-[var(--ink-soft)] border border-[var(--border)]">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-sans-ui font-semibold text-[var(--gold)] hover:underline"
                    >
                      <Github size={14} /> Code source <ArrowUpRight size={12} />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Chapitre IV — Expérience */}
        <section id="experience" aria-labelledby="experience-heading" className="space-y-8 pt-8 border-t border-[var(--border)]">
          <div className="flex items-center gap-3 text-xs font-sans-ui text-[var(--gold)] uppercase tracking-widest font-semibold">
            <span>{BOOK_DATA.experience.chapterNumber}</span>
            <span className="w-6 h-[1px] bg-[var(--gold)]" />
            <span>Chroniques</span>
          </div>

          <div>
            <h3 id="experience-heading" className="font-editorial text-3xl sm:text-4xl font-bold text-[var(--ink)]">
              {BOOK_DATA.experience.title}
            </h3>
            <p className="italic text-base text-[var(--ink-soft)] mt-1">
              {BOOK_DATA.experience.subtitle}
            </p>
          </div>

          <div className="relative border-l-2 border-[var(--border-gold)] pl-6 sm:pl-8 ml-2 space-y-10">
            {BOOK_DATA.experience.timeline.map((item, idx) => (
              <div key={idx} className="relative">
                {/* Point sur la timeline */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-[var(--paper)] border-2 border-[var(--gold)]" />

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                  <h4 className="font-editorial text-xl font-bold text-[var(--ink)]">
                    {item.role} <span className="font-normal text-[var(--ink-soft)]">chez {item.company}</span>
                  </h4>
                  <span className="font-sans-ui text-xs font-semibold text-[var(--gold)]">
                    {item.period}
                  </span>
                </div>

                <div className="inline-block text-[11px] font-sans-ui px-2 py-0.5 rounded bg-[var(--paper-shade)] text-[var(--ink-soft)] mb-2">
                  {item.type}
                </div>

                <p className="text-sm sm:text-base text-[var(--ink)]/90 leading-relaxed mb-3">
                  {item.narrative}
                </p>

                <ul className="space-y-1 text-xs sm:text-sm text-[var(--ink-soft)] font-sans-ui list-disc list-inside">
                  {item.highlights.map((h, hIdx) => (
                    <li key={hIdx}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Chapitre V — Contact */}
        <section id="contact" aria-labelledby="contact-heading" className="space-y-8 pt-8 border-t border-[var(--border)]">
          <div className="flex items-center gap-3 text-xs font-sans-ui text-[var(--gold)] uppercase tracking-widest font-semibold">
            <span>{BOOK_DATA.contact.chapterNumber}</span>
            <span className="w-6 h-[1px] bg-[var(--gold)]" />
            <span>Correspondance</span>
          </div>

          <div>
            <h3 id="contact-heading" className="font-editorial text-3xl sm:text-4xl font-bold text-[var(--ink)]">
              {BOOK_DATA.contact.title}
            </h3>
            <p className="italic text-base text-[var(--ink-soft)] mt-1">
              {BOOK_DATA.contact.subtitle}
            </p>
          </div>

          <p className="text-base sm:text-lg text-[var(--ink)] leading-relaxed">
            {BOOK_DATA.contact.lead}
          </p>

          {/* Format Carte Postale / Papier à lettre */}
          <div className="p-6 sm:p-8 rounded-lg border-2 border-[var(--border-gold)] bg-[var(--paper-shade)]/60 shadow-sm relative overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between gap-6 pb-6 border-b border-[var(--border)]">
              <div>
                <span className="font-sans-ui text-[10px] tracking-widest text-[var(--gold)] uppercase block font-bold">
                  {BOOK_DATA.contact.postcard.airmailText}
                </span>
                <p className="font-editorial text-xl font-bold text-[var(--ink)] mt-1">
                  {BOOK_DATA.contact.coordinates.name}
                </p>
                <p className="font-sans-ui text-xs text-[var(--ink-soft)] flex items-center gap-1.5 mt-1">
                  <MapPin size={13} /> {BOOK_DATA.contact.coordinates.location}
                </p>
              </div>

              {/* Cachet de poste */}
              <div className="self-end sm:self-start border-2 border-dashed border-[var(--gold)] px-3 py-2 rounded text-center">
                <div className="font-sans-ui text-[10px] font-bold text-[var(--gold)] tracking-wider">
                  {BOOK_DATA.contact.postcard.postmark}
                </div>
                <div className="font-sans-ui text-[9px] text-[var(--ink-soft)]">
                  {BOOK_DATA.contact.postcard.stampText}
                </div>
              </div>
            </div>

            <div className="pt-6 space-y-4">
              <a
                href={`mailto:${BOOK_DATA.contact.coordinates.email}`}
                className="flex items-center gap-3 p-4 rounded bg-[var(--paper)] border border-[var(--border)] hover:border-[var(--gold)] transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-[var(--gold)]/10 flex items-center justify-center text-[var(--gold)]">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="font-sans-ui text-xs text-[var(--ink-soft)]">Envoyer un courrier électronique</div>
                  <div className="font-editorial font-bold text-base text-[var(--ink)] group-hover:text-[var(--gold)] transition-colors">
                    {BOOK_DATA.contact.coordinates.email}
                  </div>
                </div>
              </a>

              <a
                href={BOOK_DATA.contact.coordinates.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded bg-[var(--paper)] border border-[var(--border)] hover:border-[var(--gold)] transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-[var(--ink)]/5 flex items-center justify-center text-[var(--ink)]">
                  <Github size={18} />
                </div>
                <div>
                  <div className="font-sans-ui text-xs text-[var(--ink-soft)]">Consulter les dépôts de code</div>
                  <div className="font-editorial font-bold text-base text-[var(--ink)] group-hover:text-[var(--gold)] transition-colors">
                    github.com/AdnaneAD1
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Quatrième de Couverture & Clôture */}
        <footer className="pt-12 border-t-2 border-[var(--border)] text-center space-y-6">
          <p className="font-editorial italic text-base sm:text-lg text-[var(--ink-soft)] max-w-xl mx-auto">
            &ldquo;{BOOK_DATA.backCover.blurb}&rdquo;
          </p>

          <p className="font-editorial text-xl font-bold text-[var(--gold)]">
            {BOOK_DATA.backCover.closing}
          </p>

          <div className="flex justify-center gap-6 font-sans-ui text-xs text-[var(--ink-soft)]">
            {BOOK_DATA.backCover.socials.map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--gold)] underline">
                {s.name}
              </a>
            ))}
          </div>

          <div className="font-sans-ui text-[11px] text-[var(--ink-soft)]/70 pt-4">
            <p>{BOOK_DATA.backCover.copyright}</p>
            <p className="font-mono mt-0.5">{BOOK_DATA.backCover.isbn}</p>
          </div>

          <div className="pt-6">
            <button
              onClick={handleReturnTo3D}
              className="inline-flex items-center gap-2 font-sans-ui text-xs font-bold px-4 py-2 rounded bg-[var(--paper-shade)] border border-[var(--border-gold)] text-[var(--ink)] hover:border-[var(--gold)]"
            >
              <ArrowLeft size={14} /> Retourner au livre 3D interactif
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}
