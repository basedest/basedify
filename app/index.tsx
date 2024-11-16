import { Link } from 'expo-router';
import { View, Text, SafeAreaView } from 'react-native';

export default function WelcomeScreen() {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 items-center justify-center p-5">
                {/* Logo Image */}
                <Text className="text-2xl font-bold mb-2.5">
                    Welcome to Basedify
                </Text>
                <Text className="text-base text-center mb-8 text-gray-600">
                    "The journey of a thousand miles begins with one step." -
                    Lao Tzu
                </Text>
                <Link href={{ pathname: '/survey/good-habits' }} asChild>
                    <Text className="bg-blue-500 px-8 py-4 rounded-lg text-white text-lg font-bold">
                        Start
                    </Text>
                </Link>
            </View>
        </SafeAreaView>
    );
}
