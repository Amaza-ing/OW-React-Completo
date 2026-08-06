import { useState } from "react";
import {
  audienceOptions,
  backendOptions,
  initialHtmlOptions,
  migrationOptions,
  recommendArchitecture,
} from "../architectureAdvisor";
import type {
  ArchitectureAnswers,
  Audience,
  BackendShape,
  InitialHtmlNeed,
  MigrationPreference,
} from "../architectureAdvisor";
import "./ArchitectureAdvisor.css";

const initialAnswers: ArchitectureAnswers = {
  audience: "private",
  initialHtml: "optional",
  backend: "separate",
  migration: "minimal",
};

function ArchitectureAdvisor() {
  const [answers, setAnswers] = useState(initialAnswers);

  const recommendation = recommendArchitecture(answers);

  function updateAnswer<Key extends keyof ArchitectureAnswers>(
    key: Key,
    value: ArchitectureAnswers[Key],
  ) {
    setAnswers((current) => ({
      ...current,
      [key]: value,
    }));
  }

  return (
    <div className="architecture-advisor">
      <div className="architecture-advisor__form">
        <label>
          <span>Audiencia principal</span>
          <select
            value={answers.audience}
            onChange={(event) => {
              updateAnswer("audience", event.target.value as Audience);
            }}
          >
            {audienceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>HTML inicial</span>
          <select
            value={answers.initialHtml}
            onChange={(event) => {
              updateAnswer(
                "initialHtml",
                event.target.value as InitialHtmlNeed,
              );
            }}
          >
            {initialHtmlOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Forma del backend</span>
          <select
            value={answers.backend}
            onChange={(event) => {
              updateAnswer("backend", event.target.value as BackendShape);
            }}
          >
            {backendOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Preferencia de migración</span>
          <select
            value={answers.migration}
            onChange={(event) => {
              updateAnswer(
                "migration",
                event.target.value as MigrationPreference,
              );
            }}
          >
            {migrationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <article
        className={`architecture-advisor__result architecture-advisor__result--${recommendation.optionId}`}
        aria-live="polite"
      >
        <span>Recomendación orientativa</span>
        <h3>{recommendation.title}</h3>
        <p>{recommendation.explanation}</p>

        <ul>
          {recommendation.reasons.map((reason) => (
            <li key={reason}>{reason}</li>
          ))}
        </ul>
      </article>
    </div>
  );
}

export default ArchitectureAdvisor;
