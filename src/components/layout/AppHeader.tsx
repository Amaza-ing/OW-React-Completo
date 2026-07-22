import "./AppHeader.css";

function AppHeader() {
  return (
    <header className="app-header">
      <a className="app-header__brand" href="#dashboard">
        <span className="app-header__logo">TF</span>

        <span>
          <strong>TaskFlow</strong>
          <small>Gestión de proyectos</small>
        </span>
      </a>

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
