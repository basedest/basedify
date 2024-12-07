import { Link } from 'expo-router';
import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { useTranslation } from 'react-i18next';

export default function WelcomeScreen() {
    const { t } = useTranslation();

    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1 items-center justify-center p-5">
                {/* Logo Image */}
                <Text className="mb-2.5 text-2xl font-bold">
                    {t('welcomeScreen.title')}
                </Text>
                <Text className="mb-8 text-center text-base text-muted-foreground">
                    {t('welcomeScreen.quote')}
                </Text>
                <Link href={{ pathname: '/survey/good-habits' }} asChild>
                    <Button size="lg">
                        <Text>{t('welcomeScreen.buttonText')}</Text>
                    </Button>
                </Link>
            </View>
        </SafeAreaView>
    );
}
