import { TaskProgress } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { db } from '~/db-module';
import { getCurrentDayTasks } from '~/entities/task/task.lib';
import {
    TaskExtended,
    TaskProgressStatus,
    TaskWithProgress,
} from '~/entities/task/task.types';

export const useCurrentDayTasks = (
    tasks: TaskExtended[],
    currentDay: number,
    startDate?: Date,
) => {
    return useQuery({
        queryFn: async () => {
            if (!startDate || !tasks) {
                return [];
            }

            const currentDayTasks = getCurrentDayTasks(
                tasks,
                startDate,
                currentDay,
            );

            const taskArray: TaskWithProgress[] = [];

            for (const task of currentDayTasks) {
                const currentProgress: TaskProgress =
                    (await db.taskProgress.findFirst({
                        where: { taskId: task.id, day: currentDay },
                    })) ??
                    (await db.taskProgress.create({
                        data: {
                            taskId: task.id,
                            status: TaskProgressStatus.Todo,
                            day: currentDay,
                        },
                    }));
                taskArray.push({ ...task, currentProgress });
            }

            return taskArray;
        },
        queryKey: [currentDay, startDate, tasks],
    });
};
