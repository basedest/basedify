import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { cn } from '~/lib/utils';

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
                isSelected ? 'border-gray-900' : 'border-gray-200'
            }`}
        >
            <Text
                className={cn(
                    'text-lg font-semibold',
                    isSelected ? 'text-black' : 'text-gray-800',
                )}
            >
                {title}
            </Text>
            <Text
                className={cn(
                    'mt-1',
                    isSelected ? 'text-gray-600' : 'text-gray-400',
                )}
            >
                {description}
            </Text>
        </TouchableOpacity>
    );
}
