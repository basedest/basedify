import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ScreenContent } from '~/components/ScreenContent';
import { useUserContext } from '~/entities/user';

export default function Home() {
    const { currentUser } = useUserContext();

    console.log(currentUser?.currentProgram);
    // db.program.update({
    //     where: { id: currentUser?.currentProgram?.id },
    //     data: {
    //         isActive: false,
    //     },
    // });

    return (
        <>
            <Stack.Screen options={{ title: 'Tab One' }} />
            <View style={styles.container}>
                <ScreenContent path="app/(tabs)/index.tsx" title="Tab One" />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
});
