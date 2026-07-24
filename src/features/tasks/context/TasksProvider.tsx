import type { ReactNode } from "react";
import { useTasks } from "../hooks/useTasks";
import { TasksContext } from "./tasksContext";

type TasksProviderProps = {
  children: ReactNode;
};

export function TasksProvider({ children }: TasksProviderProps) {
  const { tasks, addTask, resetTasks } = useTasks();

  return (
    <TasksContext
      value={{
        tasks,
        addTask,
        resetTasks,
      }}
    >
      {children}
    </TasksContext>
  );
}
