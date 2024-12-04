import { TaskOption } from '@prisma/client';
import { t } from 'i18next';
import { GoalType, MeasureUnit } from '~/entities/task/task.types';

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

    const formatMeasureUnit = (value: number, unit: string) => {
        return t(`enums.measureUnit.${unit}`, { count: value });
    };

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
                    formatMeasureUnit(
                        transformer(value),
                        taskOption.measureUnit || MeasureUnit.Minutes,
                    ),
            };
        case GoalType.Measurable:
            return {
                min: 0,
                max: taskOption.defaultGoal ? taskOption.defaultGoal * 2 : 10,
                step: 0.5,
                format: (value: number | null) =>
                    formatMeasureUnit(
                        transformer(value),
                        taskOption.measureUnit || MeasureUnit.Times,
                    ),
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
