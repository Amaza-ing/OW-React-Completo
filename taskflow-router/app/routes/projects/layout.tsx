import { NavLink, Outlet } from "react-router";
import "~/styles/projects-layout.css";

export default function ProjectsLayout() {
  return (
    <section className="projects-layout">
      <header className="projects-layout__header">
        <div>
          <p className="page__eyebrow">Feature migrada</p>
          <h1>Proyectos</h1>
          <p>Listado y detalle comparten esta región de interfaz.</p>
        </div>

        <NavLink
          className={({ isActive }) =>
            isActive
              ? "projects-layout__link projects-layout__link--active"
              : "projects-layout__link"
          }
          end
          to="/projects"
        >
          Ver listado
        </NavLink>
      </header>

      <Outlet />
    </section>
  );
}
