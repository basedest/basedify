import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

type HabitCardProps = {
    title: string;
    description: string;
    isSelected: boolean;
    onPress: () => void;
};

export function HabitCard({
    title,
    description,
    isSelected,
    onPress,
}: HabitCardProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            className={`mb-3 rounded-lg border p-4 ${
                isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            }`}
        >
            <Text className="text-lg font-semibold">{title}</Text>
            <Text className="mt-1 text-gray-600">{description}</Text>
        </TouchableOpacity>
    );
}
