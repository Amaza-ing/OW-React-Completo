"use client";

import { useState } from "react";
import type {
  RenderingStrategy,
  RenderingStrategyId,
} from "../model/renderingStrategy";

type StrategyExplorerProps = {
  strategies: RenderingStrategy[];
};

export default function StrategyExplorer({
  strategies,
}: StrategyExplorerProps) {
  const [selectedId, setSelectedId] = useState<RenderingStrategyId>(
    strategies[0].id,
  );

  const selectedStrategy =
    strategies.find((strategy) => strategy.id === selectedId) ?? strategies[0];

  return (
    <section className="strategy-explorer">
      <label>
        Estrategia que quieres analizar
        <select
          value={selectedId}
          onChange={(event) => {
            setSelectedId(event.target.value as RenderingStrategyId);
          }}
        >
          {strategies.map((strategy) => (
            <option key={strategy.id} value={strategy.id}>
              {strategy.name}
            </option>
          ))}
        </select>
      </label>

      <article className="strategy-explorer__result">
        <h2>{selectedStrategy.name}</h2>
        <p>{selectedStrategy.description}</p>
        <p>
          <strong>Encaja en:</strong> {selectedStrategy.suitableFor}
        </p>
      </article>
    </section>
  );
}
