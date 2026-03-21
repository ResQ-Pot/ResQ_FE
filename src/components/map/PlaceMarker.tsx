import { Marker } from 'react-native-maps';
import type { Place } from '@t/place';

const CATEGORY_PIN_COLOR: Record<string, string> = {
  hospital: '#EF9A9A',
  shelter: '#A5D6A7',
  pharmacy: '#F48FB1',
  fire_station: '#FFCC80',
  aed: '#FFAB91',
  police: '#90CAF9',
  water: '#80DEEA',
  convenience: '#CE93D8',
};

interface PlaceMarkerProps {
  place: Place;
  onPress: (place: Place) => void;
}

export function PlaceMarker({ place, onPress }: PlaceMarkerProps) {
  return (
    <Marker
      coordinate={{ latitude: place.latitude, longitude: place.longitude }}
      pinColor={CATEGORY_PIN_COLOR[place.category]}
      onPress={() => onPress(place)}
    />
  );
}
