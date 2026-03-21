import { View, Text } from 'react-native';

import { colors } from '@config/tokens';
import AvatarHelmet from '@/assets/icons/avatar-helmet.svg';
import { StatusBadge } from './StatusBadge';

type SafetyStatus = 'safe' | 'warning' | 'danger';

interface SafetyStatusCardProps {
  userName?: string;
  message?: string;
  subMessage?: string;
  timestamp?: string;
  status?: SafetyStatus;
}

const STATUS_CONFIG: Record<SafetyStatus, { label: string; color: string; textColor: string }> = {
  safe: { label: '안전', color: colors.status.safe, textColor: colors.status.safe },
  warning: { label: '주의', color: colors.status.warning, textColor: colors.status.warning },
  danger: { label: '위험', color: colors.status.danger, textColor: colors.status.danger },
};

export function SafetyStatusCard({
  userName = '은혜',
  message = '외출하기 좋은 맑은 날씨예요.',
  subMessage = '가벼운 산책을 추천합니다.',
  timestamp = '2026년 1월 12일 12:59:02',
  status = 'safe',
}: SafetyStatusCardProps) {
  const { label, color, textColor } = STATUS_CONFIG[status];

  return (
    <View className="bg-white rounded-2xl px-6 pt-7 pb-5" style={{ shadowColor: colors.gray[13], shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 }}>
      <View className="flex-row items-start justify-between">
        <View className="flex-1">
          <Text className="text-[12px] font-pregular text-gray-8">{userName}님의 안전 상태</Text>
          <Text className="text-[15px] font-psemibold text-gray-13 mt-[10px]">{message}</Text>
          <Text className="text-[18px] font-pbold text-gray-13">{subMessage}</Text>
          <Text className="text-xs font-pregular text-gray-7 mt-[10px]">{timestamp}</Text>
        </View>

        <View className="items-center justify-center ml-3">
          <AvatarHelmet width={56} height={56} />
        </View>
      </View>

      <View className="mt-[12px]">
        <StatusBadge label={label} dotColor={color} textColor={textColor} />
      </View>
    </View>
  );
}
