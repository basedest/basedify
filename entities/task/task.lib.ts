import dayjs from 'dayjs';
import { TimeUtils } from '~/lib/utils';
import { TaskExtended, TaskProgressStatus } from './task.types';
import { Task } from '@prisma/client';
import { db } from '~/db-module';

export function getCurrentDayTasks(
    tasks: TaskExtended[],
    startDate: Date,
    currentDayOfProgram: number,
) {
    return tasks.filter((task) => {
        const currentDate = dayjs(startDate).add(
            currentDayOfProgram - 1,
            'days',
        );
        const currentWeekDay = currentDate.day();
        return TimeUtils.parseRepeatScheduleString(task.repeatSchedule).some(
            (day) => day === currentWeekDay,
        );
    });
}

export async function createTaskProgressesForDay(day: number, tasks?: Task[]) {
    const taskList = tasks ?? (await db.task.findMany());

    return db.taskProgress.createMany({
        data: taskList.map((task) => ({
            taskId: task.id,
            status: TaskProgressStatus.Todo,
            day,
        })),
    });
}
