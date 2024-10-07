import { signIn } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { currentUser } from "../data/auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const user = await currentUser();

  if (user) {
    redirect("/mypage");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Login</h1>

      {user && <p>{JSON.stringify(user)}</p>}

      <form action={signIn}>
        <Button>Login</Button>
      </form>
    </div>
  );
}
