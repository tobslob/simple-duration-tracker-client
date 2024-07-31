"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider, Toaster } from "@/components";
export default function Providers({ children }: { children: React.ReactNode }) {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 10 * 5000,
      },
    },
  });

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
    >
      {/* <SessionProvider> */}
      <QueryClientProvider client={client}>
        <>{children}</>
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      {/* </SessionProvider> */}
    </ThemeProvider>
  );
}
