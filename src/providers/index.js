"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NetworkStatus from "./NetworkStatus";
import { SearchProvider } from "./useSearch";
import { NewsStoreProvider } from "./useNewsStore";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: false, // Disable refetch on reconnect
      refetchOnMount: false,
      refetchInterval: false, // Disable automatic refetching
      refetchIntervalInBackground: false,
      gcTime: 1000 * 60 * 15, // 15 minutes garbage collection
    },
  },
});

export default function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <NewsStoreProvider>
        <SearchProvider>
          <NetworkStatus />
          {children}
        </SearchProvider>
      </NewsStoreProvider>
    </QueryClientProvider>
  );
}
