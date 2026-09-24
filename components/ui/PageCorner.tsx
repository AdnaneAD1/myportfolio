'use client';

import React, { useState } from 'react';
import { useBookStore } from '@/lib/store';

interface PageCornerProps {
  direction: 'next' | 'prev';
}

export default function PageCorner({ direction }: PageCornerProps) {
  const { nextPage, prevPage, isOpen } = useBookStore();
  const [hovered, setHovered] = useState(false);

  if (!isOpen) return null;

  const isNext = direction === 'next';

  return (
    <button
      onClick={isNext ? nextPage : prevPage}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={isNext ? "Tourner vers la page suivante" : "Revenir à la page précédente"}
      className={`absolute bottom-0 ${
        isNext ? 'right-0' : 'left-0'
      } z-30 w-16 h-16 sm:w-20 sm:h-20 cursor-pointer overflow-hidden focus:outline-hidden group`}
    >
      {/* Triangle de coin de page qui se soulève au hover */}
      <div
        style={{
          width: '100%',
          height: '100%',
          transformOrigin: isNext ? 'bottom right' : 'bottom left',
          transform: hovered
            ? `scale(${isNext ? '1.25' : '1.25'})`
            : 'scale(1)',
          transition: 'all 0.25s cubic-bezier(0.2, 0, 0, 1)',
        }}
        className="relative"
      >
        <svg
          viewBox="0 0 100 100"
          className={`w-full h-full drop-shadow-md ${!isNext ? '-scale-x-100' : ''}`}
        >
          {/* Ombre portée sous le coin soulevé */}
          <polygon
            points="100,0 100,100 0,100"
            fill="rgba(30, 42, 56, 0.12)"
          />
          {/* Revers de la page papier */}
          <polygon
            points="100,0 100,100 0,100"
            fill={hovered ? "#F2EAD8" : "#FAF3E4"}
            stroke="rgba(184, 134, 62, 0.35)"
            strokeWidth="1.5"
          />
        </svg>

        {/* Petit indicateur visuel discret */}
        <span
          className={`absolute bottom-3 ${
            isNext ? 'right-3' : 'left-3'
          } font-sans-ui text-[9px] font-bold text-[var(--gold)] opacity-70 group-hover:opacity-100 transition-opacity`}
        >
          {isNext ? "→" : "←"}
        </span>
      </div>
    </button>
  );
}
