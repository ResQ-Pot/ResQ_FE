import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { HomeHeader } from '@components/home/HomeHeader';
import { SafetyStatusCard } from '@components/home/SafetyStatusCard';
import { DisasterBanner } from '@components/home/DisasterBanner';
import { WeatherCard } from '@components/home/WeatherCard';
import { ChecklistCard } from '@components/home/ChecklistCard';
import { PotStatusCard } from '@components/home/PotStatusCard';
import { View } from 'react-native';

function getStatusFromScore(score: number): 'safe' | 'warning' | 'danger' {
  if (score <= 40) return 'safe';
  if (score <= 70) return 'warning';
  return 'danger';
}

export default function HomeScreen() {
  const router = useRouter();
  const riskScore = 30; // TODO: 실제 데이터로 교체
  const status = getStatusFromScore(riskScore);
  
  return (
    <SafeAreaView className="flex-1 bg-gray-3" edges={['top']}>
      <HomeHeader
        location="서울 동작구"
        onBellPress={() => router.push('/notification')}
        onArchivePress={() => router.push('/disaster-sms')}
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ gap: 19, paddingHorizontal: 20, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <SafetyStatusCard
          userName="은혜"
          message="외출하기 좋은 맑은 날씨예요."
          subMessage="가벼운 산책을 추천합니다."
          timestamp="2026년 1월 12일 12:59:02"
          status={status}
        />

        <DisasterBanner status={status} disasterText="현재 재난 상황 없음" />

        <View className="flex-row items-between gap-[19px]">
          <WeatherCard tempC={14} rainPercent={0} windSpeed={5} />
          <ChecklistCard />
        </View>

        <PotStatusCard
          connected={true}
          tempC={14}
          humidity={60}
          message={'오늘 비가 내리네요!\n우산 챙기세요'}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
