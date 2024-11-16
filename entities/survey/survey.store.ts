import { SurveyStore } from './survey.types';
import { create } from 'zustand';

export const useSurveyStore = create<SurveyStore>()((set) => ({
    goodHabits: [],
    setGoodHabits: (goodHabits) => set({ goodHabits }),

    badHabits: [],
    setBadHabits: (badHabits) => set({ badHabits }),

    taskConfigurations: [],
    setTaskConfigurations: (taskConfigurations) => set({ taskConfigurations }),
}));
