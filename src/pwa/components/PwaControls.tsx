import ConnectionStatus from "./ConnectionStatus";
import "./PwaControls.css";
import PwaUpdatePrompt from "./PwaUpdatePrompt";

function PwaControls() {
  return (
    <aside className="pwa-controls" aria-label="Estado de la aplicación">
      <PwaUpdatePrompt />
      <ConnectionStatus />
    </aside>
  );
}

export default PwaControls;
