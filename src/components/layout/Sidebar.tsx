import type { NavigateHandler, ViewName } from "../../types/navigation";
import "./Sidebar.css";

type SidebarProps = {
  activeView: ViewName;
  onNavigate: NavigateHandler;
};

function Sidebar({ activeView, onNavigate }: SidebarProps) {
  return (
    <aside className="sidebar">
      <nav className="sidebar__navigation" aria-label="Navegación principal">
        <p className="sidebar__title">Espacio de trabajo</p>

        <ul className="sidebar__list">
          <li>
            <button
              className={`sidebar__link ${
                activeView === "dashboard" ? "sidebar__link--active" : ""
              }`}
              type="button"
              aria-current={activeView === "dashboard" ? "page" : undefined}
              onClick={() => onNavigate("dashboard")}
            >
              Resumen
            </button>
          </li>

          <li>
            <button
              className={`sidebar__link ${
                activeView === "projects" ? "sidebar__link--active" : ""
              }`}
              type="button"
              aria-current={activeView === "projects" ? "page" : undefined}
              onClick={() => onNavigate("projects")}
            >
              Proyectos
            </button>
          </li>

          <li>
            <button
              className={`sidebar__link ${
                activeView === "tasks" ? "sidebar__link--active" : ""
              }`}
              type="button"
              aria-current={activeView === "tasks" ? "page" : undefined}
              onClick={() => onNavigate("tasks")}
            >
              Tareas
            </button>
          </li>
        </ul>
      </nav>

      <div className="sidebar__footer">
        <strong>Curso de React</strong>
        <span>Proyecto TaskFlow</span>
      </div>
    </aside>
  );
}

export default Sidebar;
