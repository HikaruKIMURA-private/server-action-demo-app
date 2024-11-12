"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
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
import { Label } from "@/components/ui/label";
const formSchema = z.object({
  amount: z.coerce.number().min(1, { message: "1円以上で入力してください" }),
  name: z
    .string()
    .min(1, { message: "商品名は1文字以上で入力してください" })
    .max(255, { message: "商品名は255文字以内で入力してください" }),
  picture: z
    // z.inferでSchemaを定義したときに型がつくようにするため
    .custom<FileList>()
    // 必須にしたい場合
    .refine((file) => file.length !== 0, { message: "必須です" })
    // このあとのrefine()で扱いやすくするために整形
    .transform((file) => file[0])
    // ファイルサイズを制限したい場合
    .refine((file) => sizeInMB(file.size) <= MAX_IMAGE_SIZE, {
      message: "ファイルサイズは最大5MBです",
    })
    // 画像形式を制限したい場合
    .refine((file) => IMAGE_TYPES.includes(file.type), {
      message: ".jpgもしくは.pngのみ可能です",
    }),
});

const IMAGE_TYPES = ["image/jpg", "image/png"];
const MAX_IMAGE_SIZE = 5; // 5MB
const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
  const result = sizeInBytes / (1024 * 1024);
  return +result.toFixed(decimalsNum);
};

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
    console.log("aaaaaa");
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
      console.log("data", data);
      return createItem(data)
        .then(() => {
          toast({
            title: "投稿しました",
            description: "アイテム一覧を確認してください",
          });

          form.reset();
        })
        .catch((error) => {
          console.log("error", error);
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
      <FormProvider {...form}>
        {isPending && (
          <>
            <Skeleton className="w-full h-[100px]" />
            <Skeleton className="mt-4 w-full h-[100px]" />
          </>
        )}
        {!isPending && (
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault(); // デフォルトの動作を防止
                form.handleSubmit(onSubmit)(e); // handleSubmit が呼ばれるか確認
                console.log("フォーム送信が発火しました"); // デバッグ用
              }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <Label htmlFor="name">商品名</Label>
                <Input id="name" type="text" {...form.register("name")} />
                <FormMessage>{form.formState.errors.name?.message}</FormMessage>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">値段</Label>
                <Input id="amount" type="number" {...form.register("amount")} />
                <FormMessage>
                  {form.formState.errors.amount?.message}
                </FormMessage>
              </div>
              <div className="space-y-2">
                <Label htmlFor="picture">画像</Label>
                <Input
                  id="picture"
                  type="file"
                  accept="image/*, application/pdf"
                  {...form.register("picture")}
                />
                <FormMessage>
                  {form.formState.errors.picture?.message}
                </FormMessage>
              </div>
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
          </div>
        )}
      </FormProvider>
    </>
  );
};
