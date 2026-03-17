import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SettingsMenuItem } from '@components/settings/SettingsMenuItem';
import { SettingsMenuDivider } from '@components/settings/SettingsMenuDivider';
import AvatarHelmet from '@/assets/icons/avatar-helmet.svg';

const ACCOUNT_ITEMS = [
  { key: 'account', label: '계정' },
  { key: 'editProfile', label: '프로필 수정' },
  { key: 'pushNotification', label: '푸시 알림 동의' },
];

const INFO_ITEMS = [
  { key: 'privacy', label: '개인정보 처리방침 안내' },
  { key: 'contact', label: '문의하기' },
  { key: 'emergency', label: '긴급 전화' },
];

function MenuGroup({ items }: { items: { key: string; label: string }[] }) {
  return (
    <>
      {items.map((item) => (
        <SettingsMenuItem key={item.key} label={item.label} />
      ))}
    </>
  );
}

export default function SettingsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-1" edges={['top']}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 프로필 섹션 */}
        <View className="flex-row items-center gap-4 pt-[60px] pb-12">
          <View className="items-center justify-center overflow-hidden">
            <AvatarHelmet width={61} height={61} />
          </View>
          <View className="gap-1">
            <Text className="font-pbold text-[22px] text-gray-13">김은혜</Text>
            <Text className="font-pregular text-[12px] text-gray-7">010-8579-9158</Text>
          </View>
        </View>

        {/* 메뉴 카드 */}
        <View className="bg-white rounded-xl gap-4">
          <MenuGroup items={ACCOUNT_ITEMS} />
        </View>
        <SettingsMenuDivider />
        <View className="bg-white rounded-xl gap-4">
          <MenuGroup items={INFO_ITEMS} />
        </View>
        <SettingsMenuDivider />
        <View className="bg-white rounded-xl gap-4">
          <SettingsMenuItem label="로그아웃" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
