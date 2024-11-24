import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import { Slider } from '~/components/ui/slider';
import { TaskConfiguration, useSurveyStore } from '~/entities/survey';
import { getSliderConfig } from '../customize-task.lib';
import { GoalType } from '~/types/goal.type';
import { useEffect } from 'react';

type CustomizeGoalProps = {
    taskConfig: TaskConfiguration;
};

export const CustomizeGoal = ({ taskConfig }: CustomizeGoalProps) => {
    const { initialGoal, setInitialGoal, goal, setGoal } = useSurveyStore();
    const { taskOption } = taskConfig;
    const config = getSliderConfig(taskOption);
    const goalHidden = taskOption.goalType === GoalType.Dont;

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

    return (
        <View>
            <View className="py-4">
                <Text className="text-lg">
                    What is your current {taskOption.name.toLowerCase()}?
                </Text>
                <Slider
                    minimumValue={config.min}
                    maximumValue={config.max}
                    step={config.step}
                    value={initialGoal || config.min}
                    onValueChange={setInitialGoal}
                />
                <Text className="text-center text-lg">
                    {config.format(initialGoal)}
                </Text>
            </View>

            {!goalHidden && (
                <View className="py-4">
                    <Text className="text-lg">
                        What is your goal for {taskOption.name.toLowerCase()}?
                    </Text>
                    <Slider
                        minimumValue={config.min}
                        maximumValue={config.max}
                        step={config.step}
                        value={goal ?? taskOption.defaultGoal ?? config.min}
                        onValueChange={setGoal}
                    />
                    <Text className="text-center text-lg">
                        {config.format(
                            goal ?? taskOption.defaultGoal ?? config.min,
                        )}
                    </Text>
                </View>
            )}
        </View>
    );
};
