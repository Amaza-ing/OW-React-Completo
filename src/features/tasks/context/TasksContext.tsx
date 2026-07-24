import { createContext, use } from "react";
import type { ReactNode } from "react";
import { useTasks } from "../hooks/useTasks";
import type { AddTaskHandler, ResetTasksHandler, Task } from "../model/task";

type TasksContextValue = {
  tasks: Task[];
  addTask: AddTaskHandler;
  resetTasks: ResetTasksHandler;
};

const TasksContext = createContext<TasksContextValue | undefined>(undefined);

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

// eslint-disable-next-line react-refresh/only-export-components
export function useTasksContext() {
  const context = use(TasksContext);

  if (context === undefined) {
    throw new Error("useTasksContext debe utilizarse dentro de TasksProvider");
  }

  return context;
}
