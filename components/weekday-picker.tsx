import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { Text } from './ui/text';
import { cn } from '~/lib/utils';

type WeekdayPickerProps = {
    value: number[];
    onChange: (days: number[]) => void;
    className?: string;
    disabled?: boolean;
    min?: number;
};

export const WeekdayPicker = ({
    value,
    onChange,
    className,
    disabled,
    min,
}: WeekdayPickerProps) => {
    const { t } = useTranslation();

    const days = [
        { label: t('weekdayPicker.days.mon'), value: 1 },
        { label: t('weekdayPicker.days.tue'), value: 2 },
        { label: t('weekdayPicker.days.wed'), value: 3 },
        { label: t('weekdayPicker.days.thu'), value: 4 },
        { label: t('weekdayPicker.days.fri'), value: 5 },
        { label: t('weekdayPicker.days.sat'), value: 6 },
        { label: t('weekdayPicker.days.sun'), value: 0 },
    ];

    const onToggleDay = (selectedDays: string[]) => {
        onChange(selectedDays.map(Number));
    };

    return (
        <View className="w-full items-center gap-1 py-2">
            <ToggleGroup
                size="sm"
                disabled={disabled}
                className={cn('w-full gap-2', className)}
                value={value.map(String)}
                onValueChange={onToggleDay}
                type="multiple"
            >
                {days.map((day) => (
                    <ToggleGroupItem
                        className="flex-1"
                        key={day.value}
                        value={String(day.value)}
                    >
                        <Text className="text-center">{day.label}</Text>
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
            {min && value.length < min && (
                <Text className="text-base text-red-500">
                    {t('weekdayPicker.validation.minDays', { count: min })}
                </Text>
            )}
        </View>
    );
};
