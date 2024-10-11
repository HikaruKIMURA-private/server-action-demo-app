import { getItems } from "../data/item";

export default async function Items() {
  const items = await getItems();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">商品一覧</h1>

      <div className="grid grid-cols-2 gap-2">
        {items?.map((item) => (
          <div key={item.id} className="border p-2 rounded-lg">
            <div className="aspect-video bg-muted border rounded-lg mb-2"></div>
            {item.name} / {item.amount.toLocaleString()}円
          </div>
        ))}
      </div>
    </div>
  );
}
