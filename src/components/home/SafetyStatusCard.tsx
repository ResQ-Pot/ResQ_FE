import { View, Text } from 'react-native';

import { colors } from '@config/tokens';
import AvatarHelmet from '@/assets/icons/avatar-helmet.svg';

type SafetyStatus = 'safe' | 'warning' | 'danger';

interface SafetyStatusCardProps {
  userName?: string;
  message?: string;
  subMessage?: string;
  timestamp?: string;
  status?: SafetyStatus;
}

const STATUS_CONFIG: Record<SafetyStatus, { label: string; color: string }> = {
  safe: { label: '안전', color: colors.status.safe },
  warning: { label: '주의', color: colors.status.warning },
  danger: { label: '위험', color: colors.status.danger },
};

export function SafetyStatusCard({
  userName = '은혜',
  message = '외출하기 좋은 맑은 날씨예요.',
  subMessage = '가벼운 산책을 추천합니다.',
  timestamp = '2026년 1월 12일 12:59:02',
  status = 'safe',
}: SafetyStatusCardProps) {
  const { label, color } = STATUS_CONFIG[status];

  return (
    <View className="mx-4 bg-white rounded-2xl p-[25px]" style={{ shadowColor: colors.gray[13], shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 }}>
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

      <View className="mt-3 self-start flex-row items-center gap-2 px-4 py-2 rounded-full border-gray-5 mt-[10px]">
        <View className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
        <Text className="text-sm font-pmedium text-gray-13">{label}</Text>
      </View>
    </View>
  );
}
