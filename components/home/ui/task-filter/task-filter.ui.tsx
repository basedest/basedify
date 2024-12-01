import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { TaskFilterProps } from './task-filter.types';
import { Text } from '~/components/ui/text';
import { TaskProgressStatus } from '~/entities/task/task.types';

export const TaskFilter: React.FC<TaskFilterProps> = ({
    activeFilter,
    setActiveFilter,
}) => {
    const tabs = [
        TaskProgressStatus.Todo,
        TaskProgressStatus.Done,
        TaskProgressStatus.Skipped,
    ];

    return (
        <Tabs
            value={activeFilter}
            onValueChange={(value) =>
                setActiveFilter(value as TaskProgressStatus)
            }
            className="w-full rounded-lg"
        >
            <TabsList className="w-full flex-row">
                {tabs.map((value) => (
                    <TabsTrigger
                        className="flex-1 rounded-md"
                        key={value}
                        value={value}
                    >
                        <Text>{value}</Text>
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    );
};
