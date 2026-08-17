import { QueryClientProvider } from "@tanstack/react-query";
import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { TasksProvider } from "../features/tasks";
import { queryClient } from "./queryClient";

type AppProvidersProps = {
  children: ReactNode;
};

function AppProviders({ children }: AppProvidersProps) {
  return (
    <MotionConfig reducedMotion="user">
      <QueryClientProvider client={queryClient}>
        <TasksProvider>{children}</TasksProvider>
      </QueryClientProvider>
    </MotionConfig>
  );
}

export default AppProviders;
