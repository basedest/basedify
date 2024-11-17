import { View } from 'react-native';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { Text } from './ui/text';
import { cn } from '~/lib/utils';

type WeekdayPickerProps = {
    value: number[];
    onChange: (days: number[]) => void;
    className?: string;
};

export const WeekdayPicker = ({
    value,
    onChange,
    className,
}: WeekdayPickerProps) => {
    const days = [
        { label: 'Sun', value: 0 },
        { label: 'Mon', value: 1 },
        { label: 'Tue', value: 2 },
        { label: 'Wed', value: 3 },
        { label: 'Thu', value: 4 },
        { label: 'Fri', value: 5 },
        { label: 'Sat', value: 6 },
    ];

    const onToggleDay = (selectedDays: string[]) => {
        onChange(selectedDays.map(Number));
    };

    return (
        <View className="w-full flex-1 items-center py-2">
            <ToggleGroup
                className={cn('w-full', className)}
                value={value.map(String)}
                onValueChange={onToggleDay}
                type="multiple"
            >
                {days.map((day) => (
                    <ToggleGroupItem key={day.value} value={String(day.value)}>
                        <Text>{day.label}</Text>
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
        </View>
    );
};
