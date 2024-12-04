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
                        title: t('survey.goodHabits.title'),
                        headerBackVisible: false,
                    }}
                    redirect={isSurveyCompleted}
                />
                <Stack.Screen
                    name="bad-habits"
                    options={{ title: t('survey.badHabits.title') }}
                    redirect={isSurveyCompleted}
                />
                <Stack.Screen
                    name="customize"
                    options={{
                        title: t('survey.customize.title'),
                    }}
                    redirect={isSurveyCompleted}
                />
                <Stack.Screen
                    name="overview"
                    options={{
                        title: t('survey.overview.title'),
                        headerBackVisible: false,
                    }}
                />
            </Stack>
        </View>
    );
}
