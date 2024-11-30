import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';
import { NAV_THEME } from '~/lib/colors';
import dayjs from 'dayjs';

interface CalendarProps {
    onWeekSelect: (week: number) => void;
}

// TODO: rename component since it's not general calendar
export const Calendar: React.FC<CalendarProps> = ({ onWeekSelect }) => {
    const theme = useTheme();

    // TODO: better typing
    const colors = theme.colors as (typeof NAV_THEME)['dark'];

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
                firstDay={1}
                markingType="period"
                markedDates={markedDates}
                minDate={startDate.format('YYYY-MM-DD')}
                maxDate={endDate.format('YYYY-MM-DD')}
                onDayPress={handleDayPress}
                theme={{
                    backgroundColor: colors.background,
                    calendarBackground: colors.background,
                    textSectionTitleColor: colors.text,
                    selectedDayBackgroundColor: colors.border,
                    selectedDayTextColor: colors.text,
                    todayTextColor: colors.text,
                    dayTextColor: colors.text,
                    textDisabledColor: colors.primary,
                    dotColor: colors.primary,
                    selectedDotColor: colors.primary,
                    arrowColor: colors.primary,
                    monthTextColor: colors.text,
                    textDayFontWeight: '300',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: '300',
                }}
            />
        </View>
    );
};

export default Calendar;
