import dayjs from 'dayjs';
import { TimeUtils } from '~/lib/utils';
import { TaskExtended, TaskProgressStatus } from './task.types';
import { Task, TaskOption, TaskProgress } from '@prisma/client';
import { db } from '~/db-module';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function getCurrentDayTasks(
    tasks: TaskExtended[],
    startDate: Date,
    currentDayOfProgram: number,
) {
    return tasks.filter((task) => {
        const currentDate = dayjs(startDate).add(
            currentDayOfProgram - 1,
            'days',
        );
        const currentWeekDay = currentDate.day();
        return TimeUtils.parseRepeatScheduleString(task.repeatSchedule).some(
            (day) => day === currentWeekDay,
        );
    });
}

export async function createTaskProgressesForDay(day: number, tasks?: Task[]) {
    const taskList = tasks ?? (await db.task.findMany());

    return db.taskProgress.createMany({
        data: taskList.map((task) => ({
            taskId: task.id,
            status: TaskProgressStatus.Todo,
            day,
        })),
    });
}

export type TaskWithProgressAndOption = {
    task: Task;
    taskOption: TaskOption;
    currentTaskProgress: TaskProgress;
};

export function useTasksWithProgressForDay(
    programId: number,
    day: number,
): TaskWithProgressAndOption[] | undefined {
    const tasks = db.task.useFindMany({
        where: {
            programId: programId,
        },
        include: {
            taskOption: true,
            taskProgress: {
                where: {
                    day: day,
                },
                take: 1,
            },
        },
    });

    return tasks.map((task) => ({
        task: {
            id: task.id,
            goal: task.goal,
            initialGoal: task.initialGoal,
            initialDays: task.initialDays,
            currentStreak: task.currentStreak,
            bestStreak: task.bestStreak,
            repeatSchedule: task.repeatSchedule,
            programId: task.programId,
            taskOptionId: task.taskOptionId,
        },
        taskOption: task.taskOption,
        currentTaskProgress: task.taskProgress[0] || null,
    }));
}

export async function getTasksWithProgressForDay(
    programId: number,
    day: number,
): Promise<TaskWithProgressAndOption[]> {
    const tasks = await db.task.findMany({
        where: {
            programId: programId,
        },
        include: {
            taskOption: true,
        },
    });

    const tasksWithProgress = await Promise.all(
        tasks.map(async (task) => {
            // Find or create progress for each task
            const progress = await db.taskProgress.upsert({
                where: {
                    progressId: {
                        taskId: task.id,
                        day: day,
                    },
                },
                create: {
                    taskId: task.id,
                    day: day,
                    status: TaskProgressStatus.Todo,
                },
                update: {}, // No updates if exists
            });

            return {
                task,
                taskOption: task.taskOption,
                currentTaskProgress: progress,
            };
        }),
    );

    return tasksWithProgress;
}

export const taskKeys = {
    all: ['tasks'] as const,
    program: (programId: number) => [...taskKeys.all, programId] as const,
    programDay: (programId: number, day: number) =>
        [...taskKeys.program(programId), day] as const,
};

type TasksQueryResult = Awaited<ReturnType<typeof getTasksWithProgressForDay>>;

export function useTasksWithProgress(programId: number, day: number) {
    return useQuery({
        queryKey: taskKeys.programDay(programId, day),
        queryFn: () => getTasksWithProgressForDay(programId, day),
        staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    });
}

export function useUpdateTaskProgress() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            taskId,
            day,
            status,
            value,
        }: {
            taskId: number;
            day: number;
            status: 'done' | 'skipped' | 'todo';
            value?: number;
            streak?: number;
        }) => {
            return await db.taskProgress.update({
                where: {
                    progressId: {
                        taskId,
                        day,
                    },
                },
                data: {
                    status,
                    value,
                },
            });
        },
        onSuccess: (_, variables) => {
            // Invalidate relevant queries
            queryClient.invalidateQueries({
                queryKey: taskKeys.all,
            });
        },
    });
}

export function useUpdateTaskStreak() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            taskId,
            streak,
            bestStreak,
        }: {
            taskId: number;
            streak: number;
            bestStreak?: number;
        }) => {
            return await db.task.update({
                where: {
                    id: taskId,
                },
                data: {
                    currentStreak: streak,
                    ...(bestStreak && {
                        bestStreak,
                    }),
                },
            });
        },
        onSuccess: (_, variables) => {
            // Invalidate relevant queries
            queryClient.invalidateQueries({
                queryKey: taskKeys.all,
            });
        },
    });
}
