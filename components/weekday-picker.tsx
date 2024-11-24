import { View } from 'react-native';
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
    const days = [
        { label: 'Mon', value: 1 },
        { label: 'Tue', value: 2 },
        { label: 'Wed', value: 3 },
        { label: 'Thu', value: 4 },
        { label: 'Fri', value: 5 },
        { label: 'Sat', value: 6 },
        { label: 'Sun', value: 0 },
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
                    Select at least {min} {min === 1 ? 'day' : 'days'}
                </Text>
            )}
        </View>
    );
};
