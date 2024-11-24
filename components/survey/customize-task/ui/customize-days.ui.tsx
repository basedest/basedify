import { useSurveyStore } from '~/entities/survey';
import { Text } from '~/components/ui/text';
import { View } from 'react-native';
import { WeekdayPicker } from '~/components/weekday-picker';
import { useEffect } from 'react';
import { TaskOption } from '@prisma/client';

export type CustomizeDaysProps = {
    taskOption: TaskOption;
};

function getDefaultRandomDays(defaultDays: number): number[] {
    const allDays = [0, 1, 2, 3, 4, 5, 6];
    const selectedDays = [];
    while (selectedDays.length < defaultDays) {
        const randomIndex = Math.floor(Math.random() * allDays.length);
        selectedDays.push(allDays.splice(randomIndex, 1)[0]);
    }
    return selectedDays;
}

export const CustomizeDays = ({ taskOption }: CustomizeDaysProps) => {
    const { days, setDays } = useSurveyStore();

    useEffect(() => {
        if (taskOption.defaultDays === 7) {
            setDays([0, 1, 2, 3, 4, 5, 6]);
        } else {
            setDays(getDefaultRandomDays(taskOption.defaultDays));
        }
    }, [taskOption.defaultDays, setDays]);

    if (taskOption.defaultDays === 7) {
        return null;
    }

    return (
        <View className="gap-4 py-4">
            <Text className="text-lg">
                Which days do you want to do this task?
            </Text>
            <WeekdayPicker min={1} value={days} onChange={setDays} />
        </View>
    );
};
