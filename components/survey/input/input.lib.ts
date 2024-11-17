// <Input
//                             placeholder={getInputLabel(
//                                 option.goalType as GoalType,
//                                 option.measureUnit ?? undefined,
//                             )}
//                             value={(tasks[index]?.goal || '').toString()}
//                             onChangeText={(value) => {
//                                 const newTasks = [...tasks];
//                                 newTasks[index].goal = value
//                                     ? Number(value)
//                                     : null;
//                                 setTasks(newTasks);
//                             }}
//                             keyboardType="numeric"
//                             className="mt-2 rounded border border-gray-300 p-2"
//                         />

import { GoalType } from '~/types/goal.type';

//                         <Input
//                             placeholder={`Current ${getInputLabel(option.goalType as GoalType, option.measureUnit)}`}
//                             value={tasks[index]?.initialGoal?.toString()}
//                             onChangeText={(value) => {
//                                 const newTasks = [...tasks];
//                                 newTasks[index].initialGoal = value
//                                     ? Number(value)
//                                     : null;
//                                 setTasks(newTasks);
//                             }}
//                             keyboardType="numeric"
//                             className="mt-2 rounded border border-gray-300 p-2"
//                         />

export const getInputLabel = (
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
