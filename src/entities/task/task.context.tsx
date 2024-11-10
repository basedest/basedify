import { createContext, useContext, useEffect, useState } from 'react';
import { db } from '@/db-module';
import { useCurrentUser } from '../user/user.hook';
import { GoalType } from '../../types/goal.type';
import { TaskExtended } from './task.type';

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

export const useTasks = () => useContext(TasksContext);
