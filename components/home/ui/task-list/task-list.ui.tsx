import React from 'react';
import { View, FlatList } from 'react-native';
import { Text } from '~/components/ui/text';
import { TaskItem } from '~/components/home/ui/task-item';
import { TaskWithProgressAndOption } from '~/entities/task/task.lib';

export type HomeTaskListProps = {
    filteredTasks?: TaskWithProgressAndOption[];
    isLoading: boolean;
};

export const HomeTaskList = ({
    filteredTasks,
    isLoading,
}: HomeTaskListProps) => {
    if (!filteredTasks?.length) {
        return (
            <View className="flex h-full w-full items-center py-72">
                <Text className="text-lg font-medium">
                    {isLoading ? 'Loading...' : 'No tasks in this list'}
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
