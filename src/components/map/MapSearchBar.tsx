import { useRef } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { colors } from '@config/tokens';

import SearchIcon from '@/assets/icons/search.svg';


interface MapSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onFilterPress?: () => void;
}

export function MapSearchBar({ value, onChangeText, onFilterPress }: MapSearchBarProps) {
  const inputRef = useRef<TextInput>(null);

  return (
    <View className="flex-row items-center bg-white rounded-full px-4 py-2 gap-3 shadow-md">
      <SearchIcon width={21} height={21} color={colors.gray[7]} />
      <TextInput
        ref={inputRef}
        className="flex-1 font-pregular text-[15px] leading-6 text-gray-13"
        placeholder="병원, 대피소 검색..."
        placeholderTextColor={colors.gray[7]}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
      />
    </View>
  );
}
