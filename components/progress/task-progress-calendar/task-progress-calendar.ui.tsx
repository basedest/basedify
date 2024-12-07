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
import { logger } from '~/lib/utils/log';
import { Text } from '~/components/ui/text';
import { useTranslation } from 'react-i18next';

const Legend = ({ colors }: { colors: ThemedColors }) => {
    const { t } = useTranslation();

    return (
        <View className="flex-row justify-center gap-4 py-4">
            <View className="flex-row items-center gap-2">
                <View
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: colors.chart1 }}
                />
                <Text>{t('calendar.legend.completed')}</Text>
            </View>
            <View className="flex-row items-center gap-2">
                <View
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: colors.chart2 }}
                />
                <Text>{t('calendar.legend.skipped')}</Text>
            </View>
        </View>
    );
};

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
        const res = taskProgress.reduce(
            (acc: { [key: string]: any }, progress) => {
                const date = dayjs()
                    .startOf('month') // Start from beginning of current month
                    .add(progress.day - 1, 'day')
                    .format('YYYY-MM-DD');
                const color =
                    progress.status === 'done' // Use string literal instead of enum
                        ? colors.chart1
                        : colors.chart2;

                if (progress.status === TaskProgressStatus.Todo) {
                    return acc;
                }

                acc[date] = {
                    color,
                    textColor: colors.background,
                    startingDay: true,
                    endingDay: true,
                    selectedColor: color,
                };
                return acc;
            },
            {},
        );
        return res;
    }, [taskProgress, colors]);

    return (
        <View>
            <RNCalendar
                {...getCalendarPreset(colors as ThemedColors)}
                markingType="period"
                markedDates={markedDates}
                minDate={startDate.format('YYYY-MM-DD')}
                maxDate={endDate.format('YYYY-MM-DD')}
                key={theme.colors.background}
            />
            <Legend colors={colors} />
        </View>
    );
};
