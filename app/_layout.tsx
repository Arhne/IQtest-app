import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n/i18n';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontLoaded, error] = useFonts({
    InterAll: require('../assets/fonts/InterVariableFont.ttf'),
  });

  useEffect(() => {
    if(error) throw error;

    if (fontLoaded) {
      SplashScreen.hideAsync();
      console.log(fontLoaded, "font")
    }
  }, [fontLoaded, error]);

  if (!fontLoaded && !error) {
    return null;
  }

  return (
    <I18nextProvider i18n={i18n}>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="premium" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(pages)" options={{ headerShown: false }} />
        <Stack.Screen name="(cat)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
    </I18nextProvider>
  );
}
