import client from '@/api/apolloClient';
import { ApolloProvider } from '@apollo/client';
import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';
import { ThemeProvider } from '@/contexts/ThemeContext'; // Correct import path
import '@/i18n'

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>  {/* Wrap the entire app in ThemeProvider */}
        <PaperProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="drawer" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </PaperProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
