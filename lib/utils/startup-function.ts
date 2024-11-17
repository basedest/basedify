import { initializeDb } from '~/db-module';
import * as SplashScreen from 'expo-splash-screen';

export async function startupFunction() {
    console.debug('after initializeDb');
    return true;
}
