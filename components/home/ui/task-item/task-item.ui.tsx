import React from 'react';
import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import { TaskProgressStatus } from '~/entities/task/task.types';
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import {
    TaskWithProgressAndOption,
    useUpdateTaskProgress,
    useUpdateTaskStreak,
} from '~/entities/task/task.lib';

type TaskItemProps = {
    task: TaskWithProgressAndOption;
};

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const taskProgress = task.currentTaskProgress;
    const { mutate: updateProgress } = useUpdateTaskProgress();
    const { mutate: updateStreak } = useUpdateTaskStreak();

    const taskProgressStatus =
        (taskProgress?.status as TaskProgressStatus) ?? taskProgress.status;

    const isSkipped = taskProgressStatus === TaskProgressStatus.Skipped;
    const isDone = taskProgressStatus === TaskProgressStatus.Done;

    const skipButtonText = isSkipped ? 'Unskip' : 'Skip';

    const completeButtonText = isDone ? 'Undo' : 'Complete';

    const handleSkip = () => {
        const newStatus = isSkipped
            ? TaskProgressStatus.Todo
            : TaskProgressStatus.Skipped;

        updateProgress({
            taskId: task.task.id,
            day: taskProgress.day,
            status: newStatus,
        });

        if (newStatus === TaskProgressStatus.Skipped) {
            // TODO: invalidate streaks on startup
            updateStreak({
                taskId: task.task.id,
                streak: task.task.currentStreak,
            });
        }
    };

    const handleComplete = () => {
        const newStatus = isDone
            ? TaskProgressStatus.Todo
            : TaskProgressStatus.Done;

        updateProgress({
            taskId: task.task.id,
            day: taskProgress.day,
            status: newStatus,
        });

        const newStreak = isDone
            ? --task.task.currentStreak
            : ++task.task.currentStreak;

        updateStreak({
            taskId: task.task.id,
            streak: newStreak,
            bestStreak:
                newStreak > task.task.bestStreak ? newStreak : undefined,
        });
    };

    return (
        <Card className="mb-4 w-full rounded-lg bg-card pt-4">
            <CardTitle className="pl-4">{task.taskOption.name}</CardTitle>
            <CardDescription className="pl-4">
                {task.taskOption.description}
            </CardDescription>
            <CardContent className="p-4">
                <View className="flex-row justify-between">
                    <Text>Streak: {task.task.currentStreak}</Text>
                    {/* TODO: i18n */}
                    <Text>
                        {task.task.repeatSchedule.split(',').join(', ')}
                    </Text>
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
