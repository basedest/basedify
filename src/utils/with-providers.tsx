import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from '../entities/user';
import { TasksProvider } from '../entities/task';

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
