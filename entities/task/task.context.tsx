import { createContext, useContext, useEffect, useState } from 'react';

import { GoalType, TaskExtended } from './task.types';
import { useCurrentUser } from '../user/user.hook';

import { db } from '~/db-module';

type TasksContextType = {
    tasks: TaskExtended[];
};

const TasksContext = createContext<TasksContextType>({
    tasks: [],
});

export function TasksProvider({ children }: { children: React.ReactNode }) {
    const [tasks, setTasks] = useState<TaskExtended[]>([]);

    const currentUser = useCurrentUser();

    const allTasks = db.task.useFindMany({
        where: {
            programId: currentUser.currentProgram?.id,
        },
        include: {
            taskOption: true,
            taskProgress: true,
        },
    });

    const taskExtended = allTasks?.map((task) => {
        return {
            ...task,
            name: task.taskOption.name,
            goalType: task.taskOption!.goalType as GoalType,
            description: task.taskOption?.description || null,
            category: task.taskOption?.category || null,
            progress: task.taskProgress || [],
        };
    });

    useEffect(() => {
        setTasks(taskExtended || []);
    }, [allTasks]);

    return (
        <TasksContext.Provider value={{ tasks }}>
            {children}
        </TasksContext.Provider>
    );
}

export const useTasksContext = () => useContext(TasksContext);
