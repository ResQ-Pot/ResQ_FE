import { View, Text, Image } from 'react-native';
import { colors } from '@config/tokens';

import ThermometerIcon from '@/assets/icons/icon-thermometer.svg';
import HumidityIcon from '@/assets/icons/icon-humidity.svg';

const plantImage = require('@/assets/images/plant-character-surprise.png');

interface PotStatusCardProps {
  connected?: boolean;
  tempC?: number;
  humidity?: number;
  message?: string;
}

export function PotStatusCard({
  connected = true,
  tempC = 14,
  humidity = 60,
  message = '오늘 비가 내리네요!\n우산 챙기세요',
}: PotStatusCardProps) {
  return (
    <View
      className="bg-white rounded-2xl p-6"
      style={{ shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 }}
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-1">
          {/* 상태 헤더 */}
          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-base font-pmedium text-gray-7">화분 상태</Text>
            <View className="flex-row items-center gap-3">
              <View className="flex-row items-center gap-1">
                <ThermometerIcon width={16} height={16} />
                <Text className="text-xs font-pregular text-gray-8">{tempC}°C</Text>
              </View>
              <View className="flex-row items-center gap-1">
                <HumidityIcon width={16} height={16} />
                <Text className="text-xs font-pregular text-gray-8">{humidity}%</Text>
              </View>
            </View>
          </View>

          {/* 연결 상태 */}
          <View className="flex-row items-center gap-2 mb-4">
            <Text className="text-xl font-pbold text-gray-13">연결됨</Text>
            <View
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: connected ? colors.green[500] : colors.status.danger }}
            />
          </View>

          {/* 메시지 */}
          <Text className="text-base font-pbold text-gray-13">{message}</Text>
        </View>

        {/* 화분 캐릭터 */}
        <Image
          source={plantImage}
          style={{ width: 110, height: 110 }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}
