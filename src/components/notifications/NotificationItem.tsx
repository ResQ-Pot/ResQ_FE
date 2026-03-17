import { View, Text } from 'react-native';

import HornIcon from '@/assets/icons/icon_horn.svg';
import WarningIcon from '@/assets/icons/icon_warning.svg';

interface NotificationItemProps {
  type: 'horn' | 'warning';
  datetime: string;
  location: string;
  message: string;
}

export function NotificationItem({ type, datetime, location, message }: NotificationItemProps) {
  return (
    <View className="flex-row gap-4 py-4">
      <View className="pt-[2px]">
        {type === 'horn' ? (
          <HornIcon width={24} height={24} />
        ) : (
          <WarningIcon width={24} height={24} />
        )}
      </View>
      <View className="flex-1 gap-[6px]">
        <Text className="text-[13px] font-pregular text-gray-8">
          {datetime} [{location}]
        </Text>
        <Text className="text-[14px] font-pregular text-gray-13 leading-[22px]">
          {message}
        </Text>
      </View>
    </View>
  );
}
