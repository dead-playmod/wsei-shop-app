import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Colors } from '@/constants/Colors';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const CustomDarkTheme: Theme = {
  ...DarkTheme,
  colors: {
    primary: Colors.dark.text,
    background: Colors.dark.background,
    card: Colors.dark.backgroundMuted,
    text: Colors.dark.text,
    border: Colors.dark.border,
    notification: Colors.dark.backgroundMuted,
  },
};
const CustomDefaultTheme: Theme = {
  ...DefaultTheme,
  colors: {
    primary: Colors.light.text,
    background: Colors.light.background,
    card: Colors.light.background,
    text: Colors.light.text,
    border: Colors.light.background,
    notification: Colors.light.background,
  },
};

export default function RootLayout() {
  const queryClient = new QueryClient();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        value={colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme}
      >
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen
            name="product/[productId]"
            options={{ headerShown: true }}
          />
        </Stack>
        <StatusBar
          style={colorScheme === 'dark' ? 'light' : 'dark'}
          backgroundColor={
            colorScheme === 'dark'
              ? CustomDarkTheme.colors.notification
              : CustomDefaultTheme.colors.notification
          }
          translucent={false}
        />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
