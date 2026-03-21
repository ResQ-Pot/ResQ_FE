import { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@config/tokens';
import type { Place } from '@t/place';

const CATEGORY_LABEL: Record<string, string> = {
  hospital: '병원',
  shelter: '대피소',
  pharmacy: '약국',
  fire_station: '소방서',
  aed: 'AED',
  police: '경찰서',
  water: '급수',
  convenience: '편의점',
};

const CATEGORY_COLOR: Record<string, string> = {
  hospital: '#F28B82',
  shelter: '#81C995',
  pharmacy: '#F06292',
  fire_station: '#E67E22',
  aed: '#F24822',
  police: '#7BAAF7',
  water: '#4FC3F7',
  convenience: '#B39DDB',
};

interface PlaceBottomSheetProps {
  place: Place | null;
  onClose: () => void;
}

export function PlaceBottomSheet({ place, onClose }: PlaceBottomSheetProps) {
  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(200)).current;
  const [localPlace, setLocalPlace] = useState<Place | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (place) {
      setLocalPlace(place);
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 20,
        friction: 20,
      }).start();
    } else {
      Animated.spring(translateY, {
        toValue: 200,
        useNativeDriver: true,
        tension: 20,
        friction: 20,
      }).start(({ finished }) => {
        if (finished && isMounted.current && !place) {
          setLocalPlace(null);
        }
      });
    }
  }, [place, translateY]);

  if (!localPlace) return null;

  const color = CATEGORY_COLOR[localPlace.category];

  return (
    <>
      <Pressable className="absolute inset-0" onPress={onClose} />
      <Animated.View
        className="absolute left-0 right-0 bg-white rounded-t-3xl px-6 pt-4"
        style={{
          bottom: 0,
          paddingBottom: Math.max(insets.bottom, 16) + 30,
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
          style={{ backgroundColor: color + '20' }}
        >
          <Text className="text-xm font-pmedium" style={{ color }}>
            {CATEGORY_LABEL[localPlace.category]}
          </Text>
        </View>

        {/* 장소 이름 */}
        <Text className="font-pbold text-[18px] text-gray-13 mb-1">{localPlace.name}</Text>

        {/* 주소 */}
        <Text className="font-pregular text-[15px] text-gray-8 mb-3">{localPlace.vicinity}</Text>

        {/* 영업 상태 + 평점 */}
        <View className="flex-row items-center gap-4">
          {localPlace.isOpen !== undefined && (
            <Text
              className="text-sm font-pmedium"
              style={{ color: localPlace.isOpen ? colors.green[500] : '#EF4444' }}
            >
              {localPlace.isOpen ? '영업중' : '영업종료'}
            </Text>
          )}
          {localPlace.rating !== undefined && (
            <Text className="text-sm font-pregular text-gray-8">
              ★ {localPlace.rating.toFixed(1)}
            </Text>
          )}
        </View>
      </Animated.View>
    </>
  );
}
