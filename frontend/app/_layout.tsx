import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { PaperProvider } from 'react-native-paper';
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import client from '@/api/apolloClient';
import { ThemeProvider } from '@/contexts/ThemeContext'; // Correct import path

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
