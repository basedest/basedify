import dayjs from 'dayjs';
import { TimeUtils } from '~/lib/utils';
import { TaskExtended } from './task.types';

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
