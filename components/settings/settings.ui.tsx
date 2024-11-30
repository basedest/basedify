import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { SettingItem } from '~/components/settings/ui';
import { useColorScheme } from '~/lib/use-color-scheme';
import { Text } from '~/components/ui/text';
import { useCurrentUser } from '~/entities/user';
import { resetProgram } from './settings.lib';
import { SettingGroup } from './ui/setting-group/setting-group.ui';

export const Settings = () => {
    const [notifications, setNotifications] = useState(true);
    const { colorScheme, setColorScheme } = useColorScheme();
    const { currentProgram } = useCurrentUser();

    return (
        <ScrollView className=" flex-1 px-4 pt-4">
            <SettingGroup className="mb-6" title="Preferences">
                <SettingItem
                    title="Notifications"
                    description="Receive reminders and updates"
                    isSwitch={true}
                    value={notifications}
                    onValueChange={setNotifications}
                />
                <SettingItem
                    title="Dark Mode"
                    description="Toggle dark theme"
                    isSwitch={true}
                    value={colorScheme === 'dark'}
                    onValueChange={(isDark) =>
                        isDark
                            ? setColorScheme('dark')
                            : setColorScheme('light')
                    }
                />
            </SettingGroup>

            <SettingGroup className="mb-6" title="Account">
                <SettingItem
                    title="Edit Profile"
                    onPress={() => console.log('Edit Profile pressed')}
                />
                <SettingItem
                    title="Change Password"
                    onPress={() => console.log('Change Password pressed')}
                />
            </SettingGroup>

            <SettingGroup className="mb-6" title="Program">
                <SettingItem
                    hidden={!currentProgram}
                    title="Reset Progress"
                    description="Start your program from day 1"
                    onPress={() => resetProgram(currentProgram!.id)}
                />
                <SettingItem
                    title="Adjust Program Length"
                    description="Change the duration of your program"
                    onPress={() => console.log('Adjust Program Length pressed')}
                />
            </SettingGroup>

            <SettingGroup className="mb-6" title="Support">
                <SettingItem
                    title="Help Center"
                    onPress={() => console.log('Help Center pressed')}
                />
                <SettingItem
                    title="Contact Us"
                    onPress={() => console.log('Contact Us pressed')}
                />
            </SettingGroup>

            {/* <TouchableOpacity
                className="mb-8 rounded-lg bg-red-500 px-4 py-3"
                onPress={handleLogout}
            >
                <Text className="text-center font-semibold text-primary">
                    Log Out
                </Text>
            </TouchableOpacity> */}
        </ScrollView>
    );
};
