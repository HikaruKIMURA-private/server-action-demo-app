import Link from "next/link";
import { searchItems } from "../data/item";
import { ItemList } from "@/components/ItemList";

export default async function SearchPage({
  searchParams: { q },
}: {
  searchParams: { q: string };
}) {
  const items = await searchItems(q);
  return (
    <div className="p-6">
      <h1 className="font-bold text-2xl mb-6">「{q}」の検索結果</h1>

      {items?.length === 0 ? (
        <p>該当するアイテムが見つかりませんでした。</p>
      ) : (
        <ItemList items={items} />
      )}
    </div>
  );
}
