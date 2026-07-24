import type { ReactNode } from "react";
import { TasksProvider } from "../features/tasks";

type AppProvidersProps = {
  children: ReactNode;
};

function AppProviders({ children }: AppProvidersProps) {
  return <TasksProvider>{children}</TasksProvider>;
}

export default AppProviders;
