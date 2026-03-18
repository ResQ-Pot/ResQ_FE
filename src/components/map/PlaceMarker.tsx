import { Marker } from 'react-native-maps';
import type { Place } from '@t/place';

const CATEGORY_PIN_COLOR: Record<string, string> = {
  hospital: '#F28B82',
  shelter: '#81C995',
  pharmacy: '#F06292',
  fire_station: '#E67E22',
  aed: '#F24822',
  police: '#7BAAF7',
  water: '#4FC3F7',
  convenience: '#B39DDB',
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
