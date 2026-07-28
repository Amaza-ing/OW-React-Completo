import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { TasksProvider } from "../features/tasks";
import { queryClient } from "./queryClient";

type AppProvidersProps = {
  children: ReactNode;
};

function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <TasksProvider>{children}</TasksProvider>
    </QueryClientProvider>
  );
}

export default AppProviders;
