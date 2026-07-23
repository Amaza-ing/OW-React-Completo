import type { NavigateHandler } from "../../model/navigation";
import "./AppHeader.css";

type AppHeaderProps = {
  onNavigate: NavigateHandler;
};

function AppHeader({ onNavigate }: AppHeaderProps) {
  return (
    <header className="app-header">
      <button
        className="app-header__brand"
        type="button"
        onClick={() => onNavigate("dashboard")}
      >
        <span className="app-header__logo">TF</span>

        <span>
          <strong>TaskFlow</strong>
          <small>Gestión de proyectos</small>
        </span>
      </button>

      <div className="app-header__user">
        <span className="app-header__avatar">AM</span>

        <span className="app-header__user-data">
          <strong>Adrián Maza</strong>
          <small>Administrador</small>
        </span>
      </div>
    </header>
  );
}

export default AppHeader;
