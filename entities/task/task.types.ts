import { Task, TaskProgress } from '@prisma/client';

export type TaskExtended = Task & {
    name: string;
    goalType: GoalType;
    description: string | null;
    category: string | null;
};

export const enum TaskKey {
    WakeUp = 'WAKE_UP',
    Gym = 'GYM',
    LimitSocialMedia = 'LIMIT_SOCIAL_MEDIA',
    QuitSmoking = 'QUIT_SMOKING',
    DrinkWater = 'DRINK_WATER',
    ColdShower = 'COLD_SHOWER',
}

export const enum GoalType {
    Time = 'time',
    Do = 'do',
    Duration = 'duration',
    Dont = 'dont',
    Measurable = 'measurable',
}

export const enum MeasureUnit {
    Times = 'times', // if not specified, it's assumed to be times
    Repetitions = 'reps', // same as times, but more relevant in certain contexts

    Minutes = 'min',
    Hours = 'h',
    Days = 'd',

    Kilograms = 'kg',
    Grams = 'g',

    Liters = 'l',
    Milliliters = 'ml',
}

export const enum TaskProgressStatus {
    Todo = 'todo',
    Done = 'done',
    Skipped = 'skipped',
    InProgress = 'inProgress',
}

export type TaskWithProgress = TaskExtended & { currentProgress: TaskProgress };
