const styles = {
  error: "border-red-200 bg-red-50 text-red-800",
  info: "border-sky-200 bg-sky-50 text-sky-800",
  success: "border-emerald-200 bg-emerald-50 text-emerald-800",
};

export default function Alert({ variant = "error", children, className = "" }) {
  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className={`rounded-lg border px-3.5 py-3 text-sm ${styles[variant]} ${className}`}
    >
      {children}
    </div>
  );
}