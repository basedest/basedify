import { db } from '~/db-module';
import { GoalType } from './task.types';

export const useTaskOptions = () => db.taskOption.useFindMany();
export const useGoodHabits = () =>
    db.taskOption.useFindMany({ where: { NOT: { goalType: GoalType.Dont } } });

export const useBadHabits = () =>
    db.taskOption.useFindMany({ where: { goalType: GoalType.Dont } });
