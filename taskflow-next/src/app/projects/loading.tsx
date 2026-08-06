export default function ProjectsLoading() {
  return (
    <div
      className="project-skeleton-grid"
      aria-label="Cargando proyectos"
      aria-busy="true"
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <div className="project-skeleton" key={index} />
      ))}
    </div>
  );
}
