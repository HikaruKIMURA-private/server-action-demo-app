import Link from "next/link";
import { getItems } from "../data/item";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default async function Items() {
  const items = await getItems();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">商品一覧</h1>

      <form action="" className="flex gap-2 mb-6">
        <Input className="flex-1" type="text" autoComplete="off" />
        <Button>検索</Button>
      </form>

      <div className="grid grid-cols-2 gap-2">
        {items?.map((item) => (
          <div key={item.id} className="border p-2 relative rounded-lg">
            <div className="aspect-video bg-muted border rounded-lg mb-2"></div>
            <Link href={`/items/${item.id}`}>
              {item.name} / {item.amount.toLocaleString()}円
              <span className="absolute inset-0"></span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
