import { useInstallPrompt } from "../hooks/useInstallPrompt";
import "./InstallAppButton.css";

function InstallAppButton() {
  const { canInstall, isInstalled, installApp } = useInstallPrompt();

  if (isInstalled) {
    return (
      <span
        className="install-app-button install-app-button--installed"
        role="status"
      >
        TaskFlow instalada
      </span>
    );
  }

  if (!canInstall) {
    return null;
  }

  return (
    <button
      className="install-app-button"
      type="button"
      onClick={() => {
        void installApp();
      }}
    >
      Instalar TaskFlow
    </button>
  );
}

export default InstallAppButton;
