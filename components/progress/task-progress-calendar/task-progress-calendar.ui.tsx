import { View } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';
import { useTheme } from '@react-navigation/native';
import { TaskProgress } from '@prisma/client';
import { useProgramStore } from '~/entities/program/program.store';
import { getCalendarPreset } from '~/lib/calendar';
import { ThemedColors } from '~/lib/colors';
import { TaskProgressStatus } from '~/entities/task/task.types';
import dayjs from 'dayjs';
import { useMemo } from 'react';

export const TaskProgressCalendar = ({
    taskProgress,
}: {
    taskProgress: TaskProgress[];
}) => {
    const { program } = useProgramStore();
    const theme = useTheme();
    const colors = theme.colors as ThemedColors;

    const startDate = dayjs(program?.startDate);
    const endDate = startDate.add(program!.totalDays, 'day');

    const markedDates = useMemo(() => {
        return taskProgress.reduce((acc: { [key: string]: any }, progress) => {
            const date = startDate.add(progress.day - 1).format('YYYY-MM-DD');
            const color =
                progress.status === TaskProgressStatus.Done
                    ? colors.primary
                    : progress.status === TaskProgressStatus.Skipped
                      ? colors.secondary
                      : colors.border;

            acc[date] = {
                color,
                textColor: colors.background,
                startingDay: true,
                endingDay: true,
                selectedColor: color,
            };
            return acc;
        }, {});
    }, [taskProgress, startDate, colors]);

    return (
        <View>
            <RNCalendar
                {...getCalendarPreset(colors as ThemedColors)}
                markingType="period"
                markedDates={markedDates}
                minDate={startDate.format('YYYY-MM-DD')}
                maxDate={endDate.format('YYYY-MM-DD')}
            />
        </View>
    );
};
