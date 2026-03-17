import { useRef, useState, useCallback, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useLocation } from '@hooks/useLocation';
import { useNearbyPlaces, usePlaceSearch } from '@hooks/useNearbyPlaces';
import { useMapStore } from '@store/mapStore';
import { MapSearchBar } from '@components/map/MapSearchBar';
import { CategoryFilter } from '@components/map/CategoryFilter';
import { PlaceMarker } from '@components/map/PlaceMarker';
import { UserLocationMarker } from '@components/map/UserLocationMarker';
import { PlaceBottomSheet } from '@components/map/PlaceBottomSheet';
import { colors } from '@config/tokens';
import type { Place } from '@t/place';

const DEFAULT_REGION: Region = {
  latitude: 37.4946403,    
  longitude: 126.9594151,  
  latitudeDelta: 0.02,  
  longitudeDelta: 0.02,
};

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const mapRef = useRef<MapView>(null);

  const { coords, isLoading: locationLoading, error: locationError } = useLocation();
  const { searchQuery, setSearchQuery, activeCategory, setActiveCategory, selectedPlace, setSelectedPlace } =
    useMapStore();

  const [isSearching, setIsSearching] = useState(false);
  const hasCenteredRef = useRef(false);

  useEffect(() => {
    if (coords && !hasCenteredRef.current) {
      hasCenteredRef.current = true;
      mapRef.current?.animateToRegion(
        {
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        },
        600,
      );
    }
  }, [coords]);

  const { data: nearbyPlaces = [], isLoading: placesLoading } = useNearbyPlaces(
    coords,
    activeCategory,
  );
  const { data: searchResults = [] } = usePlaceSearch(searchQuery, coords);

  const displayPlaces = searchQuery.trim().length > 1 ? searchResults : nearbyPlaces;

  const handleSearchChange = useCallback(
    (text: string) => {
      setSearchQuery(text);
      setIsSearching(text.trim().length > 0);
    },
    [setSearchQuery],
  );

  const handleMarkerPress = useCallback(
    (place: Place) => {
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
    },
    [setSelectedPlace],
  );

  // 위치 권한 거부 또는 에러
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
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
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
        onMapReady={() => console.log("✅ Map is Ready")}
        onMapLoaded={() => console.log("✅ Map is Loaded")}
        onRegionChangeComplete={(region) => console.log("📍 Region Changed", region)}
        showsMyLocationButton={false}
        showsCompass={false}
      >
        {coords && <UserLocationMarker coords={coords} />}
        {displayPlaces.map((place) => (
          <PlaceMarker
            key={place.id}
            place={place}
            onPress={handleMarkerPress}
          />
        ))}
      </MapView>

      {/* 상단 오버레이 */}
      <View
        className="absolute left-4 right-4"
        style={{ top: insets.top + 12 }}
      >
        {/* 검색바 */}
        <MapSearchBar
          value={searchQuery}
          onChangeText={handleSearchChange}
        />

        {/* 카테고리 필터 (검색중이 아닐 때만) */}
        {!isSearching && (
          <View className="mt-3">
            <CategoryFilter
              active={activeCategory}
              onSelect={setActiveCategory}
            />
          </View>
        )}
      </View>

      {/* 로딩 인디케이터 */}
      {(locationLoading || placesLoading) && (
        <View className="absolute top-1/2 left-1/2 -translate-x-6 -translate-y-6">
          <ActivityIndicator size="large" color={colors.green[500]} />
        </View>
      )}

      {/* 장소 상세 바텀시트 */}
      <PlaceBottomSheet
        place={selectedPlace}
        onClose={() => setSelectedPlace(null)}
      />
    </View>
  );
}
