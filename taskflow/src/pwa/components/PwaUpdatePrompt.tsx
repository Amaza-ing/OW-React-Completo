import { useRegisterSW } from "virtual:pwa-register/react";
import "./PwaUpdatePrompt.css";

function PwaUpdatePrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  if (!offlineReady && !needRefresh) {
    return null;
  }

  const handleClose = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  const handleUpdate = () => {
    void updateServiceWorker(true);
  };

  return (
    <section
      className="pwa-update-prompt"
      role="status"
      aria-live="polite"
      aria-label="Estado de la PWA"
    >
      <p>
        {needRefresh
          ? "Hay una nueva versión de TaskFlow disponible."
          : "TaskFlow está preparada para funcionar sin conexión."}
      </p>

      <div className="pwa-update-prompt__actions">
        {needRefresh && (
          <button type="button" onClick={handleUpdate}>
            Actualizar ahora
          </button>
        )}

        <button type="button" onClick={handleClose}>
          {needRefresh ? "Más tarde" : "Entendido"}
        </button>
      </div>
    </section>
  );
}

export default PwaUpdatePrompt;
