import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { db } from '~/db-module';
import { TaskConfiguration, useSurveyStore } from '~/entities/survey';
import { GoalType } from '~/types/goal.type';
import { Text } from '~/components/ui/text';
import { WeekdayPicker } from '~/components/weekday-picker';
import { Input } from '~/components/ui/input';
import { SurveyLayout } from '~/components/survey/SurveyLayout';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TimePicker } from '~/components/time-picker';

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
        <SurveyLayout
            title="Step 3. Customize your program"
            onNext={handleSubmit}
            nextButtonText="Save and Continue"
        >
            {taskOptions?.map((option, index) => {
                if (!option || !tasks[index]) return null;
                return (
                    <View key={option.id} className="mb-6">
                        <Text className="text-xl font-bold">{option.name}</Text>

                        <Input
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
                            className="mt-2 rounded border border-gray-300 p-2"
                        />

                        <TimePicker />

                        <Input
                            placeholder={`Current ${getInputLabel(option.goalType as GoalType, option.measureUnit)}`}
                            value={tasks[index]?.initialGoal?.toString()}
                            onChangeText={(value) => {
                                const newTasks = [...tasks];
                                newTasks[index].initialGoal = value
                                    ? Number(value)
                                    : null;
                                setTasks(newTasks);
                            }}
                            className="mt-2 rounded border border-gray-300 p-2"
                        />

                        <WeekdayPicker
                            className="-mx-2 justify-between"
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
        </SurveyLayout>
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
