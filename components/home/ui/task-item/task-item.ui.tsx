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
import { useTranslation } from 'react-i18next';
import { cn } from '~/lib/utils';
import { useTheme } from '@react-navigation/native';

type TaskItemProps = {
    task: TaskWithProgressAndOption;
};

const getLocalizedRepeatSchedule = (
    days: number[],
    t: any,
    verbose: boolean = false,
): string => {
    if (days.length === 7) {
        return t('weekdayRange.everyday');
    }
    days.sort((a, b) => a - b);
    const sortedDays = days.map((day) => (day + 1) % 7);
    // TODO: handle edge cases: не склоняются дни по падежам
    if (verbose) {
        const dayNames = sortedDays.map((day) => t(`weekday.${day}`));
        return t('weekdayRange.multiple', { days: dayNames });
    } else {
        const dayShortNames = sortedDays.map((day) => t(`weekdayShort.${day}`));
        return dayShortNames.join(', ');
    }
};

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const { t } = useTranslation();
    const { dark } = useTheme();
    const taskProgress = task.currentTaskProgress;
    const { mutate: updateProgress } = useUpdateTaskProgress();
    const { mutate: updateStreak } = useUpdateTaskStreak();

    const taskProgressStatus =
        (taskProgress?.status as TaskProgressStatus) ?? taskProgress.status;

    const isSkipped = taskProgressStatus === TaskProgressStatus.Skipped;
    const isDone = taskProgressStatus === TaskProgressStatus.Done;

    const skipButtonText = isSkipped
        ? t('taskItem.actions.unskip')
        : t('taskItem.actions.skip');

    const completeButtonText = isDone
        ? t('taskItem.actions.undo')
        : t('taskItem.actions.complete');

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
            // TODO: invalidate streaks on startup: auto skip tasks that are not done and was due yesterday or earlier
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
        <Card
            className={cn(
                'mb-4 w-full rounded-lg pt-4',
                dark ? 'bg-zinc-900' : 'bg-white',
            )}
        >
            <CardTitle className="pl-4">{t(task.taskOption.name)}</CardTitle>
            {task.taskOption.description && (
                <CardDescription className="pl-4">
                    {t(task.taskOption.description)}
                </CardDescription>
            )}
            <CardContent className="p-4">
                <View className="flex-row justify-between">
                    <Text>
                        {t('taskItem.streak', {
                            count: task.task.currentStreak,
                        })}
                    </Text>
                    <Text>
                        {getLocalizedRepeatSchedule(
                            task.task.repeatSchedule.split(',').map(Number),
                            t,
                            false,
                        )}
                    </Text>
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
