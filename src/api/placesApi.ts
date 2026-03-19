import { apiInstance } from '@api/instance';
import type { FacilitiesResponse, FacilityType, Place, PlaceCategory } from '@t/place';

const TYPE_TO_CATEGORY: Record<FacilityType, PlaceCategory> = {
  HOSPITAL: 'hospital',
  SHELTER: 'shelter',
  PHARMACY: 'pharmacy',
  FIRE_STATION: 'fire_station',
  AED: 'aed',
  POLICE: 'police',
  WATER: 'water',
  CONVENIENCE: 'convenience',
};

function mapToPlace(item: import('@t/place').FacilityItem): Place {
  return {
    id: item.id,
    name: item.name,
    category: TYPE_TO_CATEGORY[item.type],
    vicinity: item.address,
    latitude: item.lat,
    longitude: item.lng,
    distanceMeters: item.distanceMeters,
    extraInfo: item.extraInfo ?? undefined,
  };
}

export async function fetchAllFacilities(
  latitude: number,
  longitude: number,
  radius: number,
): Promise<Place[]> {
  const { data } = await apiInstance.get<FacilitiesResponse>('/api/v1/facilities', {
    params: {
      lat: latitude,
      lng: longitude,
      radius,
    },
  });

  return data.facilities.map(mapToPlace);
}
