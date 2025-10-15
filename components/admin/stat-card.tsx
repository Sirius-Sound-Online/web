import { ReactNode } from "react";

type Props = {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    label: string;
  };
};

export function StatCard({ title, value, subtitle, icon, trend }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0C0F13] p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs uppercase tracking-wider text-white/60">{title}</p>
          <p className="mt-2 text-3xl font-bold text-white">{value}</p>
          {subtitle && (
            <p className="mt-1 text-sm text-white/50">{subtitle}</p>
          )}
          {trend && (
            <p className={`mt-2 text-xs font-medium ${trend.value >= 0 ? "text-green-400" : "text-red-400"}`}>
              {trend.value >= 0 ? "↑" : "↓"} {Math.abs(trend.value)}% {trend.label}
            </p>
          )}
        </div>
        {icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-2xl">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
