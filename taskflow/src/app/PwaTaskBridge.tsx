import { useTasksContext } from "../features/tasks";
import { useAppBadge } from "../pwa/hooks/useAppBadge";

function PwaTaskBridge() {
  const { tasks } = useTasksContext();

  const openTaskCount = tasks.filter(
    (task) => task.status !== "completed",
  ).length;

  useAppBadge(openTaskCount);

  return null;
}

export default PwaTaskBridge;
