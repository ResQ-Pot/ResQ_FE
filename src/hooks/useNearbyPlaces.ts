import { useQuery } from '@tanstack/react-query';
import { fetchAllFacilities } from '@api/placesApi';
import type { Place } from '@t/place';
import type { Coordinates } from '@t/location';

// latitudeDelta → 반경(m) 변환: 1도 ≈ 111,000m, 화면 절반을 반경으로 사용
export function latitudeDeltaToRadius(latitudeDelta: number): number {
  return Math.round((latitudeDelta / 2) * 111000);
}

export function useAllFacilities(center: Coordinates | null, radius: number) {
  // 부동소수점 캐시 버킷: 소수점 3자리 반올림 (~111m 단위)
  const lat = center ? Math.round(center.latitude * 1000) / 1000 : null;
  const lng = center ? Math.round(center.longitude * 1000) / 1000 : null;

  return useQuery<Place[]>({
    queryKey: ['facilities', lat, lng, radius],
    queryFn: async () => {
      if (!center) return [];
      return fetchAllFacilities(center.latitude, center.longitude, radius);
    },
    enabled: !!center && radius > 0,
    staleTime: 1000 * 60 * 5,
  });
}
