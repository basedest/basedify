import React from 'react';
import { View, Text } from 'react-native';
import { db } from '~/db-module';
import { useSurveyStore } from '~/entities/survey';

export default function Customize() {
    const { goodHabits, badHabits } = useSurveyStore();
    const taskOptions = db.taskOption.useFindMany({
        where: { id: { in: [...goodHabits, ...badHabits] } },
    });

    console.log(taskOptions);

    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text>Customize Program Screen</Text>
        </View>
    );
}
