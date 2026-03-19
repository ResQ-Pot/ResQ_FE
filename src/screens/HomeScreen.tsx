import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { HomeHeader } from '@components/home/HomeHeader';
import { SafetyStatusCard } from '@components/home/SafetyStatusCard';
import { DisasterBanner } from '@components/home/DisasterBanner';
import { WeatherCard } from '@components/home/WeatherCard';
import { ChecklistCard } from '@components/home/ChecklistCard';
import { PotStatusCard } from '@components/home/PotStatusCard';
import { useHomeDashboard } from '@api/homeApi';

function getStatusFromScore(score: number): 'safe' | 'warning' | 'danger' {
  if (score <= 40) return 'safe';
  if (score <= 70) return 'warning';
  return 'danger';
}

export default function HomeScreen() {
  const router = useRouter();
  const { data } = useHomeDashboard();

  const riskScore = data?.disaster_situation.risk_score ?? 0;
  const status = getStatusFromScore(riskScore);

  return (
    <SafeAreaView className="flex-1 bg-gray-3" edges={['top']}>
      <HomeHeader
        location="서울 동작구 상도동"
        onBellPress={() => router.push('/notification')}
        onArchivePress={() => router.push('/disaster-sms')}
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ gap: 19, paddingHorizontal: 20, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <SafetyStatusCard
          userName={data?.user_name}
          message={data?.action_guide.title}
          subMessage={data?.action_guide.recommended_action}
          status={status}
        />

        <DisasterBanner
          status={status}
          disasterText={data?.disaster_situation.status_name ?? '현재 재난 상황 없음'}
        />

        <View className="flex-row items-between gap-[19px]">
          <WeatherCard
            tempC={data?.current_weather.temperature}
            rainPercent={data?.current_weather.precipitation_probability}
            windSpeed={data?.current_weather.wind_speed}
          />
          <ChecklistCard />
        </View>

        <PotStatusCard
          connected={data?.plant_status.is_connected}
          expression={data?.plant_status.expression}
          message={data?.plant_status.persona_message}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
