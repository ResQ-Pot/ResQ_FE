import { useQuery } from '@tanstack/react-query';

import { apiInstance } from '@api/instance';
import type { HomeDashboardResponse } from '@t/home';

// TODO: userId를 authStore에서 가져오도록 교체
const DEFAULT_USER_ID = 1;

async function fetchHomeDashboard(userId: number): Promise<HomeDashboardResponse> {
  const { data } = await apiInstance.get<HomeDashboardResponse>('/api/v1/home/dashboard', {
    headers: { 'X-User-Id': userId },
  });
  return data;
}

export function useHomeDashboard(userId: number = DEFAULT_USER_ID) {
  return useQuery({
    queryKey: ['home', 'dashboard', userId],
    queryFn: () => fetchHomeDashboard(userId),
  });
}
