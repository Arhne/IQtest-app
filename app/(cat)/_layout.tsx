import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';




export default function PagesLayout() {
 
  return (
    
      <Stack>
        <Stack.Screen name="result" options={{ headerShown: false }} />
        <Stack.Screen name="test" options={{ headerShown: false }} />
        <Stack.Screen name="preliminary" options={{ headerShown: false }} />
        <Stack.Screen name="previousResult" options={{ headerShown: false }} />
      </Stack>

  );
}
