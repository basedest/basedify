import { useTheme } from '@react-navigation/native';
import { Tabs } from 'expo-router';

import { TabBarIcon } from '~/components/TabBarIcon';
import { ThemedColors } from '~/lib/colors';
import { getTabBarIconColor } from '~/lib/utils/color-utils';

export default function TabLayout() {
    const theme = useTheme();
    const colors = theme.colors as ThemedColors;

    return (
        <Tabs screenOptions={{}}>
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon
                            name="home"
                            color={getTabBarIconColor({ colors, focused })}
                        />
                    ),
                    // headerRight: () => (
                    //     <Link href="/modal" asChild>
                    //         <HeaderButton />
                    //     </Link>
                    // ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon
                            name="cog"
                            color={getTabBarIconColor({ colors, focused })}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
