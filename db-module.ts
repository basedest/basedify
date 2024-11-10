import '@prisma/react-native';
import { PrismaClient } from '@prisma/client/react-native';
import { reactiveHooksExtension } from '@prisma/react-native';

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
        name: 'Wake up early',
        goalType: 'time',
        defaultDays: 7,
        defaultGoal: 420, // 7:00 AM
        description: 'Start your day early to boost productivity',
        category: 'lifestyle',
    },
    {
        name: 'Hit the gym',
        goalType: 'do',
        defaultDays: 3,
        description: 'Regular exercise for better health',
        category: 'fitness',
    },
    {
        name: 'Limit social media',
        goalType: 'duration',
        defaultDays: 7,
        defaultGoal: 60, // 60 minutes per day
        description: 'Reduce time spent on social media',
        category: 'digital wellness',
    },
    {
        name: 'Quit smoking',
        goalType: 'dont',
        defaultDays: 7,
        description: 'Stop smoking for better health',
        category: 'health',
    },
    {
        name: 'Drink water',
        goalType: 'measurable',
        defaultDays: 7,
        defaultGoal: 2.0, // 2 liters per day
        description: 'Stay hydrated throughout the day',
        category: 'health',
    },
    {
        name: 'Take cold shower',
        goalType: 'do',
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
    } catch (e) {
        console.error(`failed to apply migrations: ${e}`);
        throw new Error(
            'Applying migrations failed, your app is now in an inconsistent state. We cannot guarantee safety, it is now your responsibility to reset the database or tell the user to re-install the app',
        );
    }
}

export const db = baseClient.$extends(reactiveHooksExtension());
