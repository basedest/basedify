import React, { useEffect, useState } from 'react';
import { db } from '~/db-module';
import { TaskConfiguration, useSurveyStore } from '~/entities/survey';
import { GoalType } from '~/types/goal.type';
import { SurveyLayout } from '~/components/survey/SurveyLayout';
import { CustomizeTask } from '~/components/survey/customize-task';

export default function Customize() {
    const { goodHabits, badHabits, initialGoal, goal } = useSurveyStore();
    const taskOptions = db.taskOption.useFindMany({
        where: { id: { in: [...goodHabits, ...badHabits] } },
    });

    const [tasks, setTasks] = useState<TaskConfiguration[]>(() =>
        taskOptions?.map((option) => ({
            taskOptionId: option.id,
            taskOption: option,
            goal: null,
            initialGoal: null,
            initialDays: option.goalType === GoalType.Do ? 0 : 7,
            repeatSchedule: generateDefaultSchedule(option.defaultDays),
        })),
    );

    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);

    useEffect(() => {
        setTasks(
            taskOptions?.map((option) => ({
                taskOption: option,
                taskOptionId: option.id,
                goal: option.defaultGoal,
                initialGoal: null,
                initialDays: option.goalType === GoalType.Do ? 0 : 7,
                repeatSchedule: generateDefaultSchedule(option.defaultDays),
            })),
        );
    }, [taskOptions]);

    const handleNext = async () => {
        if (currentTaskIndex < tasks.length - 1) {
            setTasks((prev) =>
                prev.map((task, index) =>
                    index === currentTaskIndex
                        ? { ...task, initialGoal, goal }
                        : task,
                ),
            );

            setCurrentTaskIndex((prev) => prev + 1);
            return;
        }

        // Save tasks
        console.log(tasks);
    };

    // const setInitialValue = (value: number) => {
    //     setTasks((prev) =>
    //         prev.map((task, index) =>
    //             index === currentTaskIndex
    //                 ? { ...task, initialGoal: value }
    //                 : task,
    //         ),
    //     );
    // };

    // const setGoalValue = (value: number) => {
    //     setTasks((prev) =>
    //         prev.map((task, index) =>
    //             index === currentTaskIndex ? { ...task, goal: value } : task,
    //         ),
    //     );
    // };

    return (
        <SurveyLayout
            title="Step 3. Customize your program"
            onNext={handleNext}
            nextButtonText="Continue"
        >
            {tasks[currentTaskIndex] && (
                <CustomizeTask
                    taskConfig={tasks[currentTaskIndex]}
                    currentTaskIndex={currentTaskIndex}
                    totalTasks={tasks.length}
                />
            )}
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
