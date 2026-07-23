import { useCallback, useState } from "react";
import { tasks as initialTasks } from "../data/tasks";
import type { AddTaskHandler, Task } from "../model/task";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = useCallback<AddTaskHandler>((taskData) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      status: "pending",
      ...taskData,
    };

    setTasks((currentTasks) => [newTask, ...currentTasks]);
  }, []);

  return {
    tasks,
    addTask,
  };
}
