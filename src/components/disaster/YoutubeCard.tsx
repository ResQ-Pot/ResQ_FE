import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';

import AvatarHelmetIcon from '@/assets/icons/avatar-helmet.svg';
import ArrowRightIcon from '@/assets/icons/arrow/arrow_right.svg';

const DEFAULT_THUMBNAIL = require('@/assets/images/youtube_thumnail.png');

export interface YoutubeCardData {
  id: string;
  channel: string;
  title: string;
  isLive?: boolean;
  thumbnail?: number;
  link?: string;
}

interface YoutubeCardProps {
  item: YoutubeCardData;
}

export function YoutubeCard({ item }: YoutubeCardProps) {
  const handlePress = () => {
    if (item.link) {
      Linking.openURL(item.link);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handlePress}
      className="bg-white rounded-2xl overflow-hidden"
      style={{ shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 1 }}
    >
      {/* Thumbnail */}
      <Image
        source={item.thumbnail ?? DEFAULT_THUMBNAIL}
        className="w-full"
        style={{ height: 110 }}
        resizeMode="cover"
      />

      {/* Info section */}
      <View className="px-4 pt-3 pb-4 gap-2">
        {/* Channel row */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            {item.isLive && (
              <View className="bg-red-100 rounded-lg px-2 py-[4px]">
                <Text className="text-[12px] font-psemibold text-red-500">실시간</Text>
              </View>
            )}
            <AvatarHelmetIcon width={22} height={22} />
            <Text className="text-[13px] font-pmedium text-gray-9">
              {item.channel}
            </Text>
          </View>

          <TouchableOpacity
              activeOpacity={0.7}
              onPress={handlePress}
              className="flex-row items-center gap-[2px]"
            >
              <Text className="text-[13px] font-psemibold" style={{ color: '#01ADFF' }}>
                원본 영상보기
              </Text>
              <Text className="text-[13px] font-psemibold" style={{ color: '#01ADFF' }}>
                →
              </Text>
            </TouchableOpacity>
        </View>

        {/* Title */}
        <Text className="text-[17px] font-psemibold text-gray-13 leading-[22px]" numberOfLines={2}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
