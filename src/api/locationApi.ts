import { useQuery } from '@tanstack/react-query';
import { apiInstance } from '@api/instance';
import type { Coordinates } from '@t/location';

export const useLocationQuery = () =>
  useQuery<Coordinates>({
    queryKey: ['location'],
    queryFn: () => apiInstance.get('/location').then((r) => r.data),
  });
