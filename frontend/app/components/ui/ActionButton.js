"use client";

export default function ActionButton({ children, variant = "secondary", size = "md", icon, className = "" }) {
  const variants = {
    primary: "bg-secondary text-on-secondary font-label-md text-label-md font-bold shadow-lg shadow-secondary/10 hover:bg-secondary-fixed transition-all active:scale-[0.98]",
    secondary:
      "bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md transition-all",
    outline:
      "bg-transparent border border-outline-variant/40 text-on-surface-variant font-label-md text-label-md hover:bg-surface-container hover:text-on-surface transition-all",
    ghost:
      "text-on-surface-variant font-label-md text-label-md hover:text-on-surface transition-all",
    danger: "bg-error text-on-error hover:bg-error/90 font-label-sm text-label-sm font-bold transition-all",
  };

  const sizes = {
    sm: "px-2.5 py-1 rounded text-xs",
    md: "px-3 py-1.5 rounded text-sm",
    lg: "px-4 py-2 rounded-lg text-base",
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 ${variants[variant]} ${sizes[size]} ${className}`}
      type="button"
    >
      {icon && <span className="material-symbols-outlined text-[16px]">{icon}</span>}
      {children}
    </button>
  );
}