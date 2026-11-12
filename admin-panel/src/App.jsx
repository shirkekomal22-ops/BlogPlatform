import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";

import LoginPage from "./pages/Login";

/** Connects LoginPage to the router + auth context. */
function LoginRoute() {
  const { user, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/dashboard";

  // Already signed in? Skip the login screen.
  if (user) return <Navigate to={redirectTo} replace />;

  return (
    <LoginPage
      // Demo auth: LoginPage's default onLogin validates admin@example.com / password123.
      // Pass your own `onLogin` here to call your API and return/throw as needed.
      onSuccess={() => {}}
      onLogin={async (values) => {
        // 1) call your API here, e.g. const res = await api.login(values)
        // 2) throw new Error("message") on failure
        await new Promise((r) => setTimeout(r, 900));
        if (values.email !== "admin@example.com" || values.password !== "password123") {
          throw new Error("Email or password is incorrect. Check both and try again.");
        }
        signIn({ email: values.email }, values.remember);
        navigate(redirectTo, { replace: true });
      }}
      onForgotPassword={() => navigate("/forgot-password")}
    />
  );
}

function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center text-slate-600">
      Page not found.
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
   
        <Routes>
          <Route path="/" element={<LoginPage />} />
          {/* <Route path="/forgot-password" element={<ForgotPasswordPage />} /> */}

          {/* Private routes: add more admin pages inside this wrapper */}
          {/* <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>

          <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
     
    </BrowserRouter>
  );
}