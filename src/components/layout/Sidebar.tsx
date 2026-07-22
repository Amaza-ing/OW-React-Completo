import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="sidebar__navigation" aria-label="Navegación principal">
        <p className="sidebar__title">Espacio de trabajo</p>

        <ul className="sidebar__list">
          <li>
            <a className="sidebar__link" href="#dashboard">
              Resumen
            </a>
          </li>

          <li>
            <a className="sidebar__link" href="#projects">
              Proyectos
            </a>
          </li>

          <li>
            <a className="sidebar__link" href="#tasks">
              Tareas
            </a>
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
