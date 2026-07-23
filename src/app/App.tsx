import { useTasks } from "../features/tasks";
import "./App.css";
import AppRoutes from "./AppRoutes";

function App() {
  const { tasks, addTask } = useTasks();

  return <AppRoutes tasks={tasks} onAddTask={addTask} />;
}

export default App;
