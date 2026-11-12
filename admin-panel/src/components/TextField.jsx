import { forwardRef, useId } from "react";

/**
 * Generic labelled input with error + hint support.
 * `endAdornment` lets you slot in things like a show/hide button.
 */
const TextField = forwardRef(function TextField(
  { label, error, hint, endAdornment, className = "", ...props },
  ref
) {
  const id = useId();
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-800">
        {label}
      </label>
      <div className="relative">
        <input
          ref={ref}
          id={id}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={`block w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900
            placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2
            ${endAdornment ? "pr-11" : ""}
            ${
              error
                ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                : "border-slate-300 focus:border-slate-900 focus:ring-slate-200"
            }`}
          {...props}
        />
        {endAdornment && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">{endAdornment}</div>
        )}
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-slate-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
});

export default TextField;