export type PlaceCategory = 'hospital' | 'shelter' | 'pharmacy' | 'fire_station';

export interface Place {
  id: string;
  name: string;
  category: PlaceCategory;
  vicinity: string;
  latitude: number;
  longitude: number;
  isOpen?: boolean;
  rating?: number;
}

export interface PlacesNearbyResponse {
  results: GooglePlace[];
  status: string;
  next_page_token?: string;
}

export interface GooglePlace {
  place_id: string;
  name: string;
  vicinity: string;
  geometry: {
    location: { lat: number; lng: number };
  };
  opening_hours?: { open_now: boolean };
  rating?: number;
  types: string[];
}
