import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';
import { ThemedColors } from '~/lib/colors';
import dayjs from 'dayjs';
import { getCalendarPreset } from '~/lib/calendar';

interface CalendarProps {
    onWeekSelect: (week: number) => void;
}

export const ProgramOverviewCalendar: React.FC<CalendarProps> = ({
    onWeekSelect,
}) => {
    const theme = useTheme();

    const colors = theme.colors as ThemedColors;

    const startDate = dayjs();
    const endDate = startDate.add(10 * 7, 'day');

    const [selectedWeek, setSelectedWeek] = React.useState<number | null>(null);

    const generateMarkedDates = (selectedWeek: number | null) => {
        const markedDates: MarkedDates = {};
        for (let i = 0; i < 10; i++) {
            const weekStart = startDate.add(i * 7, 'day');
            for (let j = 0; j < 7; j++) {
                const day = weekStart.add(j, 'day');
                markedDates[day.format('YYYY-MM-DD')] = {
                    color:
                        selectedWeek === i + 1
                            ? colors.primary
                            : colors.secondary,
                    textColor:
                        selectedWeek === i + 1
                            ? colors.background
                            : colors.primary,
                    ...(j === 0 && { startingDay: true }),
                    ...(j === 6 && { endingDay: true }),
                };
            }
        }
        return markedDates;
    };

    const markedDates = generateMarkedDates(selectedWeek);

    const handleDayPress = (day: any) => {
        const selectedDate = dayjs(day.dateString).startOf('day');
        const weekNumber =
            Math.floor(selectedDate.diff(startDate.startOf('day'), 'day') / 7) +
            1;
        if (weekNumber > 10) {
            return;
        }
        setSelectedWeek(weekNumber);
        onWeekSelect(weekNumber);
    };

    return (
        <View className="mb-6">
            <RNCalendar
                {...getCalendarPreset(colors)}
                markingType="period"
                markedDates={markedDates}
                minDate={startDate.format('YYYY-MM-DD')}
                maxDate={endDate.format('YYYY-MM-DD')}
                onDayPress={handleDayPress}
            />
        </View>
    );
};

export default ProgramOverviewCalendar;
