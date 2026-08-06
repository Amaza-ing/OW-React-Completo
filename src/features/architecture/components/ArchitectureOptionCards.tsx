import { architectureOptions } from "../architectureOptions";
import "./ArchitectureOptionCards.css";

function ArchitectureOptionCards() {
  return (
    <div className="architecture-options">
      {architectureOptions.map((option) => (
        <article className="architecture-options__card" key={option.id}>
          <header>
            <h3>{option.name}</h3>
            <p>{option.startingPoint}</p>
          </header>

          <div>
            <h4>Renderizado</h4>
            <ul>
              {option.rendering.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Datos</h4>
            <p>{option.dataFlow}</p>
          </div>

          <div>
            <h4>Despliegue</h4>
            <p>{option.deployment}</p>
          </div>

          <div>
            <h4>Fortalezas</h4>
            <ul>
              {option.strengths.map((strength) => (
                <li key={strength}>{strength}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Costes</h4>
            <ul>
              {option.tradeoffs.map((tradeoff) => (
                <li key={tradeoff}>{tradeoff}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}

export default ArchitectureOptionCards;
