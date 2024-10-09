import { redirect } from "next/navigation";
import { currentUser } from "../data/auth";
import { ItemForm } from "./components/item-form";

export default async function Mypage() {
  const user = await currentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">mypage</h1>
        <ItemForm />
      </div>
    </>
  );
}
