import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import plantImage from '@/assets/images/plant/plant-default.png';
import { BottomButton } from '@components/BottomButton';
import { useRouter, type Href } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <View className="flex-1 items-center justify-center gap-2">
        <Image source={plantImage} className="w-[200px] h-[200px]" resizeMode="contain" />
        <Text className="text-[15px] font-pregular text-gray-8 mt-3">로그인 완료</Text>
        <Text className="text-[24px] font-pbold text-gray-13">환영합니다!</Text>
      </View>

      <BottomButton
        label="시작하기"
        onPress={() => {
          // TODO: 라우팅 경로 추가
          router.push('/onboarding/profile' as Href);
        }}
      />
    </SafeAreaView>
  );
}
