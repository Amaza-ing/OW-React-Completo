import { useState } from "react";
import { useNotificationPermission } from "../hooks/useNotificationPermission";
import { showPersistentNotification } from "../notifications/showPersistentNotification";
import "./NotificationControls.css";

function NotificationControls() {
  const { permission, requestPermission } = useNotificationPermission();

  const [feedback, setFeedback] = useState("");

  const handleNotification = async () => {
    setFeedback("");

    if (permission === "unsupported") {
      return;
    }

    try {
      const nextPermission =
        permission === "granted" ? "granted" : await requestPermission();

      if (nextPermission !== "granted") {
        setFeedback("No se ha concedido permiso para las notificaciones.");
        return;
      }

      await showPersistentNotification({
        title: "TaskFlow",
        body: "Las notificaciones están preparadas.",
      });

      setFeedback("Notificación de prueba enviada.");
    } catch (error) {
      setFeedback(
        error instanceof Error
          ? error.message
          : "No se ha podido mostrar la notificación.",
      );
    }
  };

  if (permission === "unsupported") {
    return (
      <p className="notification-controls__message">
        Este navegador no admite notificaciones persistentes.
      </p>
    );
  }

  if (permission === "denied") {
    return (
      <p className="notification-controls__message">
        Las notificaciones están bloqueadas desde la configuración del
        navegador.
      </p>
    );
  }

  return (
    <section className="notification-controls" aria-label="Notificaciones">
      <div className="notification-controls__actions">
        <button
          type="button"
          onClick={() => {
            void handleNotification();
          }}
        >
          {permission === "granted"
            ? "Probar notificación"
            : "Activar notificaciones"}
        </button>
      </div>

      {feedback !== "" && <p role="status">{feedback}</p>}
    </section>
  );
}

export default NotificationControls;
