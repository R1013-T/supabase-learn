import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { signIn } from "@/server/actions/auth";
import { currentUser } from "@/server/data/auth";
import { getURL } from "next/dist/shared/lib/utils";
import { redirect } from "next/navigation";
import React from "react";

export default async function LoginPage() {
  const user = await currentUser();

  if (user) {
    redirect("/mypage");
  }

  return (
    <div className="p-6 space-y-6">
      <h1>Sign In Page</h1>

      <form action={signIn}>
        <Button type="submit">Sign In</Button>
      </form>

      <form
        action={async () => {
          "use server";

          const supabase = createClient();
          const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
              redirectTo: "http://localhost:3000/auth/callback?next=/mypage",
            },
          });

          if (error) {
            console.error("error", error);
            return;
          }

          console.log("signin", data.url);

          redirect(data.url);
        }}
      >
        <Button type="submit">GitHub Sign In</Button>
      </form>
    </div>
  );
}
