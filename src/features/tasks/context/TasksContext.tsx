import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useTasks } from "../hooks/useTasks";
import type { AddTaskHandler, Task } from "../model/task";

type TasksContextValue = {
  tasks: Task[];
  addTask: AddTaskHandler;
};

const TasksContext = createContext<TasksContextValue | undefined>(undefined);

type TasksProviderProps = {
  children: ReactNode;
};

export function TasksProvider({ children }: TasksProviderProps) {
  const { tasks, addTask } = useTasks();

  return (
    <TasksContext
      value={{
        tasks,
        addTask,
      }}
    >
      {children}
    </TasksContext>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTasksContext() {
  const context = useContext(TasksContext);

  if (context === undefined) {
    throw new Error("useTasksContext debe utilizarse dentro de TasksProvider");
  }

  return context;
}
