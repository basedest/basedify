import React from 'react';
import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import {
    TaskProgressStatus,
    TaskWithProgress,
} from '~/entities/task/task.types';
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { db } from '~/db-module';
import { useQueryClient } from '@tanstack/react-query';

type TaskItemProps = {
    task: TaskWithProgress;
};

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const taskProgress = task.currentProgress;
    const queryClient = useQueryClient();

    const taskProgressStatus =
        (taskProgress?.status as TaskProgressStatus) ??
        task.currentProgress.status;

    const isSkipped = taskProgressStatus === TaskProgressStatus.Skipped;
    const isDone = taskProgressStatus === TaskProgressStatus.Done;

    const skipButtonText = isSkipped ? 'Unskip' : 'Skip';

    const completeButtonText = isDone ? 'Undo' : 'Complete';

    const handleSkip = async () => {
        const newStatus = isSkipped
            ? TaskProgressStatus.Todo
            : TaskProgressStatus.Skipped;

        await db.taskProgress.update({
            where: {
                progressId: {
                    taskId: task.id,
                    day: task.currentProgress.day,
                },
            },
            data: { status: newStatus },
        });

        if (newStatus === TaskProgressStatus.Skipped) {
            // TODO: invalidate streaks on startup
            await db.task.update({
                where: {
                    id: task.id,
                },
                data: {
                    currentStreak: 0,
                },
            });
        }

        await queryClient.invalidateQueries({
            queryKey: ['tasks', task.currentProgress.day],
        });
    };

    const handleComplete = async () => {
        const newStatus = isDone
            ? TaskProgressStatus.Todo
            : TaskProgressStatus.Done;

        await db.taskProgress.update({
            where: {
                progressId: {
                    taskId: task.id,
                    day: task.currentProgress.day,
                },
            },
            data: { status: newStatus },
        });

        const newStreak = isDone ? --task.currentStreak : ++task.currentStreak;
        await db.task.update({
            where: {
                id: task.id,
            },
            data: {
                currentStreak: newStreak,
                ...(newStreak > task.bestStreak && {
                    bestStreak: newStreak,
                }),
            },
        });

        await queryClient.invalidateQueries({
            queryKey: ['tasks', task.currentProgress.day],
        });
    };

    return (
        <Card className="mb-4 w-full rounded-lg bg-card pt-4">
            <CardTitle className="pl-4">{task.name}</CardTitle>
            <CardDescription className="pl-4">
                {task.description}
            </CardDescription>
            <CardContent className="p-4">
                <View className="flex-row justify-between">
                    <Text>Streak: {task.currentStreak}</Text>
                    {/* TODO: i18n */}
                    <Text>{task.repeatSchedule.split(',').join(', ')}</Text>
                </View>
                <View className="mt-2 flex-row justify-end gap-2">
                    <Button
                        disabled={!taskProgressStatus}
                        size="sm"
                        variant="secondary"
                        className="w-28"
                        onPress={handleSkip}
                    >
                        <Text>{skipButtonText}</Text>
                    </Button>
                    <Button
                        disabled={!taskProgressStatus}
                        size="sm"
                        className=" w-28"
                        onPress={handleComplete}
                    >
                        <Text>{completeButtonText}</Text>
                    </Button>
                </View>
            </CardContent>
        </Card>
    );
};
