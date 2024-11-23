import { Task, TaskOption } from '@prisma/client';

export type TaskConfiguration = Omit<
    Task,
    'id' | 'programId' | 'bestStreak' | 'currentStreak'
> & {
    taskOption: TaskOption;
};

export type SurveyStore = {
    goodHabits: number[];
    setGoodHabits: (goodHabits: number[]) => void;

    badHabits: number[];
    setBadHabits: (badHabits: number[]) => void;

    taskConfigurations: TaskConfiguration[];
    setTaskConfigurations: (taskConfigurations: TaskConfiguration[]) => void;

    initialGoal: number | null;
    setInitialGoal: (initialGoal: number | null) => void;

    goal: number | null;
    setGoal: (goal: number | null) => void;
};
