import { taskFlowMigrationPlan } from "../migrationPlan";
import "./MigrationPlanPanel.css";

const readinessLabels = {
  ready: "Candidata directa",
  adapt: "Necesita adaptación",
  "keep-client": "Mantener en cliente",
} as const;

function MigrationPlanPanel() {
  return (
    <div className="migration-plan">
      {taskFlowMigrationPlan.map((slice) => (
        <article className="migration-plan__item" key={slice.id}>
          <header>
            <div>
              <span>{slice.currentRoute}</span>
              <h3>{slice.name}</h3>
            </div>

            <strong
              className={`migration-plan__status migration-plan__status--${slice.readiness}`}
            >
              {readinessLabels[slice.readiness]}
            </strong>
          </header>

          <p>
            <strong>Primer destino:</strong> {slice.firstTarget}
          </p>

          <div>
            <h4>Por qué</h4>
            <ul>
              {slice.reasons.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Dependencias que revisar</h4>
            <ul>
              {slice.dependenciesToReview.map((dependency) => (
                <li key={dependency}>{dependency}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}

export default MigrationPlanPanel;
