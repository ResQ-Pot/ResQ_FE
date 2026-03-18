import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, type Href } from 'expo-router';
import { useEffect } from 'react';

import LogoText from '@/assets/icons/logo-text.svg';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      // TODO: 토큰 유무 확인 후 분기
      // 토큰 있음 → router.replace('/(tabs)')
      // 토큰 없음 → router.replace('/login')
      router.replace('/login' as Href);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-3">
      <View className="flex-1 items-center justify-center">
        <LogoText width={200} height={37} />
      </View>
    </SafeAreaView>
  );
}
