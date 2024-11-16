import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { t } from '~/utils/i18n';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: t('notFoundPage.title', 'Oops!') }} />
      <View className={styles.container}>
        <Text className={styles.title}>{t('notFoundPage.message', "This screen doesn't exist.")}</Text>
        <Link href="/" className={styles.link}>
          <Text className={styles.linkText}>{t('notFoundPage.linkText', 'Go to home screen!')}</Text>
        </Link>
      </View>
    </>
  );
}

const styles = {
  container: `items-center flex-1 justify-center p-5`,
  title: `text-xl font-bold`,
  link: `mt-4 pt-4`,
  linkText: `text-base text-[#2e78b7]`,
};
