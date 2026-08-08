import type { Route } from "./+types/projects";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: "TaskFlow Router | Proyectos",
    },
  ];
}

export default function Projects() {
  return (
    <div className="page">
      <p className="page__eyebrow">Primera funcionalidad</p>

      <h1>Proyectos</h1>

      <p className="page__lead">
        En el siguiente tema este módulo obtendrá los proyectos mediante un
        loader ejecutado por React Router.
      </p>

      <div className="empty-state">
        <strong>Ruta preparada</strong>
        <p>app/routes.ts ya relaciona /projects con este archivo.</p>
      </div>
    </div>
  );
}
