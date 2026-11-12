import { useRef, useState } from "react";
import AuthLayout from "../components/AuthLayout";
import TextField from "../components/TextField";
import PasswordField from "../components/PasswordField";
import Checkbox from "../components/Checkbox";
import Button from "../components/Button";
import Alert from "../components/Alert";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate({ email, password }) {
  const errors = {};
  if (!email.trim()) errors.email = "Enter your email address.";
  else if (!EMAIL_RE.test(email)) errors.email = "Enter a valid email, like name@example.com.";
  if (!password) errors.password = "Enter your password.";
  else if (password.length < 8) errors.password = "Passwords are at least 8 characters.";
  return errors;
}

/**
 * Replace this with your real API call. Throw an Error with a
 * user-readable message to show it in the form-level alert.
 */
async function defaultLogin({ email, password }) {
  await new Promise((r) => setTimeout(r, 900));
  if (email !== "admin@example.com" || password !== "password123") {
    throw new Error("Email or password is incorrect. Check both and try again.");
  }
}

export default function LoginPage({
  onLogin = defaultLogin,
  onSuccess = () => alert("Signed in"),
  onForgotPassword = () => {},
  brand = "Inkwell",
}) {
  const [values, setValues] = useState({ email: "", password: "", remember: true });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const set = (key) => (e) =>
    setValues((v) => ({ ...v, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");

    const found = validate(values);
    setErrors(found);
    if (found.email) return emailRef.current?.focus();
    if (found.password) return passwordRef.current?.focus();

    setLoading(true);
    try {
      await onLogin(values);
      onSuccess();
    } catch (err) {
      setFormError(err.message || "Something went wrong. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  }

  return (
    
    <AuthLayout
      brand={brand}
      title="Sign in to your dashboard"
      subtitle="Manage posts, authors and comments."
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {formError && <Alert variant="error">{formError}</Alert>}

        <TextField
          ref={emailRef}
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="admin@example.com"
          value={values.email}
          onChange={set("email")}
          error={errors.email}
        />

        <PasswordField
          ref={passwordRef}
          label="Password"
          name="password"
          autoComplete="current-password"
          value={values.password}
          onChange={set("password")}
          error={errors.password}
        />

        <div className="flex items-center justify-between">
          <Checkbox label="Keep me signed in" checked={values.remember} onChange={set("remember")} />
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm font-medium text-slate-900 underline underline-offset-4 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 rounded"
          >
            Forgot password?
          </button>
        </div>

        <Button type="submit" fullWidth loading={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-500">
        Need access? Ask a site owner to invite you.
      </p>
    </AuthLayout>
  );
}