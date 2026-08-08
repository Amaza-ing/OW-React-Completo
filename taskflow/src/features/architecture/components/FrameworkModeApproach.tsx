import "./FrameworkModeApproach.css";

const frameworkResponsibilities = [
  {
    id: "routes",
    title: "Configuración de rutas",
    declarative:
      "TaskFlow renderiza <Routes> y <Route> dentro del árbol de componentes.",
    framework:
      "Las rutas se declaran en app/routes.ts y apuntan a módulos independientes.",
  },
  {
    id: "data",
    title: "Obtención de datos",
    declarative:
      "Los componentes deciden cuándo ejecutar hooks, consultas o efectos.",
    framework:
      "Cada módulo puede exportar un loader que prepara los datos antes de renderizar.",
  },
  {
    id: "mutations",
    title: "Mutaciones",
    declarative:
      "Los formularios llaman a funciones o mutaciones desde componentes cliente.",
    framework:
      "Los formularios pueden enviar datos a una action asociada a la ruta.",
  },
  {
    id: "runtime",
    title: "Renderizado",
    declarative: "La aplicación actual se renderiza como SPA en el navegador.",
    framework:
      "El mismo sistema admite SSR, prerenderizado o SPA según la configuración.",
  },
] as const;

function FrameworkModeApproach() {
  return (
    <div className="framework-mode-approach">
      {frameworkResponsibilities.map((responsibility) => (
        <article
          className="framework-mode-approach__item"
          key={responsibility.id}
        >
          <h3>{responsibility.title}</h3>

          <div className="framework-mode-approach__comparison">
            <section>
              <span>TaskFlow actual</span>
              <p>{responsibility.declarative}</p>
            </section>

            <section>
              <span>Framework Mode</span>
              <p>{responsibility.framework}</p>
            </section>
          </div>
        </article>
      ))}
    </div>
  );
}

export default FrameworkModeApproach;
