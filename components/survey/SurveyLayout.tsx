import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

type SurveyLayoutProps = {
    title: string;
    children: React.ReactNode;
    onNext: () => void;
    nextButtonText?: string;
};

export function SurveyLayout({
    title,
    children,
    onNext,
    nextButtonText = 'Continue',
}: SurveyLayoutProps) {
    return (
        <View className="flex-1 bg-white">
            <View className="flex-1 p-4">
                <Text className="mb-6 text-2xl font-bold">{title}</Text>
                <ScrollView className="flex-1">{children}</ScrollView>
            </View>

            <View className="border-t border-gray-200 p-4">
                <TouchableOpacity
                    onPress={onNext}
                    className="rounded-lg bg-blue-500 p-4"
                >
                    <Text className="text-center text-lg font-semibold text-white">
                        {nextButtonText}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
