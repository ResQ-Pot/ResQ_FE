import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DisasterScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-3" edges={['top']}>
      <View className="flex-1 px-4 pt-6">
        <Text className="font-pbold text-2xl text-black">재난 정보</Text>
      </View>
    </SafeAreaView>
  );
}
