import { useState } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DisasterTabBar, type DisasterTab } from '@components/disaster/DisasterTabBar';
import { NewsSourceFilter, type NewsSource } from '@components/disaster/NewsSourceFilter';
import { NewsCard, type NewsCardData } from '@components/disaster/NewsCard';
import { YoutubeCard, type YoutubeCardData } from '@components/disaster/YoutubeCard';

const MOCK_NEWS: NewsCardData[] = [
  {
    id: '1',
    source: '연합뉴스',
    author: '정종호 기자',
    title: "'양간지풍'에 초대형 산불!.. \"산림 쏘고, 소방 퍼붓고\" (2026.03.17/뉴스...",
    isHot: false,
    body: "취약 지역에는 산불 감시원 1천360명을 배치했고 야간 산불에 대비한 신속 대응반 25개조 143명도 운영 중이다.  정보통신기술(ICT)을 활용한 산불 자동 감시체계도 운영 중이다. 운영 중이다. 운영 중이다. 운영 중이...",
    link: '',
  },
  {
    id: '2',
    source: '연합뉴스',
    author: '정종호 기자',
    title: "'양간지풍'에 초대형 산불!.. \"산림 쏘고, 소방 퍼붓고\" (2026.03.17/뉴스...",
    isHot: true,
    body: '산불에 대비한 신속 대응반 25개조 143명도 운영 중이다. 정보통신기술(ICT)을 활용한 산불 자동 감시체계도 운영 중이다. 운영 중이다. 운영 중이다. 운영 중이다...',
    link: 'https://www.yna.co.kr',
  },
  {
    id: '3',
    source: '연합뉴스',
    author: '정종호 기자',
    title: "'양간지풍'에 초대형 산불!.. \"산림 쏘고, 소방 퍼붓고\" (2026.03.17/뉴스...",
    isHot: false,
    body: '',
    link: '',
  },
  {
    id: '4',
    source: '연합뉴스',
    author: '정종호 기자',
    title: "'양간지풍'에 초대형 산불!.. \"산림 쏘고, 소방 퍼붓고\" (2026.03.17/뉴스...",
    isHot: false,
    body: '',
    link: '',
  },
  {
    id: '5',
    source: '연합뉴스',
    author: '정종호 기자',
    title: "'양간지풍'에 초대형 산불!.. \"산림 쏘고, 소방 퍼붓고\" (2026.03.17/뉴스...",
    isHot: false,
    body: '',
    link: '',
  },
];

const MOCK_YOUTUBE: YoutubeCardData[] = [
  {
    id: 'y1',
    channel: 'YTN',
    title: "'양간지풍'에 초대형 산불!.. \"산림 쏘고, 소방 퍼붓고\" (2026.03.17/뉴스...",
    isLive: true,
    link: 'https://www.youtube.com',
  },
  {
    id: 'y2',
    channel: 'YTN',
    title: "'양간지풍'에 초대형 산불!.. \"산림 쏘고, 소방 퍼붓고\" (2026.03.17/뉴스...",
    isLive: false,
    link: 'https://www.youtube.com',
  },
  {
    id: 'y3',
    channel: 'YTN',
    title: "'양간지풍'에 초대형 산불!.. \"산림 쏘고, 소방 퍼붓고\" (2026.03.17/뉴스...",
    isLive: false,
    link: 'https://www.youtube.com',
  },
];

export default function DisasterScreen() {
  const [activeTab, setActiveTab] = useState<DisasterTab>('realtime');
  const [newsSource, setNewsSource] = useState<NewsSource>('news');

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* Header */}
      <View className="items-center py-4">
        <Text className="text-[17px] font-pbold text-gray-13">재난 정보</Text>
      </View>

      {/* Tab bar */}
      <DisasterTabBar activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'realtime' ? (
        newsSource === 'youtube' ? (
          <FlatList
            data={MOCK_YOUTUBE}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24, gap: 12 }}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <View className="pt-4 pb-2">
                <NewsSourceFilter value={newsSource} onChange={setNewsSource} />
              </View>
            }
            renderItem={({ item }) => <YoutubeCard item={item} />}
          />
        ) : (
          <FlatList
            data={MOCK_NEWS}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24, gap: 12 }}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <View className="pt-4 pb-2">
                <NewsSourceFilter value={newsSource} onChange={setNewsSource} />
              </View>
            }
            renderItem={({ item }) => <NewsCard item={item} />}
          />
        )
      ) : (
        <ScrollView className="flex-1" contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 24 }}>
          <Text className="text-[14px] font-pregular text-gray-8">안전 상식 콘텐츠가 들어올 예정입니다.</Text>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
