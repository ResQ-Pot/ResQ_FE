import { View, Text, TouchableOpacity } from 'react-native';
import { colors } from '@config/tokens';

interface DisasterBannerProps {
  hasDisaster?: boolean;
  disasterText?: string;
  onPress?: () => void;
}

export function DisasterBanner({
  hasDisaster = false,
  disasterText = '현재 재난 상황 없음',
  onPress,
}: DisasterBannerProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className="mx-4 rounded-2xl flex-row items-center justify-between p-[25px]"
      style={{ backgroundColor: hasDisaster ? colors.status.danger : colors.status.safe }}
    >
      <Text className="text-base font-pbold text-white">{disasterText}</Text>

      <View className="w-8 h-8 rounded-full bg-green-100 items-center justify-center">
        <Text className="text-lg font-pbold text-gray-1">
          {'>'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
