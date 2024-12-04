import { PrismaClient } from '@prisma/client/react-native';
import { reactiveHooksExtension } from '@prisma/react-native';
import { GoalType, MeasureUnit, TaskKey } from './entities/task/task.types';

const baseClient = new PrismaClient({
    log: [
        // {emit: 'stdout', level: 'query'},
        { emit: 'stdout', level: 'info' },
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' },
    ],
});

const defaultTaskOptions = [
    {
        key: TaskKey.WakeUp,
        name: 'tasks.wakeUp.name',
        goalType: GoalType.Time,
        defaultDays: 5,
        defaultGoal: 420, // 7:00 AM
        description: 'tasks.wakeUp.description',
        category: 'lifestyle',
        measureUnit: MeasureUnit.Minutes,
    },
    {
        key: TaskKey.Gym,
        name: 'tasks.gym.name',
        goalType: GoalType.Duration,
        defaultDays: 3,
        defaultGoal: 90, // 90 minutes per session
        description: 'tasks.gym.description',
        category: 'fitness',
        measureUnit: MeasureUnit.Minutes,
    },
    {
        key: TaskKey.LimitSocialMedia,
        name: 'tasks.limitSocialMedia.name',
        goalType: GoalType.Duration,
        defaultDays: 7,
        defaultGoal: 30, // 30 minutes per day
        description: 'tasks.limitSocialMedia.description',
        category: 'digital wellness',
        measureUnit: MeasureUnit.Minutes,
    },
    {
        key: TaskKey.QuitSmoking,
        name: 'tasks.quitSmoking.name',
        goalType: GoalType.Dont,
        defaultDays: 7,
        description: 'tasks.quitSmoking.description',
        category: 'health',
    },
    {
        key: TaskKey.DrinkWater,
        name: 'tasks.drinkWater.name',
        goalType: GoalType.Measurable,
        defaultDays: 7,
        defaultGoal: 2.0, // 2 liters per day
        description: 'tasks.drinkWater.description',
        category: 'health',
        measureUnit: MeasureUnit.Liters,
    },
    {
        key: TaskKey.ColdShower,
        name: 'tasks.coldShower.name',
        goalType: GoalType.Do,
        defaultDays: 5,
        description: 'tasks.coldShower.description',
        category: 'lifestyle',
    },
];

const defaultUser = {
    name: 'Default',
};

export async function initializeDb() {
    try {
        await baseClient.$applyPendingMigrations();
        console.debug('after migrations');

        if ((await baseClient.taskOption.count()) === 0) {
            await baseClient.taskOption.createMany({
                data: defaultTaskOptions,
            });
        }

        // delete this after auth is implemented
        if ((await baseClient.user.count()) === 0) {
            await baseClient.user.create({
                data: defaultUser,
            });
        }

        console.debug('after seeding');
    } catch (e) {
        console.error(`failed to apply migrations: ${e}`);
        throw new Error(
            'Applying migrations failed, your app is now in an inconsistent state. We cannot guarantee safety, it is now your responsibility to reset the database or tell the user to re-install the app',
        );
    }
}

export const db = baseClient.$extends(reactiveHooksExtension());
