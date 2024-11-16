import { Task } from '@prisma/client';

export type TaskConfiguration = Omit<
    Task,
    'id' | 'programId' | 'bestStreak' | 'currentStreak'
>;

export type SurveyStore = {
    goodHabits: number[];
    setGoodHabits: (goodHabits: number[]) => void;

    badHabits: number[];
    setBadHabits: (badHabits: number[]) => void;

    taskConfigurations: TaskConfiguration[];
    setTaskConfigurations: (taskConfigurations: TaskConfiguration[]) => void;
};
