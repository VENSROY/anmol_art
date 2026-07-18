import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Icon from "../ui/Icon";

interface Props {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: Props) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass]   = useState("");
  const [error, setError] = useState("");
  const [show, setShow]   = useState(false);
  const [busy, setBusy]   = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !pass) return;
    setBusy(true);
    setError("");

    try {
      await signIn(email, pass);
      onLogin();
    } catch {
      setError("Invalid credentials. Please try again.");
      setTimeout(() => setError(""), 3000);
    }
    setBusy(false);
  };

  return (
    <div className="relative min-h-screen bg-[#1a0a12] flex items-center justify-center px-4">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(circle, #D4AF37 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        aria-hidden="true"
      />

      <div className="relative bg-[#1e0d16] w-full max-w-sm rounded-3xl shadow-2xl border border-royal-gold/20 p-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-royal-gold/10 border border-royal-gold/30 rounded-full flex items-center justify-center mx-auto mb-5">
            <Icon name="fa-crown" className="text-royal-gold text-2xl" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-white tracking-wide">Admin Panel</h1>
          <p className="text-white/30 text-xs mt-1.5 uppercase tracking-widest">ANMOL Art · Content Manager</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <input
              type="email"
              placeholder="Admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              autoFocus
              required
              className={`w-full rounded-xl px-4 py-3.5 text-sm outline-none transition
                bg-white/5 border text-white placeholder-white/20
                ${error ? "border-red-500/60 bg-red-500/10" : "border-white/10 focus:border-royal-gold/60"}`}
            />
          </div>

          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              autoComplete="current-password"
              required
              className={`w-full rounded-xl px-4 py-3.5 pr-12 text-sm outline-none transition
                bg-white/5 border text-white placeholder-white/20
                ${error ? "border-red-500/60 bg-red-500/10 animate-shake" : "border-white/10 focus:border-royal-gold/60"}`}
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              aria-label={show ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-royal-gold transition"
            >
              <Icon name={show ? "fa-eye-slash" : "fa-eye"} className="text-sm" />
            </button>
          </div>

          {error && (
            <p role="alert" className="text-red-400 text-xs flex items-center gap-1.5">
              <Icon name="fa-triangle-exclamation" /> {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy || !email || !pass}
            className="w-full bg-royal-gold text-[#1a0a12] py-3.5 rounded-xl font-bold uppercase tracking-widest text-sm
              hover:bg-white transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {busy ? (
              <><div className="w-4 h-4 border-2 border-[#1a0a12] border-t-transparent rounded-full animate-spin" aria-hidden="true" /> Signing in…</>
            ) : (
              <><Icon name="fa-lock-open" className="text-xs" /> Sign In</>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-white/15 mt-7">
          ANMOL Art © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
