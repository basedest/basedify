import { View } from 'react-native';
import { SettingGroupProps } from './setting-group.types';
import { Text } from '~/components/ui/text';
import { cn } from '~/lib/utils';

export const SettingGroup = ({
    children,
    className,
    title,
}: SettingGroupProps) => {
    return (
        <View className={cn(className)}>
            <Text className="mb-2 text-lg font-semibold">{title}</Text>
            <View className="">{children}</View>
        </View>
    );
};
