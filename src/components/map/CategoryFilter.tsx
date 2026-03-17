import { ScrollView, TouchableOpacity, Text } from 'react-native';
import { colors } from '@config/tokens';
import type { PlaceCategory } from '@t/place';

type CategoryFilter = PlaceCategory | 'all';

const CATEGORIES: { key: CategoryFilter; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'hospital', label: '병원' },
  { key: 'shelter', label: '대피소' },
  { key: 'pharmacy', label: '약국' },
  { key: 'fire_station', label: '소방서' },
];

interface CategoryFilterProps {
  active: CategoryFilter;
  onSelect: (category: CategoryFilter) => void;
}

export function CategoryFilter({ active, onSelect }: CategoryFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-2 px-1"
    >
      {CATEGORIES.map(({ key, label }) => {
        const isActive = active === key;
        return (
          <TouchableOpacity
            key={key}
            onPress={() => onSelect(key)}
            activeOpacity={0.8}
            className={`px-4 py-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-white'}`}
            style={isActive ? undefined : { borderWidth: 1, borderColor: colors.gray[5] }}
          >
            <Text
              className={`text-xs font-pmedium ${isActive ? 'text-white' : 'text-gray-9'}`}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
