// components/TanStackProvider/TanStackProvider.tsx

"use client";

import { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
  DehydratedState,
} from "@tanstack/react-query";

type Props = {
  children: React.ReactNode;
  dehydratedState: DehydratedState;
};

const TanStackProvider = ({ children, dehydratedState }: Props) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
};

export default TanStackProvider;
