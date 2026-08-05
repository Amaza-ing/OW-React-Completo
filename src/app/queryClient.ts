import { QueryClient } from "@tanstack/react-query";
import { QUERY_CACHE_MAX_AGE } from "./queryPersistence";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: QUERY_CACHE_MAX_AGE,
    },
  },
});
