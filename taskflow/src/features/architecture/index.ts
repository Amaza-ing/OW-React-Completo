export { default as ArchitectureAdvisor } from "./components/ArchitectureAdvisor";
export { default as ArchitectureOptionCards } from "./components/ArchitectureOptionCards";
export { default as FrameworkModeApproach } from "./components/FrameworkModeApproach";
export { default as MigrationPlanPanel } from "./components/MigrationPlanPanel";
export { default as RenderingImpactTable } from "./components/RenderingImpactTable";
export { default as SpaSuitabilityPanel } from "./components/SpaSuitabilityPanel";

export { architectureOptions } from "./architectureOptions";
export type {
  ArchitectureOption,
  ArchitectureOptionId,
} from "./architectureOptions";

export { renderingStrategies } from "./renderingStrategies";
export type {
  RenderingStrategy,
  RenderingStrategyId,
} from "./renderingStrategies";

export { taskFlowMigrationPlan } from "./migrationPlan";
export type { MigrationReadiness, MigrationSlice } from "./migrationPlan";
