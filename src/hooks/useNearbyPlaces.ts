import { useQuery } from '@tanstack/react-query';
import { fetchNearbyPlaces, searchPlaces } from '@api/placesApi';
import type { Place, PlaceCategory } from '@types/place';
import type { Coordinates } from '@types/location';

const ALL_CATEGORIES: PlaceCategory[] = ['hospital', 'shelter', 'pharmacy', 'fire_station'];

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

export function usePlaceSearch(query: string, coords: Coordinates | null) {
  return useQuery<Place[]>({
    queryKey: ['placeSearch', query, coords?.latitude, coords?.longitude],
    queryFn: () => {
      if (!coords || !query.trim()) return [];
      return searchPlaces(query, coords.latitude, coords.longitude);
    },
    enabled: !!coords && query.trim().length > 1,
    staleTime: 1000 * 60 * 2,
  });
}
