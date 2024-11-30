import { Link } from 'expo-router';
import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { useColorScheme } from '~/lib/use-color-scheme';

export default function WelcomeScreen() {
    const { toggleColorScheme } = useColorScheme();

    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1 items-center justify-center p-5">
                {/* Logo Image */}
                <Text className="mb-2.5 text-2xl font-bold">
                    Welcome to Basedify
                </Text>
                <Text className="mb-8 text-center text-base text-muted-foreground">
                    "The journey of a thousand miles begins with one step." -
                    Lao Tzu
                </Text>
                <Button onPress={toggleColorScheme}>
                    <Text>Toggle scheme</Text>
                </Button>
                <Link href={{ pathname: '/survey/good-habits' }} asChild>
                    <Button size="lg">
                        <Text>Get started</Text>
                    </Button>
                </Link>
            </View>
        </SafeAreaView>
    );
}
