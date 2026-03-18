import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, type Href } from 'expo-router';
import { useEffect } from 'react';

export default function LoginScreen() {
  const router = useRouter();
  
    useEffect(() => {
      const timer = setTimeout(() => {
        // TODO: 토큰 유무 확인 후 분기
        // 토큰 있음 → router.replace('/(tabs)')
        // 토큰 없음 → router.replace('/login')
        router.replace('/welcome' as Href);
      }, 2000);
  
      return () => clearTimeout(timer);
    }, []);


  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center">
        <Text className="text-[17px] font-pbold text-gray-13">로그인</Text>
      </View>
    </SafeAreaView>
  );
}
