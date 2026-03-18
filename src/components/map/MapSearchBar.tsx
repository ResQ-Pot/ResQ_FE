import { View, TextInput } from 'react-native';
import { colors } from '@config/tokens';

import SearchIcon from '@/assets/icons/search.svg';

export function MapSearchBar() {
  return (
    <View className="flex-row items-center bg-white rounded-full px-4 py-2 gap-3 shadow-md">
      <SearchIcon width={21} height={21} color={colors.gray[7]} />
      <TextInput
        className="flex-1 font-pregular text-[15px] leading-6 text-gray-13"
        placeholder="병원, 대피소 검색..."
        placeholderTextColor={colors.gray[7]}
        editable={false}
      />
    </View>
  );
}
