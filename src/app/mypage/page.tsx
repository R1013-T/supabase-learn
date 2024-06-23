import { signOut } from "@/server/actions/auth";
import { currentUser } from "@/server/data/auth";
import { redirect } from "next/navigation";
import FormComp from "./components/form";

export default async function MyPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="p-6">
      MyPage
      <div className="mt-4">
        <div>{JSON.stringify(user)}</div>
      </div>
      <FormComp />
      <form action={signOut}>
        <button>Sign Out</button>
      </form>
    </div>
  );
}
