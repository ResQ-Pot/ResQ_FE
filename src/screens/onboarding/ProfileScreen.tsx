import { useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, type Href } from 'expo-router';

import { OnboardingHeader } from '@components/onboarding/OnboardingHeader';
import { SelectItem } from '@components/onboarding/SelectItem';
import { BottomButton } from '@components/BottomButton';

const HOUSING_OPTIONS = ['아파트', '오피스텔', '단독주택', '빌라'];

export default function ProfileScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <OnboardingHeader title="주거 형태" step={1} totalSteps={4} />

      <View className="flex-1 px-6 pt-8">
        <Text className="text-[20px] font-pbold text-gray-13 mb-6">
          주거 유형을 선택해주세요.
        </Text>

        <View className="gap-2">
          {HOUSING_OPTIONS.map((option) => (
            <SelectItem
              key={option}
              label={option}
              selected={selected === option}
              onPress={() => setSelected(option)}
            />
          ))}
        </View>
      </View>

      <BottomButton
        label="다음"
        disabled={!selected}
        onPress={() => router.push('/onboarding/floor' as Href)}
      />
    </SafeAreaView>
  );
}
