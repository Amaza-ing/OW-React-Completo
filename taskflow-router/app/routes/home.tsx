import { Link } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: "TaskFlow Router | Inicio",
    },
    {
      name: "description",
      content: "Migración progresiva de TaskFlow a React Router Framework.",
    },
  ];
}

export default function Home() {
  return (
    <div className="page">
      <p className="page__eyebrow">Framework Mode</p>

      <h1>TaskFlow con módulos de ruta</h1>

      <p className="page__lead">
        Esta versión estudiará loaders, actions y rutas anidadas sin modificar
        la aplicación PWA creada con Vite ni el proyecto de Next.js.
      </p>

      <Link className="button-link" to="/projects">
        Abrir proyectos
      </Link>

      <section className="info-grid">
        <article>
          <span>Rutas</span>
          <h2>Configuración tipada</h2>
          <p>app/routes.ts conecta cada URL con su módulo.</p>
        </article>

        <article>
          <span>Datos</span>
          <h2>Loaders</h2>
          <p>Los datos de la ruta se prepararán antes de renderizarla.</p>
        </article>

        <article>
          <span>Mutaciones</span>
          <h2>Actions</h2>
          <p>Los formularios podrán modificar datos y revalidar loaders.</p>
        </article>
      </section>
    </div>
  );
}
