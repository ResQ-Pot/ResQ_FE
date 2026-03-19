import { useQuery } from '@tanstack/react-query';

import { apiInstance } from '@api/instance';
import type { NotificationsResponse } from '@t/notification';

async function fetchNotifications(region?: string): Promise<NotificationsResponse> {
  const { data } = await apiInstance.get<NotificationsResponse>('/api/v1/notifications', {
    params: region ? { region } : undefined,
  });
  return data;
}

export function useNotifications(region?: string) {
  return useQuery({
    queryKey: ['notifications', region ?? 'all'],
    queryFn: () => fetchNotifications(region),
  });
}
