import type { ReactNode } from "react";

type ContentPanelProps = {
  children: ReactNode;
  eyebrow?: string;
  title?: string;
  meta?: ReactNode;
  actions?: ReactNode;
  ariaLabel?: string;
};

function ContentPanel({
  children,
  eyebrow,
  title,
  meta,
  actions,
  ariaLabel,
}: ContentPanelProps) {
  const hasHeader =
    eyebrow !== undefined || title !== undefined || meta !== undefined;

  return (
    <section className="content-panel" aria-label={ariaLabel}>
      {hasHeader && (
        <header className="content-panel__header">
          <div>
            {eyebrow !== undefined && (
              <p className="page-header__eyebrow">{eyebrow}</p>
            )}

            {title !== undefined && <h2>{title}</h2>}
          </div>

          {meta !== undefined && <span>{meta}</span>}
        </header>
      )}

      {children}

      {actions !== undefined && (
        <div className="content-panel__actions">{actions}</div>
      )}
    </section>
  );
}

export default ContentPanel;
