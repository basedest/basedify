import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { TaskFilter } from '~/components/home/ui/task-filter';
import { TaskProgressStatus } from '~/entities/task/task.types';
import { useTasksContext } from '~/entities/task';
import { useCurrentUser } from '~/entities/user';
import { DayNavigation } from '~/components/home/ui/day-navigation';
import dayjs from 'dayjs';
import { HomeTaskList } from '~/components/home/ui/task-list/task-list.ui';
import { useCurrentDayTasks } from './home.lib';

export const HomeScreen: React.FC = () => {
    const [currentDay, setCurrentDay] = useState<number>(0);
    const [activeFilter, setActiveFilter] = useState<TaskProgressStatus>(
        TaskProgressStatus.Todo,
    );
    const { tasks } = useTasksContext();
    const { currentProgram } = useCurrentUser();

    useEffect(() => {
        if (currentDay > 0) {
            return;
        }
        const calculatedDay = dayjs().diff(currentProgram?.startDate, 'days');
        setCurrentDay(calculatedDay + 1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentProgram?.startDate]);

    const { data: tasksWithProgress, isLoading } = useCurrentDayTasks(
        tasks,
        currentDay,
        currentProgram?.startDate,
    );

    const filteredTasks = tasksWithProgress?.filter(
        (task) => task.currentProgress.status === activeFilter,
    );

    if (currentDay === 0) {
        return null;
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
            <HomeTaskList filteredTasks={filteredTasks} />
        </View>
    );
};
