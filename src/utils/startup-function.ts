import { initializeDb } from '@/db-module';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export async function startupFunction() {
    await initializeDb();
    await SplashScreen.hideAsync();
    console.debug('after initializeDb');
    return true;
}
