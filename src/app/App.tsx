import { useCallback, useState } from "react";
import {
  tasks as initialTasks,
  type AddTaskHandler,
  type Task,
} from "../features/tasks";
import "./App.css";
import AppRoutes from "./AppRoutes";

function App() {
  const [taskItems, setTaskItems] = useState<Task[]>(initialTasks);

  const handleAddTask = useCallback<AddTaskHandler>((taskData) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      status: "pending",
      ...taskData,
    };

    setTaskItems((currentTasks) => [newTask, ...currentTasks]);
  }, []);

  return <AppRoutes tasks={taskItems} onAddTask={handleAddTask} />;
}

export default App;
