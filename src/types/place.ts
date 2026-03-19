export type PlaceCategory =
  | 'hospital'
  | 'shelter'
  | 'pharmacy'
  | 'fire_station'
  | 'aed'
  | 'police'
  | 'water'
  | 'convenience';

// 서버 API type 필드 (대문자)
export type FacilityType =
  | 'HOSPITAL'
  | 'SHELTER'
  | 'PHARMACY'
  | 'FIRE_STATION'
  | 'AED'
  | 'POLICE'
  | 'WATER'
  | 'CONVENIENCE';

// 앱 내부에서 사용하는 장소 타입
export interface Place {
  id: string;
  name: string;
  category: PlaceCategory;
  vicinity: string;
  latitude: number;
  longitude: number;
  distanceMeters?: number;
  extraInfo?: string;
}

// 서버 응답 타입
export interface FacilityItem {
  id: string;
  type: FacilityType;
  name: string;
  lat: number;
  lng: number;
  address: string;
  distanceMeters: number;
  extraInfo: string | null;
}

export interface FacilitiesResponse {
  centerLocation: {
    lat: number;
    lng: number;
  };
  totalCount: number;
  facilities: FacilityItem[];
}
