import { useRef, useState } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';

export type NewsSource = 'news' | 'youtube' | 'community';

interface NewsSourceFilterProps {
  value: NewsSource;
  onChange: (value: NewsSource) => void;
}

const SOURCES: { key: NewsSource; label: string }[] = [
  { key: 'news', label: '뉴스' },
  { key: 'youtube', label: '유튜브' },
  { key: 'community', label: '커뮤니티' },
];

const PADDING = 4;

export function NewsSourceFilter({ value, onChange }: NewsSourceFilterProps) {
  const [itemWidth, setItemWidth] = useState(0);
  const activeIndex = SOURCES.findIndex((s) => s.key === value);
  const slideAnim = useRef(new Animated.Value(activeIndex)).current;

  const handlePress = (key: NewsSource, index: number) => {
    if (key === value) return;
    onChange(key);
    Animated.spring(slideAnim, {
      toValue: index,
      useNativeDriver: true,
      speed: 20,
      bounciness: 7,
    }).start();
  };

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, itemWidth, itemWidth * 2],
  });

  return (
    <View
      className="flex-row bg-gray-3 rounded-xl"
      style={{ padding: PADDING }}
      onLayout={(e) => {
        const totalWidth = e.nativeEvent.layout.width - PADDING * 2;
        setItemWidth(totalWidth / SOURCES.length);
      }}
    >
      {/* Sliding indicator */}
      {itemWidth > 0 && (
        <Animated.View
          style={{
            position: 'absolute',
            top: PADDING,
            left: PADDING,
            width: itemWidth,
            bottom: PADDING,
            borderRadius: 8,
            backgroundColor: '#fff',
            transform: [{ translateX }],
            shadowColor: '#000',
            shadowOpacity: 0.08,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 1 },
            elevation: 2,
          }}
        />
      )}

      {SOURCES.map((source, index) => {
        const isActive = value === source.key;
        return (
          <Pressable
            key={source.key}
            onPress={() => handlePress(source.key, index)}
            style={{ flex: 1, alignItems: 'center', paddingVertical: 8 }}
          >
            <Text
              className={`text-[13px] ${isActive ? 'font-psemibold text-gray-13' : 'font-pregular text-gray-7'}`}
            >
              {source.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
