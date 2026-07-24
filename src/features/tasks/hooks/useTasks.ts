import { useCallback, useEffect, useReducer } from "react";
import { tasks as initialTasks } from "../data/tasks";
import type { AddTaskHandler, ResetTasksHandler, Task } from "../model/task";
import { tasksReducer } from "../reducers/tasksReducer";
import { loadTasks, saveTasks } from "../storage/tasksStorage";

export function useTasks() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks, loadTasks);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

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

  const resetTasks = useCallback<ResetTasksHandler>(() => {
    dispatch({
      type: "tasks/reset",
      payload: initialTasks,
    });
  }, []);

  return {
    tasks,
    addTask,
    resetTasks,
  };
}
