import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

import { TasksProvider } from '~/entities/task';
import { UserProvider } from '~/entities/user';

const queryClient = new QueryClient();

export const withProviders = (Component: React.FC) => {
    return () => {
        return (
            <QueryClientProvider client={queryClient}>
                <UserProvider>
                    <TasksProvider>
                        <Component />
                    </TasksProvider>
                </UserProvider>
            </QueryClientProvider>
        );
    };
};
