import { View, Text } from 'react-native';

import UmbrellaIcon from '@/assets/icons/icon-umbrella.svg';
import WindIcon from '@/assets/icons/icon-wind.svg';

interface WeatherCardProps {
  tempC?: number;
  rainPercent?: number;
  windSpeed?: number;
}

export function WeatherCard({
  tempC = 14,
  rainPercent = 0,
  windSpeed = 5,
}: WeatherCardProps) {
  return (
    <View
      className="flex-1 bg-white rounded-2xl p-[25px]"
      style={{ shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 }}
    >
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-base font-pmedium text-gray-7">날씨</Text>
        <Text className="text-2xl font-pbold text-gray-13">{tempC}°C</Text>
      </View>

      <View className="flex-row justify-around">

        <View className="items-center">
          <View className="w-12 h-12 rounded-full bg-['#d8f3dc'] items-center justify-center mb-2">
            <UmbrellaIcon width={24} height={24} />
          </View>
          <Text className="text-xs font-pregular text-gray-8">강수확률</Text>
          <Text className="text-xs font-pbold text-gray-8">{rainPercent}%</Text>
        </View>

        <View className="items-center">
          <View className="w-12 h-12 rounded-full bg-['#d8f3dc'] items-center justify-center mb-2">
            <WindIcon width={24} height={24} />
          </View>
          <Text className="text-xs font-pregular text-gray-8">바람</Text>
          <Text className="text-xs font-pbold text-gray-8">{windSpeed}m/s</Text>
        </View>

      </View>
    </View>
  );
}
