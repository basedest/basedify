import { Link } from 'expo-router';
import { View, Text, SafeAreaView } from 'react-native';

export default function WelcomeScreen() {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 items-center justify-center p-5">
                {/* Logo Image */}
                <Text className="mb-2.5 text-2xl font-bold">
                    Welcome to Basedify
                </Text>
                <Text className="mb-8 text-center text-base text-gray-600">
                    "The journey of a thousand miles begins with one step." -
                    Lao Tzu
                </Text>
                <Link href={{ pathname: '/survey/good-habits' }} asChild>
                    <Text className="rounded-lg bg-blue-500 px-8 py-4 text-lg font-bold text-white">
                        Start
                    </Text>
                </Link>
            </View>
        </SafeAreaView>
    );
}
