import {
  navigationItems,
  type NavigateHandler,
  type ViewName,
} from "../../model/navigation";
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
          {navigationItems.map((item) => {
            const isActive = activeView === item.id;

            return (
              <li key={item.id}>
                <button
                  className={`sidebar__link ${
                    isActive ? "sidebar__link--active" : ""
                  }`}
                  type="button"
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => onNavigate(item.id)}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
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
