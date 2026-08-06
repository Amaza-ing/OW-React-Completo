import { createContext } from "react";
import type { AddTaskHandler, ResetTasksHandler, Task } from "../model/task";

type TasksContextValue = {
  tasks: Task[];
  addTask: AddTaskHandler;
  resetTasks: ResetTasksHandler;
};

export const TasksContext = createContext<TasksContextValue | undefined>(
  undefined,
);
