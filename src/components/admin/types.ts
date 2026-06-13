export interface StockImage {
  id: string;
  url: string;
  category: string;
  label: string;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  created_at: string;
}

export type ToastState = { message: string; type: "success" | "error" | "info" };
