import type { Theme } from '@react-navigation/native';

export const NAV_THEME = {
    light: {
        background: 'hsl(0 0% 100%)', // background
        border: 'hsl(240 5.9% 90%)', // border
        card: 'hsl(0 0% 100%)', // card
        notification: 'hsl(0 84.2% 60.2%)', // destructive
        primary: 'hsl(240 5.9% 10%)', // primary
        text: 'hsl(240 10% 3.9%)', // foreground
        secondary: 'hsl(240 4.8% 95.9%)', // muted
        accent: 'hsl(240 5.9% 10%)', // primary
    },
    dark: {
        background: 'hsl(240 10% 3.9%)', // background
        border: 'hsl(240 3.7% 15.9%)', // border
        card: 'hsl(240 10% 3.9%)', // card
        notification: 'hsl(0 72% 51%)', // destructive
        primary: 'hsl(0 0% 98%)', // primary
        text: 'hsl(0 0% 98%)', // foreground
        secondary: 'hsl(240 3.7% 15.9%)', // muted
        accent: 'hsl(0 0% 98%)', // primary
    },
} as const;

export type ThemedColors = (typeof NAV_THEME)['light'];

export const LIGHT_THEME: Theme = {
    dark: false,
    colors: NAV_THEME.light,
};
export const DARK_THEME: Theme = {
    dark: true,
    colors: NAV_THEME.dark,
};
