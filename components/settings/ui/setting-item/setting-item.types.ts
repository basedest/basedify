export type SettingItemProps = {
    title: string;
    description?: string;
    isSwitch?: boolean;
    value?: boolean;
    onValueChange?: (value: boolean) => void;
    onPress?: () => void;
    hidden?: boolean;
};
