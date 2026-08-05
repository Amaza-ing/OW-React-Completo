import { useState } from "react";
import { useNotificationPermission } from "../hooks/useNotificationPermission";
import { showTaskReminder } from "../notifications/showTaskReminder";
import "./TaskReminderButton.css";

type TaskReminderButtonProps = {
  openTaskCount: number;
};

function TaskReminderButton({ openTaskCount }: TaskReminderButtonProps) {
  const { permission, requestPermission } = useNotificationPermission();

  const [feedback, setFeedback] = useState("");

  const handleCreateReminder = async () => {
    setFeedback("");

    if (openTaskCount === 0) {
      setFeedback("No hay tareas abiertas que recordar.");
      return;
    }

    if (permission === "unsupported") {
      setFeedback("Este navegador no admite notificaciones persistentes.");
      return;
    }

    try {
      const nextPermission =
        permission === "granted" ? "granted" : await requestPermission();

      if (nextPermission !== "granted") {
        setFeedback("No se ha concedido permiso para crear el recordatorio.");
        return;
      }

      await showTaskReminder(openTaskCount);

      setFeedback("Recordatorio creado.");
    } catch (error) {
      setFeedback(
        error instanceof Error
          ? error.message
          : "No se ha podido crear el recordatorio.",
      );
    }
  };

  return (
    <div className="task-reminder">
      <button
        className="page-action page-action--secondary"
        type="button"
        onClick={() => {
          void handleCreateReminder();
        }}
        disabled={permission === "denied"}
      >
        Recordarme las tareas
      </button>

      {feedback !== "" && <p role="status">{feedback}</p>}
    </div>
  );
}

export default TaskReminderButton;
