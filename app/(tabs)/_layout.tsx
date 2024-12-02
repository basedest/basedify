import { Tabs } from 'expo-router';

import { TabBarIcon } from '~/components/TabBarIcon';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{}}>
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="home" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="progress"
                options={{
                    title: 'Progress',
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="bar-chart" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="cog" color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
