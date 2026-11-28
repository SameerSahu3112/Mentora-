export default function StatusBadge({ status, variant = "default" }) {
  const config = {
    active: "bg-tertiary-container text-on-tertiary-container",
    near_capacity: "bg-secondary text-on-secondary",
    lock_imminent: "bg-error/20 text-error animate-pulse",
    pending: "bg-surface-container-highest text-secondary",
    completed: "bg-primary-container text-on-primary-container",
    draft: "bg-secondary-container text-on-secondary-container",
    error: "bg-error-container/30 text-error",
    success: "bg-tertiary-container/40 text-tertiary",
    warning: "bg-secondary-container/40 text-secondary",
    ...variant,
  };

  return (
    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${config[status] || config.default}`}>
      {status.replace(/_/g, " ")}
    </span>
  );
}