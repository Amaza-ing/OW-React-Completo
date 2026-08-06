import {
  ArchitectureAdvisor,
  ArchitectureOptionCards,
  MigrationPlanPanel,
  RenderingImpactTable,
  SpaSuitabilityPanel,
  renderingStrategies,
} from "../features/architecture";
import PageHeader from "../shared/components/common/PageHeader";
import "./ArchitecturePage.css";

function ArchitecturePage() {
  return (
    <div className="page architecture-page">
      <title>TaskFlow | Estrategias de renderizado</title>

      <meta
        name="description"
        content="Compara estrategias de renderizado y decisiones arquitectónicas para TaskFlow."
      />

      <PageHeader
        eyebrow="Arquitectura"
        title="Laboratorio de arquitectura"
        description="Analiza cómo y cuándo se genera el HTML de una aplicación React."
        badge="5 estrategias"
      />

      <p className="architecture-page__intro">
        TaskFlow es actualmente una SPA creada con Vite. Esta pantalla permite
        comparar su enfoque actual con otras estrategias sin cambiar todavía el
        runtime ni crear un segundo proyecto.
      </p>

      <p className="architecture-page__notice">
        Streaming no sustituye necesariamente a SSR. Describe una entrega
        progresiva de la respuesta del servidor, de modo que distintas regiones
        puedan completarse en momentos diferentes.
      </p>

      <section className="architecture-page__section">
        <header className="architecture-page__section-header">
          <h2>Cuándo se genera la interfaz</h2>
          <p>
            La diferencia principal está en el momento y el entorno donde se
            prepara el HTML que recibe el navegador.
          </p>
        </header>

        <div className="architecture-page__grid">
          {renderingStrategies.map((strategy) => (
            <article className="architecture-page__card" key={strategy.id}>
              <h3>{strategy.name}</h3>

              <dl>
                <div>
                  <dt>Generación</dt>
                  <dd>{strategy.generatedAt}</dd>
                </div>

                <div>
                  <dt>Respuesta inicial</dt>
                  <dd>{strategy.initialResponse}</dd>
                </div>

                <div>
                  <dt>Actualización</dt>
                  <dd>{strategy.freshness}</dd>
                </div>

                <div>
                  <dt>Infraestructura</dt>
                  <dd>{strategy.infrastructure}</dd>
                </div>

                <div>
                  <dt>Encaja en</dt>
                  <dd>{strategy.suitableFor}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="architecture-page__section">
        <header className="architecture-page__section-header">
          <h2>¿Sigue siendo suficiente una SPA?</h2>
          <p>
            Marca necesidades del producto. El resultado es una heurística
            didáctica, no una regla automática para todos los proyectos.
          </p>
        </header>

        <SpaSuitabilityPanel />
      </section>

      <section className="architecture-page__section">
        <header className="architecture-page__section-header">
          <h2>Impacto sobre producto y equipo</h2>
          <p>
            Ninguna estrategia gana en todas las columnas. La decisión debe
            equilibrar descubrimiento, velocidad, frescura y coste de
            desarrollo.
          </p>
        </header>

        <RenderingImpactTable />
      </section>

      <section className="architecture-page__section">
        <header className="architecture-page__section-header">
          <h2>Tres opciones para una aplicación React</h2>
          <p>
            React con Vite, Next.js y React Router Framework Mode ofrecen
            distintos niveles de convenciones, renderizado y runtime.
          </p>
        </header>

        <ArchitectureOptionCards />
      </section>

      <section className="architecture-page__section">
        <header className="architecture-page__section-header">
          <h2>Seleccionar según el producto</h2>
          <p>
            Cambia las respuestas para comprobar cómo los requisitos alteran la
            opción que merece ser evaluada primero.
          </p>
        </header>

        <ArchitectureAdvisor />
      </section>

      <section className="architecture-page__section">
        <header className="architecture-page__section-header">
          <h2>Plan de migración parcial</h2>
          <p>
            Antes de crear otro proyecto, delimitamos qué rutas pueden moverse
            primero y qué dependencias deben mantenerse en cliente.
          </p>
        </header>

        <MigrationPlanPanel />
      </section>
    </div>
  );
}

export default ArchitecturePage;
