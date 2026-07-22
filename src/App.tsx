import "./App.css";
import AppLayout from "./components/layout/AppLayout";

function App() {
  return (
    <AppLayout>
      <div className="page">
        <section id="dashboard" className="page-section page-section--hero">
          <div className="page-section__introduction">
            <p className="page-section__eyebrow">Vista general</p>

            <h1>Bienvenido a TaskFlow</h1>

            <p className="page-section__description">
              Esta será la aplicación que desarrollaremos y ampliaremos a lo
              largo del curso.
            </p>
          </div>

          <div className="status-card">
            <span className="status-card__indicator" aria-hidden="true" />

            <div>
              <strong>Proyecto preparado</strong>
              <p>React, TypeScript y el layout principal están funcionando.</p>
            </div>
          </div>
        </section>

        <section id="projects" className="page-section content-section">
          <header className="content-section__header">
            <p className="page-section__eyebrow">Proyectos</p>
            <h2>Tus proyectos</h2>
            <p>
              En el siguiente tema mostraremos aquí los primeros datos
              simulados.
            </p>
          </header>

          <div className="empty-state">
            <span className="empty-state__symbol" aria-hidden="true">
              P
            </span>

            <div>
              <strong>No hay proyectos cargados</strong>
              <p>Prepararemos el listado en el tema 1.3.</p>
            </div>
          </div>
        </section>

        <section id="tasks" className="page-section content-section">
          <header className="content-section__header">
            <p className="page-section__eyebrow">Tareas</p>
            <h2>Tareas recientes</h2>
            <p>
              Esta sección se conectará con nuestros datos simulados en el
              siguiente tema.
            </p>
          </header>

          <div className="empty-state">
            <span className="empty-state__symbol" aria-hidden="true">
              T
            </span>

            <div>
              <strong>No hay tareas cargadas</strong>
              <p>El contenido dinámico se añadirá progresivamente.</p>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}

export default App;
