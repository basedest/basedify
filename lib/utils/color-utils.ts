import { ThemedColors } from '../colors';

type getTabBarIconColorParams = {
    focused: boolean;
    colors: ThemedColors;
};

export const getTabBarIconColor = ({
    focused,
    colors,
}: getTabBarIconColorParams) => {
    return focused ? colors.primary : colors.border;
};
