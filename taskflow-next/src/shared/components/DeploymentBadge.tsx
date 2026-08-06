const environmentLabels = {
  production: "Producción",
  preview: "Preview",
  development: "Desarrollo",
  local: "Local",
} as const;

type EnvironmentName = keyof typeof environmentLabels;

function getEnvironmentName(): EnvironmentName {
  const environment = process.env.VERCEL_ENV;

  if (
    environment === "production" ||
    environment === "preview" ||
    environment === "development"
  ) {
    return environment;
  }

  return "local";
}

export default function DeploymentBadge() {
  const environment = getEnvironmentName();
  const commit = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7);

  return (
    <span className="deployment-badge">
      <strong>{environmentLabels[environment]}</strong>
      {commit !== undefined && <span>· {commit}</span>}
    </span>
  );
}
