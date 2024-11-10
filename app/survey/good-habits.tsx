import { Box } from '@/src/components/ui/box';
import React from 'react';
import { View, Text } from 'react-native';

export default function GoodHabits() {
    return (
        <View className="flex-1 justify-center items-center">
            <Box className="bg-primary-500 p-5">
                <Text className="text-typography-0">This is the Box</Text>
            </Box>
            <Text className="text-base text-red-500">Good Habits Screen</Text>
        </View>
    );
}
