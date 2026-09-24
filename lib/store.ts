import { create } from 'zustand'

export interface Chapter {
  id: string
  title: string
  page: number
  badge?: string
}

export const CHAPTERS: Chapter[] = [
  { id: 'cover',        title: 'Couverture',        page: 0  },
  { id: 'title',        title: 'Page de garde',      page: 1  },
  { id: 'toc',          title: 'Sommaire',           page: 2  },
  { id: 'about',        title: 'I — À propos',       page: 3,  badge: 'Genèse' },
  { id: 'skills',       title: 'II — Compétences',   page: 5,  badge: 'Arsenal' },
  { id: 'projects',     title: 'III — Projets',      page: 7,  badge: 'Œuvres' },
  { id: 'experience',   title: 'IV — Expérience',    page: 13, badge: 'Parcours' },
  { id: 'contact',      title: 'V — Contact',        page: 17, badge: 'Épilogue' },
  { id: 'back-cover',   title: '4ème de couv.',      page: 18 },
]

export const TOTAL_PAGES = 18

interface BookStore {
  // Book states
  isOpen: boolean
  currentPage: number
  isTurning: boolean
  direction: 'forward' | 'backward'
  pageTurnProgress: number // 0 to 1 for fine smooth animations

  // Accessibility & options
  isSimpleMode: boolean
  soundEnabled: boolean

  // Actions
  openBook: () => void
  closeBook: () => void
  nextPage: () => void
  prevPage: () => void
  goToPage: (page: number) => void
  goToChapter: (chapterId: string) => void
  setTurning: (turning: boolean) => void
  setPageTurnProgress: (progress: number) => void
  toggleSimpleMode: () => void
  setSimpleMode: (simple: boolean) => void
  toggleSound: () => void

  // Backward compatibility
  goNext: () => void
  goPrev: () => void
  goTo: (index: number) => void
  isTransitioning?: boolean
  currentIndex?: number
}

export const useBookStore = create<BookStore>((set, get) => ({
  isOpen: false,
  currentPage: 0,
  isTurning: false,
  direction: 'forward',
  pageTurnProgress: 0,
  isSimpleMode: false,
  soundEnabled: true,

  openBook: () => {
    set({ isOpen: true, currentPage: 1, direction: 'forward' })
  },

  closeBook: () => {
    set({ isOpen: false, currentPage: 0, direction: 'backward' })
  },

  nextPage: () => {
    const { currentPage, isTurning, isOpen } = get()
    if (isTurning) return
    if (!isOpen) {
      set({ isOpen: true, currentPage: 1, direction: 'forward' })
      return
    }
    if (currentPage >= TOTAL_PAGES) return

    // Advance by 2 pages in desktop double-page mode or 1 in title/closing
    const delta = (currentPage === 1 || currentPage === TOTAL_PAGES - 1) ? 1 : 2
    const target = Math.min(TOTAL_PAGES, currentPage + delta)

    set({ 
      isTurning: true, 
      direction: 'forward', 
      currentPage: target 
    })
  },

  prevPage: () => {
    const { currentPage, isTurning, isOpen } = get()
    if (isTurning || !isOpen) return
    if (currentPage <= 1) {
      set({ isOpen: false, currentPage: 0, direction: 'backward' })
      return
    }

    const delta = (currentPage <= 2 || currentPage === TOTAL_PAGES) ? 1 : 2
    const target = Math.max(0, currentPage - delta)

    if (target === 0) {
      set({ isOpen: false, currentPage: 0, direction: 'backward' })
    } else {
      set({ 
        isTurning: true, 
        direction: 'backward', 
        currentPage: target 
      })
    }
  },

  goToPage: (page: number) => {
    const { currentPage, isTurning } = get()
    if (isTurning || page === currentPage) return
    const bounded = Math.max(0, Math.min(TOTAL_PAGES, page))
    set({
      isOpen: bounded > 0,
      currentPage: bounded,
      direction: bounded > currentPage ? 'forward' : 'backward',
      isTurning: true,
    })
  },

  goToChapter: (chapterId: string) => {
    const { isTurning } = get()
    if (isTurning) return
    const chapter = CHAPTERS.find(c => c.id === chapterId)
    if (!chapter) return

    get().goToPage(chapter.page)
  },

  setTurning: (turning: boolean) => set({ isTurning: turning }),
  setPageTurnProgress: (progress: number) => set({ pageTurnProgress: progress }),
  toggleSimpleMode: () => set(state => ({ isSimpleMode: !state.isSimpleMode })),
  setSimpleMode: (simple: boolean) => set({ isSimpleMode: simple }),
  toggleSound: () => set(state => ({ soundEnabled: !state.soundEnabled })),

  // Backward compatibility
  goNext: () => get().nextPage(),
  goPrev: () => get().prevPage(),
  goTo: (index: number) => get().goToPage(index),
  get currentIndex() { return get().currentPage },
  get isTransitioning() { return get().isTurning },
}))

export const useStore = useBookStore
