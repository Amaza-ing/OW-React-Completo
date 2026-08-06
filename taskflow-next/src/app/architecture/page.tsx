import ArchitectureOverview from "@/features/architecture/components/ArchitectureOverview";
import StrategyExplorer from "@/features/architecture/components/StrategyExplorer";
import { renderingStrategies } from "@/features/architecture/model/renderingStrategy";

export default function ArchitecturePage() {
  return (
    <div className="page">
      <p className="page__eyebrow">Laboratorio</p>
      <h1>Server y Client Components</h1>

      <p className="page__lead">
        El contenido descriptivo se genera en el servidor. Solo el selector
        necesita JavaScript de cliente.
      </p>

      <ArchitectureOverview />
      <StrategyExplorer strategies={renderingStrategies} />
    </div>
  );
}
