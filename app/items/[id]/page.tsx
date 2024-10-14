import { getItem } from "@/app/data/item";
import { notFound } from "next/navigation";

export default async function ItemPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const item = await getItem(id);

  if (!item) {
    notFound();
  }

  return (
    <div className="p-6">
      <h1 className="font-bold text-2xl mb-6">{item?.name}</h1>
      <p className="text-muted-foreground mt-2">
        {item?.amount.toLocaleString()}円
      </p>
    </div>
  );
}
