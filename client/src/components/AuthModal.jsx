import { useId, useState } from "react";

export default function AuthModal({ isOpen, mode, onClose, onSubmit }) {
  const titleId = useId();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const isSignup = mode === "signup";
  const heading = isSignup ? "Create account" : "Sign in";
  const submitLabel = isSignup ? "Sign up" : "Sign in";

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await onSubmit({ email, password, mode });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-[#100e0c] p-6 shadow-2xl shadow-black/50"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
              Golden Hour Studio
            </p>
            <h2 id={titleId} className="mt-1 font-serif text-2xl text-stone-100">
              {heading}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-2 py-1 text-stone-400 transition hover:bg-white/10 hover:text-stone-100"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="auth-email" className="mb-1 block text-sm text-stone-400">
              Email
            </label>
            <input
              id="auth-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-stone-100 outline-none ring-[#c8b08a]/40 focus:ring-2"
            />
          </div>
          <div>
            <label
              htmlFor="auth-password"
              className="mb-1 block text-sm text-stone-400"
            >
              Password
            </label>
            <input
              id="auth-password"
              type="password"
              autoComplete={isSignup ? "new-password" : "current-password"}
              required
              minLength={isSignup ? 8 : undefined}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-stone-100 outline-none ring-[#c8b08a]/40 focus:ring-2"
            />
            {isSignup && (
              <p className="mt-1 text-xs text-stone-500">At least 8 characters</p>
            )}
          </div>

          {error && (
            <p className="text-sm text-red-300" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-[#ddc9a8] px-4 py-2.5 text-sm font-semibold text-[#0a0908] transition hover:bg-[#c8b08a] disabled:opacity-60"
          >
            {submitting ? "Please wait…" : submitLabel}
          </button>
        </form>
      </div>
    </div>
  );
}
