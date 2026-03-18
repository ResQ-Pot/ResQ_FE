import type { Place, PlaceCategory } from '@t/place';
import { MOCK_PLACES } from './__mocks__/placesData';

// TODO: 백엔드 연동 시 아래 mock 로직을 제거하고 주석 해제
// import { apiInstance } from '@api/instance';
// export async function fetchNearbyPlaces(...) {
//   const { data } = await apiInstance.get<Place[]>('/places', {
//     params: { category, lat: latitude, lng: longitude, radius },
//   });
//   return data;
// }

export async function fetchNearbyPlaces(
  _latitude: number,
  _longitude: number,
  category: PlaceCategory,
  _radius = 3000,
): Promise<Place[]> {
  return MOCK_PLACES.filter((p) => p.category === category);
}
