import { View, Text } from 'react-native';
import { colors } from '@config/tokens';

interface StatusBadgeProps {
  label: string;
  dotColor: string;
  textColor?: string;
}

export function StatusBadge({ label, dotColor, textColor = colors.green[500] }: StatusBadgeProps) {
  return (
    <View className="flex-row items-center gap-2 px-4 py-2 rounded-full border border-gray-5 bg-gray-3 self-start">
      <View className="w-3 h-3 rounded-full" style={{ backgroundColor: dotColor }} />
      <Text className="text-[12px] font-pbold" style={{ color: textColor }}>
        {label}
      </Text>
    </View>
  );
}
