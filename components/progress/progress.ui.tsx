import { FlatList, TouchableOpacity, View } from 'react-native';
import { Text } from '~/components/ui/text';
import { Badge } from '~/components/ui/badge';
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { useProgramStore } from '~/entities/program/program.store';
import { TaskWithRelations, useTasksQuery } from './progress.lib';
import { TaskProgressCalendar } from './task-progress-calendar';

// Move ListItem to separate file if it grows larger
const ListItem = ({
    task,
    selectedTaskId,
    onSelect,
}: {
    task: TaskWithRelations;
    selectedTaskId: number;
    onSelect: (id: number) => void;
}) => {
    const handlePress = useCallback(
        () => onSelect(task.id),
        [onSelect, task.id],
    );

    return (
        <Badge
            asChild
            variant={task.id === selectedTaskId ? 'outline' : 'default'}
        >
            <TouchableOpacity onPress={handlePress}>
                <Text className="text-sm">{task.taskOption.name}</Text>
            </TouchableOpacity>
        </Badge>
    );
};

export const ProgressScreen = () => {
    const { program } = useProgramStore();
    const { data: tasks, isLoading } = useTasksQuery(program?.id);

    const [selectedTaskId, setSelectedTaskId] = useReducer(
        (_: number, newId: number) => newId,
        0,
    );

    const selectedTask = useMemo(
        () => tasks?.find((task) => task.id === selectedTaskId),
        [tasks, selectedTaskId],
    );

    useEffect(() => {
        if (tasks?.length) {
            setSelectedTaskId(tasks[0].id);
        }
    }, [tasks]);

    if (isLoading || !tasks?.length) return null;

    return (
        <View className="p-4">
            <FlatList
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="gap-2"
                horizontal
                data={tasks}
                renderItem={({ item }) => (
                    <ListItem
                        task={item}
                        selectedTaskId={selectedTaskId}
                        onSelect={setSelectedTaskId}
                    />
                )}
                keyExtractor={(item) => `${item.id}`}
            />
            {selectedTask?.taskProgress && (
                <View className="mt-4 w-full gap-4">
                    <TaskProgressCalendar
                        taskProgress={selectedTask.taskProgress}
                    />
                    <View>
                        <Text>
                            Current streak: {selectedTask.currentStreak}
                        </Text>
                        <Text>Best streak: {selectedTask.bestStreak}</Text>
                    </View>
                </View>
            )}
        </View>
    );
};
