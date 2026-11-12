/**
 * Two-column shell for auth screens: a quiet ink panel on the left
 * (hidden on mobile) and the form on the right. Reuse for
 * forgot-password, reset-password, 2FA, etc.
 */
export default function AuthLayout({ brand = "Inkwell", title, subtitle, children, aside }) {
  return (
    <div className="grid min-h-screen bg-white lg:grid-cols-[1.05fr_1fr]">
      <aside className="relative hidden flex-col justify-between bg-slate-900 p-12 text-slate-100 lg:flex">
        <div className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-white text-slate-900">
            {brand[0]}
          </span>
          {brand}
        </div>

        

        {aside ?? (
          <div className="max-w-md">
            <p className="font-serif text-4xl leading-tight">
              Good writing happens in the drafts. Pick up where you left off.
            </p>
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-slate-700 pt-6 text-sm">
              <div>
                <dt className="text-slate-400">Drafts</dt>
                <dd className="mt-1 text-2xl font-semibold text-white">7</dd>
              </div>
              <div>
                <dt className="text-slate-400">Scheduled</dt>
                <dd className="mt-1 text-2xl font-semibold text-white">3</dd>
              </div>
              <div>
                <dt className="text-slate-400">Comments to review</dt>
                <dd className="mt-1 text-2xl font-semibold text-white">12</dd>
              </div>
            </dl>
          </div>

          
        )}

        <p className="text-sm text-slate-400">© {new Date().getFullYear()} {brand}</p>
      </aside>

      <main className="flex items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2.5 text-lg font-semibold tracking-tight text-slate-900 lg:hidden">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-slate-900 text-white">
              {brand[0]}
            </span>
            {brand}
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-slate-600">{subtitle}</p>}
          <div className="mt-8">{children}</div>
        </div>
      </main>
    </div>
  );
}