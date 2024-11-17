import { Link } from 'expo-router';
import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

export default function WelcomeScreen() {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 items-center justify-center p-5">
                {/* Logo Image */}
                <Text className="mb-2.5 text-2xl font-bold">
                    Welcome to Basedify
                </Text>
                <Text className="mb-8 text-center text-base text-gray-600">
                    "The journey of a thousand miles begins with one step." -
                    Lao Tzu
                </Text>
                <Link href={{ pathname: '/survey/good-habits' }} asChild>
                    <Button size="lg">
                        <Text>Get started</Text>
                    </Button>
                </Link>
            </View>
        </SafeAreaView>
    );
}
