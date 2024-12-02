import { withProviders } from '~/lib/with-providers';
import '~/global.css';
import '../global.css';

import { Stack, SplashScreen } from 'expo-router';

import { useUserContext } from '~/entities/user';
import { useColorScheme } from '~/lib/use-color-scheme';
import { useEffect, useState } from 'react';
import { db, initializeDb } from '~/db-module';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider } from '@react-navigation/native';
import { DARK_THEME, LIGHT_THEME } from '~/lib/colors';
import { StatusBar } from 'expo-status-bar';

import '~/lib/i18n';
import dayjs from 'dayjs';
import { useProgramStore } from '~/entities/program/program.store';

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

global.atob = atob;
global.btoa = btoa;

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '(tabs)',
};

function RootLayout() {
    const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
    const { setProgram, setCurrentDay } = useProgramStore();

    const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            await initializeDb();

            const currentProgram = await db.program.findFirst({
                where: {
                    isCompleted: false,
                },
            });

            if (currentProgram) {
                const calculatedDay = dayjs()
                    .startOf('day')
                    .diff(
                        dayjs(currentProgram.startDate).startOf('day'),
                        'days',
                    );

                setProgram(currentProgram);
                setCurrentDay(calculatedDay + 1);
            }

            const theme = await AsyncStorage.getItem('theme');

            if (!theme) {
                AsyncStorage.setItem('theme', colorScheme);
                setIsColorSchemeLoaded(true);
                return;
            }
            const colorTheme = theme === 'dark' ? 'dark' : 'light';
            if (colorTheme !== colorScheme) {
                setColorScheme(colorTheme);

                setIsColorSchemeLoaded(true);
                return;
            }
            setIsColorSchemeLoaded(true);
        })().finally(() => {
            SplashScreen.hideAsync();
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { currentUser } = useUserContext();

    if (!isColorSchemeLoaded) {
        return null;
    }

    return (
        <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
            <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
            <Stack>
                <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                    redirect={!currentUser?.currentProgram?.isActive}
                />
                <Stack.Screen
                    name="index"
                    redirect={Boolean(currentUser?.currentProgram)}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="survey" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
            </Stack>
        </ThemeProvider>
    );
}

export default withProviders(RootLayout);
