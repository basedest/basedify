import React, { useEffect, useState } from 'react';
import { View, ScrollView, TextInput } from 'react-native';
import { Button } from '~/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '~/components/ui/toggle-group';
import { db } from '~/db-module';
import { TaskConfiguration, useSurveyStore } from '~/entities/survey';
import { GoalType } from '~/types/goal.type';
import { Text } from '~/components/ui/text';

export default function Customize() {
    const { goodHabits, badHabits } = useSurveyStore();
    const taskOptions = db.taskOption.useFindMany({
        where: { id: { in: [...goodHabits, ...badHabits] } },
    });

    const [tasks, setTasks] = useState<TaskConfiguration[]>(() =>
        taskOptions?.map((option) => ({
            taskOptionId: option.id,
            goal: null,
            initialGoal: null,
            initialDays: option.goalType === GoalType.Do ? 0 : 7,
            repeatSchedule: generateDefaultSchedule(option.defaultDays),
        })),
    );

    useEffect(() => {
        setTasks(
            taskOptions?.map((option) => ({
                taskOptionId: option.id,
                goal: null,
                initialGoal: null,
                initialDays: option.goalType === GoalType.Do ? 0 : 7,
                repeatSchedule: generateDefaultSchedule(option.defaultDays),
            })),
        );
    }, [taskOptions]);

    const getInputLabel = (goalType: GoalType, measureUnit?: string | null) => {
        switch (goalType) {
            case GoalType.Time:
                return 'Target time (HH:MM)';
            case GoalType.Duration:
                return `Duration (${measureUnit || 'minutes'})`;
            case GoalType.Do:
                return 'Times per day';
            case GoalType.Dont:
                return 'Maximum allowed';
            case GoalType.Measurable:
                return `Amount (${measureUnit || 'units'})`;
        }
    };

    const handleSubmit = async () => {
        // TODO: Save tasks to database
        console.log(tasks);
    };

    return (
        <ScrollView className="flex-1 p-4">
            {taskOptions?.map((option, index) => {
                if (!option || !tasks[index]) return null;
                return (
                    <View key={option.id} className="mb-6">
                        <Text className="text-lg font-bold">{option.name}</Text>

                        <TextInput
                            placeholder={getInputLabel(
                                option.goalType as GoalType,
                                option.measureUnit ?? undefined,
                            )}
                            value={(tasks[index]?.goal || '').toString()}
                            onChangeText={(value) => {
                                const newTasks = [...tasks];
                                newTasks[index].goal = value
                                    ? Number(value)
                                    : null;
                                setTasks(newTasks);
                            }}
                            keyboardType="numeric"
                            className="mt-2 rounded border border-gray-300 p-2"
                        />

                        <TextInput
                            placeholder={`Current ${getInputLabel(option.goalType as GoalType, option.measureUnit)}`}
                            value={tasks[index]?.initialGoal?.toString()}
                            onChangeText={(value) => {
                                const newTasks = [...tasks];
                                newTasks[index].initialGoal = value
                                    ? Number(value)
                                    : null;
                                setTasks(newTasks);
                            }}
                            keyboardType="numeric"
                            className="mt-2 rounded border border-gray-300 p-2"
                        />

                        <WeekdayPicker
                            value={parseCronToWeekdays(
                                tasks[index].repeatSchedule,
                            )}
                            onChange={(days) => {
                                const newTasks = [...tasks];
                                newTasks[index].repeatSchedule =
                                    generateCronFromWeekdays(days);
                                setTasks(newTasks);
                            }}
                        />
                    </View>
                );
            })}

            <Button size="lg" variant="default" onPress={handleSubmit}>
                <Text>Save and Continue</Text>
            </Button>
        </ScrollView>
    );
}

function generateDefaultSchedule(defaultDays: number): string {
    const allDays = [0, 1, 2, 3, 4, 5, 6];
    const selectedDays = [];
    while (selectedDays.length < defaultDays) {
        const randomIndex = Math.floor(Math.random() * allDays.length);
        selectedDays.push(allDays.splice(randomIndex, 1)[0]);
    }
    return generateCronFromWeekdays(selectedDays);
}

function generateCronFromWeekdays(days: number[]): string {
    return `0 0 * * ${days.sort().join(',')}`;
}

function parseCronToWeekdays(cron: string): number[] {
    const parts = cron.split(' ');
    return parts[4].split(',').map(Number);
}

interface WeekdayPickerProps {
    value: number[];
    onChange: (days: number[]) => void;
}

function WeekdayPicker({ value, onChange }: WeekdayPickerProps) {
    const days = [
        { label: 'Sun', value: 0 },
        { label: 'Mon', value: 1 },
        { label: 'Tue', value: 2 },
        { label: 'Wed', value: 3 },
        { label: 'Thu', value: 4 },
        { label: 'Fri', value: 5 },
        { label: 'Sat', value: 6 },
    ];

    const onToggleDay = (selectedDays: string[]) => {
        onChange(selectedDays.map(Number));
    };

    return (
        <View className="flex-1 items-center justify-center gap-12 p-6">
            <ToggleGroup
                value={value.map(String)}
                onValueChange={onToggleDay}
                type="multiple"
            >
                {days.map((day) => (
                    <ToggleGroupItem key={day.value} value={String(day.value)}>
                        <Text>{day.label}</Text>
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
        </View>
    );
}
