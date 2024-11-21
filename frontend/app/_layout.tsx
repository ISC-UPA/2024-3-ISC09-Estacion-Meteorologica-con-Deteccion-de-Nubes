import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { ApolloProvider } from '@apollo/client';
import client from '@/api/apolloClient';
import { PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <PaperProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </PaperProvider>
    </ApolloProvider>
  );
}
