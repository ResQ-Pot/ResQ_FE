import { Tabs } from 'expo-router';

import { BottomTabBar } from '@components/BottomTabBar';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="disaster" />
      <Tabs.Screen name="map" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}
