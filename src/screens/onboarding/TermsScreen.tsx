import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RadioButton } from 'react-native-paper';
import { useRouter, type Href } from 'expo-router';
import { colors } from '@config/tokens';

import { OnboardingHeader } from '@components/onboarding/OnboardingHeader';
import { BottomButton } from '@components/BottomButton';
import { SettingsMenuDivider } from '@components/settings/SettingsMenuDivider';

interface TermsItemProps {
  label: string;
  checked: boolean;
  onPress: () => void;
}

function TermsItem({ label, checked, onPress }: TermsItemProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className="flex-row items-center gap-2"
    >
      <RadioButton
        value={label}
        status={checked ? 'checked' : 'unchecked'}
        onPress={onPress}
        color={colors.green[500]}
        uncheckedColor={colors.gray[7]}
      />
      <Text className="text-[15px] font-pmedium text-gray-13">{label}</Text>
    </TouchableOpacity>
  );
}

export default function TermsScreen() {
  const router = useRouter();
  const [agreeAll, setAgreeAll] = useState(false);
  const [agreeRequired, setAgreeRequired] = useState(false);
  const [agreeOptional, setAgreeOptional] = useState(false);

  const handleAgreeAll = () => {
    const next = !agreeAll;
    setAgreeAll(next);
    setAgreeRequired(next);
    setAgreeOptional(next);
  };

  const handleAgreeRequired = () => {
    const next = !agreeRequired;
    setAgreeRequired(next);
    setAgreeAll(next && agreeOptional);
  };

  const handleAgreeOptional = () => {
    const next = !agreeOptional;
    setAgreeOptional(next);
    setAgreeAll(next && agreeRequired);
  };

  const isValid = agreeRequired;
  const buttonLabel = agreeAll ? '홈으로 가기' : '홈으로 가기';

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <OnboardingHeader title="약관 동의" step={4} totalSteps={4} />

      <View className="flex-1 px-6 pt-8">
        <Text className="text-[20px] font-pbold text-gray-13 leading-[28px]">
          {'구조 신호를 정확히 전달하기 위해\n약관 동의를 진행해주세요!'}
        </Text>
      </View>

      <View className="px-6 pb-6">
        <TermsItem
          label="약관 전체동의"
          checked={agreeAll}
          onPress={handleAgreeAll}
        />
        <SettingsMenuDivider />
        <TermsItem
          label="개인정보 및 위치정보 수집 동의 (필수)"
          checked={agreeRequired}
          onPress={handleAgreeRequired}
        />
        <TermsItem
          label="Email 및 SMS 마케팅 수신 동의 (선택)"
          checked={agreeOptional}
          onPress={handleAgreeOptional}
        />
      </View>

      <BottomButton
        label={buttonLabel}
        disabled={!isValid}
        onPress={() => router.replace('/(tabs)' as Href)}
      />
    </SafeAreaView>
  );
}
