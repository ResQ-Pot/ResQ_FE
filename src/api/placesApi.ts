import { apiInstance } from '@api/instance';
import type { Place, PlaceCategory } from '@t/place';

export async function fetchNearbyPlaces(
  latitude: number,
  longitude: number,
  category: PlaceCategory,
  radius = 3000,
): Promise<Place[]> {
  const { data } = await apiInstance.get<Place[]>('/places', {
    params: { category, lat: latitude, lng: longitude, radius },
  });
  return data;
}
