import { useState } from 'react';
import { View, Text, TouchableOpacity, Linking, LayoutAnimation } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import AvatarHelmetIcon from '@/assets/icons/avatar-helmet.svg';

function ChevronDown() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d="M11.2576 16.2425C11.6676 16.6526 12.3325 16.6526 12.7425 16.2425L18.7425 10.2425C19.1526 9.83246 19.1526 9.16764 18.7425 8.75759C18.3325 8.34754 17.6676 8.34754 17.2576 8.75759L12 14.0151L6.74251 8.75759C6.33246 8.34754 5.66764 8.34754 5.25759 8.75759C4.84754 9.16764 4.84754 9.83246 5.25759 10.2425L11.2576 16.2425Z"
        fill="#181E25"
      />
    </Svg>
  );
}

function ChevronUp() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12.7424 7.75761C12.3324 7.34756 11.6675 7.34756 11.2575 7.75761L5.25749 13.7576C4.84744 14.1677 4.84744 14.8325 5.25749 15.2425C5.66754 15.6526 6.33236 15.6526 6.74241 15.2425L12 9.985L17.2575 15.2425C17.6675 15.6526 18.3324 15.6526 18.7424 15.2425C19.1525 14.8325 19.1525 14.1677 18.7424 13.7576L12.7424 7.75761Z"
        fill="#181E25"
      />
    </Svg>
  );
}

export interface NewsCardData {
  id: string;
  source: string;
  author: string;
  title: string;
  isHot?: boolean;
  body?: string;
  link?: string;
}

interface NewsCardProps {
  item: NewsCardData;
}

export function NewsCard({ item }: NewsCardProps) {
  const [expanded, setExpanded] = useState(false);

  const toggle = () => {
    LayoutAnimation.configureNext({
      duration: 600,
      update: { type: LayoutAnimation.Types.easeInEaseOut },
      create: { type: LayoutAnimation.Types.easeInEaseOut, property: LayoutAnimation.Properties.opacity },
      delete: { type: LayoutAnimation.Types.easeInEaseOut, property: LayoutAnimation.Properties.opacity },
    });
    setExpanded((prev) => !prev);
  };

  const handleLinkPress = () => {
    if (item.link) {
      Linking.openURL(item.link);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={toggle}
      className="bg-white rounded-2xl px-5 py-4"
      style={{ shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 1 }}
    >
      {/* Top row: avatar, source/author, HOT badge, chevron */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2 flex-1">
          <AvatarHelmetIcon width={23} height={23} />
          <Text className="text-[13px] font-pmedium text-gray-8" numberOfLines={1}>
            {item.source} - {item.author}
          </Text>
          {item.isHot && (
            <View className="bg-red-100 rounded-lg px-2 py-[2px]">
              <Text className="text-[11px] font-psemibold text-red-500">HOT</Text>
            </View>
          )}
        </View>
        <View className="ml-2">
          {expanded ? <ChevronUp /> : <ChevronDown />}
        </View>
      </View>

      {/* Title */}
      <Text className="text-[17px] font-psemibold text-gray-13 leading-[22px] mt-2" numberOfLines={expanded ? undefined : 2}>
        {item.title}
      </Text>

      {/* Expanded body */}
      {expanded && item.body && (
        <View className="mt-3">
          <Text className="text-[13px] font-pregular text-gray-8 leading-[21px]">
            {item.body}
          </Text>
          {item.link && (
            <TouchableOpacity activeOpacity={0.7} onPress={handleLinkPress} className="mt-2 self-end flex-row items-center gap-1">
              <Text className="text-[13px] font-psemibold" style={{ color: '#01ADFF' }}>원문 보기</Text>
              <Text className="text-[13px] font-psemibold" style={{ color: '#01ADFF' }}>→</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}
