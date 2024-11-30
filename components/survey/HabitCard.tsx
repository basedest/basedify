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
                isSelected ? 'border-primary' : 'border-muted'
            }`}
        >
            <Text
                className={cn(
                    'text-lg font-semibold',
                    isSelected ? 'text-primary' : 'text-secondary-foreground',
                )}
            >
                {title}
            </Text>
            <Text
                className={cn(
                    'mt-1 font-light',
                    isSelected ? 'text-primary' : 'text-muted-foreground',
                )}
            >
                {description}
            </Text>
        </TouchableOpacity>
    );
}
