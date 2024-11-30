import React from 'react';
import { View, Text } from 'react-native';
import { useTasksContext } from '~/entities/task';
import { getScheduleText } from './weekly-task-list.lib';
import dayjs from 'dayjs';

interface WeeklyTaskListProps {
    week: number;
}

// TODO: display goal
// TODO: progressive goal increment

export const WeeklyTaskList: React.FC<WeeklyTaskListProps> = ({ week }) => {
    const { tasks } = useTasksContext();

    return (
        <View className="mb-6">
            <Text className="mb-4 text-2xl font-bold">Week {week} Tasks</Text>
            {tasks.map((task) => (
                <View
                    key={task.id}
                    className="mb-2 rounded-lg bg-secondary p-4"
                >
                    <Text className="text-lg font-semibold">{task.name}</Text>
                    <Text className="text-secondary-foreground">
                        {getScheduleText(task.repeatSchedule)}
                    </Text>
                </View>
            ))}
        </View>
    );
};

export default WeeklyTaskList;
