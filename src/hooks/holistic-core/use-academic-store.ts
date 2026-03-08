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

    // Structure and Meta
    currentTitle: string;
    currentDegree: string;
    currentStructure: { name: string; pages: number }[];

    setActiveProject: (p: AcademicProject) => void;
    updateActiveContent: (c: string) => void;
    addSearchToBuffer: (s: string) => void;
    setProjectMeta: (title: string, degree: string, structure: { name: string; pages: number }[]) => void;
}

export const useAcademicStore = create<SharedAcademicState>()(
    persist(
        (set) => ({
            activeProject: null,
            encyclopediaHistory: [],
            searchBuffer: null,
            currentTitle: '',
            currentDegree: '',
            currentStructure: [],

            setActiveProject: (p) => set({ activeProject: p }),
            updateActiveContent: (c) => set((state) => ({
                activeProject: state.activeProject ? { ...state.activeProject, content: c, lastModified: Date.now() } : null
            })),
            addSearchToBuffer: (s) => set({ searchBuffer: s }),
            setProjectMeta: (title, degree, structure) => set({
                currentTitle: title,
                currentDegree: degree,
                currentStructure: structure
            }),
        }),
        { name: 'holistic-academic-storage' }
    )
);
