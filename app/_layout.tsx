import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useEffect } from 'react';
import * as SecureStore from "expo-secure-store";

export const unstable_settings = {
  anchor: '(tabs)',
};

export const baseURL = "http://10.167.88.134:8080";

export default function RootLayout() {

  const router = useRouter(); // ✅ move here

  useEffect(() => {
    const checkLogin = async () => {
      const role = await SecureStore.getItemAsync("role");

      console.log("ROLE FROM STORAGE:", role); // debug

      if (role === "Admin") {
        router.replace("/(admin)/Dashboard");
      } else if (role === "User") {
        router.replace("/(user)/Dashboard");
      } else {
        router.replace("/Login");
      }
    };

    checkLogin();
  }, []);
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(admin)" options={{ headerShown: false }} />
        <Stack.Screen name="(user)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
    
  );
}
