import { supabase } from "./supabase";

export interface StockData {
  stock: string;
  nganh: string;
  tomtat: string;
  recommend: string;
}

export async function getAllStocks(): Promise<StockData[]> {
  const { data, error } = await supabase
    .from("raw")
    .select("stock, nganh, tomtat, recommend")
    .order("stock", { ascending: true });

  if (error) {
    console.error("Supabase error:", error.message);
    return [];
  }

  return (data ?? []) as StockData[];
}

export async function getStockByCode(code: string): Promise<StockData | null> {
  const { data, error } = await supabase
    .from("raw")
    .select("stock, nganh, tomtat, recommend")
    .eq("stock", code.toUpperCase())
    .single();

  if (error || !data) return null;
  return data as StockData;
}
