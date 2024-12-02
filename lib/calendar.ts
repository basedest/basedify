import { CalendarProps } from 'react-native-calendars';
import { ThemedColors } from './colors';

export const getCalendarPreset = (
    colors: ThemedColors,
): Partial<CalendarProps> => ({
    firstDay: 1,
    theme: {
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
    },
});
