import { SurveyStore } from './survey.types';
import { create } from 'zustand/react';

export const useSurveyStore = create<SurveyStore>()((set) => ({
    goodHabits: [],
    setGoodHabits: (goodHabits) => set({ goodHabits }),

    badHabits: [],
    setBadHabits: (badHabits) => set({ badHabits }),

    taskConfigurations: [],
    setTaskConfigurations: (taskConfigurations) => set({ taskConfigurations }),

    initialGoal: null,
    setInitialGoal: (initialGoal) => set({ initialGoal }),

    goal: null,
    setGoal: (goal) => set({ goal }),

    days: [],
    setDays: (days) => set({ days }),
}));
