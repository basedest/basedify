import { TimeUtils } from '~/lib/utils';
import i18next from 'i18next';

// TODO: display weekday names and not numbers
export function getScheduleText(schedule: string) {
    const days = TimeUtils.parseRepeatScheduleString(schedule);
    return days.length === 7
        ? i18next.t('weeklyTasks.schedule.everyday')
        : i18next.t('weeklyTasks.schedule.specificDays', {
              days: days.map((day) => ++day).join(', '),
          });
}
