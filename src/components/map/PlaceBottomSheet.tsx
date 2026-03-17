import { useEffect, useRef } from 'react';
import { View, Text, Animated, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@config/tokens';
import type { Place } from '@t/place';

const CATEGORY_LABEL = {
  hospital: '병원',
  shelter: '대피소',
  pharmacy: '약국',
  fire_station: '소방서',
} as const;

const CATEGORY_COLOR = {
  hospital: '#EF4444',
  shelter: colors.green[500],
  pharmacy: '#8B5CF6',
  fire_station: '#F97316',
} as const;

interface PlaceBottomSheetProps {
  place: Place | null;
  onClose: () => void;
}

export function PlaceBottomSheet({ place, onClose }: PlaceBottomSheetProps) {
  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(200)).current;

  useEffect(() => {
    Animated.spring(translateY, {
      toValue: place ? 0 : 200,
      useNativeDriver: true,
      tension: 80,
      friction: 12,
    }).start();
  }, [place, translateY]);

  if (!place) return null;

  return (
    <>
      <Pressable
        className="absolute inset-0"
        onPress={onClose}
      />
      <Animated.View
        className="absolute left-0 right-0 bg-white rounded-t-3xl px-6 pt-4"
        style={{
          bottom: 0,
          paddingBottom: Math.max(insets.bottom, 16) + 80,
          transform: [{ translateY }],
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 10,
        }}
      >
        {/* 핸들 */}
        <View className="w-10 h-1 bg-gray-5 rounded-full self-center mb-4" />

        {/* 카테고리 배지 */}
        <View
          className="self-start px-3 py-1 rounded-full mb-2"
          style={{ backgroundColor: CATEGORY_COLOR[place.category] + '20' }}
        >
          <Text
            className="text-xs font-pmedium"
            style={{ color: CATEGORY_COLOR[place.category] }}
          >
            {CATEGORY_LABEL[place.category]}
          </Text>
        </View>

        {/* 장소 이름 */}
        <Text className="font-pbold text-lg text-gray-13 mb-1">{place.name}</Text>

        {/* 주소 */}
        <Text className="font-pregular text-sm text-gray-8 mb-3">{place.vicinity}</Text>

        {/* 영업 상태 + 평점 */}
        <View className="flex-row items-center gap-4">
          {place.isOpen !== undefined && (
            <Text
              className="text-sm font-pmedium"
              style={{ color: place.isOpen ? colors.green[500] : '#EF4444' }}
            >
              {place.isOpen ? '영업중' : '영업종료'}
            </Text>
          )}
          {place.rating !== undefined && (
            <Text className="text-sm font-pregular text-gray-8">
              ★ {place.rating.toFixed(1)}
            </Text>
          )}
        </View>
      </Animated.View>
    </>
  );
}
