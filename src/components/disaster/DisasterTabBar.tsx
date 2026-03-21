import { View, Text, TouchableOpacity } from 'react-native';

export type DisasterTab = 'realtime' | 'safety';

interface DisasterTabBarProps {
  activeTab: DisasterTab;
  onChange: (tab: DisasterTab) => void;
}

const TABS: { key: DisasterTab; label: string }[] = [
  { key: 'realtime', label: '실시간 소식' },
  { key: 'safety', label: '안전 상식' },
];

export function DisasterTabBar({ activeTab, onChange }: DisasterTabBarProps) {
  return (
    <View className="flex-row border-b border-gray-5">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            activeOpacity={0.8}
            onPress={() => onChange(tab.key)}
            className="flex-1 items-center py-3"
            style={isActive ? { borderBottomWidth: 2, borderBottomColor: '#181e25', marginBottom: -1 } : undefined}
          >
            <Text
              className={`text-[15px] ${isActive ? 'font-pbold text-gray-13' : 'font-pregular text-gray-7'}`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
