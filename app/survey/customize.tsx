import React, { useEffect, useMemo, useState } from 'react';
import { db } from '~/db-module';
import { TaskConfiguration, useSurveyStore } from '~/entities/survey';
import { SurveyLayout } from '~/components/survey/SurveyLayout';
import { CustomizeTask } from '~/components/survey/customize-task';
import { useUserContext } from '~/entities/user';
import { useRouter } from 'expo-router';
import { TimeUtils } from '~/lib/utils';
import { GoalType } from '~/entities/task';

export default function Customize() {
    const { goodHabits, badHabits, initialGoal, goal, days } = useSurveyStore();
    const { currentUser } = useUserContext();
    const router = useRouter();
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

    const configurableTasks = useMemo(
        () => tasks.filter((task) => task.taskOption.measureUnit),
        [tasks],
    );

    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);

    const isLastTask = currentTaskIndex === configurableTasks.length - 1;

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
        const currentTask = configurableTasks[currentTaskIndex];
        setTasks((prev) =>
            prev.map((task) =>
                task.taskOptionId === currentTask.taskOptionId
                    ? {
                          ...currentTask,
                          initialGoal,
                          goal,
                          repeatSchedule:
                              TimeUtils.generateCronFromWeekdays(days),
                      }
                    : task,
            ),
        );

        if (!isLastTask) {
            setCurrentTaskIndex((prev) => prev + 1);
            return;
        }

        // Save tasks
        const program = await db.program.create({
            data: {
                tasks: {
                    create: tasks.map((task) => ({
                        taskOptionId: task.taskOptionId,
                        goal: task.goal,
                        repeatSchedule: task.repeatSchedule,
                        initialGoal: task.initialGoal,
                        initialDays: task.initialDays,
                    })),
                },
                isActive: false,
                userId: currentUser?.id ?? 1,
            },
        });

        console.debug('Program created:', program);

        router.navigate('/survey/overview');
    };

    return (
        <SurveyLayout
            title="Step 3. Customize your program"
            onNext={handleNext}
            nextButtonText={isLastTask ? 'Finish' : 'Next'}
            nextButtonDisabled={!goal || !days.length}
        >
            {configurableTasks[currentTaskIndex] && (
                <CustomizeTask
                    taskConfig={configurableTasks[currentTaskIndex]}
                    currentTaskIndex={currentTaskIndex}
                    totalTasks={configurableTasks.length}
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
    return TimeUtils.generateCronFromWeekdays(selectedDays);
}
