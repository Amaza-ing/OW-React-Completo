import ConnectionStatus from "./ConnectionStatus";
import InstallAppButton from "./InstallAppButton";
import NotificationControls from "./NotificationControls";
import "./PwaControls.css";
import PwaUpdatePrompt from "./PwaUpdatePrompt";
import ShareAppButton from "./ShareAppButton";

function PwaControls() {
  return (
    <aside className="pwa-controls" aria-label="Estado de la aplicación">
      <PwaUpdatePrompt />
      <NotificationControls />
      <ShareAppButton />
      <InstallAppButton />
      <ConnectionStatus />
    </aside>
  );
}

export default PwaControls;
