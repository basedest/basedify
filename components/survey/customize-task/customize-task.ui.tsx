import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import { Slider } from '~/components/ui/slider';
import { getSliderConfig } from './customize-task.lib';
import { useEffect } from 'react';
import { TaskConfiguration, useSurveyStore } from '~/entities/survey';

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
    const { initialGoal, setInitialGoal, goal, setGoal } = useSurveyStore();
    const { taskOption } = taskConfig;
    const config = getSliderConfig(taskOption);

    console.log('config', {
        min: config.min,
        max: config.max,
        step: config.step,
    });
    console.log('defaults', {
        initialGoal,
        defaultGoal: taskOption.defaultGoal,
        taskOption,
    });

    useEffect(() => {
        setInitialGoal(taskConfig.initialGoal || config.min);
        setGoal(taskOption.defaultGoal || config.min);
    }, [
        config.min,
        setGoal,
        setInitialGoal,
        taskConfig.initialGoal,
        taskOption.defaultGoal,
    ]);

    // useEffect(() => {
    //     if (initialGoal === null) {
    //         setInitialGoal(taskOption.defaultGoal ?? config.min);
    //     }

    //     if (goal === null) {
    //         setGoal(taskOption.defaultGoal ?? config.min);
    //     }
    // }, [
    //     config.min,
    //     goal,
    //     initialGoal,
    //     setGoal,
    //     setInitialGoal,
    //     taskOption.defaultGoal,
    // ]);

    const handleInitialValueChange = (value: number) => {
        setInitialGoal(value);
    };

    const handleGoalValueChange = (value: number) => {
        setGoal(value);
    };

    return (
        <View className="py-1">
            <Text className="text-xl font-bold">
                {currentTaskIndex + 1}/{totalTasks}: {taskOption.name}
            </Text>

            <View className="py-4">
                <Text className="text-lg">
                    What is your current {taskOption.name.toLowerCase()}?
                </Text>
                <Slider
                    minimumValue={config.min}
                    maximumValue={config.max}
                    step={config.step}
                    value={initialGoal || config.min}
                    onValueChange={handleInitialValueChange}
                />
                <Text className="text-center text-lg">
                    {config.format(initialGoal)}
                </Text>
            </View>

            <View className="py-4">
                <Text className="text-lg">
                    What is your goal for {taskOption.name.toLowerCase()}?
                </Text>
                <Slider
                    minimumValue={config.min}
                    maximumValue={config.max}
                    step={config.step}
                    value={goal ?? taskOption.defaultGoal ?? config.min}
                    onValueChange={handleGoalValueChange}
                />
                <Text className="text-center text-lg">
                    {config.format(
                        goal ?? taskOption.defaultGoal ?? config.min,
                    )}
                </Text>
            </View>
        </View>
    );
}
