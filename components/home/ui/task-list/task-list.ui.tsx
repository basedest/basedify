import React from 'react';
import { View, FlatList } from 'react-native';
import { Text } from '~/components/ui/text';
import { TaskItem } from '~/components/home/ui/task-item';
import { TaskWithProgressAndOption } from '~/entities/task/task.lib';
import { useTranslation } from 'react-i18next';

export type HomeTaskListProps = {
    filteredTasks?: TaskWithProgressAndOption[];
    isLoading: boolean;
};

export const HomeTaskList = ({
    filteredTasks,
    isLoading,
}: HomeTaskListProps) => {
    const { t } = useTranslation();

    if (!filteredTasks?.length) {
        return (
            <View className="flex h-full w-full items-center py-72">
                <Text className="text-lg font-medium">
                    {isLoading ? t('common.loading') : t('taskList.empty')}
                </Text>
            </View>
        );
    }

    return (
        <View className="flex-1 gap-4 bg-secondary p-4">
            <FlatList
                data={filteredTasks}
                renderItem={({ item }) => <TaskItem task={item} />}
                keyExtractor={(item) => `${item.task.id}`}
            />
        </View>
    );
};
