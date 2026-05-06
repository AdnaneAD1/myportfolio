'use client';

import { useEffect, useRef } from 'react';
import { useStore } from '@/lib/store';

export function useImmersiveNav() {
  const { goNext, goPrev } = useStore();
  const lastScrollTime = useRef(0);
  const touchStartY = useRef(0);
  const THROTTLE_MS = 1400; // Increased slightly for safety
  const MIN_DELTA = 30; // Ignore tiny scrolls

  useEffect(() => {
    const canScrollInternal = (el: HTMLElement, delta: number) => {
      const isScrollable = el.scrollHeight > el.clientHeight;
      if (!isScrollable) return false;

      if (delta > 0) {
        return el.scrollTop < el.scrollHeight - el.clientHeight - 1;
      } else {
        return el.scrollTop > 1;
      }
    };

    const getScrollableParent = (el: HTMLElement): HTMLElement | null => {
      let current = el;
      while (current && current !== document.body) {
        const style = window.getComputedStyle(current);
        if (
          (current.scrollHeight > current.clientHeight) &&
          (style.overflowY === 'auto' || style.overflowY === 'scroll')
        ) {
          return current;
        }
        current = current.parentElement as HTMLElement;
      }
      return null;
    };

    const handleWheel = (e: WheelEvent) => {
      // Use useStore.getState() to get the absolute LATEST state immediately
      const state = useStore.getState();
      
      const scrollable = getScrollableParent(e.target as HTMLElement);
      if (scrollable && canScrollInternal(scrollable, e.deltaY)) {
        return;
      }

      e.preventDefault();

      if (Math.abs(e.deltaY) < MIN_DELTA) return;
      if (state.isTransitioning) return;

      const now = Date.now();
      if (now - lastScrollTime.current < THROTTLE_MS) return;

      lastScrollTime.current = now;

      if (e.deltaY > 0) goNext();
      else goPrev();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const state = useStore.getState();
      if (state.isTransitioning) return;
      
      const now = Date.now();
      if (now - lastScrollTime.current < THROTTLE_MS) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        const scrollable = getScrollableParent(document.activeElement as HTMLElement || document.body);
        if (scrollable && canScrollInternal(scrollable, 1)) return;

        lastScrollTime.current = now;
        goNext();
      }
      if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        const scrollable = getScrollableParent(document.activeElement as HTMLElement || document.body);
        if (scrollable && canScrollInternal(scrollable, -1)) return;

        lastScrollTime.current = now;
        goPrev();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const state = useStore.getState();
      if (state.isTransitioning) return;
      
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 60) return; // Touch sensitivity

      const scrollable = getScrollableParent(e.target as HTMLElement);
      if (scrollable && canScrollInternal(scrollable, delta)) return;

      const now = Date.now();
      if (now - lastScrollTime.current < THROTTLE_MS) return;

      lastScrollTime.current = now;
      if (delta > 0) goNext();
      else goPrev();
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [goNext, goPrev]);
}
