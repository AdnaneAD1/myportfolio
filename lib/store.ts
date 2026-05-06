import { create } from 'zustand'
import type * as THREE from 'three'

export const SECTIONS = [
  { id: 'hero',       label: '01 — HOME',    index: 0 },
  { id: 'about',      label: '02 — ABOUT',   index: 1 },
  { id: 'skills',     label: '03 — SKILLS',  index: 2 },
  { id: 'projects',   label: '04 — WORK',    index: 3 },
  { id: 'experience', label: '05 — XP',      index: 4 },
  { id: 'contact',    label: '06 — CONTACT', index: 5 },
]

interface Store {
  // Navigation
  currentIndex: number
  previousIndex: number
  isTransitioning: boolean
  direction: 'next' | 'prev'

  // Actions
  goNext: () => void
  goPrev: () => void
  goTo: (index: number) => void
  setTransitioning: (v: boolean) => void

  // Camera 3D
  camera: THREE.Camera | null
  setCamera: (cam: THREE.Camera) => void
}

export const useStore = create<Store>((set, get) => ({
  currentIndex: 0,
  previousIndex: 0,
  isTransitioning: false,
  direction: 'next',
  camera: null,
  setCamera: (cam) => set({ camera: cam }),

  goNext: () => {
    const { currentIndex, isTransitioning } = get()
    if (isTransitioning) return
    const nextIndex = (currentIndex + 1) % SECTIONS.length
    set({
      previousIndex: currentIndex,
      currentIndex: nextIndex,
      direction: 'next',
      isTransitioning: true,
    })
  },

  goPrev: () => {
    const { currentIndex, isTransitioning } = get()
    if (isTransitioning) return
    const nextIndex = (currentIndex - 1 + SECTIONS.length) % SECTIONS.length
    set({
      previousIndex: currentIndex,
      currentIndex: nextIndex,
      direction: 'prev',
      isTransitioning: true,
    })
  },

  goTo: (index: number) => {
    const { currentIndex, isTransitioning } = get()
    if (isTransitioning || index === currentIndex) return
    set({
      previousIndex: currentIndex,
      currentIndex: index,
      direction: index > currentIndex ? 'next' : 'prev',
      isTransitioning: true,
    })
  },

  setTransitioning: (v) => set({ isTransitioning: v }),
}))
