import { useId } from "react";

export default function Checkbox({ label, className = "", ...props }) {
  const id = useId();
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <input
        id={id}
        type="checkbox"
        className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-2 focus:ring-slate-400 focus:ring-offset-1"
        {...props}
      />
      <label htmlFor={id} className="text-sm text-slate-700 select-none">
        {label}
      </label>
    </div>
  );
}