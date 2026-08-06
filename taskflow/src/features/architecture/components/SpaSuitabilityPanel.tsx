import { useState } from "react";
import "./SpaSuitabilityPanel.css";

interface SpaRequirements {
  publicSearchTraffic: boolean;
  requestSpecificHtml: boolean;
  manyPublicPages: boolean;
  authenticatedWorkspace: boolean;
  offlinePriority: boolean;
}

const initialRequirements: SpaRequirements = {
  publicSearchTraffic: false,
  requestSpecificHtml: false,
  manyPublicPages: false,
  authenticatedWorkspace: true,
  offlinePriority: true,
};

function SpaSuitabilityPanel() {
  const [requirements, setRequirements] = useState(initialRequirements);

  const reviewReasons = [
    requirements.publicSearchTraffic &&
      "El producto necesita atraer tráfico orgánico hacia contenido público.",
    requirements.requestSpecificHtml &&
      "La primera respuesta debe contener HTML específico de la petición.",
    requirements.manyPublicPages &&
      "Existe un conjunto amplio de URLs públicas que conviene prerenderizar.",
  ].filter((reason): reason is string => reason !== false);

  const spaStrengths = [
    requirements.authenticatedWorkspace &&
      "La mayor parte del producto se utiliza después de autenticar al usuario.",
    requirements.offlinePriority &&
      "La PWA y el uso offline tienen más peso que el HTML público inicial.",
  ].filter((reason): reason is string => reason !== false);

  const spaIsEnough = reviewReasons.length === 0;

  function toggleRequirement(requirement: keyof SpaRequirements) {
    setRequirements((current) => ({
      ...current,
      [requirement]: !current[requirement],
    }));
  }

  return (
    <div className="spa-suitability">
      <div className="spa-suitability__options">
        <label>
          <input
            type="checkbox"
            checked={requirements.publicSearchTraffic}
            onChange={() => {
              toggleRequirement("publicSearchTraffic");
            }}
          />
          <span>El producto necesita atraer tráfico desde buscadores.</span>
        </label>

        <label>
          <input
            type="checkbox"
            checked={requirements.requestSpecificHtml}
            onChange={() => {
              toggleRequirement("requestSpecificHtml");
            }}
          />
          <span>
            El HTML inicial debe depender de la petición o del usuario.
          </span>
        </label>

        <label>
          <input
            type="checkbox"
            checked={requirements.manyPublicPages}
            onChange={() => {
              toggleRequirement("manyPublicPages");
            }}
          />
          <span>Hay muchas páginas públicas de contenido o catálogo.</span>
        </label>

        <label>
          <input
            type="checkbox"
            checked={requirements.authenticatedWorkspace}
            onChange={() => {
              toggleRequirement("authenticatedWorkspace");
            }}
          />
          <span>La mayor parte del producto es un espacio autenticado.</span>
        </label>

        <label>
          <input
            type="checkbox"
            checked={requirements.offlinePriority}
            onChange={() => {
              toggleRequirement("offlinePriority");
            }}
          />
          <span>
            La instalación y el funcionamiento offline son prioritarios.
          </span>
        </label>
      </div>

      <div
        className={`spa-suitability__result ${
          spaIsEnough
            ? "spa-suitability__result--positive"
            : "spa-suitability__result--review"
        }`}
        role="status"
      >
        <strong>
          {spaIsEnough
            ? "Una SPA sigue siendo una opción razonable"
            : "Conviene estudiar renderizado previo"}
        </strong>

        {spaIsEnough ? (
          <>
            <p>
              Los requisitos actuales no obligan a añadir un runtime de
              renderizado en servidor.
            </p>

            {spaStrengths.length > 0 && (
              <ul>
                {spaStrengths.map((reason) => (
                  <li key={reason}>{reason}</li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <ul>
            {reviewReasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SpaSuitabilityPanel;
