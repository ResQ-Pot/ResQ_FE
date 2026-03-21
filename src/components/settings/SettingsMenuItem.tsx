import { TouchableOpacity, Text } from 'react-native';

import ArrowRight from '@/assets/icons/arrow/arrow_right.svg';

interface SettingsMenuItemProps {
  label: string;
  onPress?: () => void;
}

export function SettingsMenuItem({ label, onPress }: SettingsMenuItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row items-center justify-between"
    >
      <Text className="font-psemibold text-[15px] text-gray-13">{label}</Text>
      <ArrowRight width={24} height={24} />
    </TouchableOpacity>
  );
}
