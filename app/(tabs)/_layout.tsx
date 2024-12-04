import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { TabBarIcon } from '~/components/TabBarIcon';

export default function TabLayout() {
    const { t } = useTranslation();

    return (
        <Tabs screenOptions={{}}>
            <Tabs.Screen
                name="home"
                options={{
                    title: t('tabLayout.home'),
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="home" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="progress"
                options={{
                    title: t('tabLayout.progress'),
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="bar-chart" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: t('tabLayout.settings'),
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="cog" color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
