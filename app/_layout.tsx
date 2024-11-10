import { startupFunction } from '@/src/utils/startup-function';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { atob, btoa } from 'react-native-quick-base64';

SplashScreen.preventAutoHideAsync();
global.atob = atob;
global.btoa = btoa;

export default function RootLayout() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        (async () => {
            await startupFunction();
            setIsReady(true);
        })();
    }, []);

    useEffect(() => {
        if (isReady) {
            SplashScreen.hideAsync();
        }
    }, [isReady]);

    if (!isReady) {
        return null;
    }

    return (
        <Stack>
            <Stack.Screen name="index" />
        </Stack>
    );
}
