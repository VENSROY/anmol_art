import { useEffect } from "react";
import { ToastState } from "./types";

interface Props {
  toast: ToastState;
}

export default function Toast({ toast }: Props) {
  if (!toast.message) return null;

  const icons: Record<string, string> = {
    success: "fa-circle-check",
    error: "fa-circle-xmark",
    info: "fa-circle-info",
  };
  const colors: Record<string, string> = {
    success: "bg-emerald-600",
    error: "bg-red-600",
    info: "bg-royal-maroon",
  };

  return (
    <div
      className={`fixed top-5 right-5 z-[300] px-5 py-3.5 rounded-xl shadow-2xl
        text-sm font-bold flex items-center gap-2.5 text-white animate-fade-in
        ${colors[toast.type] ?? "bg-royal-maroon"}`}
    >
      <i className={`fa-solid ${icons[toast.type] ?? "fa-circle-check"} text-white/80`} />
      {toast.message}
    </div>
  );
}
