'use client';

import React from 'react';
import { BOOK_DATA, ProjectItem } from '@/lib/data';
import { ArrowUpRight } from 'lucide-react';
import { Github } from '@/components/ui/Icons';

interface ChapterProjectsProps {
  pageOffset?: number; // 0 for projects 0 & 1, 1 for projects 2 & 3, 2 for projects 4 & 5
  side?: 'left' | 'right' | 'both';
}

function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <article className="flex flex-col justify-between h-full p-4 sm:p-5 border border-[var(--border)] rounded-lg bg-[var(--paper)] shadow-xs space-y-3">
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="font-editorial text-[11px] font-bold text-[var(--gold)]">
              Étude n°{project.num} · {project.year}
            </span>
            <h3 className="font-editorial text-lg sm:text-xl font-bold text-[var(--ink)] leading-tight mt-0.5">
              {project.title}
            </h3>
            <p className="font-sans-ui text-[11px] text-[var(--ink-soft)]">
              {project.subtitle}
            </p>
          </div>
          <span className="inline-block px-2 py-0.5 rounded bg-[var(--sage)]/15 text-[var(--sage)] font-sans-ui text-[10px] font-bold whitespace-nowrap">
            {project.badge}
          </span>
        </div>

        <div className="space-y-2 text-xs text-[var(--ink)]/90 leading-relaxed pt-1">
          <div>
            <span className="font-sans-ui text-[10px] uppercase tracking-wider text-[var(--ink-soft)] font-bold block">
              Le Défi :
            </span>
            <p>{project.problem}</p>
          </div>

          <div>
            <span className="font-sans-ui text-[10px] uppercase tracking-wider text-[var(--ink-soft)] font-bold block">
              La Solution Bâtie :
            </span>
            <p>{project.solution}</p>
          </div>

          {project.impact && (
            <div className="p-2 rounded bg-[var(--gold)]/10 border-l-2 border-[var(--gold)] text-[11px] font-sans-ui text-[var(--ink)] font-medium">
              <strong>Impact :</strong> {project.impact}
            </div>
          )}
        </div>
      </div>

      <div className="pt-2 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1">
          {project.stack.slice(0, 4).map((tech, i) => (
            <span
              key={i}
              className="font-sans-ui text-[10px] px-1.5 py-0.5 rounded bg-[var(--paper-shade)] text-[var(--ink-soft)] border border-[var(--border)]"
            >
              {tech}
            </span>
          ))}
        </div>

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-sans-ui font-semibold text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors"
          >
            <Github size={12} /> Code <ArrowUpRight size={10} />
          </a>
        )}
      </div>
    </article>
  );
}

export default function ChapterProjects({ pageOffset = 0, side = 'both' }: ChapterProjectsProps) {
  const items = BOOK_DATA.projects.items;
  const leftProject = items[pageOffset * 2] || items[0];
  const rightProject = items[pageOffset * 2 + 1] || items[1];

  const showLeft = side === 'left' || side === 'both';
  const showRight = side === 'right' || side === 'both';

  const basePageNum = 7 + pageOffset * 2;

  return (
    <div className="w-full h-full flex flex-col md:flex-row gap-6 p-6 sm:p-9 text-[var(--ink)] overflow-y-auto">
      {/* Page Gauche */}
      {showLeft && (
        <div className="flex-1 flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-sans-ui text-[var(--gold)] uppercase tracking-widest font-semibold">
              <span>{BOOK_DATA.projects.chapterNumber}</span>
              <span className="w-4 h-[1px] bg-[var(--gold)]" />
              <span>Les Œuvres</span>
            </div>
          </div>

          <div className="flex-1">
            <ProjectCard project={leftProject} />
          </div>

          <div className="pt-2 border-t border-[var(--border)] text-[10px] font-sans-ui text-[var(--ink-soft)] flex justify-between">
            <span>The Book of Adnane</span>
            <span>Page {basePageNum}</span>
          </div>
        </div>
      )}

      {/* Séparateur central */}
      {side === 'both' && (
        <div className="hidden md:block w-[1px] bg-[var(--border)] self-stretch opacity-60" />
      )}

      {/* Page Droite */}
      {showRight && (
        <div className="flex-1 flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="text-[10px] font-sans-ui text-[var(--gold)] uppercase tracking-widest font-semibold text-right">
              Réalisations en Production
            </div>
          </div>

          <div className="flex-1">
            <ProjectCard project={rightProject} />
          </div>

          <div className="pt-2 border-t border-[var(--border)] text-[10px] font-sans-ui text-[var(--ink-soft)] flex justify-between">
            <span>III — Projets</span>
            <span>Page {basePageNum + 1}</span>
          </div>
        </div>
      )}
    </div>
  );
}
