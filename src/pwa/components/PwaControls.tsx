import ConnectionStatus from "./ConnectionStatus";
import InstallAppButton from "./InstallAppButton";
import "./PwaControls.css";
import PwaUpdatePrompt from "./PwaUpdatePrompt";

function PwaControls() {
  return (
    <aside className="pwa-controls" aria-label="Estado de la aplicación">
      <PwaUpdatePrompt />
      <InstallAppButton />
      <ConnectionStatus />
    </aside>
  );
}

export default PwaControls;
