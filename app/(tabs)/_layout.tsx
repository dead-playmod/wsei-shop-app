import { Tabs } from 'expo-router';
import React from 'react';
import { Image, Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useUser } from '@/hooks/useUser';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { load, user } = useUser();

  React.useEffect(() => {
    load();
  }, [load]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="user"
        options={{
          title: user ? user.username : 'Login',
          tabBarIcon: ({ color }) => {
            if (user) {
              return (
                <Image
                  source={{ uri: user.image }}
                  style={{ width: 28, height: 28, borderRadius: 14 }}
                />
              );
            }

            return <IconSymbol size={28} name="person.fill" color={color} />;
          },
        }}
      />
    </Tabs>
  );
}
