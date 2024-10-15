import { Stack } from "expo-router";
import { loadInitialProgress } from "@/redux/load-progress-thunk";
import { useAppDispatch } from "@/redux";
import { useEffect } from "react";
import { getAsyncStorageSize } from "@/utils/helper-functions";

export const StackProvider = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadInitialProgress());
    getAsyncStorageSize()
  }, []);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
      <Stack.Screen name="premium" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(pages)" options={{ headerShown: false }} />
      <Stack.Screen name="(cat)" options={{ headerShown: false }} />
    </Stack>
  );
};
