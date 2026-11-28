"use client";

import Link from "next/link";

export default function SectionHeader({ title, subtitle, icon, actions, prdRef }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-2 border-b border-outline-variant/20">
      <div className="flex flex-col">
        {icon && (
          <div className="flex items-center gap-2 text-primary font-label-md text-label-md uppercase tracking-widest mb-1">
            <span className="material-symbols-outlined text-[20px]">{icon}</span>
            {prdRef && (
              <span className={`px-2 py-0.5 rounded text-xs font-bold ${prdRef === "14" ? "bg-secondary-container/40 text-secondary" : "bg-surface-container-highest text-secondary}"}`}>
                PRD §{prdRef}
              </span>
            )}
          </div>
        )}
        <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">{title}</h2>
        {subtitle && <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </div>
  );
}