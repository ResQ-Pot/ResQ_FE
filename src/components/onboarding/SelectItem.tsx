import { TouchableOpacity, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { colors } from '@config/tokens';

interface SelectItemProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export function SelectItem({ label, selected, onPress }: SelectItemProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className={`flex-row items-center justify-between px-6 py-[5px] rounded-2xl border bg-white ${selected ? 'border-green-500' : 'border-gray-5'}`}
    >
      <Text className="text-[15px] font-pmedium text-gray-13">{label}</Text>
      <RadioButton
        value={label}
        status={selected ? 'checked' : 'unchecked'}
        onPress={onPress}
        color={colors.green[500]}
        uncheckedColor={colors.gray[7]}
      />
    </TouchableOpacity>
  );
}
