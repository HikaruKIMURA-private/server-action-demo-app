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
import { createItem } from "@/actions/item";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  amount: z.coerce.number().min(1),
  name: z.string().min(1).max(255),
});

type ItemFormValues = z.infer<typeof formSchema>;

export const ItemForm = () => {
  const { toast } = useToast();
  const form = useForm<ItemFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: 0,
    },
  });

  const onSubmit: SubmitHandler<ItemFormValues> = async (
    data: ItemFormValues
  ) => {
    await createItem(data);

    toast({
      title: "投稿しました",
      description: "アイテム一覧を確認してください",
    });

    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) => {
          alert(errors);
        })}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
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
        <Button type="submit">商品追加</Button>
      </form>
    </Form>
  );
};
