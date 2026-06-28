import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Session } from "@supabase/supabase-js";
import { isSupabaseConfigured } from "../lib/supabase";
import {
  getCurrentSession,
  onAuthStateChange,
  signOut as signOutService,
  signInWithPassword as signInService,
} from "../services/auth.service";
import { supabase } from "../lib/supabase";

interface AuthContextValue {
  session: Session | null;
  /** True until the initial session lookup resolves. */
  loading: boolean;
  /** Whether Supabase credentials are present at all. */
  configured: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * Owns all authentication state. The initial getSession() is wrapped so a
 * corrupt/stale token can never leave the app stuck on a loading screen — it is
 * cleared and the user falls back to the login form.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    getCurrentSession()
      .then((s) => {
        if (active) setSession(s);
      })
      .catch(async (err) => {
        console.error("[Auth] getSession failed — clearing stale session", err);
        try {
          await supabase.auth.signOut();
        } catch {
          /* ignore */
        }
        if (active) setSession(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    const unsubscribe = onAuthStateChange((s) => {
      if (active) setSession(s);
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const value: AuthContextValue = {
    session,
    loading,
    configured: isSupabaseConfigured,
    signIn: signInService,
    signOut: signOutService,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an <AuthProvider>");
  return ctx;
}
