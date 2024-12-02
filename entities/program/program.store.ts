import { Program } from '@prisma/client';
import { create } from 'zustand/react';

export type ProgramStore = {
    currentDay: number;
    setCurrentDay: (day: number) => void;
    program: Program | null;
    setProgram: (program: Program) => void;
};

export const useProgramStore = create<ProgramStore>()((set) => ({
    currentDay: 1,
    setCurrentDay: (currentDay) => set(() => ({ currentDay })),
    program: null,
    setProgram: (program: Program) => set(() => ({ program })),
}));
