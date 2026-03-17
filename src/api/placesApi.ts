import axios from 'axios';
import { GOOGLE_PLACES_API_KEY } from '@config/env';
import type { GooglePlace, Place, PlaceCategory, PlacesNearbyResponse } from '@t/place';

const PLACES_BASE_URL = 'https://maps.googleapis.com/maps/api/place';

// Google Places 타입 → 앱 카테고리 매핑
const TYPE_TO_CATEGORY: Record<string, PlaceCategory> = {
  hospital: 'hospital',
  pharmacy: 'pharmacy',
  fire_station: 'fire_station',
};

function toPlace(raw: GooglePlace, category: PlaceCategory): Place {
  return {
    id: raw.place_id,
    name: raw.name,
    category,
    vicinity: raw.vicinity,
    latitude: raw.geometry.location.lat,
    longitude: raw.geometry.location.lng,
    isOpen: raw.opening_hours?.open_now,
    rating: raw.rating,
  };
}

function inferCategory(types: string[]): PlaceCategory {
  for (const t of types) {
    if (t in TYPE_TO_CATEGORY) return TYPE_TO_CATEGORY[t];
  }
  return 'shelter';
}

// 카테고리별 Google Places 타입 키워드
const CATEGORY_TYPES: Record<PlaceCategory, string> = {
  hospital: 'hospital',
  pharmacy: 'pharmacy',
  fire_station: 'fire_station',
  shelter: 'local_government_office', // 대피소는 키워드 검색 필요
};

export async function fetchNearbyPlaces(
  latitude: number,
  longitude: number,
  category: PlaceCategory,
  radius = 3000,
): Promise<Place[]> {
  const { data } = await axios.get<PlacesNearbyResponse>(
    `${PLACES_BASE_URL}/nearbysearch/json`,
    {
      params: {
        location: `${latitude},${longitude}`,
        radius,
        type: CATEGORY_TYPES[category],
        key: GOOGLE_PLACES_API_KEY,
        language: 'ko',
      },
    },
  );
  return data.results.map((r) => toPlace(r, category));
}

export async function searchPlaces(
  query: string,
  latitude: number,
  longitude: number,
): Promise<Place[]> {
  const { data } = await axios.get<PlacesNearbyResponse>(
    `${PLACES_BASE_URL}/textsearch/json`,
    {
      params: {
        query,
        location: `${latitude},${longitude}`,
        radius: 5000,
        key: GOOGLE_PLACES_API_KEY,
        language: 'ko',
      },
    },
  );
  return data.results.map((r) => toPlace(r, inferCategory(r.types)));
}
