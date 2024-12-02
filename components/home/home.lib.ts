import { PrismaPromise } from '@prisma/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { db } from '~/db-module';
import { useProgramStore } from '~/entities/program/program.store';
import { useTasksContext } from '~/entities/task';
import { getCurrentDayTasks } from '~/entities/task/task.lib';

// export const useCurrentDayTasks = (currentDay: number) => {
//     const { tasks } = useTasksContext();
//     const { program } = useProgramStore();
//     const queryClient = useQueryClient();

//     useEffect(() => {
//         queryClient.invalidateQueries({ queryKey: ['tasks', currentDay] });
//     }, [tasks, program, queryClient, currentDay]);

//     return useQuery({
//         queryFn: async () => {
//             if (!program?.startDate || !tasks) {
//                 return [];
//             }

//             const currentDayTasks = getCurrentDayTasks(
//                 tasks,
//                 program.startDate,
//                 currentDay,
//             );

//             // First, do the batch upsert operation
//             await db.$transaction(
//                 currentDayTasks.map((task) => {
//                     return db.taskProgress.upsert({
//                         where: {
//                             progressId: {
//                                 taskId: task.id,
//                                 day: currentDay,
//                             },
//                         },
//                         update: {},
//                         create: {
//                             taskId: task.id,
//                             day: currentDay,
//                         },
//                     }) as PrismaPromise<any>;
//                 }),
//             );

//             // Then separately fetch all progresses
//             const progresses = await db.taskProgress.findMany({
//                 where: {
//                     day: currentDay,
//                     taskId: { in: currentDayTasks.map((t) => t.id) },
//                 },
//             });

//             // Map tasks with their progresses
//             return currentDayTasks.map((task) => ({
//                 ...task,
//                 currentProgress: progresses.find((p) => p.taskId === task.id)!,
//             }));
//         },
//         queryKey: ['tasks', currentDay],
//         retry: false,
//         staleTime: 5 * 60 * 1000, // Cache for 5 minutes
//     });
// };
