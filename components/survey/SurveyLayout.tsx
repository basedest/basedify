import React from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

type SurveyLayoutProps = {
    title: string;
    children: React.ReactNode;
    onNext: () => void;
    nextButtonDisabled?: boolean;
    nextButtonText?: string;
};

export function SurveyLayout({
    title,
    children,
    onNext,
    nextButtonText = 'Continue',
    nextButtonDisabled,
}: SurveyLayoutProps) {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 p-4">
                <Text className="mb-6 text-2xl font-bold">{title}</Text>
                <ScrollView className="flex-1">{children}</ScrollView>
            </View>

            <View className="border-t border-gray-200 p-4">
                <Button disabled={nextButtonDisabled} onPress={onNext}>
                    <Text className="text-lg font-bold">{nextButtonText}</Text>
                </Button>
            </View>
        </SafeAreaView>
    );
}
