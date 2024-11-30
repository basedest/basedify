import { TouchableOpacity, View } from 'react-native';
import { SettingItemProps } from './setting-item.types';
import { Text } from '~/components/ui/text';
import { Switch } from '~/components/ui/switch';
import { ChevronRightIcon } from 'lucide-react-native';

export const SettingItem: React.FC<SettingItemProps> = ({
    title,
    description,
    isSwitch,
    value,
    onValueChange,
    onPress,
    hidden,
}) => {
    if (hidden) {
        return null;
    }

    return (
        <TouchableOpacity
            className="flex-row items-center justify-between border-b border-secondary py-4"
            onPress={onPress}
        >
            <View className="flex-1">
                <Text className="text-base">{title}</Text>
                {description && (
                    <Text className="text-sm font-light text-secondary-foreground">
                        {description}
                    </Text>
                )}
            </View>
            {isSwitch ? (
                <Switch checked={value!} onCheckedChange={onValueChange!} />
            ) : (
                <ChevronRightIcon color="gray" size={20} />
            )}
        </TouchableOpacity>
    );
};
