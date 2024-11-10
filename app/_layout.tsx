import { useUserContext } from '@/src/entities/user';
import { Stack } from 'expo-router';

import { atob, btoa } from 'react-native-quick-base64';
import { useQuery } from '@tanstack/react-query';
import { startupFunction } from '@/src/utils/startup-function';
import { withProviders } from '@/src/utils/with-providers';

import '../global.css';

import { verifyInstallation } from 'nativewind';

global.atob = atob;
global.btoa = btoa;

function RootLayout() {
    const query = useQuery({
        queryKey: ['startup'],
        queryFn: startupFunction,
    });

    const { currentUser } = useUserContext();

    verifyInstallation();

    // TODO: Add error page
    if (query.isError) {
        return null;
    }

    if (query.isLoading) {
        return null;
    }

    return (
        <Stack>
            <Stack.Screen
                name="(tabs)"
                options={{ headerShown: false }}
                redirect={!currentUser?.survey?.isCompleted}
            />
            <Stack.Screen name="survey" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
        </Stack>
    );
}

export default withProviders(RootLayout);
