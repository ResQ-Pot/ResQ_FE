import { useState } from 'react';
import { Text, ScrollView, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@components/ScreenHeader';
import { FilterToggle, FilterValue } from '@components/notifications/FilterToggle';
import { NotificationItem } from '@components/notifications/NotificationItem';
import { useNotifications } from '@api/notificationsApi';
import type { NotificationItem as NotificationData } from '@t/notification';

const NEARBY_REGION = '서울특별시';

function formatDatetime(isoString: string): string {
  const d = new Date(isoString);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  const ss = String(d.getSeconds()).padStart(2, '0');
  return `${yyyy}/${mm}/${dd} ${hh}:${min}:${ss}`;
}

function isToday(isoString: string): boolean {
  const today = new Date();
  const date = new Date(isoString);
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

function NotificationList({ items }: { items: NotificationData[] }) {
  return (
    <>
      {items.map((item) => (
        <NotificationItem
          key={item.notificationId}
          type="warning"
          datetime={formatDatetime(item.issuedAt)}
          location={item.targetRegions.trim()}
          message={item.message}
        />
      ))}
    </>
  );
}

export default function DisasterSmsScreen() {
  const [filter, setFilter] = useState<FilterValue>('first');

  const nearbyQuery = useNotifications(NEARBY_REGION);
  const nationalQuery = useNotifications();

  const isNearby = filter === 'first';
  const { data, isLoading } = isNearby ? nearbyQuery : nationalQuery;

  const notifications = data?.data.notifications ?? [];
  const todayItems = notifications.filter((n) => isToday(n.issuedAt));
  const previousItems = notifications.filter((n) => !isToday(n.issuedAt));

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <ScreenHeader title="재난 문자" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center justify-between mt-4 mb-2">
          <Text className="text-[16px] font-pbold text-gray-13">오늘</Text>
          <FilterToggle
            value={filter}
            onChange={setFilter}
            firstLabel="주변"
            secondLabel="전국"
          />
        </View>

        {isLoading ? (
          <ActivityIndicator className="mt-8" />
        ) : (
          <>
            {todayItems.length > 0 ? (
              <NotificationList items={todayItems} />
            ) : (
              <Text className="text-[14px] font-pregular text-gray-7 py-4">오늘 재난 문자가 없습니다.</Text>
            )}

            {previousItems.length > 0 && (
              <>
                <Text className="text-[16px] font-pbold text-gray-13 mt-4 mb-2">이전 알림</Text>
                <NotificationList items={previousItems} />
              </>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
