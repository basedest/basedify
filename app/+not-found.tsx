import { t } from '@/src/utils/i18n';
import { Link, Stack } from 'expo-router';
import { View, Text } from 'react-native';

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen
                options={{ title: t('notFoundPage.title', 'Oops..') }}
            />
            <View className="flex-1 items-center justify-center p-5">
                <Text>
                    {t('notFoundPage.text', "This screen doesn't exist.")}
                </Text>
                <Link href="/" className="mt-4 py-4">
                    <Text>{t('notFoundPage.link', 'Go to home screen!')}</Text>
                </Link>
            </View>
        </>
    );
}
