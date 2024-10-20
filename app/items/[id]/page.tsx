import { getItem } from "@/app/data/item";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Link from "next/link";
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
      <Button size="icon" variant="ghost" asChild>
        <Link href={`/items/${id}/edit`}>
          <Pencil size={20} />
          <span className="sr-only">編集</span>
        </Link>
      </Button>
      <p className="text-muted-foreground mt-2">
        {item?.amount.toLocaleString()}円
      </p>
    </div>
  );
}
