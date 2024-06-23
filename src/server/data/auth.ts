import "server-only";

import { createClient } from "@/lib/supabase/server";
import { cache } from "react";

export const currentUser = cache(async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
});

export const getSession = cache(async () => {
  const supabase = createClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error(error);
    return null;
  }

  return session;
});
