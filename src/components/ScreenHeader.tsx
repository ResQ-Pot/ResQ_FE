import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import ArrowLeftIcon from '@/assets/icons/arrow/arrow_left.svg';

interface ScreenHeaderProps {
  title: string;
  onBack?: () => void;
}

export function ScreenHeader({ title, onBack }: ScreenHeaderProps) {
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-center px-6 py-5">
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onBack ?? (() => router.back())}
        className="absolute left-6"
      >
        <ArrowLeftIcon width={24} height={24} />
      </TouchableOpacity>
      <Text className="text-[17px] font-pbold text-gray-13">{title}</Text>
    </View>
  );
}
