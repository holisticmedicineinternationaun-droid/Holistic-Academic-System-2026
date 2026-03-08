import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AcademicProject {
    id: string;
    title: string;
    type: 'research' | 'lecture' | 'editor';
    content: string;
    chapters: { title: string; pages: number }[];
    lastModified: number;
}

interface SharedAcademicState {
    activeProject: AcademicProject | null;
    encyclopediaHistory: string[];
    searchBuffer: string | null;

    setActiveProject: (p: AcademicProject) => void;
    updateActiveContent: (c: string) => void;
    addSearchToBuffer: (s: string) => void;
}

export const useAcademicStore = create<SharedAcademicState>()(
    persist(
        (set) => ({
            activeProject: null,
            encyclopediaHistory: [],
            searchBuffer: null,

            setActiveProject: (p) => set({ activeProject: p }),
            updateActiveContent: (c) => set((state) => ({
                activeProject: state.activeProject ? { ...state.activeProject, content: c, lastModified: Date.now() } : null
            })),
            addSearchToBuffer: (s) => set({ searchBuffer: s }),
        }),
        { name: 'holistic-academic-storage' }
    )
);
