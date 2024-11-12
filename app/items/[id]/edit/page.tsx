import { getItem } from "@/app/data/item";
import { ItemForm } from "@/app/mypage/components/item-form";
import { notFound } from "next/navigation";

export default async function Page(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const params = await props.params;

  const {
    id
  } = params;

  const item = await getItem(id);

  if (!item) {
    notFound();
  }

  return (
    <div className="p-6">
      <h1>編集</h1>
      <ItemForm defaultValues={item} isUpdateMode={true} id={id} />
    </div>
  );
}
