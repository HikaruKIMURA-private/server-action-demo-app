"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createItem, deleteItem, updateItem } from "@/actions/item";
import { useToast } from "@/hooks/use-toast";
import { useTransition } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  amount: z.coerce.number().min(1, { message: "1円以上で入力してください" }),
  name: z
    .string()
    .min(1, { message: "商品名は1文字以上で入力してください" })
    .max(255, { message: "商品名は255文字以内で入力してください" }),
});

type ItemFormValues = z.infer<typeof formSchema>;

type Props =
  | {
      defaultValues: ItemFormValues;
      isUpdateMode: true;
      id: string;
    }
  | {
      defaultValues: undefined;
      isUpdateMode: undefined;
      id: undefined;
    };

export const ItemForm = ({ defaultValues, isUpdateMode, id }: Props) => {
  const router = useRouter();
  const { toast } = useToast();

  if (!id && isUpdateMode) {
    throw new Error("idが必要です");
  }

  const [isPending, startTransition] = useTransition();
  const form = useForm<ItemFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: isUpdateMode
      ? defaultValues
      : {
          name: "",
          amount: 0,
        },
  });

  const onSubmit: SubmitHandler<ItemFormValues> = async (
    data: ItemFormValues
  ) => {
    startTransition(() => {
      if (isUpdateMode) {
        return updateItem(id, data)
          .then(() => {
            toast({
              title: "更新しました",
              description: "アイテム一覧を確認してください",
            });

            form.reset();
          })
          .catch((error) => {
            toast({
              title: "更新に失敗しました",
              description: "管理者にお問い合わせください",
              variant: "destructive",
            });
          });
      }
      return createItem(data)
        .then(() => {
          toast({
            title: "投稿しました",
            description: "アイテム一覧を確認してください",
          });

          form.reset();
        })
        .catch((error) => {
          toast({
            title: "投稿に失敗しました",
            description: "管理者にお問い合わせください",
            variant: "destructive",
          });
        });
    });
  };

  return (
    <>
      {isPending && (
        <>
          <Skeleton className="w-full h-[100px]" />
          <Skeleton className="mt-4 w-full h-[100px]" />
        </>
      )}
      {!isPending && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>商品名</FormLabel>
                  <FormControl>
                    <Input placeholder="コッペパン" {...field} />
                  </FormControl>
                  <FormDescription>商品名を入力してください</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>値段</FormLabel>
                  <FormControl>
                    <Input placeholder="1" {...field} />
                  </FormControl>
                  <FormDescription>値段を入力してください</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-3">
              <Button type="submit">
                {isUpdateMode ? "更新" : "商品追加"}
              </Button>
              {isUpdateMode && (
                <Button
                  variant="outline"
                  type="button"
                  onClick={() =>
                    deleteItem(id).then(() => {
                      toast({
                        title: "削除しました",
                        description: "アイテム一覧を確認してください",
                      });
                      router.push("/items");
                    })
                  }
                >
                  削除
                </Button>
              )}
            </div>
          </form>
        </Form>
      )}
    </>
  );
};
