import { useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, HelperText } from 'react-native-paper';
import { useRouter, type Href } from 'expo-router';
import { colors } from '@config/tokens';

import { OnboardingHeader } from '@components/onboarding/OnboardingHeader';
import { SelectItem } from '@components/onboarding/SelectItem';
import { BottomButton } from '@components/BottomButton';

const ROOMMATE_OPTIONS = ['예. 동거인이 있습니다.', '아니오. 동거인이 없습니다.'];

export default function RoommateScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [note, setNote] = useState('');

  const isValid = selected !== null;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <OnboardingHeader title="동거인 정보" step={3} totalSteps={4} />

      <View className="flex-1 px-6 pt-8">
        <Text className="text-[20px] font-pbold text-gray-13 mb-6 leading-[28px]">
          {'함께 지내는 분들이 계신가요?\n위급 시 맞춤형 가이드를 제공해 드려요.'}
        </Text>

        <View className="gap-2 mb-6">
          {ROOMMATE_OPTIONS.map((option) => (
            <SelectItem
              key={option}
              label={option}
              selected={selected === option}
              onPress={() => setSelected(option)}
            />
          ))}
        </View>

        <TextInput
          mode="outlined"
          label="특이사항"
          value={note}
          onChangeText={setNote}
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
          반려동물 유무나 영유아, 노약자 포함 여부 (텍스트 입력)
        </HelperText>
      </View>

      <BottomButton
        label="다음"
        disabled={!isValid}
        onPress={() => router.push('/onboarding/terms' as Href)}
      />
    </SafeAreaView>
  );
}
