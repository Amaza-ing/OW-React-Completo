import { NavLink } from "react-router";
import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="sidebar__navigation" aria-label="Navegación principal">
        <p className="sidebar__title">Espacio de trabajo</p>

        <ul className="sidebar__list">
          <li>
            <NavLink
              className={({ isActive }) =>
                `sidebar__link ${isActive ? "sidebar__link--active" : ""}`
              }
              to="/"
              end
            >
              Resumen
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) =>
                `sidebar__link ${isActive ? "sidebar__link--active" : ""}`
              }
              to="/projects"
            >
              Proyectos
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) =>
                `sidebar__link ${isActive ? "sidebar__link--active" : ""}`
              }
              to="/tasks"
            >
              Tareas
            </NavLink>
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
