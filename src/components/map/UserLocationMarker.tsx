import { View, Animated } from 'react-native';
import { Marker, Circle } from 'react-native-maps';
import type { Coordinates } from '@t/location';
import { useRef, useEffect } from 'react';

interface Props {
  coords: Coordinates;
}

export function UserLocationMarker({ coords }: Props) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.4, duration: 1500, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 1500, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <>
      {/* 1. 기능: 오차 범위는 유지 (Grace님 코드) */}
      {coords.accuracy != null && coords.accuracy > 0 && (
        <Circle
          center={{ latitude: coords.latitude, longitude: coords.longitude }}
          radius={coords.accuracy}
          fillColor="rgba(66, 133, 244, 0.08)"
          strokeColor="rgba(66, 133, 244, 0.2)"
          strokeWidth={1}
        />
      )}

      <Marker
        coordinate={{ latitude: coords.latitude, longitude: coords.longitude }}
        anchor={{ x: 0.5, y: 0.5 }}
        tracksViewChanges
      >
        <View style={{ alignItems: 'center', justifyContent: 'center', width: 60, height: 60 }}>
          {/* 2. 디자인: 세모 대신 방향을 나타내는 부드러운 빛무리 (선택 사항) */}
          {coords.heading != null && (
            <View style={{
              position: 'absolute',
              transform: [{ rotate: `${coords.heading}deg` }]
            }}>
               {/* 여기에 화살표 아이콘(SVG/Image)을 넣으면 훨씬 예쁩니다 */}
            </View>
          )}

          {/* 3. 디자인: 파동 애니메이션 (제 제안 코드) */}
          <Animated.View style={{
            position: 'absolute',
            width: 30, height: 30, borderRadius: 15,
            backgroundColor: 'rgba(66, 133, 244, 0.3)',
            transform: [{ scale: scaleAnim }]
          }} />

          {/* 4. 디자인: 깔끔한 중심점 */}
          <View style={{
            width: 16, height: 16, borderRadius: 8,
            backgroundColor: '#4285F4', borderWidth: 3, borderColor: 'white',
            elevation: 4, shadowOpacity: 0.2
          }} />
        </View>
      </Marker>
    </>
  );
}
