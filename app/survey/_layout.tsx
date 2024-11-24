import { Stack } from 'expo-router';
import { View } from 'react-native';
import { db } from '~/db-module';
import { useUserContext } from '~/entities/user';
import { t } from '~/lib/utils/i18n';

export default function SurveyLayout() {
    const { currentUser } = useUserContext();
    const isSurveyCompleted = currentUser?.currentProgram?.isActive;

    return (
        <View style={{ flex: 1 }}>
            <Stack>
                <Stack.Screen
                    name="good-habits"
                    options={{
                        title: t('goodHabits', 'Good Habits'),
                        headerBackVisible: false,
                    }}
                    redirect={isSurveyCompleted}
                />
                <Stack.Screen
                    name="bad-habits"
                    options={{ title: t('badHabits', 'Bad Habits') }}
                    redirect={isSurveyCompleted}
                />
                <Stack.Screen
                    name="customize"
                    options={{
                        title: t('customizeProgram', 'Customize Program'),
                    }}
                    redirect={isSurveyCompleted}
                />
                <Stack.Screen
                    name="overview"
                    options={{
                        title: t('programOverview', 'Program Overview'),
                        headerBackVisible: false,
                    }}
                />
            </Stack>
        </View>
    );
}
