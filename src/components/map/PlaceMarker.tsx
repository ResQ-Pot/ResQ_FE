import { View, Text } from 'react-native';
import { Marker } from 'react-native-maps';
import { colors } from '@config/tokens';
import type { Place } from '@t/place';

const CATEGORY_CONFIG = {
  hospital: { color: '#EF4444', label: '병원' },
  shelter: { color: colors.green[500], label: '대피소' },
  pharmacy: { color: '#8B5CF6', label: '약국' },
  fire_station: { color: '#F97316', label: '소방서' },
} as const;

interface PlaceMarkerProps {
  place: Place;
  onPress: (place: Place) => void;
}

export function PlaceMarker({ place, onPress }: PlaceMarkerProps) {
  const config = CATEGORY_CONFIG[place.category];

  return (
    <Marker
      key={place.id}
      coordinate={{ latitude: place.latitude, longitude: place.longitude }}
      onPress={() => onPress(place)}
      tracksViewChanges={false}
    >
      <View
        className="items-center justify-center rounded-full px-2 py-1"
        style={{ backgroundColor: config.color }}
      >
        <Text className="text-white text-xs font-pmedium">{config.label}</Text>
      </View>
    </Marker>
  );
}
