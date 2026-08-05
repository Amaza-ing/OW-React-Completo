import { useEffect, useState } from "react";
import {
  listenToFirebaseRegistration,
  listenToForegroundMessages,
  registerFirebaseMessaging,
} from "../firebase/firebaseMessaging";
import { useNotificationPermission } from "../hooks/useNotificationPermission";
import "./NotificationControls.css";

function NotificationControls() {
  const { permission, requestPermission } = useNotificationPermission();

  const [feedback, setFeedback] = useState("");

  const [installationId, setInstallationId] = useState("");

  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    let stopRegistrationListener: (() => void) | null = null;

    let stopMessageListener: (() => void) | null = null;

    let cancelled = false;

    void listenToFirebaseRegistration((nextInstallationId) => {
      if (cancelled) {
        return;
      }

      setInstallationId(nextInstallationId);

      setFeedback("Firebase ha registrado esta instalación.");
    }).then((stopListening) => {
      if (cancelled) {
        stopListening?.();
        return;
      }

      stopRegistrationListener = stopListening;
    });

    void listenToForegroundMessages((payload) => {
      if (cancelled) {
        return;
      }

      const title =
        payload.notification?.title ??
        payload.data?.title ??
        "Mensaje recibido";

      setFeedback(`${title} se ha recibido con TaskFlow abierta.`);
    }).then((stopListening) => {
      if (cancelled) {
        stopListening?.();
        return;
      }

      stopMessageListener = stopListening;
    });

    return () => {
      cancelled = true;
      stopRegistrationListener?.();
      stopMessageListener?.();
    };
  }, []);

  const handleRegisterPush = async () => {
    setIsRegistering(true);
    setFeedback("");

    try {
      const nextPermission =
        permission === "granted" ? "granted" : await requestPermission();

      if (nextPermission !== "granted") {
        setFeedback("No se ha concedido permiso para las notificaciones.");
        return;
      }

      await registerFirebaseMessaging();

      setFeedback("Registro solicitado a Firebase.");
    } catch (error) {
      setFeedback(
        error instanceof Error
          ? error.message
          : "No se ha podido registrar Firebase Messaging.",
      );
    } finally {
      setIsRegistering(false);
    }
  };

  if (permission === "unsupported") {
    return (
      <p className="notification-controls__message">
        Este navegador no admite Firebase Messaging para web.
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
    <section className="notification-controls" aria-label="Notificaciones push">
      <div className="notification-controls__actions">
        <button
          type="button"
          onClick={() => {
            void handleRegisterPush();
          }}
          disabled={isRegistering || installationId !== ""}
        >
          {isRegistering
            ? "Conectando..."
            : installationId === ""
              ? "Activar push"
              : "Push activado"}
        </button>
      </div>

      {installationId !== "" && (
        <p>
          Instalación registrada: <code>{installationId.slice(0, 12)}…</code>
        </p>
      )}

      {feedback !== "" && <p role="status">{feedback}</p>}
    </section>
  );
}

export default NotificationControls;
