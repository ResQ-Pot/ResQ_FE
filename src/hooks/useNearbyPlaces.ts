import { useQuery } from '@tanstack/react-query';
import { fetchNearbyPlaces } from '@api/placesApi';
import type { Place, PlaceCategory } from '@t/place';
import type { Coordinates } from '@t/location';

export function useNearbyPlaces(coords: Coordinates | null, category: PlaceCategory | null) {
  return useQuery<Place[]>({
    queryKey: ['nearbyPlaces', coords?.latitude, coords?.longitude, category],
    queryFn: async () => {
      if (!coords || !category) return [];
      return fetchNearbyPlaces(coords.latitude, coords.longitude, category);
    },
    enabled: !!coords && !!category,
    staleTime: 1000 * 60 * 5,
  });
}
