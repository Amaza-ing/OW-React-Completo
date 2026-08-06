import Link from "next/link";

export default function HomePage() {
  return (
    <div className="page">
      <p className="page__eyebrow">Curso 7 · Next.js</p>
      <h1>Una nueva versión de TaskFlow</h1>

      <p className="page__lead">
        Este proyecto permite estudiar App Router y renderizado híbrido sin
        modificar todavía la aplicación creada con Vite.
      </p>

      <div className="hero-actions">
        <Link href="/architecture">Analizar la arquitectura</Link>
        <a className="hero-actions__secondary" href="http://localhost:5173">
          Abrir TaskFlow con Vite
        </a>
      </div>

      <section className="info-grid">
        <article>
          <h2>Proyecto original</h2>
          <p>React 19, Vite, React Router, PWA, TanStack Query y GraphQL.</p>
        </article>

        <article>
          <h2>Proyecto nuevo</h2>
          <p>React 19, Next.js, App Router y migración por funcionalidades.</p>
        </article>

        <article>
          <h2>Primera candidata</h2>
          <p>
            Arquitectura puede trasladarse sin APIs específicas del navegador.
          </p>
        </article>
      </section>
    </div>
  );
}
