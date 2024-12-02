import { TaskProgress } from '@prisma/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { db } from '~/db-module';
import { useProgramStore } from '~/entities/program/program.store';
import { useTasksContext } from '~/entities/task';
import { getCurrentDayTasks } from '~/entities/task/task.lib';
import { TaskWithProgress } from '~/entities/task/task.types';

export const useCurrentDayTasks = (currentDay: number) => {
    const { tasks } = useTasksContext();
    const { program } = useProgramStore();
    const queryClient = useQueryClient();

    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: ['tasks', currentDay] });
    }, [tasks, program, queryClient, currentDay]);

    return useQuery({
        queryFn: async () => {
            if (!program?.startDate || !tasks) {
                return [];
            }

            const currentDayTasks = getCurrentDayTasks(
                tasks,
                program.startDate,
                currentDay,
            );

            const taskArray: TaskWithProgress[] = [];

            for (const task of currentDayTasks) {
                let currentProgress = (await db.taskProgress.findUnique({
                    where: {
                        progressId: { taskId: task.id, day: currentDay },
                    },
                })) as TaskProgress;

                if (!currentProgress) {
                    currentProgress = (await db.taskProgress.create({
                        data: {
                            taskId: task.id,
                            day: currentDay,
                        },
                    })) as TaskProgress;
                }

                taskArray.push({ ...task, currentProgress });
            }

            return taskArray;
        },
        // eslint-disable-next-line @tanstack/query/exhaustive-deps
        queryKey: ['tasks', currentDay],
    });
};
