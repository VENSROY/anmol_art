import { Component, ReactNode } from "react";

interface Props { children: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: "100vh", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          background: "#FDFBF7", color: "#3d2b1f", fontFamily: "Inter, sans-serif",
          padding: "2rem", textAlign: "center"
        }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "1rem", color: "#5d001e" }}>
            Something went wrong
          </h1>
          <p style={{ marginBottom: "1.5rem", opacity: 0.6, maxWidth: 480 }}>
            The page crashed due to an error. Open DevTools (F12 → Console) for details.
          </p>
          <pre style={{
            background: "#f3e5ab", borderRadius: 8, padding: "1rem",
            fontSize: "0.75rem", maxWidth: 600, overflow: "auto",
            textAlign: "left", border: "1px solid #d4af3740"
          }}>
            {this.state.error?.message}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: "1.5rem", padding: "0.75rem 2rem",
              background: "#5d001e", color: "#fff", border: "none",
              cursor: "pointer", fontWeight: 700, borderRadius: 4,
              fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase"
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
