import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CssBaseline } from "@mui/material";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes: considered fresh for 5min
      gcTime: 1000 * 60 * 60 * 24, // 24 hours: keeps data in memory for full day
      retry: 1, // only retry once on failure
      refetchOnWindowFocus: false, // avoids refetching when user switches tabs
      refetchOnReconnect: true, // helpful for PWA when coming back online
      refetchIntervalInBackground: false, // don’t poll in background
    },
    mutations: {
      retry: 0,
    },
  },
});

const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <CssBaseline />
        {children}
      </QueryClientProvider>
    </>
  );
};

export default Providers;
