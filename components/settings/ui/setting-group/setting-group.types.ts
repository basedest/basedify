import { PropsWithChildren, ReactNode } from 'react';

export type SettingGroupProps = PropsWithChildren<{
    title: ReactNode;
    className?: string;
}>;
