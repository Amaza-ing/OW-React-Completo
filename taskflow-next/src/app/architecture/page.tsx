export default function ArchitecturePage() {
  return (
    <div className="page">
      <p className="page__eyebrow">Laboratorio</p>
      <h1>Arquitectura de TaskFlow</h1>

      <p className="page__lead">
        Esta ruta existe porque App Router encuentra
        src/app/architecture/page.tsx.
      </p>

      <section className="architecture-intro">
        <h2>Responsabilidades actuales</h2>
        <ul>
          <li>El layout comparte cabecera y navegación.</li>
          <li>La página define el contenido exclusivo de la ruta.</li>
          <li>Las carpetas sustituyen la tabla manual de rutas.</li>
        </ul>
      </section>
    </div>
  );
}
