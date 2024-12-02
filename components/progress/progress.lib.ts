import { Task, TaskOption, TaskProgress } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { db } from '~/db-module';

export type TaskWithRelations = Task & {
    taskProgress: TaskProgress[];
    taskOption: TaskOption;
};

export const progressKeys = {
    all: ['tasks'] as const,
    byProgramId: (programId?: number) =>
        [...progressKeys.all, programId] as const,
};

export const useTasksQuery = (programId?: number) => {
    return useQuery({
        queryKey: progressKeys.byProgramId(programId),
        queryFn: () =>
            db.task.findMany({
                where: { programId },
                include: {
                    taskOption: true,
                    taskProgress: true,
                },
            }),
        enabled: !!programId,
    });
};
