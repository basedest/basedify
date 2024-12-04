import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTasksContext } from '~/entities/task';
import { getScheduleText } from './weekly-task-list.lib';
import { Text } from '~/components/ui/text';

interface WeeklyTaskListProps {
    week: number;
}

// TODO: display goal
// TODO: progressive goal increment

export const WeeklyTaskList: React.FC<WeeklyTaskListProps> = ({ week }) => {
    const { t } = useTranslation();
    const { tasks } = useTasksContext();

    return (
        <View className="mb-6">
            <Text className="mb-4 text-2xl font-bold">
                {t('weeklyTasks.title', { number: week })}
            </Text>
            {tasks.map((task) => (
                <View
                    key={task.id}
                    className="mb-2 rounded-lg bg-secondary p-4"
                >
                    <Text className="text-lg font-semibold">{task.name}</Text>
                    <Text>{getScheduleText(task.repeatSchedule)}</Text>
                </View>
            ))}
        </View>
    );
};

export default WeeklyTaskList;
