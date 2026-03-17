import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { SvgProps } from 'react-native-svg';
import { colors } from '@config/tokens';

import HomeIcon from '@/assets/icons/navigation/home.svg';
import NewspaperIcon from '@/assets/icons/navigation/newspaper.svg';
import MapIcon from '@/assets/icons/navigation/map.svg';
import UserCircleIcon from '@/assets/icons/navigation/user-circle.svg';

type TabName = 'index' | 'disaster' | 'map' | 'settings';

const TAB_CONFIG: Record<TabName, { label: string; Icon: React.FC<SvgProps> }> = {
  index: { label: '홈', Icon: HomeIcon },
  disaster: { label: '재난 정보', Icon: NewspaperIcon },
  map: { label: '지도', Icon: MapIcon },
  settings: { label: '설정', Icon: UserCircleIcon },
};

const ACTIVE_COLOR = colors.green[500];
const INACTIVE_COLOR = colors.gray[1];

export function BottomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-row bg-gray-13 rounded-tl-[20px] rounded-tr-[20px] pt-6"
      style={{ paddingBottom: Math.max(insets.bottom, 12) + 12 }}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const { label, Icon } = TAB_CONFIG[route.name as TabName];
        const color = isFocused ? ACTIVE_COLOR : INACTIVE_COLOR;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            activeOpacity={0.7}
            className="flex-1 items-center gap-1"
          >
            <Icon width={26} height={26} color={color} />
            <Text
              className="text-xs font-pmedium"
              style={{ color }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
