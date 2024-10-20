import Link from "next/link";
import { getItems } from "../data/item";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { ItemList } from "@/components/ItemList";

export default async function Items() {
  const items = await getItems();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">商品一覧</h1>

      <form
        action={async (data: FormData) => {
          "use server";
          const keyword = data.get("query") as string;

          redirect(`/search?q=${encodeURIComponent(keyword)}`);
        }}
        className="flex gap-2 mb-6"
      >
        <Input name="query" className="flex-1" type="text" autoComplete="off" />
        <Button>検索</Button>
      </form>

      <ItemList items={items} />
    </div>
  );
}
