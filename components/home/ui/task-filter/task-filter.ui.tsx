import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { TaskFilterProps } from './task-filter.types';
import { Text } from '~/components/ui/text';
import { TaskProgressStatus } from '~/entities/task/task.types';
import { useTranslation } from 'react-i18next';

export const TaskFilter: React.FC<TaskFilterProps> = ({
    activeFilter,
    setActiveFilter,
}) => {
    const { t } = useTranslation();

    const tabs = [
        { value: TaskProgressStatus.Todo, label: t('taskFilter.status.todo') },
        { value: TaskProgressStatus.Done, label: t('taskFilter.status.done') },
        {
            value: TaskProgressStatus.Skipped,
            label: t('taskFilter.status.skipped'),
        },
    ];

    return (
        <Tabs
            value={activeFilter}
            onValueChange={(value) =>
                setActiveFilter(value as TaskProgressStatus)
            }
            className="w-full"
        >
            <TabsList className="w-full flex-row">
                {tabs.map(({ value, label }) => (
                    <TabsTrigger className="flex-1" key={value} value={value}>
                        <Text>{label}</Text>
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    );
};
