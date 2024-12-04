import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { SettingItem } from '~/components/settings/ui';
import { useColorScheme } from '~/lib/use-color-scheme';
import { useCurrentUser } from '~/entities/user';
import { resetProgram } from './settings.lib';
import { SettingGroup } from './ui/setting-group/setting-group.ui';
import { useTranslation } from 'react-i18next';

export const Settings = () => {
    const { t } = useTranslation();
    const [notifications, setNotifications] = useState(true);
    const { colorScheme, setColorScheme } = useColorScheme();
    const { currentProgram } = useCurrentUser();

    return (
        <ScrollView className=" flex-1 px-4 pt-4">
            <SettingGroup className="mb-6" title={t('settings.preferences')}>
                <SettingItem
                    title={t('settings.notifications')}
                    description={t('settings.notificationsDescription')}
                    isSwitch={true}
                    value={notifications}
                    onValueChange={setNotifications}
                />
                <SettingItem
                    title={t('settings.darkMode')}
                    description={t('settings.darkModeDescription')}
                    isSwitch={true}
                    value={colorScheme === 'dark'}
                    onValueChange={(isDark) =>
                        isDark
                            ? setColorScheme('dark')
                            : setColorScheme('light')
                    }
                />
            </SettingGroup>

            {/* <SettingGroup className="mb-6" title={t('settings.account')}>
                <SettingItem title={t('settings.editProfile')} />
                <SettingItem title={t('settings.changePassword')} />
            </SettingGroup> */}

            <SettingGroup className="mb-6" title={t('settings.program')}>
                <SettingItem
                    hidden={!currentProgram}
                    title={t('settings.resetProgress')}
                    description={t('settings.resetProgressDescription')}
                    onPress={() => resetProgram(currentProgram!.id)}
                />
                {/* <SettingItem
                    title={t('settings.adjustProgramLength')}
                    description={t('settings.adjustProgramLengthDescription')}
                /> */}
            </SettingGroup>

            <SettingGroup className="mb-6" title={t('settings.support')}>
                {/* <SettingItem title={t('settings.helpCenter')} /> */}
                <SettingItem title={t('settings.contactUs')} />
            </SettingGroup>

            {/* <TouchableOpacity
                className="mb-8 rounded-lg bg-red-500 px-4 py-3"
                onPress={handleLogout}
            >
                <Text className="text-center font-semibold text-primary">
                    {t('settings.logOut')}
                </Text>
            </TouchableOpacity> */}
        </ScrollView>
    );
};
