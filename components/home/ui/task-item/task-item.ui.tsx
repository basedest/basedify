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

type TaskItemProps = {
    task: TaskWithProgress;
};

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const taskProgress = db.taskProgress.useFindFirst({
        where: { taskId: task.id },
    });

    const taskProgressStatus =
        (taskProgress?.status as TaskProgressStatus) ??
        task.currentProgress.status;

    const isSkipped = taskProgressStatus === TaskProgressStatus.Skipped;
    const isDone = taskProgressStatus === TaskProgressStatus.Done;

    const skipButtonText = isSkipped ? 'Unskip' : 'Skip';

    const completeButtonText = isDone ? 'Uncomplete' : 'Complete';

    const handleSkip = async () => {
        const newStatus = isSkipped
            ? TaskProgressStatus.Todo
            : TaskProgressStatus.Skipped;

        await db.taskProgress.update({
            where: { id: taskProgress!.id },
            data: { status: newStatus },
        });
    };

    const handleComplete = async () => {
        const newStatus = isDone
            ? TaskProgressStatus.Todo
            : TaskProgressStatus.Done;

        await db.taskProgress.update({
            where: { id: taskProgress!.id },
            data: { status: newStatus },
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
                    <Text>{task.repeatSchedule.split(',').join(', ')}</Text>
                </View>
                <View className="mt-2 flex-row justify-end gap-2">
                    <Button
                        disabled={!taskProgressStatus}
                        size="sm"
                        variant="secondary"
                        className="w-32"
                        onPress={handleSkip}
                    >
                        <Text>{skipButtonText}</Text>
                    </Button>
                    <Button
                        disabled={!taskProgressStatus}
                        size="sm"
                        className=" w-32"
                        onPress={handleComplete}
                    >
                        <Text>{completeButtonText}</Text>
                    </Button>
                </View>
            </CardContent>
        </Card>
    );
};
