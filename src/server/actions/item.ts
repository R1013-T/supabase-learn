"use server";

import { CreateItemData } from "@/app/mypage/components/form";
import { createClient } from "@/lib/supabase/server";

export const createItem = async (formData: CreateItemData) => {
  const supabase = createClient();

  const { error } = await supabase.from("items").insert(formData);

  if (error) {
    throw new Error(error.message);
  }

  return;
};
