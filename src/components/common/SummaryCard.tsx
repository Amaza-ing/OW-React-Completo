import type { ReactNode } from "react";

type SummaryCardProps = {
  label: string;
  value: string | number;
  children: ReactNode;
};

function SummaryCard({ label, value, children }: SummaryCardProps) {
  return (
    <article className="summary-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <div className="summary-card__description">{children}</div>
    </article>
  );
}

export default SummaryCard;
