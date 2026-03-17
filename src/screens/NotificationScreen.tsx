import { Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@components/ScreenHeader';
import { NotificationItem } from '@components/notifications/NotificationItem';

const TODAY_NOTIFICATIONS = [
  {
    id: '1',
    datetime: '2026/03/15 14:03:26',
    location: '전라남도 무안군',
    message:
      '[관내 아프리카돼지열병(ASF) 확산 방지를 위해 ▲축산농가 방문 자제 ▲출입통제 강화 ▲소독 철저 등 방역수칙을 준수해 주시기 바랍니다.',
  },
  {
    id: '2',
    datetime: '2026/03/15 14:03:26',
    location: '전라남도 무안군',
    message:
      '[관내 아프리카돼지열병(ASF) 확산 방지를 위해 ▲축산농가 방문 자제 ▲출입통제 강화 ▲소독 철저 등 방역수칙을 준수해 주시기 바랍니다.',
  },
];

const PREVIOUS_NOTIFICATIONS = [
  {
    id: '3',
    datetime: '2026/03/15 14:03:26',
    location: '전라남도 무안군',
    message:
      '[관내 아프리카돼지열병(ASF) 확산 방지를 위해 ▲축산농가 방문 자제 ▲출입통제 강화 ▲소독 철저 등 방역수칙을 준수해 주시기 바랍니다.',
  },
  {
    id: '4',
    datetime: '2026/03/15 14:03:26',
    location: '전라남도 무안군',
    message:
      '[관내 아프리카돼지열병(ASF) 확산 방지를 위해 ▲축산농가 방문 자제 ▲출입통제 강화 ▲소독 철저 등 방역수칙을 준수해 주시기 바랍니다.',
  },
  {
    id: '5',
    datetime: '2026/03/15 14:03:26',
    location: '전라남도 무안군',
    message:
      '[관내 아프리카돼지열병(ASF) 확산 방지를 위해 ▲축산농가 방문 자제 ▲출입통제 강화 ▲소독 철저 등 방역수칙을 준수해 주시기 바랍니다.',
  },
  {
    id: '6',
    datetime: '2026/03/15 14:03:26',
    location: '전라남도 무안군',
    message:
      '[관내 아프리카돼지열병(ASF) 확산 방지를 위해 ▲축산농가 방문 자제 ▲출입통제 강화 ▲소독 철저 등 방역수칙을 준수해 주시기 바랍니다.',
  },
];

export default function NotificationScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <ScreenHeader title="알림" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 오늘 */}
        <Text className="text-[16px] font-pbold text-gray-13 mt-4 mb-1">오늘</Text>
        {TODAY_NOTIFICATIONS.map((item) => (
          <NotificationItem
            key={item.id}
            type="horn"
            datetime={item.datetime}
            location={item.location}
            message={item.message}
          />
        ))}

        {/* 이전 알림 */}
        <Text className="text-[16px] font-pbold text-gray-13 mt-4 mb-1">이전 알림</Text>
        {PREVIOUS_NOTIFICATIONS.map((item) => (
          <NotificationItem
            key={item.id}
            type="horn"
            datetime={item.datetime}
            location={item.location}
            message={item.message}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
