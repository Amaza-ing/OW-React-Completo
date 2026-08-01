import "./LoadingFallback.css";

type LoadingFallbackProps = {
  label: string;
  variant?: "page" | "panel";
};

function LoadingFallback({ label, variant = "page" }: LoadingFallbackProps) {
  return (
    <div
      className={`loading-fallback loading-fallback--${variant}`}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <p className="loading-fallback__label">{label}</p>

      <div className="loading-fallback__skeleton" aria-hidden="true">
        <span className="loading-fallback__line loading-fallback__line--title" />
        <span className="loading-fallback__line" />
        <span className="loading-fallback__line loading-fallback__line--short" />
        <span className="loading-fallback__line" />
      </div>
    </div>
  );
}

export default LoadingFallback;
