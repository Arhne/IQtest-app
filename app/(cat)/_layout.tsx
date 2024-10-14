import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';




export default function PagesLayout() {
 
  return (
    
      <Stack>
        <Stack.Screen name="result" options={{ headerShown: false }} />
        <Stack.Screen name="test" options={{ headerShown: false }} />
        <Stack.Screen name="paymentSuccess" options={{ headerShown: false }} />
        <Stack.Screen name="previousResult" options={{ headerShown: false }} />
        <Stack.Screen name="subscription" options={{ headerShown: false }} />
        <Stack.Screen name="testInstructions" options={{ headerShown: false }} />
        <Stack.Screen name="testSummary" options={{ headerShown: false }} />
      </Stack>

  );
}
