import { TimeUtils } from '~/lib/utils';

// TODO: display weekday names and not numbers
export function getScheduleText(schedule: string) {
    const days = TimeUtils.parseRepeatScheduleString(schedule);
    return days.length === 7
        ? 'everyday'
        : `on day ${days.map((day) => ++day).join(', ')}`;
}
