import { SafeAreaView, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Button } from '../ui/button';

interface TimePickerProps {
    value?: number; // time in minutes
    onChange?: (time: number) => void;
}

const minutesToDate = (minutes: number) => {
    const date = new Date();
    date.setHours(Math.floor(minutes / 60), minutes % 60, 0, 0);
    return date;
};

export const TimePicker = ({ value = 0, onChange }: TimePickerProps) => {
    const [date, setDate] = useState(minutesToDate(value));
    const [show, setShow] = useState(false);

    const handleChange = (_: any, selectedDate?: Date) => {
        setShow(false);
        if (!selectedDate) return;

        setDate(selectedDate);
        onChange?.(selectedDate.getHours() * 60 + selectedDate.getMinutes());
    };

    return (
        <SafeAreaView>
            <Button onPress={() => setShow(true)}>
                <Text className="text-white">{date.toLocaleTimeString()}</Text>
            </Button>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="time"
                    is24Hour={true}
                    onChange={handleChange}
                />
            )}
        </SafeAreaView>
    );
};
