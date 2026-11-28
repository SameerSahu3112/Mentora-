"use client";

import { useState } from "react";

export default function KPICard({ label, value, delta, deltaLabel, icon, variant = "primary" }) {
  const variantConfig = {
    primary: {
      iconBg: "bg-primary-container/40 text-primary",
      border: "border-outline-variant/20",
      hover: "hover:bg-surface-container",
      iconColor: "text-primary",
    },
    secondary: {
      iconBg: "bg-secondary-container/40 text-secondary",
      border: "border-outline-variant/20",
      hover: "hover:bg-surface-container",
      iconColor: "text-secondary",
    },
    error: {
      iconBg: "bg-error/20 text-error",
      border: "border-outline-variant/20",
      hover: "hover:bg-surface-container",
      iconColor: "text-error",
    },
    tertiary: {
      iconBg: "bg-tertiary-container/50 text-tertiary",
      border: "border-outline-variant/20",
      hover: "hover:bg-surface-container",
      iconColor: "text-tertiary",
    },
  }[variant];

  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`p-6 rounded-xl ${variantConfig.border} shadow-sm flex flex-col justify-between transition-all duration-200 ${
        variantConfig.hover
      } ${hovered ? "bg-surface-container" : "bg-surface-container-low"}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-start justify-between">
        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
          {label}
        </span>
        <span className={`p-1.5 rounded ${variantConfig.iconBg}`}>
          <span className="material-symbols-outlined text-[18px]">{icon}</span>
        </span>
      </div>
      <div className="my-2">
        <div className="font-headline-md text-headline-md font-bold text-on-surface">
          {value}
        </div>
        {delta && (
          <div className="flex items-center gap-1 mt-1 text-sm font-medium">
            {delta.startsWith("-") || delta.startsWith("+") ? (
              <>
                <span className={`text-xs material-symbols-outlined ${
                  delta.startsWith("+") ? "text-tertiary" : "text-error"
                }`}>
                  {delta.startsWith("+") ? "trending_up" : "trending_down"}
                </span>
                <span className={`text-xs ${delta.startsWith("+") ? "text-tertiary" : "text-error"}`}>
                  {delta}
                </span>
              </>
            ) : (
              <span className="text-xs text-on-surface-variant">{delta}</span>
            )}
            {deltaLabel && <span className="text-xs text-on-surface-variant">{deltaLabel}</span>}
          </div>
        )}
      </div>
      <div className="text-on-surface-variant font-label-sm text-label-sm">
        {/* subtitle slot */}
      </div>
    </div>
  );
}