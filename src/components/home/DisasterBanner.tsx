import { View, Text, TouchableOpacity } from 'react-native';
import { colors } from '@config/tokens';
import ArrowTop from '@/assets/icons/arrow/arrow_top.svg';

type DisasterStatus = 'safe' | 'warning' | 'danger';

interface DisasterBannerProps {
  status?: DisasterStatus;
  disasterText?: string;
  onPress?: () => void;
}

export function DisasterBanner({
  status = 'safe',
  disasterText = '현재 재난 상황 없음',
  onPress,
}: DisasterBannerProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className="rounded-2xl flex-row items-center justify-between px-6 py-3"
      style={{ backgroundColor: colors.status[status] }}
    >
      <Text className="text-base font-pbold text-white">{disasterText}</Text>

      <View className="w-8 h-8 rounded-full bg-white/40 items-center justify-center">
        <ArrowTop width={24} height={24} />
      </View>
    </TouchableOpacity>
  );
}
