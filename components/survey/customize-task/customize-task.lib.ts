import { TaskOption } from '@prisma/client';
import { GoalType } from '~/types/goal.type';

export const getValueTransformer = (taskOption: TaskOption) => {
    switch (taskOption.goalType as GoalType) {
        case GoalType.Time:
            return (value?: number | null) => Math.floor((value || 0) / 60);
        case GoalType.Duration:
            return (value?: number | null) => value || 0;
        case GoalType.Measurable:
            return (value?: number | null) => value || 0;
        default:
            return (value?: number | null) => value || 0;
    }
};

export const getSliderConfig = (taskOption: TaskOption) => {
    const transformer = getValueTransformer(taskOption);
    switch (taskOption.goalType as GoalType) {
        case GoalType.Time:
            return {
                min: 300, // 5 AM
                max: 720, // 12 PM
                step: 60,
                format: (value: number | null) => `${transformer(value)}:00 AM`,
            };
        case GoalType.Duration:
            return {
                min: 0,
                max: 120,
                step: 5,
                format: (value: number | null) =>
                    `${transformer(value)} ${taskOption.measureUnit || 'minutes'}`,
            };
        case GoalType.Measurable:
            return {
                min: 0,
                max: taskOption.defaultGoal ? taskOption.defaultGoal * 2 : 10,
                step: 0.5,
                format: (value: number | null) =>
                    `${transformer(value)} ${taskOption.measureUnit || 'units'}`,
            };
        default:
            return {
                min: 0,
                max: 7,
                step: 1,
                format: (value: number | null) => transformer(value).toString(),
            };
    }
};
