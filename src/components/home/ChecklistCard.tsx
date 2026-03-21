import { View, Text, Image, TouchableOpacity } from 'react-native';
import { colors } from '@config/tokens';

const checklistImage = require('@/assets/images/checklist-board.png');

interface ChecklistCardProps {
  onPress?: () => void;
}

export function ChecklistCard({ onPress }: ChecklistCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className="flex-1 rounded-2xl pt-6 pl-6 overflow-hidden"
      style={{ backgroundColor: colors.green[500] }}
    >
      <Text className="text-base font-pbold text-white">재난 체크리스트</Text>
      <Text className="text-sm font-pregular text-white mt-1">더보기{'>'}</Text>

      <View className="items-end mt-2">
        <Image
          source={checklistImage}
          style={{ width: 120, height: 85 }}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
}
