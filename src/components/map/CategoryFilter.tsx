import { ScrollView, TouchableOpacity, Text } from 'react-native';
import { colors } from '@config/tokens';
import type { PlaceCategory } from '@t/place';

import HospitalIcon from '@/assets/icons/map/hospital.svg';
import ShelterIcon from '@/assets/icons/map/shelter.svg';
import PharmacyIcon from '@/assets/icons/map/pharmacy.svg';
import FireStationIcon from '@/assets/icons/map/fire-station.svg';
import AedIcon from '@/assets/icons/map/aed.svg';
import PoliceIcon from '@/assets/icons/map/police.svg';
import WaterIcon from '@/assets/icons/map/water.svg';
import ConvenienceIcon from '@/assets/icons/map/convenience.svg';

type CategoryFilter = PlaceCategory | 'all';

const CATEGORIES: {
  key: CategoryFilter;
  label: string;
  Icon: React.FC<{ width?: number; height?: number }>;
}[] = [
  { key: 'hospital', label: '병원', Icon: HospitalIcon },
  { key: 'shelter', label: '대피소', Icon: ShelterIcon },
  { key: 'pharmacy', label: '약국', Icon: PharmacyIcon },
  { key: 'fire_station', label: '소방서', Icon: FireStationIcon },
  { key: 'aed', label: 'AED', Icon: AedIcon },
  { key: 'police', label: '경찰서', Icon: PoliceIcon },
  { key: 'water', label: '급수', Icon: WaterIcon },
  { key: 'convenience', label: '편의점', Icon: ConvenienceIcon },
];

const ICON_SIZE = 14;

interface CategoryFilterProps {
  active: CategoryFilter;
  onSelect: (category: CategoryFilter) => void;
}

export function CategoryFilter({ active, onSelect }: CategoryFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-2 px-4"
    >
      {CATEGORIES.map(({ key, label, Icon }) => {
        const isActive = active === key;
        return (
          <TouchableOpacity
            key={key}
            onPress={() => onSelect(key)}
            activeOpacity={0.7}
            className={`flex-row items-center rounded-full ${isActive ? 'bg-green-500' : 'bg-white'}`}
            style={{
              paddingHorizontal: 15,
              paddingVertical: 8,
              borderWidth: isActive ? 0 : 1,
              borderColor: colors.gray[5],
            }}
          >
            <Icon height={ICON_SIZE} />
            <Text
              className={`ml-1.5 text-[13px] font-pmedium ${isActive ? 'text-white' : 'text-gray-10'}`}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
