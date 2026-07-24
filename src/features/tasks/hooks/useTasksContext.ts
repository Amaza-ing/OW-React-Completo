import { use } from "react";
import { TasksContext } from "../context/tasksContext";

export function useTasksContext() {
  const context = use(TasksContext);

  if (context === undefined) {
    throw new Error("useTasksContext debe utilizarse dentro de TasksProvider");
  }

  return context;
}
