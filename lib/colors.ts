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
        chart1: 'hsl(173 58% 39%)',
        chart2: 'hsl(12 76% 61%)',
        chart3: 'hsl(197 37% 24%)',
        chart4: 'hsl(43 74% 66%)',
        chart5: 'hsl(27 87% 67%)',
    } satisfies ThemedColors,
    dark: {
        background: 'hsl(240 10% 3.9%)', // background
        border: 'hsl(240 3.7% 15.9%)', // border
        card: 'hsl(240 10% 3.9%)', // card
        notification: 'hsl(0 72% 51%)', // destructive
        primary: 'hsl(0 0% 98%)', // primary
        text: 'hsl(0 0% 98%)', // foreground
        secondary: 'hsl(240 3.7% 15.9%)', // muted
        accent: 'hsl(0 0% 98%)', // primary
        chart1: 'hsl(220 70% 50%)',
        chart2: 'hsl(340 75% 55%)',
        chart3: 'hsl(30 80% 55%)',
        chart4: 'hsl(280 65% 60%)',
        chart5: 'hsl(160 60% 45%)',
    } satisfies ThemedColors,
} as const;

export type ThemedColors = {
    background: string;
    border: string;
    card: string;
    notification: string;
    primary: string;
    text: string;
    secondary: string;
    accent: string;
    chart1: string;
    chart2: string;
    chart3: string;
    chart4: string;
    chart5: string;
};

export const LIGHT_THEME: Theme = {
    dark: false,
    colors: NAV_THEME.light,
};
export const DARK_THEME: Theme = {
    dark: true,
    colors: NAV_THEME.dark,
};
