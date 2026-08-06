import { renderingImpacts } from "../renderingImpacts";
import "./RenderingImpactTable.css";

function RenderingImpactTable() {
  return (
    <div
      className="rendering-impact"
      tabIndex={0}
      aria-label="Comparativa desplazable de impacto del renderizado"
    >
      <table>
        <thead>
          <tr>
            <th scope="col">Estrategia</th>
            <th scope="col">SEO y compartición</th>
            <th scope="col">Primera visita</th>
            <th scope="col">Actualización</th>
            <th scope="col">JavaScript cliente</th>
            <th scope="col">Experiencia de desarrollo</th>
          </tr>
        </thead>

        <tbody>
          {renderingImpacts.map((impact) => (
            <tr key={impact.strategyId}>
              <th scope="row">{impact.strategy}</th>
              <td>{impact.searchVisibility}</td>
              <td>{impact.firstVisit}</td>
              <td>{impact.freshness}</td>
              <td>{impact.clientJavaScript}</td>
              <td>{impact.developmentExperience}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RenderingImpactTable;
