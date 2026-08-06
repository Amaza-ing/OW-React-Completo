"use client";

type ProjectsErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ProjectsError({ error, reset }: ProjectsErrorProps) {
  return (
    <section className="projects-error" role="alert">
      <h2>No se han podido cargar los proyectos</h2>
      <p>{error.message}</p>
      <button type="button" onClick={reset}>
        Reintentar
      </button>
    </section>
  );
}
