export function minutesToDate(minutes: number) {
    const date = new Date();
    date.setHours(Math.floor(minutes / 60), minutes % 60, 0, 0);
    return date;
}

/**
 * @deprecated
 */
export function generateCronFromWeekdays(days: number[]): string {
    return `0 0 * * ${days.sort().join(',')}`;
}

/**
 * @deprecated
 */
export function parseCronToWeekdays(cron: string): number[] {
    const parts = cron.split(' ');
    return parts[4].split(',').map(Number);
}

export function getRepeatScheduleString(days: number[]) {
    return days.join(',');
}

export function parseRepeatScheduleString(repeatSchedule: string) {
    return repeatSchedule.split(',').map(Number);
}
