import { GoalType } from '~/types/goal.type';

const getGeneralInputLabel = (
    goalType: GoalType,
    measureUnit?: string | null,
) => {
    switch (goalType) {
        case GoalType.Time:
            return 'Target time (HH:MM)';
        case GoalType.Duration:
            return `Duration (${measureUnit || 'minutes'})`;
        case GoalType.Do:
            return 'Times per day';
        case GoalType.Dont:
            return 'Maximum allowed';
        case GoalType.Measurable:
            return `Amount (${measureUnit || 'units'})`;
    }
};
