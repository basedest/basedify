import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function SurveyLayout() {
    return (
        <View style={{ flex: 1 }}>
            <Stack>
                <Stack.Screen name="index" options={{ title: 'Basedify' }} />
                <Stack.Screen
                    name="good-habits"
                    options={{
                        title: 'Good Habits',
                        headerBackVisible: false,
                    }}
                />
                <Stack.Screen
                    name="bad-habits"
                    options={{ title: 'Bad Habits' }}
                />
                <Stack.Screen
                    name="customize"
                    options={{ title: 'Customize Program' }}
                />
                <Stack.Screen
                    name="overview"
                    options={{ title: 'Program Overview' }}
                />
            </Stack>
        </View>
    );
}
