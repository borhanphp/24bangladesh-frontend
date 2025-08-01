"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NetworkStatus from "./NetworkStatus";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: false,
      refetchInterval: 5000,
      refetchIntervalInBackground: false,
    },
  },
});

export default function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <NetworkStatus />
      {children}
    </QueryClientProvider>
  );
}
