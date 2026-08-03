import ConnectionStatus from "./ConnectionStatus";
import "./PwaControls.css";

function PwaControls() {
  return (
    <aside className="pwa-controls" aria-label="Estado de la aplicación">
      <ConnectionStatus />
    </aside>
  );
}

export default PwaControls;
