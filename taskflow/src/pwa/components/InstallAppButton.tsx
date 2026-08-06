import { useInstallPrompt } from "../hooks/useInstallPrompt";
import "./InstallAppButton.css";

function InstallAppButton() {
  const { canInstall, isInstalled, needsManualIosInstall, installApp } =
    useInstallPrompt();

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

  if (canInstall) {
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

  if (needsManualIosInstall) {
    return (
      <details className="install-app-guide">
        <summary>Instalar TaskFlow</summary>

        <ol>
          <li>Abre el menú Compartir de Safari.</li>
          <li>Pulsa Añadir a pantalla de inicio.</li>
          <li>Confirma el nombre y la instalación.</li>
        </ol>
      </details>
    );
  }

  return null;
}

export default InstallAppButton;
