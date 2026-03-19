import { useRef, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useLocation } from '@hooks/useLocation';
import { useAllFacilities, latitudeDeltaToRadius } from '@hooks/useNearbyPlaces';
import { useMapStore } from '@store/mapStore';
import { MapSearchBar } from '@components/map/MapSearchBar';
import { CategoryFilter } from '@components/map/CategoryFilter';
import { PlaceMarker } from '@components/map/PlaceMarker';
import { UserLocationMarker } from '@components/map/UserLocationMarker';
import { PlaceBottomSheet } from '@components/map/PlaceBottomSheet';
import { colors } from '@config/tokens';
import type { Place } from '@t/place';
import type { Coordinates } from '@t/location';

const INITIAL_LATITUDE_DELTA = 0.02;

const DEFAULT_REGION: Region = {
  latitude: 37.4946403,
  longitude: 126.9594151,
  latitudeDelta: INITIAL_LATITUDE_DELTA,
  longitudeDelta: INITIAL_LATITUDE_DELTA,
};

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const mapRef = useRef<MapView>(null);

  const { coords, isLoading: locationLoading, error: locationError } = useLocation();
  const { activeCategory, setActiveCategory, selectedPlace, setSelectedPlace } = useMapStore();

  const hasCenteredRef = useRef(false);

  // 지도 현재 중심 좌표와 반경 (zoom 레벨 연동)
  const [mapCenter, setMapCenter] = useState<Coordinates | null>(null);
  const [mapRadius, setMapRadius] = useState(latitudeDeltaToRadius(INITIAL_LATITUDE_DELTA));

  // 전체 시설 데이터 1회 호출 (center/radius 변경 시 재호출)
  const { data: allPlaces = [], isLoading: placesLoading } = useAllFacilities(
    mapCenter ?? coords,
    mapRadius,
  );

  // 카테고리 칩 → 클라이언트 필터링만 (API 호출 없음)
  const places = activeCategory
    ? allPlaces.filter((p) => p.category === activeCategory)
    : allPlaces;

  // 첫 위치 확인 시 지도 이동
  if (coords && !hasCenteredRef.current) {
    hasCenteredRef.current = true;
    mapRef.current?.animateToRegion(
      {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: INITIAL_LATITUDE_DELTA,
        longitudeDelta: INITIAL_LATITUDE_DELTA,
      },
      600,
    );
  }

  const handleRegionChangeComplete = (region: Region) => {
    setMapCenter({ latitude: region.latitude, longitude: region.longitude });
    setMapRadius(latitudeDeltaToRadius(region.latitudeDelta));
  };

  const handleMarkerPress = (place: Place) => {
    setSelectedPlace(place);
    mapRef.current?.animateToRegion(
      {
        latitude: place.latitude,
        longitude: place.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      400,
    );
  };

  if (locationError) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-3 px-8">
        <Text className="font-pbold text-lg text-gray-13 text-center mb-2">위치 권한 필요</Text>
        <Text className="font-pregular text-sm text-gray-8 text-center">{locationError}</Text>
      </View>
    );
  }

  const initialRegion = coords
    ? {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: INITIAL_LATITUDE_DELTA,
        longitudeDelta: INITIAL_LATITUDE_DELTA,
      }
    : DEFAULT_REGION;

  return (
    <View className="flex-1">
      {/* 지도 */}
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1, width: '100%', height: '100%' }}
        initialRegion={initialRegion}
        showsMyLocationButton={false}
        showsCompass={false}
        onRegionChangeComplete={handleRegionChangeComplete}
      >
        {coords && <UserLocationMarker coords={coords} />}
        {places.map((place) => (
          <PlaceMarker key={place.id} place={place} onPress={handleMarkerPress} />
        ))}
      </MapView>

      {/* 상단 오버레이 */}
      <View className="absolute left-4 right-4" style={{ top: insets.top + 12 }}>
        <MapSearchBar />
        <View className="mt-3">
          <CategoryFilter active={activeCategory} onSelect={setActiveCategory} />
        </View>
      </View>

      {/* 로딩 인디케이터 */}
      {(locationLoading || placesLoading) && (
        <View className="absolute top-1/2 left-1/2 -translate-x-6 -translate-y-6">
          <ActivityIndicator size="large" color={colors.green[500]} />
        </View>
      )}

      {/* 장소 상세 바텀시트 */}
      <PlaceBottomSheet place={selectedPlace} onClose={() => setSelectedPlace(null)} />
    </View>
  );
}
