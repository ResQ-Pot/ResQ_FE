import { useQuery } from '@tanstack/react-query';
import { fetchNearbyPlaces } from '@api/placesApi';
import type { Place, PlaceCategory } from '@t/place';
import type { Coordinates } from '@t/location';

const ALL_CATEGORIES: PlaceCategory[] = [
  'hospital',
  'shelter',
  'pharmacy',
  'fire_station',
  'aed',
  'police',
  'water',
  'convenience',
];

export function useNearbyPlaces(coords: Coordinates | null, category: PlaceCategory | 'all') {
  return useQuery<Place[]>({
    queryKey: ['nearbyPlaces', coords?.latitude, coords?.longitude, category],
    queryFn: async () => {
      if (!coords) return [];
      const { latitude, longitude } = coords;

      if (category === 'all') {
        const results = await Promise.all(
          ALL_CATEGORIES.map((c) => fetchNearbyPlaces(latitude, longitude, c)),
        );
        return results.flat();
      }
      return fetchNearbyPlaces(latitude, longitude, category);
    },
    enabled: !!coords,
    staleTime: 1000 * 60 * 5,
  });
}
