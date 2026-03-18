import { useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, HelperText } from 'react-native-paper';
import { useRouter, type Href } from 'expo-router';
import { colors } from '@config/tokens';

import { OnboardingHeader } from '@components/onboarding/OnboardingHeader';
import { BottomButton } from '@components/BottomButton';

export default function FloorScreen() {
  const router = useRouter();
  const [floor, setFloor] = useState('');

  const isValid = floor.trim().length > 0;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <OnboardingHeader title="주거 형태" step={2} totalSteps={4} />

      <View className="flex-1 px-6 pt-8">
        <Text className="text-[20px] font-pbold text-gray-13 mb-6 leading-[28px]">
          {'정확한 구조 파악을 위해\n거주하시는 곳의 층수를 알려주세요.'}
        </Text>

        <TextInput
          mode="outlined"
          label="층 수"
          value={floor}
          onChangeText={(text) => setFloor(text.replace(/[^0-9]/g, ''))}
          keyboardType="numeric"
          activeOutlineColor={colors.green[500]}
          outlineColor={colors.gray[5]}
          theme={{
            colors: {
              onSurfaceVariant: colors.gray[8],
            },
          }}
          style={{ backgroundColor: 'white' }}
        />
        <HelperText type="info" style={{ color: colors.gray[8] }}>
          숫자만 입력해주세요.
        </HelperText>
      </View>

      <BottomButton
        label="다음"
        disabled={!isValid}
        onPress={() => router.push('/onboarding/roommate' as Href)}
      />
    </SafeAreaView>
  );
}
