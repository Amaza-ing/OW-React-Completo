import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <section className="not-found-panel">
      <h1>Proyecto no encontrado</h1>
      <p>El identificador no corresponde a ningún proyecto disponible.</p>
      <Link href="/projects">Volver al listado</Link>
    </section>
  );
}
