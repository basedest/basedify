import { Tabs } from 'expo-router';
import {
    ChartNoAxesCombinedIcon,
    HomeIcon,
    SettingsIcon,
} from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

export default function TabLayout() {
    const { t } = useTranslation();

    return (
        <Tabs screenOptions={{}}>
            <Tabs.Screen
                name="home"
                options={{
                    title: t('tabLayout.home'),
                    tabBarIcon: ({ color }) => <HomeIcon color={color} />,
                }}
            />
            <Tabs.Screen
                name="progress"
                options={{
                    title: t('tabLayout.progress'),
                    tabBarIcon: ({ color }) => (
                        <ChartNoAxesCombinedIcon color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: t('tabLayout.settings'),
                    tabBarIcon: ({ color }) => <SettingsIcon color={color} />,
                }}
            />
        </Tabs>
    );
}
