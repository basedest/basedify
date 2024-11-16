import { Stack } from 'expo-router';
import { View } from 'react-native';
import { t } from '~/utils/i18n';

export default function SurveyLayout() {
    return (
        <View style={{ flex: 1 }}>
            <Stack>
                <Stack.Screen
                    name="good-habits"
                    options={{
                        title: t('goodHabits', 'Good Habits'),
                        headerBackVisible: false,
                    }}
                />
                <Stack.Screen
                    name="bad-habits"
                    options={{ title: t('badHabits', 'Bad Habits') }}
                />
                <Stack.Screen
                    name="customize"
                    options={{
                        title: t('customizeProgram', 'Customize Program'),
                    }}
                />
                <Stack.Screen
                    name="overview"
                    options={{
                        title: t('programOverview', 'Program Overview'),
                    }}
                />
            </Stack>
        </View>
    );
}
