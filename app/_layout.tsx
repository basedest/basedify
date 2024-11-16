import { withProviders } from '~/utils/with-providers';
import '@/global.css';
import '../global.css';

import { Stack } from 'expo-router';

import { useUserContext } from '~/entities/user';
import { startupFunction } from '~/utils/startup-function';

import { useQuery } from '@tanstack/react-query';
import { useTasksContext } from '~/entities/task';
import { db } from '~/db-module';

global.atob = atob;
global.btoa = btoa;

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

function RootLayout() {
  const query = useQuery({
    queryKey: ['startup'],
    queryFn: startupFunction,
  });

  const { currentUser } = useUserContext();

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
