import { View, Text, TouchableOpacity } from 'react-native';
import type { SvgProps } from 'react-native-svg';

import LogoText from '@/assets/icons/logo-text.svg';
import LocationIcon from '@/assets/icons/icon-location.svg';
import BellIcon from '@/assets/icons/icon-bell.svg';
import ArchiveIcon from '@/assets/icons/icon-archive.svg';

interface HomeHeaderProps {
  location?: string;
  onBellPress?: () => void;
  onArchivePress?: () => void;
}

export function HomeHeader({
  location = '서울 동작구',
  onBellPress,
  onArchivePress,
}: HomeHeaderProps) {
  return (
    <View className="flex-row items-center justify-between px-6 pt-6 pb-3">
      <View className="flex-row items-center gap-2">
        <LogoText width={120} height={30} />
        <View className="flex-row items-center gap-[1px]">
          <LocationIcon width={14} height={14} />
          <Text className="text-[13px] font-pregular text-gray-7">{location}</Text>
        </View>
      </View>

      <View className="flex-row items-center gap-[19px]">
        <TouchableOpacity activeOpacity={0.7} onPress={onBellPress}>
          <BellIcon width={24} height={24} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={onArchivePress}>
          <ArchiveIcon width={24} height={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
