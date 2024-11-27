import type { Database } from "@/types/database";
import Link from "next/link";

export const ItemList = ({
  items,
}: {
  items: Database["public"]["Tables"]["items"]["Row"][] | null;
}) => {
  if (items === null) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {items.map((item) => (
        <div key={item.id} className="border p-2 relative rounded-lg">
          <div className="aspect-video bg-muted border rounded-lg mb-2" />
          <Link href={`/items/${item.id}`}>
            {item.name} / {item.amount.toLocaleString()}円
            <span className="absolute inset-0" />
          </Link>
        </div>
      ))}
    </div>
  );
};
