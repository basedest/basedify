import { Tabs } from 'expo-router';

export default function TabsLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                }}
            />
            <Tabs.Screen
                name="program"
                options={{
                    title: 'Program',
                }}
            />
            <Tabs.Screen
                name="progress"
                options={{
                    title: 'Progress',
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                }}
            />
        </Tabs>
    );
}
