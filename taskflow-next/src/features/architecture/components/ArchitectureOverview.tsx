import { renderingStrategies } from "../model/renderingStrategy";

export default function ArchitectureOverview() {
  return (
    <section className="architecture-overview">
      <h2>Estrategias disponibles</h2>

      <div className="architecture-overview__grid">
        {renderingStrategies.map((strategy) => (
          <article key={strategy.id}>
            <span>{strategy.name}</span>
            <h3>{strategy.suitableFor}</h3>
            <p>{strategy.generatedAt}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
