import { FlatList, TouchableOpacity, View } from 'react-native';
import { Text } from '~/components/ui/text';
import { Badge } from '~/components/ui/badge';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useProgramStore } from '~/entities/program/program.store';
import { TaskWithRelations, useTasksQuery } from './progress.lib';
import { TaskProgressCalendar } from './task-progress-calendar';
import { useTranslation } from 'react-i18next';

const ListItem = ({
    task,
    selectedTaskId,
    onSelect,
}: {
    task: TaskWithRelations;
    selectedTaskId: number;
    onSelect: (id: number) => void;
}) => {
    const { t } = useTranslation();
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
                <Text className="text-sm">{t(task.taskOption.name)}</Text>
            </TouchableOpacity>
        </Badge>
    );
};

export const ProgressScreen = () => {
    const { t } = useTranslation();
    const { program } = useProgramStore();
    const { data: tasks, isLoading } = useTasksQuery(program?.id);

    const [selectedTaskId, setSelectedTaskId] = useState<number>(0);

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
                            {t('progress.streak.current', {
                                count: selectedTask.currentStreak,
                            })}
                        </Text>
                        <Text>
                            {t('progress.streak.best', {
                                count: selectedTask.bestStreak,
                            })}
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
};
