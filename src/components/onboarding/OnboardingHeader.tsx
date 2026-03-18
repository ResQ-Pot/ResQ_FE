import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ProgressBar } from 'react-native-paper';
import { colors } from '@config/tokens';

import ArrowLeftIcon from '@/assets/icons/arrow/arrow_left.svg';

interface OnboardingHeaderProps {
  title: string;
  step: number;
  totalSteps: number;
  onBack?: () => void;
}

export function OnboardingHeader({ title, step, totalSteps, onBack }: OnboardingHeaderProps) {
  const router = useRouter();

  return (
    <View>
      <View className="flex-row items-center justify-center px-6 py-5">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onBack ?? (() => { if (router.canGoBack()) router.back(); })}
          className="absolute left-6"
        >
          <ArrowLeftIcon width={24} height={24} />
        </TouchableOpacity>
        <Text className="text-[18px] font-psemibold text-gray-13">
          {title}({step}/{totalSteps})
        </Text>
      </View>

      <ProgressBar
        progress={step / totalSteps}
        color={colors.green[500]}
        style={{ backgroundColor: colors.gray[5], height: 4 }}
      />
    </View>
  );
}
