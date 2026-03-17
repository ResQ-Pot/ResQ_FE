import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { requestLocationPermission, watchPosition } from '@utils/location';
import type { Coordinates } from '@t/location';

interface UseLocationResult {
  coords: Coordinates | null;
  hasPermission: boolean | null;
  isLoading: boolean;
  error: string | null;
}

export function useLocation(): UseLocationResult {
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    (async () => {
      try {
        const granted = await requestLocationPermission();
        setHasPermission(granted);

        if (!granted) {
          setError('위치 권한이 필요합니다.');
          return;
        }

        subscription = await watchPosition((newCoords) => {
          setCoords(newCoords);
          setIsLoading(false);
        });
      } catch (e) {
        setError('위치를 가져오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    })();

    return () => {
      subscription?.remove();
    };
  }, []);

  return { coords, hasPermission, isLoading, error };
}
