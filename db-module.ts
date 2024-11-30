import { PrismaClient } from '@prisma/client/react-native';
import { reactiveHooksExtension } from '@prisma/react-native';
import { GoalType, MeasureUnit, TaskKey } from './entities/task';

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
        name: 'Wake up early',
        goalType: GoalType.Time,
        defaultDays: 5,
        defaultGoal: 420, // 7:00 AM
        description: 'Start your day early to boost productivity',
        category: 'lifestyle',
        measureUnit: MeasureUnit.Minutes,
    },
    {
        key: TaskKey.Gym,
        name: 'Hit the gym',
        goalType: GoalType.Duration,
        defaultDays: 3,
        defaultGoal: 90, // 90 minutes per session
        description: 'Regular exercise for better health',
        category: 'fitness',
        measureUnit: MeasureUnit.Minutes,
    },
    {
        key: TaskKey.LimitSocialMedia,
        name: 'Limit social media',
        goalType: GoalType.Duration,
        defaultDays: 7,
        defaultGoal: 30, // 30 minutes per day
        description: 'Reduce time spent on social media',
        category: 'digital wellness',
        measureUnit: MeasureUnit.Minutes,
    },
    {
        key: TaskKey.QuitSmoking,
        name: 'Quit smoking',
        goalType: GoalType.Dont,
        defaultDays: 7,
        description: 'Stop smoking for better health',
        category: 'health',
    },
    {
        key: TaskKey.DrinkWater,
        name: 'Drink water',
        goalType: GoalType.Measurable,
        defaultDays: 7,
        defaultGoal: 2.0, // 2 liters per day
        description: 'Stay hydrated throughout the day',
        category: 'health',
        measureUnit: MeasureUnit.Liters,
    },
    {
        key: TaskKey.ColdShower,
        name: 'Take cold shower',
        goalType: GoalType.Do,
        defaultDays: 5,
        description: 'Build mental strength with cold exposure',
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
