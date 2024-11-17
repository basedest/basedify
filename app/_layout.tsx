import { withProviders } from '~/lib/with-providers';
import '~/global.css';
import '../global.css';

import { Stack, SplashScreen } from 'expo-router';

import { useUserContext } from '~/entities/user';
import { useColorScheme } from '~/lib/use-color-scheme';
import { useEffect, useState } from 'react';
import { initializeDb } from '~/db-module';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider } from '@react-navigation/native';
import { DARK_THEME, LIGHT_THEME } from '~/lib/colors';
import { StatusBar } from 'expo-status-bar';

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

    const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            await initializeDb();

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
                    redirect={!currentUser?.survey?.isCompleted}
                />
                <Stack.Screen name="survey" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
            </Stack>
        </ThemeProvider>
    );
}

export default withProviders(RootLayout);
