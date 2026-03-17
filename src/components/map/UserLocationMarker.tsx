import { View } from 'react-native';
import { Marker, Circle } from 'react-native-maps';
import type { Coordinates } from '@types/location';

interface Props {
  coords: Coordinates;
}

export function UserLocationMarker({ coords }: Props) {
  const hasHeading = coords.heading != null && coords.heading >= 0;

  return (
    <>
      {/* 정확도 반경 원 */}
      {coords.accuracy != null && coords.accuracy > 0 && (
        <Circle
          center={{ latitude: coords.latitude, longitude: coords.longitude }}
          radius={coords.accuracy}
          fillColor="rgba(66, 133, 244, 0.12)"
          strokeColor="rgba(66, 133, 244, 0.3)"
          strokeWidth={1}
        />
      )}

      {/* 위치 마커 */}
      <Marker
        coordinate={{ latitude: coords.latitude, longitude: coords.longitude }}
        anchor={{ x: 0.5, y: 0.5 }}
        tracksViewChanges={false}
      >
        <View style={{ width: 48, height: 48, alignItems: 'center', justifyContent: 'center' }}>
          {/* 방향 화살표 (heading이 있을 때만) */}
          {hasHeading && (
            <View
              style={{
                position: 'absolute',
                width: 48,
                height: 48,
                alignItems: 'center',
                transform: [{ rotate: `${coords.heading}deg` }],
              }}
            >
              <View
                style={{
                  width: 0,
                  height: 0,
                  marginTop: 2,
                  borderLeftWidth: 7,
                  borderRightWidth: 7,
                  borderBottomWidth: 14,
                  borderLeftColor: 'transparent',
                  borderRightColor: 'transparent',
                  borderBottomColor: 'rgba(66, 133, 244, 0.85)',
                }}
              />
            </View>
          )}

          {/* 파란 점 */}
          <View
            style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              backgroundColor: '#4285F4',
              borderWidth: 3,
              borderColor: 'white',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 3,
              elevation: 5,
            }}
          />
        </View>
      </Marker>
    </>
  );
}
