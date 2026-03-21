import { View, Text, TouchableOpacity } from 'react-native';

interface BottomButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

export function BottomButton({ label, onPress, disabled = false }: BottomButtonProps) {
  return (
    <View className="px-6 pb-8">
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={disabled}
        className={`rounded-2xl py-[18px] items-center ${disabled ? 'bg-green-200' : 'bg-green-500'}`}
        onPress={onPress}
      >
        <Text className="text-[16px] font-psemibold text-white">{label}</Text>
      </TouchableOpacity>
    </View>
  );
}
