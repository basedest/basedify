import { FlatList, TouchableOpacity, View } from 'react-native';
import { useTasksContext } from '~/entities/task';
import { TaskExtended, TaskProgressStatus } from '~/entities/task/task.types';
import { Text } from '~/components/ui/text';
import { Badge } from '~/components/ui/badge';
import { useEffect, useState } from 'react';
import { db } from '~/db-module';
import { Task, TaskOption, TaskProgress } from '@prisma/client';
import { Calendar as RNCalendar } from 'react-native-calendars';
import { useTheme } from '@react-navigation/native';
import { getCalendarPreset } from '~/lib/calendar';
import { ThemedColors } from '~/lib/colors';
import dayjs from 'dayjs';
import { MarkedDates } from 'react-native-calendars/src/types';
import { useProgramStore } from '~/entities/program/program.store';

const TaskProgressCalendar = ({
    task,
}: {
    task: Task & { taskProgress: TaskProgress[]; taskOption: TaskOption };
}) => {
    const { program } = useProgramStore();
    const theme = useTheme();
    const colors = theme.colors as ThemedColors;
    const startDate = dayjs(program?.startDate);
    const endDate = startDate.add(program!.totalDays, 'day');

    const generateMarkedDates = () => {
        const markedDates: MarkedDates = {};
        for (const [idx, progress] of task.taskProgress.entries()) {
            const date = startDate.add(progress.day - 1).format('YYYY-MM-DD');
            let color;
            switch (progress.status) {
                case TaskProgressStatus.Done:
                    color = colors.primary;
                    break;
                case TaskProgressStatus.Skipped:
                    color = colors.secondary;
                    break;
                default:
                    color = colors.border;
            }
            console.log(task.taskOption.name, idx, date, progress.status);

            markedDates[date] = {
                color,
                textColor: colors.background,
                // dotColor: color,
                startingDay: true,
                endingDay: true,
                selectedColor: color,
            };
        }
        return markedDates;
    };

    const markedDates = generateMarkedDates();

    return (
        <View className="">
            <RNCalendar
                {...getCalendarPreset(colors as ThemedColors)}
                markingType="period"
                markedDates={markedDates}
                minDate={startDate.format('YYYY-MM-DD')}
                maxDate={endDate.format('YYYY-MM-DD')}
            />
        </View>
    );
};

const ListItem = ({
    task,
    selectedTaskId,
    setSelectedTaskId,
}: {
    task: Task & { taskProgress: TaskProgress[]; taskOption: TaskOption };
    selectedTaskId: number;
    setSelectedTaskId: (taskId: number) => void;
}) => {
    const isSelected = task.id === selectedTaskId;

    const handlePress = () => {
        setSelectedTaskId(task.id);
    };

    return (
        <Badge asChild variant={isSelected ? 'outline' : 'default'}>
            <TouchableOpacity onPress={handlePress}>
                <Text className="text-sm">{task.taskOption.name}</Text>
            </TouchableOpacity>
        </Badge>
    );
};

export const ProgressScreen = () => {
    const { program } = useProgramStore();

    const tasks = db.task.useFindMany({
        where: {
            programId: program?.id,
        },
        include: {
            taskOption: true,
            taskProgress: true,
        },
    });

    useEffect(() => {
        setSelectedTaskId(tasks?.at(0)?.id ?? 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tasks?.at(0)?.id]);

    const [selectedTaskId, setSelectedTaskId] = useState(0);
    const selectedTask = tasks?.find((task) => task.id === selectedTaskId);

    if (!tasks) {
        return null;
    }

    return (
        <View className="p-4">
            <FlatList
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="gap-2"
                horizontal
                data={tasks || []}
                renderItem={({ item }) => (
                    <ListItem
                        task={item}
                        selectedTaskId={selectedTaskId}
                        setSelectedTaskId={setSelectedTaskId}
                    />
                )}
                keyExtractor={(item) => `${item.id}`}
            />
            {selectedTask && (
                <View className="mt-4 w-full gap-4">
                    <TaskProgressCalendar task={selectedTask} />
                    <View>
                        <Text>
                            Current streak : {selectedTask.currentStreak}
                        </Text>
                        <Text>Best streak : {selectedTask.bestStreak}</Text>
                    </View>
                </View>
            )}
        </View>
    );
};
