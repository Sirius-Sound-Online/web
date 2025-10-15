import { ReactNode } from "react";

type Props = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
};

export function PageHeader({ title, subtitle, action }: Props) {
  return (
    <div className="mb-8 flex items-start justify-between">
      <div>
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-white/60">{subtitle}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
