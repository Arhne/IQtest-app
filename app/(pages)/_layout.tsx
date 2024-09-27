import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';




export default function PagesLayout() {
 
  return (
    
      <Stack>
        <Stack.Screen name="suggestions" options={{ headerShown: false }} />
        <Stack.Screen name="policy" options={{ headerShown: false }} />
        <Stack.Screen name="terms" options={{ headerShown: false }} />
        <Stack.Screen name="support" options={{ headerShown: false }} />
        <Stack.Screen name="about" options={{ headerShown: false }} />
      </Stack>

  );
}
