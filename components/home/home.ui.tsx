import React, { useState } from 'react';
import { View } from 'react-native';
import { TaskFilter } from '~/components/home/ui/task-filter';
import { TaskProgressStatus } from '~/entities/task/task.types';
import { DayNavigation } from '~/components/home/ui/day-navigation';
import { HomeTaskList } from '~/components/home/ui/task-list/task-list.ui';
import { useCurrentDayTasks } from './home.lib';
import { useProgramStore } from '~/entities/program/program.store';

export const HomeScreen: React.FC = () => {
    const { currentDay: storedDay } = useProgramStore();
    const [currentDay, setCurrentDay] = useState<number>(storedDay);
    const [activeFilter, setActiveFilter] = useState<TaskProgressStatus>(
        TaskProgressStatus.Todo,
    );

    const { data: tasksWithProgress, isLoading } =
        useCurrentDayTasks(currentDay);

    const filteredTasks = tasksWithProgress?.filter(
        (task) => task.currentProgress.status === activeFilter,
    );

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
            <HomeTaskList isLoading={isLoading} filteredTasks={filteredTasks} />
        </View>
    );
};
