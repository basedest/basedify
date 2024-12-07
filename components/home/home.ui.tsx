import React, { useState } from 'react';
import { View } from 'react-native';
import { TaskFilter } from '~/components/home/ui/task-filter';
import { TaskProgressStatus } from '~/entities/task/task.types';
import { DayNavigation } from '~/components/home/ui/day-navigation';
import { HomeTaskList } from '~/components/home/ui/task-list/task-list.ui';
import { useProgramStore } from '~/entities/program/program.store';
import { useTasksWithProgress } from '~/entities/task/task.lib';
import { Text } from '~/components/ui/text';

// TODO: add menu in top bar with action to go to the current day
// TODO: disable buttons for passed days
// TODO: auto skip passed days tasks
// TODO: implement updated_at
export const HomeScreen: React.FC = () => {
    const { currentDay: storedDay, program } = useProgramStore();
    const [currentDay, setCurrentDay] = useState<number>(storedDay);
    const [activeFilter, setActiveFilter] = useState<TaskProgressStatus>(
        TaskProgressStatus.Todo,
    );

    const { data: tasksWithProgress, isLoading } = useTasksWithProgress(
        program!.id,
        currentDay,
    );

    const filteredTasks = tasksWithProgress?.filter(
        (task) => task.currentTaskProgress?.status === activeFilter,
    );

    if (isLoading) {
        return (
            <View className="flex h-full w-full items-center py-72">
                <Text className="text-lg font-medium">Loading...</Text>
            </View>
        );
    }

    return (
        <View className="flex-1">
            <View className="flex flex-col gap-4 p-4">
                <DayNavigation
                    currentDay={currentDay}
                    setCurrentDay={setCurrentDay}
                />
                <TaskFilter
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                />
            </View>
            <HomeTaskList
                isLoading={!tasksWithProgress}
                filteredTasks={filteredTasks}
            />
        </View>
    );
};
