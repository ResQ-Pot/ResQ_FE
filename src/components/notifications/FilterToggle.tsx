import { useRef } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';

import { colors } from '@config/tokens';

export type FilterValue = 'first' | 'second';

interface FilterToggleProps {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
  firstLabel: string;
  secondLabel: string;
  activeIndicatorColor?: string;
  activeTextColor?: string;
  inactiveTextColor?: string;
  trackColor?: string;
}

const ITEM_WIDTH = 52;
const ITEM_HEIGHT = 28;
const PADDING = 2;

export function FilterToggle({
  value,
  onChange,
  firstLabel,
  secondLabel,
  activeIndicatorColor = colors.gray[1],
  activeTextColor = colors.gray[13],
  inactiveTextColor = colors.gray[13],
  trackColor = colors.gray[5],
}: FilterToggleProps) {
  const slideAnim = useRef(new Animated.Value(value === 'first' ? 0 : 1)).current;

  const handlePress = (selected: FilterValue) => {
    if (selected === value) return;
    onChange(selected);
    Animated.spring(slideAnim, {
      toValue: selected === 'first' ? 0 : 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 7,
    }).start();
  };

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, ITEM_WIDTH],
  });

  return (
    <View
      style={{
        flexDirection: 'row',
        borderRadius: 999,
        backgroundColor: trackColor,
        padding: PADDING,
        alignItems: 'center',
      }}
    >
      <Animated.View
        style={{
          position: 'absolute',
          width: ITEM_WIDTH,
          height: ITEM_HEIGHT,
          borderRadius: 999,
          backgroundColor: activeIndicatorColor,
          top: PADDING,
          left: PADDING,
          transform: [{ translateX }],
        }}
      />
      <Pressable
        onPress={() => handlePress('first')}
        style={{ width: ITEM_WIDTH, height: ITEM_HEIGHT, justifyContent: 'center', alignItems: 'center' }}
      >
        <Text
          className="text-[13px] font-pmedium"
          style={{ color: value === 'first' ? activeTextColor : inactiveTextColor }}
        >
          {firstLabel}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => handlePress('second')}
        style={{ width: ITEM_WIDTH, height: ITEM_HEIGHT, justifyContent: 'center', alignItems: 'center' }}
      >
        <Text
          className="text-[13px] font-pmedium"
          style={{ color: value === 'second' ? activeTextColor : inactiveTextColor }}
        >
          {secondLabel}
        </Text>
      </Pressable>
    </View>
  );
}
