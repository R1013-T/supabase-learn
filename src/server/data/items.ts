import { createClient } from "@/lib/supabase/server";
import "server-only";

export const getItems = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.from("items").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}