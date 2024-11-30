import { Task, TaskProgress } from '@prisma/client';
import { GoalType } from '../../types/goal.type';

export type TaskExtended = Task & {
    name: string;
    goalType: GoalType;
    description: string | null;
    category: string | null;
    progress: TaskProgress[];
};
