import client from '@/api/apolloClient';
import { ApolloProvider } from '@apollo/client';
import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <PaperProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="drawer" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </PaperProvider>
    </ApolloProvider>
  );
}
