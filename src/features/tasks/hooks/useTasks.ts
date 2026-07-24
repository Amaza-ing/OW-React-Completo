import { useCallback, useReducer } from "react";
import { tasks as initialTasks } from "../data/tasks";
import type { AddTaskHandler, Task } from "../model/task";
import { tasksReducer } from "../reducers/tasksReducer";

export function useTasks() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  const addTask = useCallback<AddTaskHandler>((taskData) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      status: "pending",
      ...taskData,
    };

    dispatch({
      type: "task/added",
      payload: newTask,
    });
  }, []);

  return {
    tasks,
    addTask,
  };
}
