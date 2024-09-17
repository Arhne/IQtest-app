import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Text, TextInput, } from 'react-native';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import tw from '@/twrnc-config';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontLoaded, error] = useFonts({
    InterRegular: require('../assets/fonts/InterRegular.ttf'),
    InterSemiBold: require('../assets/fonts/InterSemiBold.ttf'),
    InterBold: require('../assets/fonts/InterBold.ttf'),
  });

  useEffect(() => {
    if(error) throw error;

    if (fontLoaded) {
      SplashScreen.hideAsync();
      console.log(fontLoaded, "font")
    }
  }, [fontLoaded, error]);

  useEffect(() => {
    if (fontLoaded) {
      (Text as any).defaultProps = (Text as any).defaultProps || {};
      (Text as any).defaultProps.style = [{ fontFamily: 'InterRegular' }, (Text as any).defaultProps.style];
  
      (TextInput as any).defaultProps = (TextInput as any).defaultProps || {};
      (TextInput as any).defaultProps.style = [{ fontFamily: 'InterRegular' }, (TextInput as any).defaultProps.style];
    }
  }, [fontLoaded]);

  if (!fontLoaded && !error) {
    return null;
  }

   const customDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: '#141414', 
      text: '#ffffff', 
    },
  };

  const customLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#ffffff', 
      text: '#141414', 
    },
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? customDarkTheme : customLightTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="payment" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
