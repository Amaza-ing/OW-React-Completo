import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  badge?: ReactNode;
};

function PageHeader({ eyebrow, title, description, badge }: PageHeaderProps) {
  return (
    <header className="page-header">
      <div>
        <p className="page-header__eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      {badge !== undefined && (
        <span className="page-header__badge">{badge}</span>
      )}
    </header>
  );
}

export default PageHeader;
