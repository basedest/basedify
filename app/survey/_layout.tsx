import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useTasksContext } from '~/entities/task';

export default function SurveyLayout() {
    const { t } = useTranslation();
    const { tasks } = useTasksContext();
    const isSurveyCompleted = tasks.length > 0;

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
