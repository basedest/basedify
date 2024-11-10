import { db } from "@/src/db/db-module";
import { startupFunction } from "@/src/utils/startup-function";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { atob, btoa } from 'react-native-quick-base64';

SplashScreen.preventAutoHideAsync();

global.atob = atob;
global.btoa = btoa;

export default function Index() {
  useEffect(() => {
    (async () => {
      await startupFunction();
      SplashScreen.hideAsync();
    })();
  }, []);

  const taskOptions= db.taskOption.useFindMany();

  return (
    <View className="flex-1 justify-center items-center">
      <Text>Task Options: {JSON.stringify(taskOptions)}</Text>
    </View>
  );
}
