import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import { TaskConfiguration } from '~/entities/survey';
import { CustomizeGoal } from './ui/customize-goal.ui';
import { CustomizeDays } from './ui/customize-days.ui';

type CustomizeTaskProps = {
    taskConfig: TaskConfiguration;
    currentTaskIndex: number;
    totalTasks: number;
};

export function CustomizeTask({
    taskConfig,
    currentTaskIndex,
    totalTasks,
}: CustomizeTaskProps) {
    return (
        <View className="py-1">
            <Text className="text-xl font-bold">
                {currentTaskIndex + 1}/{totalTasks}:{' '}
                {taskConfig.taskOption.name}
            </Text>
            <CustomizeGoal taskConfig={taskConfig} />
            <CustomizeDays taskOption={taskConfig.taskOption} />
        </View>
    );
}
