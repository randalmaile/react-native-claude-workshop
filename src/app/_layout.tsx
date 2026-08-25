import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { colors, typography } from '@/theme';

/**
 * The root layout wraps every route.
 *
 * A native stack gives you the platform's own back gesture, header and
 * transitions for free — which is exactly the kind of thing you should let the
 * platform do rather than rebuild.
 */
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.primary,
          headerTitleStyle: { ...typography.subheading, color: colors.text },
          contentStyle: { backgroundColor: colors.background },
        }}>
        <Stack.Screen name="index" options={{ title: 'Workshop' }} />
        <Stack.Screen name="playground" options={{ title: 'Playground' }} />
        <Stack.Screen name="capstone" options={{ title: 'Capstone' }} />
      </Stack>
    </SafeAreaProvider>
  );
}
