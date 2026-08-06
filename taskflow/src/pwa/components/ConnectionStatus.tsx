import { useOnlineStatus } from "../hooks/useOnlineStatus";

function ConnectionStatus() {
  const isOnline = useOnlineStatus();

  return (
    <div
      className="connection-status"
      data-online={isOnline}
      role="status"
      aria-live="polite"
    >
      <span className="connection-status__indicator" aria-hidden="true" />

      <span>{isOnline ? "Con conexión" : "Sin conexión"}</span>
    </div>
  );
}

export default ConnectionStatus;
