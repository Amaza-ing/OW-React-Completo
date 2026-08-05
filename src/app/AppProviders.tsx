import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import type { ReactNode } from "react";
import { TasksProvider } from "../features/tasks";
import { queryClient } from "./queryClient";
import { QUERY_CACHE_MAX_AGE, queryPersister } from "./queryPersistence";

type AppProvidersProps = {
  children: ReactNode;
};

function AppProviders({ children }: AppProvidersProps) {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: queryPersister,
        maxAge: QUERY_CACHE_MAX_AGE,
      }}
    >
      <TasksProvider>{children}</TasksProvider>
    </PersistQueryClientProvider>
  );
}

export default AppProviders;
