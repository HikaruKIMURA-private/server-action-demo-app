import { redirect } from "next/navigation";
import { currentUser } from "../data/auth";

export default async function Mypage() {
  const user = await currentUser();

  if (!user) {
    redirect("/login");
  }
  return <div className="p-6">mypage</div>;
}
