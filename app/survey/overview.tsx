import React from 'react';
import { View, Text } from 'react-native';
import { useTasksContext } from '~/entities/task';

export default function Overview() {
    const { tasks } = useTasksContext();

    console.log(tasks);

    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text>Program Overview Screen</Text>
        </View>
    );
}
