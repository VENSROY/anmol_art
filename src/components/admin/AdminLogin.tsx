import { useState } from "react";

/**
 * ⚠️ SECURITY NOTE: VITE_ADMIN_PASSWORD is a client-side env variable.
 * It is bundled into the production JavaScript and readable by anyone.
 * This is a temporary solution. Migrate to Supabase Auth for production.
 */
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "";

interface Props {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: Props) {
  const [pass, setPass]   = useState("");
  const [error, setError] = useState(false);
  const [show, setShow]   = useState(false);
  const [busy, setBusy]   = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    await new Promise((r) => setTimeout(r, 400)); // subtle delay feels more secure
    if (pass === ADMIN_PASSWORD) {
      sessionStorage.setItem("anmol_admin", "1");
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2500);
    }
    setBusy(false);
  };

  return (
    <div className="relative min-h-screen bg-[#1a0a12] flex items-center justify-center px-4">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(circle, #D4AF37 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />

      <div className="relative bg-[#1e0d16] w-full max-w-sm rounded-3xl shadow-2xl border border-royal-gold/20 p-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-royal-gold/10 border border-royal-gold/30 rounded-full flex items-center justify-center mx-auto mb-5">
            <i className="fa-solid fa-crown text-royal-gold text-2xl" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-white tracking-wide">Admin Panel</h1>
          <p className="text-white/30 text-xs mt-1.5 uppercase tracking-widest">ANMOL Art – Stock Manager</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="Enter password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              autoFocus
              className={`w-full rounded-xl px-4 py-3.5 pr-12 text-sm outline-none transition
                bg-white/5 border text-white placeholder-white/20
                ${
                  error
                    ? "border-red-500/60 bg-red-500/10 animate-shake"
                    : "border-white/10 focus:border-royal-gold/60 focus:bg-white/8"
                }`}
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-royal-gold transition"
            >
              <i className={`fa-solid ${show ? "fa-eye-slash" : "fa-eye"} text-sm`} />
            </button>
          </div>

          {error && (
            <p className="text-red-400 text-xs flex items-center gap-1.5">
              <i className="fa-solid fa-triangle-exclamation" /> Incorrect password. Try again.
            </p>
          )}

          <button
            type="submit"
            disabled={busy || !pass}
            className="w-full bg-royal-gold text-[#1a0a12] py-3.5 rounded-xl font-bold uppercase tracking-widest text-sm
              hover:bg-white transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {busy ? (
              <><div className="w-4 h-4 border-2 border-[#1a0a12] border-t-transparent rounded-full animate-spin" /> Verifying...</>
            ) : (
              <><i className="fa-solid fa-lock-open text-xs" /> Login</>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-white/15 mt-7">
          ANMOL Art © {new Date().getFullYear()}
        </p>
      </div>

      {/* shake animation defined globally in index.css */}
    </div>
  );
}
