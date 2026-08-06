import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Listado de proyectos de TaskFlow obtenido desde GraphQL.",
};

type ProjectsLayoutProps = {
  children: ReactNode;
};

export default function ProjectsLayout({ children }: ProjectsLayoutProps) {
  return (
    <section className="projects-section">
      <header className="projects-section__header">
        <p className="page__eyebrow">Server data</p>
        <h1>Proyectos</h1>
        <p>
          Esta sección comparte layout, carga y errores entre el listado y los
          futuros detalles dinámicos.
        </p>
      </header>

      {children}
    </section>
  );
}
