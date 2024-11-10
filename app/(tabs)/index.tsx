import { db } from '@/db-module';
import { Text, View } from 'react-native';

export default function Home() {
    const taskOptions = db.taskOption.useFindMany();

    return (
        <View className="flex-1 justify-center items-center">
            <Text>Task Options: {JSON.stringify(taskOptions)}</Text>
        </View>
    );
}
