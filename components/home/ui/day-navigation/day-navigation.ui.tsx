import { useTheme } from '@react-navigation/native';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react-native';
import { TouchableOpacity, View } from 'react-native';
import { useCurrentUser } from '~/entities/user';
import { Text } from '~/components/ui/text';
import { ThemedColors } from '~/lib/colors';
import { useTranslation } from 'react-i18next';

type DayNavigationProps = {
    currentDay: number;
    setCurrentDay: React.Dispatch<React.SetStateAction<number>>;
};

export const DayNavigation: React.FC<DayNavigationProps> = ({
    currentDay,
    setCurrentDay,
}) => {
    const theme = useTheme();
    const colors = theme.colors as ThemedColors;
    const { currentProgram } = useCurrentUser();
    const totalDays = currentProgram?.totalDays ?? 70;
    const { t } = useTranslation();

    return (
        <View className="flex-row items-center justify-between">
            <TouchableOpacity
                onPress={() => setCurrentDay((prev) => Math.max(1, prev - 1))}
            >
                <ChevronLeftIcon
                    color={currentDay > 1 ? colors.primary : colors.secondary}
                    size={24}
                />
            </TouchableOpacity>
            <Text className="text-lg font-bold">
                {t('dayNavigation.day', {
                    current: currentDay,
                    total: totalDays,
                })}
            </Text>
            <TouchableOpacity
                onPress={() =>
                    setCurrentDay((prev) => Math.min(totalDays, prev + 1))
                }
            >
                <ChevronRightIcon
                    color={
                        currentDay < totalDays
                            ? colors.primary
                            : colors.secondary
                    }
                    size={24}
                />
            </TouchableOpacity>
        </View>
    );
};
